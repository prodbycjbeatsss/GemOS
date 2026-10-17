# GemOS — current implementation plan

Updated17October2026. Current source/acceptance: [HANDOFF](HANDOFF.md). Wording: [glossary.md](../../glossary.md).

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

## Delivered — Publishing settings and saved plans,17October2026

Private version78, source `877cf52f41c55747c91fab8a3b9bb3b68c6ca595`, deployment `appgdep_6ad359c1ac648191a93c56ecbcf58521` succeeded17October at11:19UTC. Existing private audience/runtime revision6 retained.

Settings → Publishing (/settings) saves four initially blank platform times with Europe/London timezone. Defaults affect new plans only; Review plan changes previews an explicit apply to eligible existing planned posts, excluding personal overrides/platform-linked records. No actual defaults were guessed.

My plans is the default calendar source. Add release saves an unfinished title and Monday week plus19 stable post IDs. Version79 supersedes the original calendar editing controls: post details show timing read-only and link to Settings. Existing post dates/times, overrides and whole-week moves are editable only in Settings → Publishing → Individual planned posts. Calendar retains new-plan creation and working-title editing. Reload/new clients restore saved plans. Examples and actual YouTube source evidence remain separate.

The storage uses two additive D1 tables with generated migration/snapshot/journal. Plans are a bounded owner catalogue (104 active weeks), atomic revision-checked writes and stable per-release/post IDs/revisions. A settings change during a plan write is fenced by the same SQL operation. Browser storage keeps only theme preference.

## Settings-only timing — confirmed/delivered17October2026

Private version79, source `c2f0d30d58d3caa3cc676f813d1f3d6bca802d3c`, deployment `appgdep_6ad36d0c859881919f30dbebdcac534b` succeeded12:42UTC; private audience/runtime revision6 retained. All existing post date/time and whole-release-week controls are in Settings → Publishing. Calendar saved-post details are read-only with a direct selected-post Settings link. A working-title edit in Calendar keeps the stored week even if its disabled field is manipulated. Examples have no visible clock-time input.

Real UI/API fixtures cover read-only Calendar, correct selected-post deep links, Settings saves/reload, stale Settings conflicts, override preservation/default apply and Settings-only week moves. Production/compiled owner200/401 and Planner checks pass. No schema/provider/uploader changes or rendered/live-account acceptance claimed.

## Next sequence

1. CJ sets the four default times in Settings → Publishing and creates an unfinished test release in Calendar → My plans. Verify save/reload, one post override in Settings and both themes on phone/desktop; no actual upload or full project is needed.
2. Link owned project folders, per-project saved readiness, reviewed metadata, artwork/private image delivery and ordered media IDs. Read project-specific state without changing dashboard selection.
3. Add exact owned upload associations and published history/per-post metrics; preserve existing Buffer/analytics meanings.
4. Build the upload scheduler only after provider/media/permissions design; it consumes these saved posts. Explicit platform rescheduling is separate from intended-time editing.
5. Optional dated finance/newsletter layers follow core planning. Payhip store/licence work stays parked. Real Buffer/24h evidence waits for uploads.

Complete connection map: [INTEGRATION-MAP](planner/INTEGRATION-MAP.md). Steps1–2 of that build sequence are implemented; project/media associations remain next.

## Validation

New checks: verify-publishing.mjs (real SQLite/handlers, persistence, owner/origin/input guards,19 slots, overrides, rename/week shift, default preview/apply, stale revisions/settings races and GMT/BST missing/repeated hours); verify-publishing-ui.mjs (real UI script against actual handlers: fresh-client reload, save/conflict/apply, theme-only storage and no provider calls). Both pass. Updated compiled settings/script/CSS private200/401 checks pass, as do production build, Planner and group-navigation regressions. The CSS route initially failed due to framework CSS wrapping; raw text import fixes it and compiled response checks cover it. No rendered browser/device or owner live save is claimed.


verify-planner.cjs:19-entry cadence, four independent filters, source isolation, navigation, theme-only persistence, literal titles, unfinished drafts, date/duplicate guards, read-only dialogs and shared-cache GET fixtures. Scheduling fixtures cover UK slots/DST, processing, auth, disconnect fencing and provider read-only behaviour. Production build/compiled owner200/unauthorised401 checks pass. Text contrast source-token checks pass including all four tint/hover combinations; actual compositing, fonts, geometry, touch targets and Android Back remain unverified.

No full project or scheduled uploads are currently available from CJ. Do not invent source evidence or request the same accepted analytics/automation checks again. Current scope: [Planner specification](planner/SPECIFICATION.md) / [runtime contract](integration-tests/youtube/PLANNER.md).
