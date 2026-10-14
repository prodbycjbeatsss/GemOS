# GemOS dashboard — current handoff

## Current compact2.1 summary — 14 October 2026

CJ's screenshot confirms live channel metrics now populate (199 views,107.42% average viewed,-2 Likes,0 subscribers,14 shares for28days). Studio agreement is not yet measured. CJ asks to remove unnecessary text and add the2–3 highest-viewed Shorts in the selected period.

Delivered: hidden above-card coverage box, repeated tile notes, duplicated data-through/status narrative and unused target/connection section. Exact source dates/warnings remain in Analytics details; one footer keeps Sync and timestamp. Existing purple Large920px material/geometry retained;2.1 metric rows are84px, label/value only.2.2 duplicate sync narrative is hidden; release/snapshot rules unchanged.

Top Shorts shows up to3 actual titles plus views earned in the exact selected date range. Fixed API request:video dimension,creatorContentType==shorts filter,views,-views,maxResults3; metadata uses validated owned IDs. No lifetime totals or publication-date cutoff. Ranking failure preserves channel aggregates and reports a concise unavailable state. Card Sync/Sync all return/save the same ranking. Tests cover filter/date/order/limit,title escaping,3-row UI,failure preservation and existing state/bulk flows. Build/compiled routes pass. Live ranking response and refreshed phone layout remain to verify.

Source `c25dc6b715cdd2255d50df0783256c61d928572d`; private deployment `appgdep_6acfdc6176108191ae7472edebd4a5ad` succeeded; runtime revision6 retained. Code/contract checkpoint remains in draft PR2. Earlier detailed2.1 presentation notes are superseded for the live card.

## Latest repair — 14 October 2026, 20:39 UK

CJ supplied a completed365-day2.1 response with unavailable figures and a2.2 July release with zero frozen snapshots.2.1's exact-uppercase content type matcher is replaced by case-normalised Shorts-only matching, supporting the `shorts` form documented by a primary API implementation as well as `SHORTS`. Long/live/unknown types remain excluded. Controlled fixtures verify both cases and source-row counts; the next owner Sync is required to verify the precise live response. The private cache now includes bounded returned content-type names and total/Shorts-row counts to diagnose any remaining mismatch without fabricated zeros. Stale Selected Shorts only heading changed to Channel-wide Shorts.

2.2 retains the explicitly selected July batch; no24-hour snapshots exist for those old uploads. Sync cannot reconstruct elapsed windows or replace frozen24h counts with today's lifetime totals. Feedback now states that limitation. Choose a newer release in its separate source setup when available.

Source `958e8a851b679137e7649f7e53772255c2e79b27`; private deployment `appgdep_6acfda4ce24c8191b989a2e0ff6bde16` succeeded; runtime revision6 retained. Provider-case/state/card-sync/capture/bulk-control checks and build pass. Live repaired2.1 figures and rendered all-state QA remain pending. GitHub checkpoint stays in draft PR2; main has not been updated.

## Current checkpoint — 14 October 2026, channel-wide 2.1

2.1 is now channel-wide YouTube Shorts, replacing the selected-sample test. Read [CHANNEL-SHORTS](integration-tests/youtube/CHANNEL-SHORTS.md), current Group2 spec/usage, then implementation `server/channel-shorts.mjs`, API route, `server/card-sync.mjs`, `ui/app.js`. Sole connected channel works without sample IDs. Normal Sync and Automation Sync all share the service; saved owner reports restore after refresh. 2.2 release selection/capture is unchanged. TikTok/Reels remain unavailable.

Source `adb46bc48e331c167b904887e856765427a900c8`; private deployment `appgdep_6acfd7e6fef08191871ecc76c5f09d1b` succeeded; runtime revision 6 preserved. The deployed source/code/tests are mirrored under the existing `docs/dashboard/integration-tests/youtube/` path. No extra source root, permissions or schema changes.

Automation tile styling from this chat is also checkpointed: smaller tiles, three columns at desktop/two on phones, centred plain 20px icons, 12px gaps/8px padding; Sync and Sync all use shared transparent 11px/600 text +16px stroke icon and44px targets. CJ accepted the appearance and reported other syncs working. This is user acceptance, not measured all-state/device QA. Manual Costs and unconnected scheduling are honestly skipped. Skipped/failed reasons remain on tiles. The earlier missing-sample Setup required rule is superseded by channel-only setup.

Validation: channel type isolation, pagination, real zero/signed likes, Google retention aggregate, missing values, owner/origin/date/input checks, fresh-date bulk sync, saved report isolation, failure retention, source UI/range/cache/spinner and2.2 regressions. Backend/capture/automation/monitoring/group-placement/shell/dialog and build/compiled200/401 checks pass.

**Next:** owner refreshes Audience & Performance → Sync2.1; verify a populated Shorts report/partial warning or exact error, its date range and matching Studio Shorts metrics. Then Automation Sync2.1/Sync all should record completion and last success. Real channel-wide provider response and rendered UI remain unverified. Scheduling1.1 remains unconnected; Publishing Cadence remains deferred. Earlier checkpoints below are history and must not override this scope.

Updated13 October2026 after approved regrouping. Start with AGENTS.md, dashboard README, DESIGN_SYSTEM/ DESIGN_TOKENS and the affected group's spec/usage/components. Prior lengthy checkpoint history is preserved at ../../archives/dashboard/2026-10-13/pre-regrouping/docs/dashboard/HANDOFF.md; it is superseded for current grouping.

## Current grouping — 13 October 2026

CJ approved moving Email List from Group3 to Group2 and Subscription Costs from Group4 to Group3, with destination size/colour rules. Group2 is **Audience & Performance**:2.1 Short-form performance,2.2 24-hour Shorts ranking,2.3 Email List; all purple Large920px. Group3 is **Finance**:3.1 Payhip,3.2 YouTube earnings,3.3 YouTube payouts,3.4 Subscription Costs; all green Compact454px. Finance is a2×2 desktop grid with12px vertical/20px horizontal gaps. No new standalone group. Group4 now has Automation Performance at /automations; Publishing Cadence remains unimplemented.

Email keeps its independent Mailchimp settings/reporting/member popup on /. Subscription costs keep manual saved histories/top-ups/logos/management on /commerce. API/storage/scopes unchanged. /costs is an authenticated303 redirect to /commerce. Historical IDs/colours below are superseded by this grouping; original mocks remain provenance.

## Deployment and scope

Source 8791d9c008663fbc88f7f254bcccdf0e1edd78f6; private deployment appgdep_6aceb52deacc8191adf1c1ba8cb3506a; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_f651fa447a448191b69c242527dda3f6; succeeded. Runtime environment revision 6 preserved. Sole-owner private. Existing Google,Mailchimp,Payhip credentials/settings and subscription records are unchanged. Public Payhip receiver access is unchanged. No new permissions, bank connection or provider-record rewriting. Automation monitoring adds two tables through a registered schema-only migration.

Live routes:Release /checklist,Audience & Performance /,Finance /commerce,Automations /automations. Old /costs redirects303 to /commerce after authentication. ui/costs.html moved to an explicit source archive; its scripts, model, logo assets and /api/costs remain in use on Finance. Mailchimp setup/card/dialog/script moved together to Audience. Analytics reflow stays scoped to its original two cards.

## Current groups

- Group1 Release:8 Drive asset checks/metadata preparation/Shorts-order review and explicit guarded Queue move. Buffer remains an honest no-schedule state until an authoritative scheduling source is chosen. No automatic publish/archive. Existing controlled checks pass; full real two-project/move/device verification remains pending. Read ASSETS/PROJECTS.
- Group2 Audience & Performance:2.1 selected-Shorts analytics,2.2 independent release ranking/qualifying24h–24h15 snapshots,2.3 Email List. All purple Large920px; Email uses matching174px header/recess/footer tokens on a new half-width desktop row, stacked on phone. Mailchimp reports current active contacts, selected-month activity and latest newsletter; read group-2/EMAIL-LIST.md. No newsletter sends. First real qualifying ranking/TikTok/Reels are unverified.
- Group3 Finance:3.1 Payhip,3.2 YouTube earnings(top3 period views/revenue),3.3 YouTube payouts(provisional compatible GBP balance + independent current-month estimate,conditional window/history),3.4 Subscription Costs(monthly-equivalent manual records/separate top-up purchases). All green Compact454px in a2×2 desktop grid. Costs management uses green material and preserves saved history/service picker. Read group-3/SUBSCRIPTIONS.md. Payhip coupon mappings/all3 tiers are user-verified; genuine paid/refund/contracts remain pending. AdSense balance access is user-verified; populated paid-history and account/channel pairing comparison remain limited.
- Group4 Automations: Automation Performance now lives at /automations, using cobalt Large920px. All-GemOS scope; dashboard sync adapters and the checker implemented. Attention-first card/history, context-bound safe retry and reasoned dismissal. Publishing Cadence remains unimplemented; no placeholder.

## Validation and next action

Group-placement/unique IDs/script/setup/dialog ownership, destination colour/size declarations, four-link navigation and old Costs redirect checks pass. Actual subscription form/persistence/history/date/logo/custom-picker checks, Mailchimp SQLite/encryption/API checks and existing Group1–3 security/state/reporting regressions pass. Production build and compiled authenticated200/unauthenticated401 handlers plus authenticated303 redirect pass. No supported browser QA; tests do not prove rendered alignment/contrast/Android Back/enlarged text or new live provider results.

CJ accepted the regrouped visual appearance in chat. This is user visual acceptance; it does not establish all-state accessibility, saved-record/connection or new live-provider verification. Next work is the approved Automation Performance scope and proposed first checker adapter, documented in group-4/USAGE-AND-CONNECTIONS.md.

Future Sync all at the combined dashboard top is approved direction only; source-specific retries remain. Never let Sync publish,schedule,approve or move releases. Preserve independent card selections and truthful missing/zero/partial data.

## Automation Performance — confirmed scope, 13 October 2026

CJ confirmed coverage of all GemOS automations. The headline counts unresolved failed or unconfirmed runs: “1 automation needs attention”, “No automations need attention” only after recorded runs with no unresolved issues, and “No automation runs yet” before any records. Needs-attention runs precede recent runs; the footer opens full history and filtering by automation.

A successful retry resolves only the issue linked to that retry's original run, after confirmed completion. Manual dismissal requires a recorded reason and retains the original failure in history. Retry is available only where duplicate external actions can be prevented and the specific operation is eligible; uncertain writes require reconciliation/details rather than blindly repeating them. Monitoring approval does not authorise new publication, purchase, notification or unattended folder moves.

Runtime/card implementation is now delivered; see group-4/USAGE-AND-CONNECTIONS.md. Publishing Cadence overlaps Group1 planning; no cadence-grid implementation is authorised by this discussion. Retain provisional numbering4.2 for Automation Performance for continuity; no empty4.1 card.

## Historical first implementation checkpoint

Durable automation run records and owner-only card/history are deployed. New migration:drizzle/0006_automation_runs.sql plus generated snapshot/journal; previous applied migrations unchanged. Source/checker updates are under integration-tests/youtube. Source 8791d9c008663fbc88f7f254bcccdf0e1edd78f6; private deployment appgdep_6aceb52deacc8191adf1c1ba8cb3506a; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_f651fa447a448191b69c242527dda3f6; succeeded. Runtime environment revision 6 preserved.

Controlled tests include partial owner failures, interruption recovery/fencing, selection-bound concurrent retry guards, linked resolution, dismissal audit, no-op/missed-window results, auth/origin/owner isolation, literal reason/stale UI/focus behaviour; snapshot and Group1/2 regressions, compiled200/401 and build pass. Sites service credential reads of new page/API returned401; owner session/live scheduled record and rendered QA were not verified.

Next: refresh the signed-in site, select Automations, inspect a new scheduled checker execution after it runs. Review card/mobile/dialog and enlarged text. Expand adapters with read-only Drive checks after that evidence; do not claim all automations monitored or scheduler uptime verified. Existing record preservation/provider verification limits still apply.

## Historical — per-card sync grid,14 October2026

CJ reports two visible run entries and explicitly requests other cards' syncs in the existing card, then a grid showing every card's sync status/last sync. Delivered responsive nine-card grid, latest attempt/retained last success/manual save timestamps, older unresolved issues, full history and expanded filters.11 registered operation types cover Drive checks/discovery/explicit Queue approval, logical Shorts analytics, release metadata/checker, Mailchimp, Payhip received-sales refresh, earnings/ranking and payouts. Buffer stays Not connected; Costs stays Manual records. No second card or monitoring-driven external action.

Source c07418cbc68fb5d37a6bbca9de9308c2694581e0; private deployment appgdep_6aced3aad67881918fc69f3fc1a22539; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_3e5404c6afec8191a983f23b603b5ae8; succeeded. Runtime environment revision6 retained. This is the latest deployed source/version, superseding the preceding deployment checkpoints above. Existing schema/scopes/credentials/records unchanged. Repeated automation page/API reads create no runs. Genuine source-card page-load fetches can create card-refresh records; exact original two entries were not examined/deleted. Analytics queries share one ordered trace; uncertain moves remain unconfirmed/non-retryable. Checker retry/dismissal remains intact.

All relevant controlled sync/grid/capture/security/Group1–3 regressions, production build and compiled200/401 pages pass. No rendered browser QA or newly instrumented live provider-read verification. Next: owner refreshes Automations, checks grid/scroll, performs normal source-card Sync and compares tiles/history. Expand receiver/upload/memory adapters only as those real sources become available. Current authority:group-4/USAGE-AND-CONNECTIONS.md.

## Historical Large card and data sync — 14 October2026

CJ explicitly requests shared Large sizing, smaller centred tile icons/text/status icons, per-tile Sync and a top Sync all. Delivered920px cobalt card; no second card. Existing32px card/22px recess/58px top glyph/20–24px insets retained;174px header,44px top sync track, flexible scroll recess and44px bottom footer. Enlarged header text can grow the card.

Nine compact centred two-column tiles:8px padding/gaps,28px glass icon/18px monochrome mark,11px name/10px status/date, status symbol plus wording,44px Sync/details controls. Latest attempt/duration remains in details. Older unresolved issues remain visible after newer success. Manual Costs shows Last saved; unconnected Buffer shows Not connected, both Sync-disabled.2.2 uses Last successful check; other sources show Last synced.

Sync all refreshes available data cards sequentially, guards duplicates and continues after failures; completed/partial/skipped/failed are separate. Bottom Refresh status only reads records. Source choices reuse last successful saved selections/periods; absent period defaults to the source's current month. Missing/multiple required channel/account/sample choices require source setup. Analytics can initialise from the same tab's previously confirmed sample, never2.2's independent release sample. It does not move/approve/publish/send/purchase/spend or rewrite manual records.

Source 4c5a7387e7352fe82f5b14604317fff3cdf41bf2; private deployment appgdep_6aced96e768881918b0c3d6e9a829474; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_5f6fa7750d3c8191ba376254f10694db; succeeded; runtime revision6 unchanged.

Controlled card-sync/control/automation/cache/security/provider/Group1–3 checks, production build and compiled200/401 pass. Actual Drive bulk fixture used only GET provider calls. Rendered phone/desktop/enlarged-text and owner live Sync all remain pending.

This is the latest implementation checkpoint and supersedes earlier deployment/Compact-size/monitor-only notes above. Registered0007_sync_targets/0008_analytics_sync_cache add owner selections and real2.1 cache; previous schemas/records/scopes unchanged. Source under integration-tests/youtube. New tests verify-card-sync.mjs/verify-sync-controls-ui.cjs and updated verify-state.cjs join the passing existing suite. Next owner acceptance: Large layout, centred compact tiles, one Sync then Sync all, truthful skips/partials/failures, saved2.1 restoration. No rendered/live all-source proof claimed.
