# Group 3 — sales

Confirmed 11 October 2026. CJ approved refining the supplied original-card-mock-up.html Payhip card and adding it as a new section. This slice implements 3.1 only; 3.2 Email List is now approved and implemented (see current slice below);3.3 YouTube AdSense still needs review.

## 3.1 Payhip sales

Retain the green identity and existing revenue → period → recessed licence breakdown structure. Shared material, typography, glyph, inset and footer rules match Groups 1/2. Standard, Premium and Exclusive replace the original misleading MP3/WAV tiers. See context/storefront.md for commercial definitions.

Header:58px glyph, Payhip sales, selected-period received GBP amount before fees/refunds, paid-order count and quiet monthly target. No comparison until a reliable equivalent-period source exists. Month/Year pager has44px controls and no future periods. Recess: centred loading/empty/attention message and three licence rows with mapped received revenue/quantity. Advertised£20/£40/£150 remain labelled licence prices. Footer: Refresh sales / View sales. Loading/failure/unverified states use dashes and explicit unavailable wording; verified feed may show zero observed sales with prospective-coverage wording.

View sales is a labelled green native dialog with selected period, coverage, received revenue/unallocated amount, separate refunds/free checkouts/excluded tests and actual order breakdown. Reversible Exclude test order persists server-side. Missing variant identity is explicit. Top setup adds observed licence dropdowns; never infer tier from price. Target remains whole GBP1–1,000,000 saved privately; no invented progress or historical backfill. See usage/PAYHIP for allocation and refund rules.

## Geometry and access

Single card occupies one equal-column slot at desktop ≥840px within the 960px group width; mobile full width. No filler second card. Minimum 590px slot grows for wrapping/enlarged text. Recess fills remaining space, footer remains at bottom. Group 3 full three-card alignment is not yet approved.

Native dialog max480px, viewport minus32px, max85dvh; static heading focus, Escape dismissal, modal focus containment, focus return and sticky Close/Cancel. Status has explicit text. Source tests/build do not prove rendered contrast, font delivery, enlarged-text or Android Back behaviour.

## Shared navigation and setup

All pages use top navigation: 1 Release (/checklist), 2 Performance (/), 3 Sales (/commerce). Native links support browser Back, keyboard and direct URLs; aria-current marks a visibly filled and bordered segment. The header stacks on compact phones, with three equal-width 48px links. Existing route URLs and separate card selections are retained.

Compact expandable setup replaces the large Group 2 header area. YouTube setup starts open when disconnected and closes after a saved connection successfully restores. Sample and release inputs have separate expandable panels; Drive's existing stage setup retains its open-if-unconfigured logic. Connection fields/status/help remain reachable; no permission or backend behaviour changes.

## Shared shell delivery fix — 11 October

CJ supplied a screenshot with unstyled navigation and reported a white Sales page. The prebuild step embeds the same source ui/dashboard.css into each HTML document, instead of depending on a second stylesheet fetch. Dark navy canvas, text and colour-scheme are explicit on all pages. Selector uses48px bordered segments with distinct active fill/border, separated number badges and compact-width stacking. Setup/included panels share fill/border/radius. Test generated route responses, not only source presence; native rendered appearance remains pending.


11 October recovery: direct CSS imports into route handlers caused the framework to wrap GET as a React component and produce live500 responses. Removed those imports and the unused CSS route. Prebuild syncs CSS into HTML. verify-compiled-pages.mjs executes the compiled checklist/commerce handlers, verifies200/401 and scans all three handlers for accidental React wrapping. Source-only tests were insufficient.

## Private Payhip setup — 11 October

Above the card, the compact native details panel contains a labelled password API-key field, Save connection, saved/pending/verified status and minimal store link. Starts open without a saved key; restored saved settings collapse it. Successful manual save keeps feedback visible and clears the input. Webhook URL is read-only; Copy is enabled once a key is saved and the receiver is activated. Receiver activation was approved and completed11 October. No key/signature value is rendered. Monthly target now saves to the account, replacing the browser-only setting. Connection verification does not enable unmapped totals. See usage/PAYHIP for source boundaries.


## Approved Email List 3.2 content — 12 October 2026

CJ confirmed: current Active subscribers headline; selected-month New sign-ups and Unsubscribes; latest newsletter subject, Draft/Scheduled/Sent status and date; single Refresh / View details footer. Detailed engagement belongs in View details. Remove free-MP3/drum-kit acquisition rows. Retain existing green Group3 material/shared typography/components; final geometry follows legitimate states. Current active total is independent of selected-month activity. Provider Mailchimp Free, monthly newsletter cadence.

Next: inspect actual selected-audience API responses securely before wiring figures; verify subscribed-only count, monthly activity coverage and campaign dates/status (never label a draft creation date as a scheduled send). Empty No newsletter yet differs from unavailable. Missing fields stay unavailable, not zero. Documentation establishes candidate endpoints, not account access. Payhip opt-in test still awaits subscriber confirmation. No email sending or campaign scheduling is authorised by dashboard implementation.


## Email List implementation — 12 October 2026

CJ authorised coding3.2 and clearer connection indicators. Private /commerce now contains Payhip3.1 and Email List3.2 as a matched two-column desktop pair, stacked on phone. Existing green material, Inter/Poppins,58px glyph,20/24px insets,32px card/22px recess and single footer are reused. Both slots retain min590px with accessible content growth. Active subscribers headline is current, independent of selected month. Monthly new sign-ups/unsubscribes and latest audience campaign (newest created) subject/status/date replace obsolete acquisition/welcome rows. Draft/Scheduled records label creation dates as Created; never substitute creation for scheduled send. No newsletter yet differs from unavailable. Details contain reported unique clickers/click rate when sent; no opens-as-read claim.

Mailchimp private setup uses password field, verified audience discovery, optional audience chooser, encrypted owner-scoped D1 storage and disconnect. API key is never returned or stored in browser storage. API reads only; no campaign/subscriber writes, sends or schedules. Existing PAYHIP_TOKEN_KEY encrypts with mailchimp-specific owner-bound AAD; runtime revision6 preserved. Migration0004 adds mailchimp_settings without modifying earlier data. Credential entered into Payhip does not automatically connect GemOS: user must enter Mailchimp key in this new private form.

Data contracts: subscribed member_count; /lists/:id/activity daily subs/unsubs with complete requested-day coverage (up to180days, excludes Automation/other adds/removes); partial/missing days remain unavailable, including provider delay today. Daily boundaries are provider-defined, not claimed UK midnight. Monthly growth subscribed is an end balance, never new signups. /campaigns broadcast collection, selected audience, newest creation; report_summary engagement is source-reported. Successful list access can coexist with unavailable activity/campaign reports. Older period selection never changes current headline meaning; generations prevent old period responses overwriting newer ones.

Collapsed setup summaries now show connection badges for Drive,YouTube,Payhip,Mailchimp. Saved Google access is distinct from a fresh request; Drive discovery checks current access; Payhip shows Feed verified and last notification rather than claiming a fresh API-key probe; Mailchimp reports access checked on refresh and explicit failure. No promise of continuous connection monitoring. Scheduling remains unconnected.

Validation: Mailchimp real SQLite migration/encrypted persistence/owner isolation/auth/origin/body bounds/rejected-key preservation/disconnect, activity coverage and campaign date tests pass; Payhip accounting/security and commerce UI regressions, project UI and YouTube state checks pass; production build and compiled checklist/commerce200/401/no-React-wrapper checks pass. Supported browser QA unavailable; phone/desktop rendered fit, enlarged text, contrast and live Mailchimp API responses remain unverified.

Private deployment succeeded12 October01:49UTC; source9fca4a81d6c76174fbae4da957e5f03e558a7f8f, version appgprj_6ac84c21e1fc819198906084958537b0~appgver_0202f9ce2720819185e6b34454d5ef8b, deployment appgdep_6acc3cae5d64819197a690977900cb8a. Next: open Sales, save Mailchimp key, compare current active subscribers with provider and inspect phone layout. Payhip signup test and all three option mappings verified; genuine paid/refund and contracts remain separate pending work.
