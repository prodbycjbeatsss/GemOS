# GemOS — current implementation plan

Updated16October2026. Current source/acceptance: [HANDOFF](HANDOFF.md). Wording: [glossary.md](../../glossary.md).

## Completed and accepted

- Four-group placement: Release; Audience & Performance including Email; Finance including manual Costs; Automations.
- Large 920px/Compact 454px sizing, 12px row/20px desktop column spacing; latest source alignment corrections.
- Automation status grid, individual Sync, sequential Sync all and shared single-line timestamps.
- 2.1 channel-wide Shorts reporting, original metric tiles and period-specific Top3 Shorts.
- 2.2 UK-week upload discovery, current cumulative total/per-video views and ranked places. Legacy snapshots remain preserved.

CJ reports the latest functions work. Do not repeat implementation or reset that acceptance. See the handoff for exact source/version and evidence limits.


## Delivered — Planner revision, 16 October 2026

Private version77, source `dc826293ef091983d36ee61d326c922bdd5cb4b8`, deployment `appgdep_6ad29a2e042c8191b81baf2eb93c9147` succeeded21:42UTC. Runtime revision6/private audience preserved.

Full-width responsive workspace, no release-summary box/sidebar, selectors below Week/Month/Year, separate YouTube/Shorts/TikTok/Reels filters, coloured native logos, soft dark/light themes and read-only post details are implemented. “Preview status” and manual status edits are removed.

Default source reads the same saved YouTube schedule as Release Buffer through its existing GET endpoint, with visible freshness, independent format filters, unverified/stale/error/empty states and access-loss clearing. No new provider calls, scopes, schema or scheduling writes. Separate Example plans retain the19-entry weekly demonstration, all Planned only. No fake project association or file-readiness result.

## Next sequence — confirmed direction16October2026

Code-grounded dependencies and all dashboard connections: [Calendar integration map](planner/INTEGRATION-MAP.md). Main Settings → Publishing and shared plan ownership are confirmed; actual default times remain unset.

1. Build owner-private Settings → Publishing: Europe/London timezone and four platform default times, saved per owner. Defaults affect new plans only; explicit apply-to-existing excludes platform-scheduled posts.
2. Add durable release/post records, unfinished working titles, one release/week,19 intended posts and per-post time overrides; connect calendar editing with revision checks.
3. Link owned project folders and per-project saved readiness without changing dashboard selection; reuse reviewed metadata, artwork references, ordered clips and queue evidence. Implement real private artwork delivery separately from metadata IDs.
4. Add explicit owned upload associations, publication history and relevant performance/24h details; extend Automation context without changing existing reporting scopes.
5. Build a verified upload scheduler one provider at a time after media/permissions/runtime design. It consumes the same saved posts; provider-confirmed facts remain separate and rescheduling requires explicit action.
6. Add optional subscription/newsletter/payment history layers where dates are meaningful. Payhip store/licence work stays parked. Never force non-event metrics into the calendar.

Visual/device checks remain open and should accompany each slice; they do not require repeating accepted analytics or waiting for real uploads before building Settings/saved unfinished plans.

## Validation

verify-planner.cjs:19-entry cadence, four independent filters, source isolation, navigation, theme-only persistence, literal titles, unfinished drafts, date/duplicate guards, read-only dialogs and shared-cache GET fixtures. Scheduling fixtures cover UK slots/DST, processing, auth, disconnect fencing and provider read-only behaviour. Production build/compiled owner200/unauthorised401 checks pass. Text contrast source-token checks pass including all four tint/hover combinations; actual compositing, fonts, geometry, touch targets and Android Back remain unverified.

No full project or scheduled uploads are currently available from CJ. Do not invent source evidence or request the same accepted analytics/automation checks again. Current scope: [Planner specification](planner/SPECIFICATION.md) / [runtime contract](integration-tests/youtube/PLANNER.md).
