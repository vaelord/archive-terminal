PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS wl_entries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  x_username TEXT NOT NULL COLLATE NOCASE UNIQUE,
  wallet_address TEXT NOT NULL UNIQUE,
  task_follow INTEGER NOT NULL CHECK (task_follow IN (0, 1)),
  task_like INTEGER NOT NULL CHECK (task_like IN (0, 1)),
  task_repost INTEGER NOT NULL CHECK (task_repost IN (0, 1)),
  task_quote INTEGER NOT NULL CHECK (task_quote IN (0, 1)),
  task_reply INTEGER NOT NULL CHECK (task_reply IN (0, 1)),
  ticket_serial TEXT NOT NULL UNIQUE,
  created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_wl_entries_created_at ON wl_entries(created_at);
