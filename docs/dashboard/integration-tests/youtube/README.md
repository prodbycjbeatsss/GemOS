# GemOS private integration

Current source snapshot for the owner-private app. Group 2: `/`; Group 1: `/checklist`. Live URL: https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site.

- [STATUS](STATUS.md): current analytics/leaderboard decisions and evidence.
- [BACKEND](BACKEND.md): shared Google connection and runtime setup.
- [CAPTURE](CAPTURE.md): protected five-minute capture worker and real-source verification limits.
- [ASSETS](ASSETS.md): eight-category file rules.
- [PROJECTS](PROJECTS.md): discovery, review, Google metadata-edit permission and guarded Queue move.
- [Handoff](../../HANDOFF.md): latest deployment and user test.

Sources under ui/server/app are the deployed integration snapshot. Group preview.html files elsewhere are historical visual mocks. Do not apply archived seven-check/read-only-only/informational-tile boundaries to the current preparation slice.

Use the supported Sites helper to open the authoritative source checkout, build and privately deploy. Install dependencies only when missing or changed. Required runtime variables/bindings are documented in BACKEND/CAPTURE; never store credentials here.

Controlled checks: node verify-assets.mjs, verify-projects.mjs, verify-prepare.mjs, verify-project-ui.mjs, verify-title.mjs, verify-layout.mjs, verify-backend.mjs, verify-capture.mjs and verify-state.cjs. Use the production build helper. These tests do not prove real Google moves, archive contents, rendered accessibility or actual source captures.
