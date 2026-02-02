-- Migration: add correct_count to weekly_totals
-- This column tracks the number of correct guesses per user per week.

ALTER TABLE weekly_totals ADD COLUMN correct_count INTEGER NOT NULL DEFAULT 0;

-- Backfill: initialize correct_count to 0 for existing rows (if needed)
UPDATE weekly_totals SET correct_count = 0 WHERE correct_count IS NULL;