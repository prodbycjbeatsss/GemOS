# GemOS dashboard — current handoff

Updated13 October2026 after approved regrouping. Start with AGENTS.md, dashboard README, DESIGN_SYSTEM/ DESIGN_TOKENS and the affected group's spec/usage/components. Prior lengthy checkpoint history is preserved at ../../archives/dashboard/2026-10-13/pre-regrouping/docs/dashboard/HANDOFF.md; it is superseded for current grouping.

## Current grouping — 13 October 2026

CJ approved moving Email List from Group3 to Group2 and Subscription Costs from Group4 to Group3, with destination size/colour rules. Group2 is **Audience & Performance**:2.1 Short-form performance,2.2 24-hour Shorts ranking,2.3 Email List; all purple Large920px. Group3 is **Finance**:3.1 Payhip,3.2 YouTube earnings,3.3 YouTube payouts,3.4 Subscription Costs; all green Compact454px. Finance is a2×2 desktop grid with12px vertical/20px horizontal gaps. No new standalone group. Former Group5 cadence/automation becomes future Group4; it has no live page yet.

Email keeps its independent Mailchimp settings/reporting/member popup on /. Subscription costs keep manual saved histories/top-ups/logos/management on /commerce. API/storage/scopes unchanged. /costs is an authenticated303 redirect to /commerce. Historical IDs/colours below are superseded by this grouping; original mocks remain provenance.

## Deployment and scope

Source 0290a28c7d2b91daac3b6a00fe3a13c5d49bd388; version appgprj_6ac84c21e1fc819198906084958537b0~appgver_03c68d036bac8191a81ba2431fa31a44; deployment appgdep_6acea80d51908191aa17dd5cb170da80; succeeded, sole-owner private and runtime revision6 preserved. Existing Google,Mailchimp,Payhip credentials/settings and subscription records are unchanged. Public Payhip receiver access is unchanged. No new permissions, bank connection, database migration or record rewriting.

Live routes:Release /checklist,Audience & Performance /,Finance /commerce. Old /costs redirects303 to /commerce after authentication. ui/costs.html moved to an explicit source archive; its scripts, model, logo assets and /api/costs remain in use on Finance. Mailchimp setup/card/dialog/script moved together to Audience. Analytics reflow stays scoped to its original two cards.

## Current groups

- Group1 Release:8 Drive asset checks/metadata preparation/Shorts-order review and explicit guarded Queue move. Buffer remains an honest no-schedule state until an authoritative scheduling source is chosen. No automatic publish/archive. Existing controlled checks pass; full real two-project/move/device verification remains pending. Read ASSETS/PROJECTS.
- Group2 Audience & Performance:2.1 selected-Shorts analytics,2.2 independent release ranking/qualifying24h–24h15 snapshots,2.3 Email List. All purple Large920px; Email uses matching174px header/recess/footer tokens on a new half-width desktop row, stacked on phone. Mailchimp reports current active contacts, selected-month activity and latest newsletter; read group-2/EMAIL-LIST.md. No newsletter sends. First real qualifying ranking/TikTok/Reels are unverified.
- Group3 Finance:3.1 Payhip,3.2 YouTube earnings(top3 period views/revenue),3.3 YouTube payouts(provisional compatible GBP balance + independent current-month estimate,conditional window/history),3.4 Subscription Costs(monthly-equivalent manual records/separate top-up purchases). All green Compact454px in a2×2 desktop grid. Costs management uses green material and preserves saved history/service picker. Read group-3/SUBSCRIPTIONS.md. Payhip coupon mappings/all3 tiers are user-verified; genuine paid/refund/contracts remain pending. AdSense balance access is user-verified; populated paid-history and account/channel pairing comparison remain limited.
- Group4 future:former Group5 Publishing Cadence/Automation Performance; no live cards or placeholder page. Review next, then define colour/size/data before implementation.

## Validation and next action

Group-placement/unique IDs/script/setup/dialog ownership, destination colour/size declarations, three-link navigation and old Costs redirect checks pass. Actual subscription form/persistence/history/date/logo/custom-picker checks, Mailchimp SQLite/encryption/API checks and existing Group1–3 security/state/reporting regressions pass. Production build and compiled authenticated200/unauthenticated401 handlers plus authenticated303 redirect pass. No supported browser QA; tests do not prove rendered alignment/contrast/Android Back/enlarged text or new live provider results.

CJ accepted the regrouped visual appearance in chat. This is user visual acceptance; it does not establish all-state accessibility, saved-record/connection or new live-provider verification. Next work is the approved Automation Performance scope and proposed first checker adapter, documented in group-4/USAGE-AND-CONNECTIONS.md.

Future Sync all at the combined dashboard top is approved direction only; source-specific retries remain. Never let Sync publish,schedule,approve or move releases. Preserve independent card selections and truthful missing/zero/partial data.

## Automation Performance — confirmed scope, 13 October 2026

CJ confirmed coverage of all GemOS automations. The headline counts unresolved failed or unconfirmed runs: “1 automation needs attention”, “No automations need attention” only after recorded runs with no unresolved issues, and “No automation runs yet” before any records. Needs-attention runs precede recent runs; the footer opens full history and filtering by automation.

A successful retry resolves only the issue linked to that retry's original run, after confirmed completion. Manual dismissal requires a recorded reason and retains the original failure in history. Retry is available only where duplicate external actions can be prevented and the specific operation is eligible; uncertain writes require reconciliation/details rather than blindly repeating them. Monitoring approval does not authorise new publication, purchase, notification or unattended folder moves.

Runtime/card implementation has not started. Publishing Cadence overlaps Group1 planning; no cadence-grid implementation is authorised by this discussion. Retain provisional numbering4.2 for Automation Performance until placement/design is settled.
