# GemOS — current implementation plan

## Regrouping delivered — 13 October 2026

## Current grouping — 13 October 2026

CJ approved moving Email List from Group3 to Group2 and Subscription Costs from Group4 to Group3, with destination size/colour rules. Group2 is **Audience & Performance**:2.1 Short-form performance,2.2 24-hour Shorts ranking,2.3 Email List; all purple Large920px. Group3 is **Finance**:3.1 Payhip,3.2 YouTube earnings,3.3 YouTube payouts,3.4 Subscription Costs; all green Compact454px. Finance is a2×2 desktop grid with12px vertical/20px horizontal gaps. No new standalone group. Former Group5 cadence/automation becomes future Group4; it has no live page yet.

Email keeps its independent Mailchimp settings/reporting/member popup on /. Subscription costs keep manual saved histories/top-ups/logos/management on /commerce. API/storage/scopes unchanged. /costs is an authenticated303 redirect to /commerce. Historical IDs/colours below are superseded by this grouping; original mocks remain provenance.

Sequence completed:inspect and record migration plan; move unchanged setup/card/dialog/script ownership; apply destination tokens; rename navigation/redirect old Costs; validate data/state/routing; privately deploy; mirror source/docs to GitHub. No saved-record mutation or backend migration. Recovery:redeploy prior Site version; owner records unchanged.

## Acceptance and remaining work

|Area|Status / next|
|---|---|
|Group1 Release|Existing Drive checks/preparation/guarded Queue moves; Buffer scheduling source remains unconnected. Real two-project/move/device checks remain as documented in PROJECTS/ASSETS.|
|Group2 Audience & Performance|Existing2.1/2.2 scopes/capture intact;2.3 Mailchimp moved to purple920px. Review new Large email appearance and saved connection. Real first qualifying24h release capture/TikTok/Reels remain pending.|
|Group3 Finance|Four454px green cards; manual Costs moved in. Review loaded subscription rows/logo picker/popup on Finance, selected-month/category and separate top-up totals. Paid/refund Payhip tests/contracts and populated payment-history verification remain separate.|
|Group4 future|Review4.1 Publishing Cadence and4.2 Automation Performance before coding.|
|Combined dashboard|Future Sync all and quieter source-specific Sync controls remain planned, not implemented.|

Checks passed:verify-group-migration.mjs,verify-subscriptions.mjs,verify-email.mjs,verify-commerce.cjs,verify-state.cjs,verify-payouts.mjs,verify-earnings.mjs,verify-backend.mjs,verify-project-ui.mjs,verify-dashboard-shell.cjs,verify-dialogs.mjs,production build and compiled200/401/Costs303 checks. Source 0290a28c7d2b91daac3b6a00fe3a13c5d49bd388, private deployment appgdep_6acea80d51908191aa17dd5cb170da80, runtime revision6 preserved. No supported browser QA; fresh phone/desktop/enlarged-text acceptance is next.

Older plan/handoff are archived under ../../../archives/dashboard/2026-10-13/pre-regrouping/docs/dashboard/. Current authority:group specs/usage, integration contracts and HANDOFF.
