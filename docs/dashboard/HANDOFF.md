# GemOS dashboard — current handoff

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
- Group4 Automations: Automation Performance now lives at /automations, reusing cobalt Compact454px. All-GemOS scope; dashboard sync adapters and the checker implemented. Attention-first card/history, context-bound safe retry and reasoned dismissal. Publishing Cadence remains unimplemented; no placeholder.

## Validation and next action

Group-placement/unique IDs/script/setup/dialog ownership, destination colour/size declarations, four-link navigation and old Costs redirect checks pass. Actual subscription form/persistence/history/date/logo/custom-picker checks, Mailchimp SQLite/encryption/API checks and existing Group1–3 security/state/reporting regressions pass. Production build and compiled authenticated200/unauthenticated401 handlers plus authenticated303 redirect pass. No supported browser QA; tests do not prove rendered alignment/contrast/Android Back/enlarged text or new live provider results.

CJ accepted the regrouped visual appearance in chat. This is user visual acceptance; it does not establish all-state accessibility, saved-record/connection or new live-provider verification. Next work is the approved Automation Performance scope and proposed first checker adapter, documented in group-4/USAGE-AND-CONNECTIONS.md.

Future Sync all at the combined dashboard top is approved direction only; source-specific retries remain. Never let Sync publish,schedule,approve or move releases. Preserve independent card selections and truthful missing/zero/partial data.

## Automation Performance — confirmed scope, 13 October 2026

CJ confirmed coverage of all GemOS automations. The headline counts unresolved failed or unconfirmed runs: “1 automation needs attention”, “No automations need attention” only after recorded runs with no unresolved issues, and “No automation runs yet” before any records. Needs-attention runs precede recent runs; the footer opens full history and filtering by automation.

A successful retry resolves only the issue linked to that retry's original run, after confirmed completion. Manual dismissal requires a recorded reason and retains the original failure in history. Retry is available only where duplicate external actions can be prevented and the specific operation is eligible; uncertain writes require reconciliation/details rather than blindly repeating them. Monitoring approval does not authorise new publication, purchase, notification or unattended folder moves.

Runtime/card implementation is now delivered; see group-4/USAGE-AND-CONNECTIONS.md. Publishing Cadence overlaps Group1 planning; no cadence-grid implementation is authorised by this discussion. Retain provisional numbering4.2 for Automation Performance for continuity; no empty4.1 card.

## Latest implementation checkpoint

Durable automation run records and owner-only card/history are deployed. New migration:drizzle/0006_automation_runs.sql plus generated snapshot/journal; previous applied migrations unchanged. Source/checker updates are under integration-tests/youtube. Source 8791d9c008663fbc88f7f254bcccdf0e1edd78f6; private deployment appgdep_6aceb52deacc8191adf1c1ba8cb3506a; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_f651fa447a448191b69c242527dda3f6; succeeded. Runtime environment revision 6 preserved.

Controlled tests include partial owner failures, interruption recovery/fencing, selection-bound concurrent retry guards, linked resolution, dismissal audit, no-op/missed-window results, auth/origin/owner isolation, literal reason/stale UI/focus behaviour; snapshot and Group1/2 regressions, compiled200/401 and build pass. Sites service credential reads of new page/API returned401; owner session/live scheduled record and rendered QA were not verified.

Next: refresh the signed-in site, select Automations, inspect a new scheduled checker execution after it runs. Review card/mobile/dialog and enlarged text. Expand adapters with read-only Drive checks after that evidence; do not claim all automations monitored or scheduler uptime verified. Existing record preservation/provider verification limits still apply.

## Latest — per-card sync grid,14 October2026

CJ reports two visible run entries and explicitly requests other cards' syncs in the existing card, then a grid showing every card's sync status/last sync. Delivered responsive nine-card grid, latest attempt/retained last success/manual save timestamps, older unresolved issues, full history and expanded filters.11 registered operation types cover Drive checks/discovery/explicit Queue approval, logical Shorts analytics, release metadata/checker, Mailchimp, Payhip received-sales refresh, earnings/ranking and payouts. Buffer stays Not connected; Costs stays Manual records. No second card or monitoring-driven external action.

Source c07418cbc68fb5d37a6bbca9de9308c2694581e0; private deployment appgdep_6aced3aad67881918fc69f3fc1a22539; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_3e5404c6afec8191a983f23b603b5ae8; succeeded. Runtime environment revision6 retained. This is the latest deployed source/version, superseding the preceding deployment checkpoints above. Existing schema/scopes/credentials/records unchanged. Repeated automation page/API reads create no runs. Genuine source-card page-load fetches can create card-refresh records; exact original two entries were not examined/deleted. Analytics queries share one ordered trace; uncertain moves remain unconfirmed/non-retryable. Checker retry/dismissal remains intact.

All relevant controlled sync/grid/capture/security/Group1–3 regressions, production build and compiled200/401 pages pass. No rendered browser QA or newly instrumented live provider-read verification. Next: owner refreshes Automations, checks grid/scroll, performs normal source-card Sync and compares tiles/history. Expand receiver/upload/memory adapters only as those real sources become available. Current authority:group-4/USAGE-AND-CONNECTIONS.md.
