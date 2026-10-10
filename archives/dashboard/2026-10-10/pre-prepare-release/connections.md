# Connections registry

## Current Group 1 connection checkpoint — 10 October 2026

Google Drive metadata-read access is implemented on the shared saved Google connection; CJ's earlier screenshot verifies a hosted sample asset scan. Release-stage discovery and per-project scan persistence are now implemented/deployed with controlled tests. Stage folder links have not yet been supplied, so real discovery and computer-sync behaviour remain unverified. Configure In Production, optionally Release Queue and Released in the app; no new OAuth scope is needed for this slice. The existing D1 backend holds the current discovery/check catalogue. No new Notion connection is established and no full scheduling/publishing authority is claimed. Folder write permission, approval/move actions and platform scheduling/publication connections remain future work. See [project setup](docs/dashboard/integration-tests/youtube/PROJECTS.md).

The older registry below describes its dated review checkpoint.


Reviewed 8 October 2026. Distinguish this assistant's verified working-session tools from integrations implemented inside GemOs. A date, saved key or intended endpoint is not proof of successful access. Older reported setup is preserved in archives/dashboard/2026-10-08/connections-before-review.md.

| System | Purpose/route | Status | Evidence / next check |
|---|---|---|---|
| GitHub | Read and save project documents and card references through the connected GitHub tools | Verified in this working session; not a deployed GemOs feature | Successful repository reads and authorised commits on 8 October 2026. |
| YouTube Data/Analytics | Short-form reports and upload snapshots | Planned for Group 2; old registry reported setup but no successful analytics import verified here | Test authorised sample query; see docs/dashboard/group-2/USAGE-AND-CONNECTIONS.md. |
| TikTok APIs | Post counts; business watch metrics where eligible | Planned; Business account type provisional | Verify account/access and metric scope. |
| Meta/Instagram Insights | Reels analytics | Planned; Creator/Business account type provisional | Verify account/access, media metrics and periods. |
| Google Drive | Group 1 asset scan | Intended connection; old registry reported setup but no working scan verified here | Confirm folders, file matching, WIP rule and scan/freshness handling. |
| Payhip / PayPal | Sales and payment records | Reported in older setup; current access/import unverified | Confirm event ingestion, ledger reconciliation and authorisation before revenue integration. |
| Notion / local files | Wider catalogue, notes and release records | Reported in older setup; no Notion read verified in this review | Confirm authoritative release store before Group 1 implementation. |
| Google Calendar | Wider planning | Previously listed not connected; unverified now | No connection test performed. |
| Gmail | Wider communication | Previously listed not connected; unverified now | No connection test performed; sending requires explicit authorisation. |
| Meeting tools | Not required in the current solo workflow | Not selected | No connection needed merely for coverage. |

Activepieces is an optional workflow-engine candidate, not a connected analytics source or a chosen scheduler. No unattended 24-hour capture/import job is implemented. Live connections require successful read evidence, defined permissions, source/freshness metadata and visible failure handling before cards claim they are updated.
