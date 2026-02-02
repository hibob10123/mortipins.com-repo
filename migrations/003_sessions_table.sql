-- Migration: sessions table for session-token auth
-- Stores session tokens mapped to usernames with optional expiration

CREATE TABLE IF NOT EXISTS sessions (
  token TEXT PRIMARY KEY,
  username TEXT NOT NULL,
  expires_at DATETIME
);

CREATE INDEX IF NOT EXISTS idx_sessions_expires_at ON sessions (expires_at);

-- Optional cleanup: remove expired sessions
-- DELETE FROM sessions WHERE expires_at IS NOT NULL AND expires_at <= CURRENT_TIMESTAMP;