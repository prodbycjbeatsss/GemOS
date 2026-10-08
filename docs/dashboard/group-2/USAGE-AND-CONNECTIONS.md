# Group 2 — usage and connections

Updated 8 October 2026. Current visual reference: [preview.html](preview.html). Visual rules: [SPECIFICATION.md](SPECIFICATION.md). API evidence: [ANALYTICS-FEASIBILITY.md](../ANALYTICS-FEASIBILITY.md). No live imports are implemented.

## 2.1 Short-form performance

Purpose: understand performance and view targets across YouTube Shorts, TikTok and Instagram Reels. Snapchat and YouTube long-form are excluded.

Scope confirmed again on 8 October: 2.1 is the overall short-form view, while 2.2 remains one release batch. It is not a calendar-month report and 2.1 does not follow the selected leaderboard batch.

Period: rolling last 28 days versus the preceding non-overlapping 28 days, advanced with the latest complete imported day. Use activity during the reporting period, not lifetime totals for posts published during that period. Source date boundaries, weighting and cross-platform coverage still need validation.

### Current metric choices

These are the accepted design choices, still subject to real API validation. CJ approved Likes to replace YouTube Stayed to watch on 8 October; CJ subsequently confirmed audience-growth tiles across all platforms: Subscribers gained for Shorts and Followers gained for TikTok/Reels. This supersedes the TikTok Comments replacement. Unsupported imports show unavailable; there is no automatic replacement. Preview updates are queued until remaining decisions are settled.

| Selection | Four tiles |
|---|---|
| All | Shorts views; TikTok views; Reels views; combined shares |
| Shorts | Average percentage viewed; likes; subscribers gained; shares |
| TikTok | Average watch time; watched full video; followers gained; shares |
| Reels | Average watch time; shares; followers gained; saves |

Main views count uses the selected platform or sum of available platforms; combined plays are not unique people. Target is editable per platform; All sums targets. Growth uses the previous matched window. No forecasting, velocity or unsupported On track claim.

Missing is not zero. Partial totals identify missing sources; combined growth and target status stay hidden until required coverage is complete. Combined shares need matching periods/scopes. Do not combine incompatible watch percentages or compute unweighted averages of percentages.

### Connection contract

| Source | Intended use | Verification status |
|---|---|---|
| YouTube Analytics/Data APIs | Selected-period views, supported watch/engagement metrics and post IDs/counts | Documentation reviewed; authorised real query not tested. Stayed to watch has no established standard metric in the review. |
| TikTok approved APIs | View/share counts; business watch/completion metrics where available | CJ is fairly sure the account is Business; verify account/access. Per-clip followers and selected-period coverage remain unverified. |
| Meta Insights | Reels engagement/watch fields where supported | Creator/Business account type is provisional. Specific media/period and follower attribution need real-query validation. |
| GemOs records | Targets, comparisons, partial coverage and freshness | Example calculations in HTML only; real records/backend not built. |

Start with direct APIs. No paid analytics service is selected. A successful import must include source, scope, period and data-through time. Manual Sync should preserve cached results and report success/error; it must not imply real-time source data.

## 2.2 Shorts leaderboard

Purpose: compare individual platform uploads within a release batch. All ranks uploads together; the same source clip can appear for multiple platforms. Platform view definitions differ.

### Confirmed snapshot decision

- Capture a cumulative view snapshot around each upload's 24-hour mark; record actual publication/capture times, source and completeness, then freeze it.
- Rank only once the upload is at least 24 hours old and a valid snapshot has been imported. Missed captures remain unranked. A later lifetime total cannot replace a missed snapshot under a 24-hour label.
- Newer uploads remain below ranked rows, muted but readable, with age/live count. Completed uploads awaiting a usable snapshot also stay unranked.
- Provisional capture window approved on 8 October: aim for publication +24 hours; accept a usable capture from 24:00 through 24:15 inclusive. Validate with real imports before locking this tolerance. If failures are too frequent, review widening it with CJ; never widen silently. Heading and subtitle confirmed: Shorts Views (24hrs), then Snapshot taken at 24h · up to 15 min later, then the selected batch date range with year (example: 6–11 October 2026). Actual capture age appears in clip details. The preview update is queued; example counts do not prove exact data capture.
- Bars compare captured views with the selected-tab leader. No bar for unranked uploads; no rank-change or algorithm-causation claims.

A backend scheduler is intended for dependable captures. Activepieces is optional, only if it saves work; custom scheduler and hosting are undecided. Test a small real import before building the full scheduler.

### Batch and review behaviour

Batch picker identifies artist/track; date line shows Tuesday–Sunday range. Examples: Teeth & Claws 6–11 October; Air Max 90s 13–18 October 2026. These are not real scheduling records. Current illustrative leaderboard reference time is 11 October 2026, 18:00 UK; next batch is empty.

Monday batch review confirmed: once Sunday's last clip reaches 24 hours, notify CJ even if some usable snapshots are missing. Call it Batch review rather than Final leaderboard when incomplete. Rank valid snapshots and list unranked clips with their reason. Do not wait indefinitely for every capture, substitute later lifetime totals or imply complete results. Exact delivery time, retry/update behaviour and notification implementation are deferred until integration testing. No notification is implemented in HTML.

Clip details show exact stored values, publication time in Europe/London and capture/reporting status. Only use a real Watch clip URL when available; do not invent links.

## Shared source and action rules

Per-card Sync left, detail route right. Dashboard Sync all is planned; no extra group-level Sync. Current buttons show Not connected and perform no import.

Example views: 92,400 / 54,600 / 26,800 = 173,800; shares 1,260 / 840 / 420 = 2,520; targets 100,000 / 60,000 / 30,000 = 190,000. Current sample window: 7 September–4 October, versus 10 August–6 September. Previous views are illustrative, not external facts. Data is clearly labelled as examples.

## Next decisions

YouTube Likes replacement is approved. Audience-growth tiles are confirmed across platforms; verify clip-attributed follower reporting, period coverage and aggregation. Snapshot tolerance is provisionally 24:00–24:15, heading/subtitle and partial Monday review are confirmed. Verify account types and real API access. See [PLAN.md](../PLAN.md) and [HANDOFF.md](../HANDOFF.md) for approved fixes, queued changes and unresolved work. CJ approved the listed fixes; clarify only new or unsettled choices.
