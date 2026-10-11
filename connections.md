# Connections registry

Updated 11 October 2026. Separate application integrations from tools available to an assistant. Older setup reports are in archives/dashboard; saved credentials alone do not prove source access.

| System | Current application status | Evidence / next verification |
|---|---|---|
| Google Drive | Saved metadata reads, stage discovery, per-project scans and reviews; guarded Queue move implemented with optional metadata-edit scope | CJ supplied stage setup and Gelato 41 4/8 scan screenshots; new consent, complete-project move and computer sync pending. See PROJECTS. |
| YouTube Data/Analytics | Shared encrypted saved Google connection; selected Shorts reports; independent release batch and protected capture writer | Successful imports reported and Scheduler endpoint calls verified; exact Studio/whole-channel coverage and real first qualifying capture pending. See STATUS/CAPTURE. |
| GitHub | Connected assistant tools for repository review and authorised updates | Working repository reads/commits; not a GemOS visitor feature. |
| TikTok / Instagram | Intended short-form analytics and scheduling sources | Real API access, coverage and confirmations not verified. |
| Scheduling / publication | No authoritative release/platform scheduling connection chosen | Needed for real Buffer coverage, publication and Released moves. Queue placement is not scheduling. |
| Notion | Wider catalogue candidate / previously reported setup | Not selected as authority for current D1 project/review store; no new Notion import established. |
| Payhip | Private account-owned key/target setup and prospective paid/refunded ingestion implemented; separate receiver public with CJ’s approval; dashboard private | First £0 coupon provider notification verified; prospective reporting/mapping/test exclusions implemented. Repeat checkout needed for variation identity; paid processing/refund/fulfilment remain unverified. See PAYHIP. |
| PayPal | No direct GemOS integration | Payhip may process payment methods; this is not a separate verified payment connection. |
| Calendar / Gmail | Wider planning/communication candidates | No current GemOS connection test; external sending requires explicit authorisation. |

Activepieces remains an optional workflow-engine candidate. Five-minute Google Cloud Scheduler currently calls the protected YouTube capture endpoint; it does not move folders, discover releases or publish content.

[Project and permission contract](docs/dashboard/integration-tests/youtube/PROJECTS.md) · [Current analytics/capture status](docs/dashboard/integration-tests/youtube/STATUS.md). Google metadata-edit permission is requested only through Enable folder moves, not silently granted.
