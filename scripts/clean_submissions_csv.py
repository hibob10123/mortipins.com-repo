#!/usr/bin/env python3
"""
Filter Brawldle / submission CSV exports:

- Drops YouTube Shorts (they use a different player path; many embed flows expect watch/embed).
- Drops rows where no valid 11-character video ID can be extracted (broken links, channel URLs,
  random text / slurs in the URL column, etc.).
- Optionally normalizes surviving links to https://www.youtube.com/watch?v=VIDEO_ID

Default delimiter: tab (Google Sheets "Download TSV"). Use --delimiter comma for CSV.

Examples:
  python scripts/clean_submissions_csv.py submissions.tsv cleaned.tsv
  python scripts/clean_submissions_csv.py data.csv cleaned.csv --delimiter comma --report removed.csv
"""

from __future__ import annotations

import argparse
import csv
import re
import sys
from pathlib import Path
from urllib.parse import parse_qs, unquote, urlparse

# Standard YouTube video IDs are 11 chars [A-Za-z0-9_-]
VIDEO_ID_RE = re.compile(r"^[a-zA-Z0-9_-]{11}$")

# Hosts we attempt to parse (video id extraction)
YT_NETLOCS = frozenset(
    {
        "youtube.com",
        "www.youtube.com",
        "m.youtube.com",
        "music.youtube.com",
        "youtu.be",
        "www.youtu.be",
    }
)


def detect_delimiter(sample_line: str) -> str:
    tabs = sample_line.count("\t")
    commas = sample_line.count(",")
    if tabs >= 3 and tabs >= commas:
        return "\t"
    return ","


def is_shorts_url(parsed) -> bool:
    path = (parsed.path or "").lower()
    if "/shorts/" in path or path.rstrip("/").endswith("/shorts"):
        return True
    netloc = (parsed.netloc or "").lower()
    if netloc.startswith("www."):
        netloc = netloc[4:]
    # e.g. youtube.com/shorts/ID
    if netloc.endswith("youtube.com") and "/shorts/" in path:
        return True
    return False


def normalize_netloc(netloc: str) -> str:
    n = netloc.lower().strip()
    if n.startswith("www."):
        n = n[4:]
    return n


def extract_video_id(raw: str) -> tuple[str | None, str]:
    """
    Returns (video_id, reason) where reason is 'ok' if id is set, else a short code.
    """
    if raw is None:
        return None, "empty"
    s = str(raw).strip()
    if not s:
        return None, "empty"

    # Obvious non-URLs (prank / pasted text)
    low = s.lower()
    if not any(
        x in low
        for x in (
            "http://",
            "https://",
            "youtube.com",
            "youtu.be",
            "youtube.",
        )
    ):
        return None, "not_a_url"

    if not s.startswith(("http://", "https://")):
        s = "https://" + s.lstrip("/")

    try:
        parsed = urlparse(s)
    except Exception:
        return None, "parse_error"

    netloc = normalize_netloc(parsed.netloc or "")
    if netloc not in YT_NETLOCS and not netloc.endswith("youtube.com"):
        return None, "not_youtube"

    if is_shorts_url(parsed):
        return None, "shorts"

    path = unquote(parsed.path or "")

    # youtu.be/VIDEO_ID
    if netloc == "youtu.be":
        seg = path.strip("/").split("/")[0] if path else ""
        seg = seg.split("?")[0]
        if VIDEO_ID_RE.match(seg):
            return seg, "ok"
        return None, "invalid_id"

    # youtube.com/watch?v=ID
    qs = parse_qs(parsed.query)
    if "v" in qs and qs["v"]:
        vid = qs["v"][0].strip()
        if VIDEO_ID_RE.match(vid):
            return vid, "ok"
        return None, "invalid_id"

    # /embed/ID
    m = re.search(r"/embed/([a-zA-Z0-9_-]{11})", path)
    if m and VIDEO_ID_RE.match(m.group(1)):
        return m.group(1), "ok"

    # /live/ID (streams)
    m = re.search(r"/live/([a-zA-Z0-9_-]{11})", path)
    if m and VIDEO_ID_RE.match(m.group(1)):
        return m.group(1), "ok"

    # /v/ID (legacy)
    m = re.search(r"/v/([a-zA-Z0-9_-]{11})", path)
    if m and VIDEO_ID_RE.match(m.group(1)):
        return m.group(1), "ok"

    return None, "no_video_id"


def find_link_column_index(header: list[str]) -> int:
    for i, h in enumerate(header):
        hl = (h or "").lower()
        if "youtube" in hl and "link" in hl:
            return i
        if hl.strip() == "youtube link to clip (no private videos)":
            return i
    # Fallback: second column (Timestamp, Link, ...)
    if len(header) >= 2:
        return 1
    return 1


def canonical_watch_url(video_id: str) -> str:
    return f"https://www.youtube.com/watch?v={video_id}"


def main() -> int:
    ap = argparse.ArgumentParser(description="Clean submission CSV/TSV: drop shorts & invalid YouTube URLs.")
    ap.add_argument("input", type=Path, help="Input .tsv or .csv")
    ap.add_argument("output", type=Path, help="Output file (kept rows only)")
    ap.add_argument(
        "--report",
        type=Path,
        default=None,
        help="Optional path to write removed rows + reason column",
    )
    ap.add_argument(
        "--delimiter",
        choices=("auto", "tab", "comma"),
        default="auto",
        help="Field delimiter (default: auto-detect from first line)",
    )
    ap.add_argument(
        "--no-normalize-url",
        action="store_true",
        help="Keep original URL text when valid (default: rewrite to watch?v=ID)",
    )
    ap.add_argument(
        "--encoding",
        default="utf-8-sig",
        help="Text encoding (default utf-8-sig for Excel / Sheets BOM)",
    )
    args = ap.parse_args()

    if not args.input.is_file():
        print(f"Error: input not found: {args.input}", file=sys.stderr)
        return 1

    raw_text = args.input.read_text(encoding=args.encoding, errors="replace")
    lines = raw_text.splitlines()
    if not lines:
        print("Error: empty file", file=sys.stderr)
        return 1

    if args.delimiter == "auto":
        delim = detect_delimiter(lines[0])
    elif args.delimiter == "tab":
        delim = "\t"
    else:
        delim = ","

    reader = csv.reader(lines, delimiter=delim)
    rows = list(reader)
    if not rows:
        print("Error: no rows", file=sys.stderr)
        return 1

    header = rows[0]
    data_rows = rows[1:]
    link_idx = find_link_column_index(header)

    kept: list[list[str]] = []
    removed: list[list[str]] = []

    for row in data_rows:
        if not row or all(not (c or "").strip() for c in row):
            continue
        while len(row) <= link_idx:
            row.append("")
        url_cell = row[link_idx]
        vid, reason = extract_video_id(url_cell)
        if vid is None:
            removed.append([*row, reason])
            continue
        if not args.no_normalize_url:
            row = list(row)
            row[link_idx] = canonical_watch_url(vid)
        kept.append(row)

    args.output.parent.mkdir(parents=True, exist_ok=True)
    with args.output.open("w", encoding="utf-8", newline="") as f:
        w = csv.writer(f, delimiter=delim, lineterminator="\n")
        w.writerow(header)
        w.writerows(kept)

    if args.report:
        rheader = list(header) + ["_removed_reason"]
        args.report.parent.mkdir(parents=True, exist_ok=True)
        with args.report.open("w", encoding="utf-8", newline="") as f:
            w = csv.writer(f, delimiter=delim, lineterminator="\n")
            w.writerow(rheader)
            w.writerows(removed)

    print(
        f"Read:    {args.input} ({len(data_rows)} data rows, delimiter={repr(delim)})",
        file=sys.stderr,
    )
    print(f"Kept:    {len(kept)} → {args.output}", file=sys.stderr)
    print(f"Removed: {len(removed)}", file=sys.stderr)
    if removed:
        from collections import Counter

        c = Counter(r[-1] for r in removed)
        print("  by reason:", dict(c), file=sys.stderr)
    if args.report:
        print(f"Report:  {args.report}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
