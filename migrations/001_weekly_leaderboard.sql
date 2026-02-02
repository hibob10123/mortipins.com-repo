-- Migration: weekly leaderboard tables (username-based keys)
-- Backup your database before running these statements.

-- 1) points_history: append-only audit log
CREATE TABLE IF NOT EXISTS points_history (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL,
  delta INTEGER NOT NULL,
  reason TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 2) weekly_totals: per-username per-week aggregated points (week_id uses YYYY-MM-DD of week start)
CREATE TABLE IF NOT EXISTS weekly_totals (
  username TEXT NOT NULL,
  week_id TEXT NOT NULL,
  points INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (username, week_id)
);

CREATE INDEX IF NOT EXISTS idx_weekly_totals_week_points ON weekly_totals (week_id, points DESC);

-- 3) weekly_leaderboards: materialized snapshots of weekly top lists
CREATE TABLE IF NOT EXISTS weekly_leaderboards (
  week_id TEXT PRIMARY KEY,
  snapshot_json TEXT,
  published_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Optional: a quick check that users table exists and has the expected columns
-- SELECT name FROM sqlite_master WHERE type='table' AND name='users';
-- PRAGMA table_info(users);