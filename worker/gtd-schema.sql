PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS gtd_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    x_username TEXT NOT NULL,
    wallet_address TEXT NOT NULL COLLATE NOCASE UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_gtd_applications_created_at
ON gtd_applications(created_at);

CREATE INDEX IF NOT EXISTS idx_gtd_applications_x_username
ON gtd_applications(x_username);
