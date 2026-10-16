# GemOS dashboard — current handoff

Updated 16 October 2026. Read AGENTS.md, docs/dashboard/README.md, docs/DESIGN_SYSTEM.md, docs/DESIGN_TOKENS.md and the affected group's specification/usage/components. Earlier handoff: [archived checkpoint](../../archives/dashboard/2026-10-15/pre-source-reconciliation/HANDOFF.md).

## Deployment and source authority

Live: https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site/

Private Site version76: `appgprj_6ac84c21e1fc819198906084958537b0~appgver_74c208642d548191806ecb495221723f`; source `190379ae2febceae30f82a93e7862b3d05b1fc35`; deployment `appgdep_6ad0facae84481919588d0497c2c289f`, succeeded 15 October 2026 at 16:10UTC. Runtime revision6 and private audience retained. Version75 introduced the separate read-only Studio Release Buffer.

Previous version74 reconciliation: [pre-schedule handoff](../../archives/dashboard/2026-10-15/pre-youtube-schedule/HANDOFF.md). Existing credentials/scopes/tables/owner data are preserved.

## Current groups

| Group / route | Current behaviour |
|---|---|
|1 Release /checklist|Two blue/state 920px Large cards. Eight Drive asset checks, preparation, discovery and explicit guarded Queue movement. Release Buffer reads YouTube Studio's seven-upload UK-week schedule. No automatic publish/archive.|
|2 Audience & Performance /|Three purple 920px Large cards: 2.1 channel-wide Shorts; 2.2 Weekly Shorts; 2.3 Mailchimp Email List. Monthly newsletter reporting only; no sending.|
|3 Finance /commerce|Four green 454px Compact cards: Payhip Sales, YouTube Earnings, YouTube Payouts, manual Subscription Costs. 2×2 desktop. /costs remains authenticated 303 redirect.|
|4 Automations /automations|One cobalt 920px Large Automation Performance card with nine status tiles, individual Sync, sequential Sync all, attention/history, safe checker retry and reasoned dismissal.|

## YouTube schedule connection —15October2026

Release Buffer now reads YouTube Studio. A complete UK week needs one main video Monday and one Short each day Tuesday–Sunday. Buffer coverage uses seven YouTube uploads only. The separate Planner prototype below has19 planned platform entries; TikTok/Reels are not claimed as scheduled. Check12 full weeks from next Monday (today if Monday), count consecutive complete weeks, stop at first gap. Later complete weeks remain visible but do not extend coverage.

Only future private status.publishAt is scheduling evidence. Owned duration/dimensions/rotation establish main/Short format, with succeeded processing; unknown format/processing stays unverified/partial. Titles do not establish remix affiliation. Wrong-day/duplicate uploads, planned dates and Drive readiness cannot fill missing slots. A successful empty scan can show zero; a provider failure retains saved data.

Source Sync and Automation1.1/Sync all use the same fixed GET-only provider import under existing permissions and tables. Cached GET restores owner/channel/revision/current-anchor reports without provider work or run creation. Headline shows Covered until <last complete Sunday> or No complete weeks; source states remain distinct. Recess shows nearby weeks and n/7/missing days. Native Buffer details shows all12 weeks and day-level actual uploads/times/links. Multiple owned channels require source selection. Shared timestamp sits below Sync. Material and paired920px geometry stay unchanged.

See [schedule contract](integration-tests/youtube/SCHEDULE.md). New coverage/UI tests plus affected sync/checklist/analytics/capture/monitoring/Automation/shell/group/dialog/geometry/Drive regressions, production build and compiled200/401 checks pass. First live owner schedule comparison and rendered phone/accessibility checks remain pending. No upload, schedule-write or publication action is added.

## Release Planner prototype — 15 October 2026

Separate owner-protected page: https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site/planner. Source: [planner.html](integration-tests/youtube/ui/planner.html); [specification](planner/SPECIFICATION.md); [implementation/evidence](integration-tests/youtube/PLANNER.md).

One main YouTube remix on Monday, then Tuesday–Sunday each have three separate entries: YouTube Shorts, TikTok and Instagram Reels (19/week). Cards show thumbnail, title, status and time, with named platform tints; no avatars or comment controls. Today and Week/Month/Year navigation, platform filters, desktop week columns and mobile week strip/selected-day agenda are implemented. Shared GemOS typography, radii, spacing and glass/recess treatment are reused with documented planner-only soft navy and mist themes; neither uses pure black or white. The switch remembers only theme preference.

Three fictional releases demonstrate the views. Add release generates an in-memory weekly plan, prevents duplicate weeks and accepts an unfinished working title. Post details allow preview-only status changes. A persistent notice states that changes reset on reload. No saved projects, Drive imports, actual schedule matching, provider writes, uploads or publication are added. Example status is not provider evidence.

Controlled inline-script interaction tests pass (cadence, navigation, filters, draft validation, literal text handling, dialogs and theme persistence). Source-token contrast checks pass at4.5:1 for normal/secondary/platform text in both themes, including tinted hover states. Production build and compiled owner200/unauthorised401 checks pass for Planner and existing routes. Rendered desktop/phone, focus, enlarged-text and actual composited contrast checks remain outstanding; no browser/device QA is claimed.

## Audience changes already delivered

2.1 now queries all channel Shorts, rather than a 1–5-video sample. Official YouTube creatorContentType classification is handled case-insensitively. Range options are 7/28/90/365 days; source periods use Pacific reporting dates. Views, signed Likes, Subscribers gained and Shares are summed only from Shorts rows; Average percentage viewed is Google's period aggregate. Top Shorts shows up to three titles and period views. Ranking failure preserves aggregate metrics. Original metric tile layout was restored after CJ requested it. Missing sources/metrics remain unavailable; no fabricated growth/coverage. See [CHANNEL-SHORTS](integration-tests/youtube/CHANNEL-SHORTS.md).

2.2 discovers uploads by Monday–Sunday UK publication week, with current week/default and up to 52 prior weeks. Titles need not match the remix; no remix relationship is inferred. Headline is total current cumulative views for confirmed/format-eligible Shorts published in that week. Each row shows current views and competition ranking (ties share a place). Unknown classification stays pending/unranked; missing confirmed counts make the total unavailable. This is not a count of views earned only during the selected week. Immutable qualifying 24h–24h15m snapshots remain in details/checker, without backfill. Legacy selected-release data remains preserved. See [WEEKLY-SHORTS](integration-tests/youtube/WEEKLY-SHORTS.md).

Both cards persist owner-scoped reports and restore truthful saved dates. Source Sync and Automation Sync use the same services, independently of each other's selections. No new scopes or schema change was required for these reporting changes.

## Shared design and sync

All normal Large cards are 920px; Finance Compact is 454px. Two Compact plus the 12px row gap equal one Large. Desktop column gap remains 20px. Group1's 12px row-gap correction is included. Shared 32px card/22px recess radii, 58px header glyph, 20/24px insets, Inter/Poppins, clipped beam and 44px action targets remain.

Automation inner tiles use three desktop/two phone columns, 20px plain icons, 12px titles/11px state/date, 8px padding/12px gaps. Earlier two-column/glass-tile notes are historical. Shared single-line UK timestamps with seconds sit beneath Sync; full date remains accessible. Manual Costs says Last saved; failure retains last success. See [source design check](integration-tests/youtube/DESIGN-SYSTEM-CHECK.md).

Sync all runs supported data refreshes sequentially, guards duplicates and continues after failures. It never publishes, schedules, approves/moves releases, sends emails, purchases or changes manual records. Status/history reads create no runs. Uploads, memory imports and public Payhip receiver processing are not fully monitored.

## Acceptance and verification

CJ's later chat reports Sync all and uniform timestamps pass, channel-wide Shorts works with an accepted roughly 10–15-view Studio difference, and weekly discovery/current totals/per-upload views/ranks work. This user acceptance must not be reset because an older document says pending. The reason for the Studio difference has not been established.

Fresh controlled checks run during reconciliation: verify-channel-shorts.mjs, verify-weekly-shorts.mjs, verify-sync-times.cjs, verify-card-sync.mjs, verify-sync-controls-ui.cjs, verify-state.cjs, verify-automations.mjs and verify-capture.mjs — all pass. These cover reporting/classification/date boundaries, cache and state retention, timestamps, safe sync controls, owner/origin validation and immutable snapshot behaviour. That earlier source reconciliation has now been followed by the schedule feature, production build and compiled authentication checks described above. No live owner schedule-provider query or rendered/device audit was performed.

## Continuation review — 16 October 2026

Current Planner inline-script and source-token contrast checks pass again. Supported browser control is unavailable in this managed environment, so rendered layout, actual focus traversal/touch targets, text scaling, fonts and composited contrast remain unmeasured. No app code, deployment or owner data changed during this review. The current [plan](PLAN.md#planner-review-checkpoint--16-october-2026) now contains the focused phone/desktop review steps and removes stale top-level wording that the calendar prototype was unimplemented. CJ's instruction to continue is not visual acceptance; saved-plan implementation remains next after that review.

## Next work

1. Continue from this reconciled source; do not rebuild accepted analytics/automation features or request the same confirmations again.
2. Review /planner on phone and desktop in both themes, including Week/Month/Year, filters, post details and a draft release. Then refine the accepted layout and implement owner-scoped saved plans before Drive readiness and explicit YouTube matching. Real planning persistence and Publishing Cadence remain unimplemented. CJ currently has no scheduled uploads/full project; defer the Buffer/Studio live comparison until genuine uploads exist.
3. Keep genuine remaining evidence gaps scoped: full two-project Drive/move/device checks; real qualifying 24-hour snapshot; genuine Payhip paid/refund/licence-contract verification; populated YouTube payment-history/account pairing; TikTok/Reels access; enlarged text/contrast/Android Back.
4. Expand automation monitoring only when real upload/receiver/memory workflows exist. Shared AI memory remains future work rather than an implemented integration.

Preserve existing credentials/scopes, owner records, immutable snapshots, saved subscriptions and historical failures. Detailed source contracts retain the distinctions between real zero, unavailable, partial, failed and stale data.
