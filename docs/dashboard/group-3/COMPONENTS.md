# Group 3 components

11 October 2026. Current implementation: integration-tests/youtube/ui/commerce.html and commerce.js; shared shell: ui/dashboard.css.

Payhip card: green spotlight shell, centred glyph/identity, quiet target control, period pager, recessed tier list, single footer. Unconnected state uses dashes/explicit unavailable wording and a centred setup prompt. Loaded/empty/attention/error states now use received notifications; refunds are separate in View sales. Previous-period comparison is deferred.

Period pager: real buttons with dynamic Month/Year labels, 44px targets, future-next disabled. Target: private server-saved account setting, form validation, save/failure feedback. View sales: native dialog, static heading focus and focus return; filename/file-link patterns are unrelated to this order popup.

Group picker: shared semantic shell tokens, native route anchors, one aria-current selection, compact stacking. Setup panels: native details/summary; no manual ARIA accordion emulation. Fields retain labels and existing connection logic.

Validation: controlled commerce interactions, checklist/project UI and YouTube state regression checks, HTML section nesting and production build passed. Rendered phone/desktop review remains pending because supported browser capture is unavailable.

Shared shell styles are embedded in HTML at build time from one ui/dashboard.css source. This avoids the missing external styles shown in CJ's screenshot. verify-dashboard-shell.cjs checks full styles in all three successful authenticated responses, no external CSS dependency, unchanged unauthenticated401 and selected-nav semantics. Selector surfaces now have48px targets and explicit borders/active fill; all pages use dark navy.


11 October recovery: direct CSS imports into route handlers caused the framework to wrap GET as a React component and produce live500 responses. Removed those imports and the unused CSS route. Prebuild syncs CSS into HTML. verify-compiled-pages.mjs executes the compiled checklist/commerce handlers, verifies200/401 and scans all three handlers for accidental React wrapping. Source-only tests were insufficient.

Payhip connection panel sits above the card and shares compact shell details/summary, 14px fields/buttons, 12px help, 44px controls and explicit feedback. Password input clears after success; saved connection never reveals its credential. Webhook URL/status distinguish prepared from enabled. Connection and target errors retain the last successful state. Selected-period report loading/failure clears displayed totals so old periods cannot masquerade as current.

Received-option dropdowns sit inside compact setup with44px controls and explicit save/error feedback. View sales uses real text-rendered order rows, coverage notes and reversible test exclusion; no customer information. Mapped tiers, unallocated amounts, free checkouts and refunds are different meanings. Stale request generations cannot replace newer period results. Controlled SQLite/accounting/UI tests are not proof of real provider variation capture or rendered layout.


## Email List implementation — 12 October 2026

CJ authorised coding3.2 and clearer connection indicators. Private /commerce now contains Payhip3.1 and Email List3.2 as a matched two-column desktop pair, stacked on phone. Existing green material, Inter/Poppins,58px glyph,20/24px insets,32px card/22px recess and single footer are reused. Both slots retain min590px with accessible content growth. Active subscribers headline is current, independent of selected month. Monthly new sign-ups/unsubscribes and latest audience campaign (newest created) subject/status/date replace obsolete acquisition/welcome rows. Draft/Scheduled records label creation dates as Created; never substitute creation for scheduled send. No newsletter yet differs from unavailable. Details contain reported unique clickers/click rate when sent; no opens-as-read claim.

Mailchimp private setup uses password field, verified audience discovery, optional audience chooser, encrypted owner-scoped D1 storage and disconnect. API key is never returned or stored in browser storage. API reads only; no campaign/subscriber writes, sends or schedules. Existing PAYHIP_TOKEN_KEY encrypts with mailchimp-specific owner-bound AAD; runtime revision6 preserved. Migration0004 adds mailchimp_settings without modifying earlier data. Credential entered into Payhip does not automatically connect GemOS: user must enter Mailchimp key in this new private form.

Data contracts: subscribed member_count; /lists/:id/activity daily subs/unsubs with complete requested-day coverage (up to180days, excludes Automation/other adds/removes); partial/missing days remain unavailable, including provider delay today. Daily boundaries are provider-defined, not claimed UK midnight. Monthly growth subscribed is an end balance, never new signups. /campaigns broadcast collection, selected audience, newest creation; report_summary engagement is source-reported. Successful list access can coexist with unavailable activity/campaign reports. Older period selection never changes current headline meaning; generations prevent old period responses overwriting newer ones.

Collapsed setup summaries now show connection badges for Drive,YouTube,Payhip,Mailchimp. Saved Google access is distinct from a fresh request; Drive discovery checks current access; Payhip shows Feed verified and last notification rather than claiming a fresh API-key probe; Mailchimp reports access checked on refresh and explicit failure. No promise of continuous connection monitoring. Scheduling remains unconnected.

Validation: Mailchimp real SQLite migration/encrypted persistence/owner isolation/auth/origin/body bounds/rejected-key preservation/disconnect, activity coverage and campaign date tests pass; Payhip accounting/security and commerce UI regressions, project UI and YouTube state checks pass; production build and compiled checklist/commerce200/401/no-React-wrapper checks pass. Supported browser QA unavailable; phone/desktop rendered fit, enlarged text, contrast and live Mailchimp API responses remain unverified.

Private deployment succeeded12 October01:49UTC; source9fca4a81d6c76174fbae4da957e5f03e558a7f8f, version appgprj_6ac84c21e1fc819198906084958537b0~appgver_0202f9ce2720819185e6b34454d5ef8b, deployment appgdep_6acc3cae5d64819197a690977900cb8a. Next: open Sales, save Mailchimp key, compare current active subscribers with provider and inspect phone layout. Payhip signup test and all three option mappings verified; genuine paid/refund and contracts remain separate pending work.


## 12 October — verified email source and focused details

User screenshots confirm real Mailchimp2 active subscribers,1 monthly signup/0 unsubscribes and successful access after redirect repair. CJ requested removing small explanatory card/FAQ copy, improving newsletter spacing, subscriber emails/dates in details and Sync footers. Card now omits coverage paragraph and duplicate current-total/monthly-activity copy; newsletter has consistent12px gaps and centred envelope empty state. View details fetches authenticated selected-audience active members on open,50 per page with Load more, emails/signup dates/status/source (missing date explicit; no inferred history). Current active audience list is independent of monthly aggregate selection; no stored subscriber payloads. Newsletter empty and unavailable states use icon/centred copy; no FAQ filler. Both3.1/3.2 footer refresh actions use existing16px outline Sync glyph/44px text control; email busy disabled/spinner with reduced-motion support.

Shared empty-state contract: centred34px outline category icon, concise title/supporting line,12px spacing; never fabricate counts/actions. Use within private details and empty recessed sections. Useful loaded data replaces this anatomy. Green material/shared typography maintained. Build/compiled route/private200/401,Mailchimp storage/reporting and Payhip commerce/shell checks pass; fresh rendered polish/member-list response pending. No sending enabled.


## Group3 Compact redesign — 12 October

CJ authorised matched430px Group3 cards and a clearer sales/detail hierarchy based on screenshots showing mismatched recess tops and dense numbers. Current normal-size pair uses shared84px horizontal glyph/identity header,44px period,remaining recess,44px footer and8px track gaps with existing20/24px insets;58px glyph,fonts,colours,radii and20px pair gap preserved. Payhip hides redundant large empty-state block; three tier rows carry values and header carries unavailable/attention status. Target button remains functional in View sales. Email uses smaller activity tiles and compact icon/title newsletter empty state; full text stays in details. Both footer controls use existing Sync icon/text and44px targets.

Received sales dialog replaces dense summary sentence with prominent GBP amount/caption and2×2 labelled Paid orders/Refunds/Free checkouts/Excluded tests tiles. Show unallocated/attention note only when nonzero. Reporting caveats sit in expandable Reporting notes. Order rows separate state,date,amount and item/option; reversible test exclusion unchanged. Empty orders use centred receipt icon/title/copy. No revenue/refund/mapping/API logic changed.

Overflow observers switch both desktop cards to shared growth tracks for long content/enlarged text rather than clipping; fixed430 normal sizing is a target pending rendered verification. Build,compiled200/401/no-wrapper,commerce state/security/reporting and dashboard-shell tests pass; no supported browser QA available. Need fresh phone/desktop/long-title/error/enlarged-text verification. Group1/2 unchanged; Group1 review follows Group3 acceptance. Current redesign supersedes min590px vertical header/unequal recess rules in earlier sections.
