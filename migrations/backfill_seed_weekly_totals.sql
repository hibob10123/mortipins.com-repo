-- Backfill: seed weekly_totals for the CURRENT WEEK
-- Replace '2026-02-02' with the Monday of the current week you want to start collecting

INSERT OR IGNORE INTO weekly_totals (username, week_id, points)
SELECT username, '2026-02-02', 0 FROM users;

-- If you prefer weekly deltas relative to current totals (checkpoint approach):
-- Create checkpoints table and copy current totals:
-- CREATE TABLE IF NOT EXISTS weekly_checkpoints (username TEXT PRIMARY KEY, week_id TEXT, points_at_start INTEGER);
-- INSERT OR REPLACE INTO weekly_checkpoints (username, week_id, points_at_start)
-- SELECT username, '2026-02-02', points FROM users;