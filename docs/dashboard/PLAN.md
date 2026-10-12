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
