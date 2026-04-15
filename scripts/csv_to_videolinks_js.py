#!/usr/bin/env python3
"""
Read a cleaned submission CSV (watch?v= URLs), verify each video is still public/embeddable
via YouTube oEmbed, then print JavaScript lines for `videoLinks` in script.js:

  { link: "https://www.youtube.com/embed/VIDEO_ID", trueRank: "Mythic", guesses: [] },

Example:
  python scripts/csv_to_videolinks_js.py data/cleaned.csv -o data/videolinks_snippet.txt
  python scripts/csv_to_videolinks_js.py data/cleaned.csv --no-check   # offline: skip oEmbed
"""

from __future__ import annotations

import argparse
import csv
import json
import sys
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

# Reuse URL parsing from the cleaning script (same folder when run as python scripts/...)
from clean_submissions_csv import detect_delimiter, extract_video_id

USER_AGENT = "mortipins-vid-check/1.0 (Python urllib)"

# Brawldle ranks as used in script.js
RANK_ALIASES = {
    "bronze": "Bronze",
    "silver": "Silver",
    "gold": "Gold",
    "diamond": "Diamond",
    "mythic": "Mythic",
    "legendary": "Legendary",
    "masters": "Masters",
    "master": "Masters",
}


def find_col(header: list[str], *needles: str) -> int | None:
    needles_l = [n.lower() for n in needles]
    for i, h in enumerate(header):
        hl = (h or "").strip().lower()
        if all(n in hl for n in needles_l):
            return i
    return None


def find_link_col(header: list[str]) -> int:
    idx = find_col(header, "youtube", "link")
    if idx is not None:
        return idx
    return 1


def find_rank_col(header: list[str]) -> int:
    idx = find_col(header, "peak", "rank")
    if idx is not None:
        return idx
    idx = find_col(header, "rank")
    if idx is not None:
        return idx
    return 3


def normalize_rank(raw: str) -> str:
    s = (raw or "").strip()
    if not s:
        return "Bronze"
    key = s.lower()
    if key in RANK_ALIASES:
        return RANK_ALIASES[key]
    return s[:1].upper() + s[1:].lower() if len(s) > 1 else s.upper()


def check_oembed(video_id: str, timeout: float = 20.0) -> tuple[bool, str]:
    watch = f"https://www.youtube.com/watch?v={video_id}"
    qs = urllib.parse.urlencode({"url": watch, "format": "json"})
    url = f"https://www.youtube.com/oembed?{qs}"
    req = urllib.request.Request(url, headers={"User-Agent": USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            if resp.status != 200:
                return False, f"HTTP {resp.status}"
            data = json.loads(resp.read().decode("utf-8", errors="replace"))
            title = (data.get("title") or "")[:80]
            return True, title
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return False, "404 deleted or invalid"
        if e.code in (401, 403):
            return False, f"{e.code} private/restricted"
        return False, f"HTTP {e.code}"
    except urllib.error.URLError as e:
        return False, f"network: {e.reason!s}"
    except Exception as e:
        return False, repr(e)


def embed_url(video_id: str) -> str:
    return f"https://www.youtube.com/embed/{video_id}"


def format_line(video_id: str, rank: str) -> str:
    link = embed_url(video_id)
    return f'    {{ link: "{link}", trueRank: "{rank}", guesses: [] }},'


def main() -> int:
    ap = argparse.ArgumentParser(description="CSV → videoLinks JS lines (with oEmbed check).")
    ap.add_argument("input", type=Path, help="Cleaned CSV path")
    ap.add_argument(
        "-o",
        "--output",
        type=Path,
        default=None,
        help="Write lines to this file (default: stdout)",
    )
    ap.add_argument(
        "--no-check",
        action="store_true",
        help="Skip oEmbed (use after you already verified, or offline)",
    )
    ap.add_argument(
        "--delay",
        type=float,
        default=0.35,
        help="Seconds between oEmbed requests (default: 0.35)",
    )
    ap.add_argument(
        "--dedupe",
        action="store_true",
        default=True,
        help="Keep only first row per video ID (default: on)",
    )
    ap.add_argument(
        "--no-dedupe",
        action="store_true",
        help="Emit one entry per CSV row (duplicate IDs allowed)",
    )
    ap.add_argument(
        "--encoding",
        default="utf-8-sig",
        help="File encoding (default utf-8-sig)",
    )
    args = ap.parse_args()
    dedupe = not args.no_dedupe

    if not args.input.is_file():
        print(f"Error: not found: {args.input}", file=sys.stderr)
        return 1

    text = args.input.read_text(encoding=args.encoding, errors="replace")
    lines = text.splitlines()
    if not lines:
        print("Error: empty file", file=sys.stderr)
        return 1

    delim = detect_delimiter(lines[0])
    reader = csv.reader(lines, delimiter=delim)
    rows = list(reader)
    header = rows[0]
    data = rows[1:]

    link_i = find_link_col(header)
    rank_i = find_rank_col(header)

    out_lines: list[str] = []
    seen: set[str] = set()
    skipped_bad_url = 0
    skipped_dup = 0
    failed_check: list[tuple[str, str, str]] = []
    n_ok = 0

    for row in data:
        if not row or len(row) <= max(link_i, rank_i):
            continue
        url = (row[link_i] or "").strip()
        rank_raw = row[rank_i] if len(row) > rank_i else ""
        vid, reason = extract_video_id(url)
        if vid is None:
            skipped_bad_url += 1
            continue
        if dedupe and vid in seen:
            skipped_dup += 1
            continue
        rank = normalize_rank(rank_raw)

        if not args.no_check:
            ok, detail = check_oembed(vid)
            if not ok:
                failed_check.append((vid, rank, detail))
                if args.delay > 0:
                    time.sleep(args.delay)
                continue
            if args.delay > 0:
                time.sleep(args.delay)

        seen.add(vid)
        out_lines.append(format_line(vid, rank))
        n_ok += 1

    body = "\n".join(out_lines)
    if args.output:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(body + ("\n" if body else ""), encoding="utf-8")
    else:
        print(body)

    print(
        f"Wrote {n_ok} entries"
        + (f" → {args.output}" if args.output else "")
        + f" | skipped bad URL: {skipped_bad_url} | skipped duplicate: {skipped_dup}"
        + f" | failed oEmbed: {len(failed_check)}",
        file=sys.stderr,
    )
    if failed_check:
        print("Unavailable / private / deleted (not included):", file=sys.stderr)
        for vid, rank, detail in failed_check[:50]:
            print(f"  {vid}  ({rank})  {detail}", file=sys.stderr)
        if len(failed_check) > 50:
            print(f"  ... and {len(failed_check) - 50} more", file=sys.stderr)

    return 0


if __name__ == "__main__":
    raise SystemExit(main())
