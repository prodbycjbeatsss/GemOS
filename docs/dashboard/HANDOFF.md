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

Next user review:refresh Audience and Finance; confirm Email List uses purple Large920px, subscriptions use green Compact454px, Finance shows four cards, saved records/connection persist, popups work and narrow-phone controls remain reachable. Record user acceptance precisely before moving to the future publishing/cadence design discussion.

Future Sync all at the combined dashboard top is approved direction only; source-specific retries remain. Never let Sync publish,schedule,approve or move releases. Preserve independent card selections and truthful missing/zero/partial data.
