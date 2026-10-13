# GemOS — current implementation plan

Updated 10 October 2026. This tracks work; current contracts live in group specs/usage and integration documents. Superseded checkpoints moved to archives/dashboard/2026-10-10/pre-prepare-release. decisions/log.md remains append-only history.

| Step | Status | Completion / remaining work |
|---|---|---|
| Reviewed Group 1/2 material and layouts | Complete for current test design | Historical previews preserved; new cards are not reviewed |
| Saved Google/YouTube backend and2.2 capture worker | Implemented | Successful five-minute Scheduler calls verified; first real Short capture still pending |
| Group 1 discovery/selector/per-project checks | Implemented | One real stage setup/4-of-8 scan shown; second-project switching and local sync test pending |
| Eight centred clickable checks and minimal Drive links | Implemented; CJ reports prior flow works | Current modal/device/contrast checks still pending |
| Prepare release, editable review, Shorts order, guarded Queue move | Implemented in current slice | Controlled validation + build; real consent/move and phone review pending |
| Documentation/component consolidation | Current slice | Remove superseded active rules; retain provenance in labelled archive/log |
| Confirmed schedule source and Buffer breakdown | Next connection decision | Select authoritative release/scheduler records;19 platform-upload weekly requirement stays |
| Scheduling/publication and Released moves | Future slice | Need confirmed platform results; never move simply because release week arrived |
| Whole-channel Shorts analytics/TikTok/Reels | Future integration | Preserve2.1/2.2 independent scopes and unavailable states |
| Parent-only yearly folder discovery | Optional future convenience | Not necessary for current stage setup; no implementation promise |

## Verification order

1. Add second old project; verify discovery, separate checks, remembered selection and page reload.
2. Complete an old 8/8 project; test metadata save, explicit Shorts order, consent, Queue move and computer sync. Existing Gelato 41 is queued and incomplete, so it cannot test a production move yet.
3. Phone/desktop long dialogs, Close/focus/Escape, Android Back, enlarged text, contrast and pair alignment. Controlled tests do not replace rendered evidence.
4. Verify first real 2.2 capture within its stated window.
5. Agree scheduling record source before populating Buffer or automating publication/archive.

## Boundaries

No new project selection on other cards; no fake coverage; no automatic publication; no credential values in source/docs. Update current docs alongside behaviour. Discuss genuinely unsettled product choices; accepted instructions persist across turns. Confirmations inside Prepare release are the concrete user approval for that project's move, not a separate assistant deployment gate.

## Group 3 — current slice

11 October:3.1 green card, shared navigation/setup, private Payhip settings and server target are implemented. Receiver public activation was authorised/completed; first actual £0 coupon event verified. New slice implements whitelisted variation capture, observed-option mappings, prospective GBP month/year reporting, separate refunds and reversible test exclusions. Controlled SQLite/security/accounting/UI/race/build/compiled-route checks pass; native device review remains pending.

Exclusive Rights was captured through a second £0 coupon checkout, mapped to Exclusive and confirmed persistent after refresh. Standard/Premium capture and mapping persistence are now verified by CJ12 October. First old event cannot be allocated retrospectively. Verify a genuine paid transaction/refund when appropriate; no money test is required now. Licence PDFs and per-variation delivery remain to prepare before paid launch. No historical import, currency conversion, mixed-cart allocation or exclusive removal. Review3.2 Email List and3.3 YouTube AdSense next without repeating Group1/2 cosmetic work.

## Group 3.2 — provider confirmed, 11 October

Mailchimp Free selected for one monthly newsletter; account created by CJ report. Next: audience/sender setup, Payhip connection and consented signup test, then confirm card content and validate actual API data before coding. Remove outdated free-MP3/drum-kit breakdown. No email sending authorised; 3.1 remaining checks and separate contracts task unchanged.


## Verification update — 12 October 2026, 02:39 UK

CJ completed post-update £0 Standard and Premium coupon checkouts. Screenshot shows the received Standard Lease option; CJ selected Standard and confirmed it survived refresh. Premium Lease appeared after page refresh; CJ mapped Premium and confirmed persistence. Together with Exclusive, all three real option captures and saved mappings are verified by user evidence. These free checkouts remain separate from paid counts/revenue; genuine payment/refund tests and contracts remain pending.

CJ reports Mailchimp key created, Payhip mailing-list connection saved and Gelato41 linked to the audience. Earlier Mailchimp screenshot shows one subscribed contact. Standard checkout likely lacked newsletter consent and is not a signup failure test. Premium checkout was completed after explicit opt-in instructions; actual consent and subscriber arrival still need confirmation. Next: check Mailchimp for the Premium test email around02:47UK. No emails sent; GemOS Mailchimp API connection/card implementation remains pending.


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

## Dashboard size redesign — confirmed 12 October 2026

Use two dashboard card sizes at normal text settings: **Compact430px** and **Large880px**, with a **20px inter-card gap**. Dimensions include internal padding/borders. Two Compact cards stacked plus one gap equal one Large:430+20+430=880. Cards within a group share the same size; different groups can differ. Preserve existing two-column widths/960px cap/840px breakpoint,20/24px internal insets, materials, typography and44px controls unless a focused redesign requires an agreed change. No205px Small or655px Medium tier: those earlier proposals are superseded. Do not introduce another size without a demonstrated content need.

This is the confirmed target grid, not a claim that existing cards already fit it. Implement Group3 first as the Compact proof: redesign both Payhip and Email List together and validate populated/empty/loading/error/long-content states. Details retain richer information; do not clip useful content or shrink touch targets to meet the height. Group1 remains at its current measured pair sizing until reviewed;512/532px are minima, not actual rendered heights. Assess it next and agree a content/layout redesign if neither size fits; do not stretch it to880px just to fill space. Group2 retains880px and its functional leaderboard viewport; verify combined dashboard alignment after Group3/Group1 review.

Mobile uses the normal compact/large targets with natural vertical stacking; enlarged text and exceptional long content require accessible reflow/full-view exceptions, never clipping. Alignment of a combined dashboard at desktop applies to normal-size states and excludes external connection/selection panels. A combined dashboard has not been implemented. Current routes and existing card geometry remain unchanged until each redesign is built and verified.


## Visual acceptance and future Sync all — 12 October13:17UK

CJ accepts current Groups1/2/3 appearance as visually consistent with the shared design system, with nothing visibly out of place in his review. Record as user visual acceptance, not measured universal accessibility or every-state verification. Current normal sizes Compact450px/Large920px/gap20px remain.

After the combined dashboard is assembled, add a primary Sync all action at the top and make individual card Sync controls less prominent while retaining targeted retry/manual refresh. This is future approved direction, not implemented in this slice. Sync all refreshes connected data; it must not publish, schedule, approve or move releases. Show per-source outcomes/freshness and partial failures honestly; preserve existing independent selections. No change to current Sync controls now.


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


## 13 October — approved fourth card 3.4 YouTube payouts

CJ accepts current three-card visuals and approves a fourth useful card: YouTube payouts. Group3 now has four equal Compact454px green cards,2×2 at desktop≥840 within960px,12px vertical/20px horizontal gaps; phone single column.3.4 reuses centred58px glyph/header/unpaid balance/caption, aligned44px Recent payments label track (no invented period controls), matching recess with three latest credited payment dates/amounts, Sync/View payments footer. Existing3.1–3.3 content/data unaffected.

Purpose is distinct from3.3 estimated revenue: current YouTube unpaid balance and available dated AdSense payment records. Header balance is current; history is all available records, not selected-month analytics. Only accounts/{account}/payments/youtube-unpaid and youtube-YYYY-MM-DD are included; website AdSense excluded. Missing unpaid remains unavailable, not zero; explicit formatted£0.00 is real zero. Preserve Google's formatted monetary/currency strings; do not parse ambiguous currencies, sum mixed amounts or convert. Credit dates are Google's Pacific billing dates, not proof of bank arrival; missing/invalid dates say unavailable. No predicted next payment, threshold progress or guaranteed countdown.

New Connect payouts requests adsense.readonly through the existing owner-bound Google OAuth flow, preserving existing monetary/Drive/read grants and restoring /commerce. Existing encrypted token storage/runtime revision6 reused; no new secrets/migrations. Connection requires access to AdSense through the same authorised Google identity used by shared Google connection; independently owned Google identities would need a separate connection design. Saved scope does not prove API success. Account discovery uses fixed AdSense v2 accounts URL with bounded pagination; only owner-returned accounts can be queried for payments. One account selects automatically; multiple accounts require explicit current-page choice (no browser secret/selection storage). Selecting a payout account does not alter analytics channel/period selection.

Private setup badge distinguishes saved permission/checking/current request success/failure. Empty account/YouTube records/paid history differ from request failure. Native popup has ten payments/page, known numbered controls, max75dvh, expandable notes, Close/focus return and shared outside-click dismissal. No external payout/bank modification.

Official data contract: https://developers.google.com/adsense/management/reference/rest/v2/accounts.payments ; /accounts.payments/list ; /accounts/list . Read-only API supports these fields; current user's successful access has not been verified. AdSense Management API may need enabling in the Google Cloud project if Google denies requests; diagnose actual error before giving setup changes.

Controlled SQLite/token/auth/account checks, opaque currency/zero/missing/date/YouTube-only/deduplication fixtures, OAuth grant preservation/callback/status and real-script three-row/history10-page/stale-request/focus tests pass. Existing backend,earnings,commerce,backdrop regressions, compiled private200/401/shell and production build pass. No supported browser capture; live AdSense access, phone/desktop and all-state visual fit remain pending.

Private source e4b20f3a70ceb9be206c26648ddbe842b5be08d1; deployment appgdep_6ace37a7c3b88191bfee46c6dfe00bcd succeeded13 October13:52UTC (14:52UK), envrevision6 retained. Next: refresh Sales → AdSense payouts connection → Connect payouts, approve read-only access and confirm actual balance/payment records. Existing genuine Payhip paid/refund/contracts and Group1/2 vertical-gap rollout remain separate.
