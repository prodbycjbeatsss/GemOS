CREATE TABLE IF NOT EXISTS subscription_costs (user_id TEXT PRIMARY KEY, state_json TEXT NOT NULL, revision INTEGER NOT NULL, updated_at INTEGER NOT NULL);
