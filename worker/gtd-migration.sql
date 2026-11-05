
PRAGMA foreign_keys = OFF;

ALTER TABLE gtd_applications
RENAME TO gtd_applications_old;

CREATE TABLE gtd_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    x_username TEXT NOT NULL,
    wallet_address TEXT NOT NULL COLLATE NOCASE UNIQUE,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

INSERT INTO gtd_applications (
    id,
    x_username,
    wallet_address,
    created_at
)
SELECT
    id,
    x_username,
    wallet_address,
    created_at
FROM gtd_applications_old;

DROP TABLE gtd_applications_old;

DROP TABLE IF EXISTS gtd_oauth_states;
DROP TABLE IF EXISTS gtd_wallet_challenges;
DROP TABLE IF EXISTS gtd_wallet_verifications;

CREATE INDEX IF NOT EXISTS idx_gtd_applications_created_at
ON gtd_applications(created_at);

CREATE INDEX IF NOT EXISTS idx_gtd_applications_x_username
ON gtd_applications(x_username);
