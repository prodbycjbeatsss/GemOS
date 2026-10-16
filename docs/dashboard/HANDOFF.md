# GemOS dashboard — current handoff

Updated 16 October 2026. Read AGENTS.md, docs/dashboard/README.md, docs/DESIGN_SYSTEM.md, docs/DESIGN_TOKENS.md and the affected group's specification/usage/components. Earlier handoff: [archived checkpoint](../../archives/dashboard/2026-10-15/pre-source-reconciliation/HANDOFF.md).

## Deployment and source authority

Live: https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site/

Private Site version77: `appgprj_6ac84c21e1fc819198906084958537b0~appgver_8fd211e428208191801de97660217510`; source `dc826293ef091983d36ee61d326c922bdd5cb4b8`; deployment `appgdep_6ad29a2e042c8191b81baf2eb93c9147`, succeeded16October2026 at21:42UTC. Runtime revision6/private audience retained. Version75 introduced read-only Release Buffer; version76 was the first separate Planner prototype.

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

## Release Planner — revision delivered16October2026

Separate owner-protected /planner page. Full available screen width, no release-summary box/sidebar or phone-style frame, one selector group below Week/Month/Year, four independent YouTube/YouTube Shorts/TikTok/Instagram Reels filters and coloured native logos. Soft dark/light modes retain GemOS typography/materials; existing dashboard cards stay unchanged.

YouTube schedule is the default source and reads the same saved report as Release Buffer through GET /api/youtube/schedule. It makes no new provider request/run or write. Source timestamp, disconnected/not checked/channel-choice/empty/errors and retained stale results are explicit. Unknown format/processing stays Unverified; expired timestamps stay Stale. Lost access/channel mismatch clears records. Real upload IDs link to YouTube; no title/date-based project association or readiness inference.

Example plans is separate and labelled, with19 entries/week and in-memory unfinished drafts. All examples are Planned only. Manual status editing/“Preview status” are removed. Details show Asset readiness: Not checked until explicit project association exists. Shared wording is in [glossary.md](../../glossary.md); [specification](planner/SPECIFICATION.md) and [runtime contract](integration-tests/youtube/PLANNER.md) are current.

Inline-script/shared-GET fixtures, four independent filters, source isolation, safe titles/links, cadence/drafts/dialogs/themes and source-token4.5:1 text contrast pass. Existing scheduling backend checks, production build and compiled owner200/unauthorised401 checks pass. Supported browser/device QA remains unavailable; no actual owner-cache/live-provider comparison is claimed. Saved plans and explicit project/asset/upload associations remain next.

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

## Next work

CJ confirmed Settings → Publishing for default platform times/timezone, per-post planned overrides and shared settings/project/post records across calendar, dashboard and future scheduler. Defaults apply to new plans; existing-plan changes are explicit; already scheduled posts require separately confirmed provider rescheduling. No actual clock times are agreed.

Read [Calendar integration map](planner/INTEGRATION-MAP.md) before implementation. Code review identifies per-project readiness reads, reviewed metadata authority, private artwork/media delivery and exact provider IDs as concrete dependencies. youtube_release_selections is analytics selection, not a plan table. Do not repurpose it or mutate dashboard selected_id to render the calendar.

1. First build: owner-private Settings → Publishing, then persistent release/post plans and calendar timing edits.
2. Link shared project/readiness/metadata/artwork and exact upload identities; add published history/per-post reporting next.
3. Build the upload scheduler only after real media/provider permissions and job/retry/reschedule design. Existing five-minute job checks statistics; it does not upload.
4. Optional dated finance/newsletter layers follow core planning. Payhip store/licence work stays parked; no invented source evidence. Retain all accepted analytics/Sync-all behaviour and existing security/snapshot invariants.

Preserve existing credentials/scopes, owner records, immutable snapshots, saved subscriptions and historical failures. Detailed source contracts retain the distinctions between real zero, unavailable, partial, failed and stale data.
