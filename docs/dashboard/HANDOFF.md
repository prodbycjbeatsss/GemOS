# GemOS dashboard — current handoff

Updated 15 October 2026. Read AGENTS.md, docs/dashboard/README.md, docs/DESIGN_SYSTEM.md, docs/DESIGN_TOKENS.md and the affected group's specification/usage/components. Earlier handoff: [archived checkpoint](../../archives/dashboard/2026-10-15/pre-source-reconciliation/HANDOFF.md).

## Deployment and source authority

Live: https://gemos-youtube-import-test.prodbycjbeatsss.chatgpt.site/

Confirmed successful Site version **74**: `appgprj_6ac84c21e1fc819198906084958537b0~appgver_5e8927e61b2c8191b511577c529b5123`.
Source: `14101e638b8bdef89f031fa380af697a0837a9a1`.
Deployment: `appgdep_6acfee28dfe08191982c65dbc9f0900b`, succeeded 14 October 2026 at 21:03:54 UTC; runtime environment revision 6.

The GitHub checkpoint previously stopped at 19dff15 and the earlier Large/Sync-all implementation. This reconciliation mirrors the newer application source under integration-tests/youtube and updates its contracts. Private report seeds, temporary screenshots and unused starter UI examples are excluded. Existing GitHub-only integration documentation and prior applied migrations are retained. This is a repository save, not a new deployment or provider/account change.

## Current groups

| Group / route | Current behaviour |
|---|---|
|1 Release /checklist|Two blue/state 920px Large cards. Eight Drive asset checks, preparation, discovery and explicit guarded Queue movement. Release Buffer has no authoritative scheduling source. No automatic publish/archive.|
|2 Audience & Performance /|Three purple 920px Large cards: 2.1 channel-wide Shorts; 2.2 Weekly Shorts; 2.3 Mailchimp Email List. Monthly newsletter reporting only; no sending.|
|3 Finance /commerce|Four green 454px Compact cards: Payhip Sales, YouTube Earnings, YouTube Payouts, manual Subscription Costs. 2×2 desktop. /costs remains authenticated 303 redirect.|
|4 Automations /automations|One cobalt 920px Large Automation Performance card with nine status tiles, individual Sync, sequential Sync all, attention/history, safe checker retry and reasoned dismissal.|

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

Fresh controlled checks run during reconciliation: verify-channel-shorts.mjs, verify-weekly-shorts.mjs, verify-sync-times.cjs, verify-card-sync.mjs, verify-sync-controls-ui.cjs, verify-state.cjs, verify-automations.mjs and verify-capture.mjs — all pass. These cover reporting/classification/date boundaries, cache and state retention, timestamps, safe sync controls, owner/origin validation and immutable snapshot behaviour. No application code was changed for this source save. No new production build, provider fetch or rendered browser/device audit was performed during reconciliation.

## Next work

1. Continue from this reconciled source; do not rebuild accepted analytics/automation features or request the same confirmations again.
2. Resolve the Release Buffer's authoritative scheduling source with CJ before implementing scheduling/publication. Publishing Cadence remains unimplemented; no extra placeholder card is authorised.
3. Keep genuine remaining evidence gaps scoped: full two-project Drive/move/device checks; real qualifying 24-hour snapshot; genuine Payhip paid/refund/licence-contract verification; populated YouTube payment-history/account pairing; TikTok/Reels access; enlarged text/contrast/Android Back.
4. Expand automation monitoring only when real upload/receiver/memory workflows exist. Shared AI memory remains future work rather than an implemented integration.

Preserve existing credentials/scopes, owner records, immutable snapshots, saved subscriptions and historical failures. Detailed source contracts retain the distinctions between real zero, unavailable, partial, failed and stale data.
