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


## Locked dashboard spacing — 12 October 2026, 13:43 UK

CJ accepted the measured dashboard mock-up and locked Compact454px, Large920px,12px vertical spacing within a group and20px between desktop columns. Two Compact cards plus their vertical gap exactly match a Large card:454+12+454=920. This supersedes Compact450px/20px vertical-gap and all earlier430px/880px proposals. Keep existing internal padding, materials, typography and accessible growth exceptions. At960px dashboard width, equal desktop columns are470px each with20px horizontal gap. Geometry decision is confirmed; current hosted source still uses450px/20px and has not yet adopted this change. YouTube earnings live connection, Studio comparison and rendered acceptance remain next; no additional content decision is required from CJ now.


## 12 October 21:27 UK — earnings repair and Compact spacing delivery

CJ confirms revenue connection succeeds and main figures load; Long/Shorts breakdown and top earner did not display. Production logs show /api/earnings/videos502 across selected months. Exact provider rejection body was unavailable; changing the video+creatorContentType ranking to the standard video-only estimatedRevenue report is a compatibility repair, not proof of the precise original rejection. Ranking now returns upload totals without guessing a content type; labels say Video until provider classification is available. Separate daily creatorContentType report still owns channel Long/Shorts breakdown. If all rows have unknown types, those category values stay unavailable rather than fabricated zero.

The earnings recess uses a block content container with auto-height breakdown and explicit hidden-state rules instead of nested100%-height flex content, to avoid clipping. Versioned script refreshed. No revenue amounts or classifications invented. Live ranking and rendered breakdown remain pending user recheck.

Locked geometry applied to Group3:Compact454px,12px row gap,20px column gap; Large920px unchanged. 454+12+454=920. Internal header/recess/footer geometry and20/24px insets unchanged. Group1/2 card slots remain920px; their existing mobile vertical20px grid gap has not yet been changed by this repair, so the full-dashboard spacing rule is only partially rolled out.

Controlled earnings/backend/commerce fixtures and compiled private200/401/shell checks pass; production build succeeds. No supported browser capture, no successful owner-authenticated direct live revenue read in this session, and live provider success is not claimed by fixtures. Private source76992f4c8d9f33b3d5a664276c4709482c7b1af7/deployment appgdep_6acd4280bc4c81918d9d684a92919835 succeeded20:26UTC, envrevision6 preserved. Next: refresh Sales and Sync, inspect Long/Shorts rows and top earner; screenshot if still missing, then compare completed-month total to Studio.


## 13 October — earnings classification fallback, shorter popup and backdrop dismissal

CJ supplied live reporting notes showing all£21.32 assigned to Other content; headline/top earner load, Long/Shorts estimates remain unavailable. This confirms the unknown/unrecognised revenue classification path, not the exact raw provider enum. Add a bounded fallback: fetch complete video revenue ranking (up to1000 videos), independently query views with video+creatorContentType and explicit video filters, join exact video IDs with unambiguous recognised types, and reconcile all amounts to channel total within£0.05. Ambiguous/missing types stay Other; failure/incomplete/reconciliation mismatch preserves the main estimate and leaves split unavailable with a reporting note. No filename/duration/price inference. Live fallback remains to verify.

Earnings ranking now10 items per request/page with11-row lookahead, offsets in multiples of10. Numbered page buttons, previous/next and current-page status replace Load more; known page numbers are revealed as provider pages are visited, without an invented total-page count. Replaces rows on navigation, keeps first-page top earner stable and suppresses stale responses. Trend is collapsed by default; popup max75dvh, compact rows, scroll and existing Close/focus return retained.

CJ explicitly requests outside-click dismissal for every group popup. Shared ui/dialogs.js now attaches native dialog backdrop dismissal to Release, Performance and Sales pages; inside padding/children stay open, dragging from inside to outside does not dismiss and cancelled pointer gestures reset. Existing close callbacks still restore focus. Group2's duplicate batch-specific handler removed. This is UI behaviour only; no save/publish/send action is triggered by dismissal.

Controlled tests: actual earnings handler fallback joins monetary/activity reports; reconciliation/unknown/incomplete checks;10-row/page lookahead; real-script stale-period/literal-title/focus checks; shared backdrop inside/outside/drag/cancel/child checks. Existing commerce, Group2 state, Group1 UI, compiled200/401/shell and production build pass. No supported rendered browser/device QA. Source ee5c7ad7e98edd14e0f4e548b4d7a43a219e7a1d, private deployment appgdep_6acd6ef6da1c81918799114a31f05e38 succeeded12 October23:36UTC (13 October00:36UK), runtime revision6 retained. Next: refresh Sales, Sync earnings and confirm split; inspect10-item numbered popup and outside-tap dismissal across groups.


## 13 October — approved top-three earning uploads

CJ reports Long/Shorts revenue still unavailable after fallback, and chooses to replace that breakdown with the top3 earning videos for the selected period, each with view count and estimated revenue. This supersedes Long/Shorts rows/single top earner and removes the classification fallback from the current integration. Failed classification remains historical evidence, not a solved capability.

Recess now shows up to3 positive earners ranked by selected-period estimatedRevenue, with rank/title (one line ellipsis, full title in details/title attribute), full en-GB view count and GBP amount. No invented rows when fewer than3 earners exist. Same454px green slot/shared header/pager/recess/footer; no size change. Full ranking stays10/page with numbered controls, now also showing period views. Total/daily trend query uses day+estimatedRevenue; ranking uses video with estimatedRevenue,views, sorted-estimatedRevenue,11-row lookahead. Both use the selected period and currencyGBP; views are period counts, not lifetime totals. No content-type inference/API scan remains. Single first ranking request feeds card and popup. Older page responses cannot overwrite current period/top3. Other content/split notes removed because current card no longer categorises revenue.

Controlled earnings tests cover metric-column validation including numeric nonnegative integer views, private/channel/scope guards, dates, missing/zero, safe failures, title fetch,10-page lookahead,3-only positive earners, exact view formatting/literal titles, period races and dialog focus. Commerce/backdrop and compiled200/401/shell checks plus production build pass. Existing Google scopes/runtime secrets/private access unchanged. Fresh live views/revenue query and rendered fit remain pending; prior total/per-video revenue access is user verified, not proof of this combined metric query.

Private source e9b5fa8bc0a2a9a7a5560e4000f43c23892e95ce; deployment appgdep_6ace342664c88191b1bac4975c8c710c succeeded13 October13:38UTC (14:38UK), runtime revision6 retained. Next: refresh Sales and Sync earnings; compare the three rows with Studio for the same period. Payhip genuine paid/refund/contracts and Group1/2 vertical spacing rollout remain separate pending items.
