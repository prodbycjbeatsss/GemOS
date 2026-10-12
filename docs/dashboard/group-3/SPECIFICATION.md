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


## Group3 Compact redesign — 12 October

CJ authorised matched430px Group3 cards and a clearer sales/detail hierarchy based on screenshots showing mismatched recess tops and dense numbers. Current normal-size pair uses shared84px horizontal glyph/identity header,44px period,remaining recess,44px footer and8px track gaps with existing20/24px insets;58px glyph,fonts,colours,radii and20px pair gap preserved. Payhip hides redundant large empty-state block; three tier rows carry values and header carries unavailable/attention status. Target button remains functional in View sales. Email uses smaller activity tiles and compact icon/title newsletter empty state; full text stays in details. Both footer controls use existing Sync icon/text and44px targets.

Received sales dialog replaces dense summary sentence with prominent GBP amount/caption and2×2 labelled Paid orders/Refunds/Free checkouts/Excluded tests tiles. Show unallocated/attention note only when nonzero. Reporting caveats sit in expandable Reporting notes. Order rows separate state,date,amount and item/option; reversible test exclusion unchanged. Empty orders use centred receipt icon/title/copy. No revenue/refund/mapping/API logic changed.

Overflow observers switch both desktop cards to shared growth tracks for long content/enlarged text rather than clipping; fixed430 normal sizing is a target pending rendered verification. Build,compiled200/401/no-wrapper,commerce state/security/reporting and dashboard-shell tests pass; no supported browser QA available. Need fresh phone/desktop/long-title/error/enlarged-text verification. Group1/2 unchanged; Group1 review follows Group3 acceptance. Current redesign supersedes min590px vertical header/unequal recess rules in earlier sections.


## 3.3 YouTube earnings — proposal under review, 12 October 2026

Original original-card-mock-up.html reviewed at lines1100–1195: YouTube AdSense estimated amount, previous-month change, Month/Year pager, Remixes & Beats/Shorts revenue with views/RPM, top earning video/share, fixed21st–26th payout footer. All sample values are historical mock data.

Proposed useful purpose: show selected-period channel earnings and which content earns them. Prefer title YouTube earnings and explicitly labelled estimated revenue (including supported non-ad revenue), rather than conflating estimates with AdSense payments. Proposed Compact450px slot matching3.1/3.2: centred58px YouTube glyph/12px label gap/amount/supporting label;44px Month/Year pager; same recessed panel top/bottom/padding with Long videos and Shorts earnings plus one top earner; single Sync/View earnings footer. Keep existing accepted green Group3 material; original rose palette is unapproved. Desktop third card starts next row in existing two-column grid at equal width; mobile stacks. Do not stretch the third card or add filler.

Details proposal: ranked earning videos with title/type/estimated amount, selected-period trend and actual payment records only if separately connected. Keep views/RPM off the compact card; any later RPM requires a documented denominator, especially Shorts. Comparisons require equivalent complete reporting coverage. No guaranteed payout countdown, invented revenue, monetisation inference from views or assumptions about remixes.

Connection research: YouTube Analytics estimatedRevenue and monetary.readonly OAuth scope for earnings; AdSense Management v2 accounts.payments for separately labelled paid/unpaid YouTube records. Existing ordinary analytics access is not proof of monetary access. Official sources: https://developers.google.com/youtube/analytics/metrics ; https://developers.google.com/youtube/analytics/reference ; https://developers.google.com/adsense/management/reference/rest/v2/accounts.payments . Account access and report combinations remain unverified. First question: is CJ's channel monetised with Revenue data already visible in YouTube Studio? Purpose/content/layout remain proposals, not approved implementation. No code changes in this review.


## 3.3 approved and implemented — 12 October 2026

CJ reports channel already monetised with earnings visible in Studio, and approves the proposed YouTube earnings layout. This supersedes the earlier unreviewed/proposal wording for3.3. Private Sales now adds a third equal-width Compact450px card on the next desktop row; phone stacks. Existing green Group3 material, centred58px glyph/12px label gap,146px header,44px period/footer,12px major spacing and matching recess insets reused. No third-column stretch or filler. Shared accessible-growth observer covers all three.

Card: selected Month/Year estimated GBP channel revenue (estimatedRevenue includes supported non-ad revenue), Long videos/Shorts earnings, top earning reported video row; Sync/View earnings footer. Details: daily trend for Month or monthly aggregates for Year, ranked videos50/page with Load more and safe external watch links. Other/unknown/live content remains in total and is explicitly reported in notes, never silently reassigned to Long videos. No RPM, fabricated comparison, payout countdown or payment integration. Missing report is unavailable, not zero; real returned zero remains zero. Reporting days are Pacific, not UK; latest returned day shown in details. Long titles clamp on the card and are fully available in the dialog.

Existing OAuth requested only ordinary analytics/youtube read scopes. New Connect earnings starts owner-bound, same-origin OAuth with optional yt-analytics-monetary.readonly, preserves existing Drive metadata/move and monetary grants in subsequent reconnect requests, returns to /commerce. Stored granted-scope flag is not proof of a successful report. Google permission approval remains a user step; no secret values or API keys required. Earnings endpoints enforce authenticated owner/channel membership, fixed Google URLs/metrics, period/page bounds, GBP currency, no-store and safe provider errors. Tokens reuse encrypted server storage; no migrations or new runtime secrets. Cancelled/denied access leaves earnings explicitly unavailable.

Validation: verify-earnings.mjs covers leap/future periods, missing versus zero, total/category/day reconciliation including other types, shuffled provider columns, ownership, denied permissions/safe errors, title retrieval, OAuth scope preservation/callback, real-script UI hydration/literal titles/old-period suppression/dialog focus. Existing backend, commerce, Group2 state, Mailchimp, Group1 UI, shell checks and production build/compiled200/401 checks pass. Supported browser QA unavailable; phone/desktop/enlarged-text rendering and live provider queries remain pending. No publishing/scheduling/email sending changed.

Private source b504ef5d7a7c9aba49f06e1e50b0fd45c6859ec8; deployment appgdep_6accd3a333a88191aaf8bcf3525a338f succeeded12 October12:34UTC, runtime revision6 retained. Next: Sales → YouTube earnings connection → Connect earnings, approve read-only revenue access, compare a completed month's GBP estimate to Studio and inspect card/details. Actual AdSense payment records remain a separately connected future option; paid/refund Payhip checks/contracts still pending.
