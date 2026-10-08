> Historical setup claims; not proof of a working connection. Current registry: connections.md.

# Connections

Registry of every system your AIOS can reach. Filled by `/onboard` from Q4-Q7 answers; expanded over time as you wire new tools. `/audit` checks this file for domain coverage and freshness.

| # | Domain | Tool | Mechanism | Auth | Last checked |
|---|---|---|---|---|---|
| 1 | Revenue / Financials | Payhip, PayPal | key+ref | API key / Webhook | 2026-09-30 |
| 2 | Customer interactions | YouTube Studio | script | OAuth2 / Data API | 2026-09-30 |
| 3 | Calendar | Google Calendar | script | gws-cli / OAuth | not yet connected |
| 4 | Communication | Gmail | script | gws-cli / OAuth | not yet connected |
| 5 | Project / task tracking | Notion | mcp | Integration Token | 2026-09-30 |
| 6 | Meeting intelligence | None (Solo Operator) | not yet connected | — | — |
| 7 | Knowledge / files | Notion, Local FS, Google Drive | mcp | Local / OAuth | 2026-09-30 |

**Mechanism options:** `mcp` (MCP server), `script` (Python/Bash hitting an API, in `scripts/`), `export` (CSV/JSON dump pipeline), `key+ref` (`.env` key + `references/{tool}-api.md` guide), `not yet connected`.

When you wire a new tool, also save `references/{tool}-api.md` capturing endpoints, auth flow, and common queries — researched-once-saved-fore
ver.
