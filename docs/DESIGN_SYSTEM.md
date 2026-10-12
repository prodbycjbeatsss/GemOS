# GemOs dashboard card design system

Updated 11 October 2026. Master reference for this dashboard-card review, consolidated from the reviewed Groups 1 and 2. This does not lock the rest of the app's navigation or themes. Approved 9 October fixes are recorded in the group specs and verification report.

Read this first, then the relevant group specification. Confirmed group-specific choices take precedence over general proposals. The audit is advisory. Unreviewed groups must be discussed before implementation.

## Shared rules

- Fixed card slots within a group at normal text sizes. Loading, empty, partial and populated states must not resize the group. Different groups may use different heights.
- Phone: one column. Reviewed desktop groups: two equal columns from 840px, centred within 960px, with a 20px gap. Do not stretch a pair across the entire desktop.
- Outer inset: 20px below 640px, 24px from 640px. Spotlight card corner: 32px. Recessed panel corner: 22px. Reviewed inner rows/tiles/chips: 12px where used.
- One footer with a consistent bottom edge. Supporting action/freshness left; detail route right. Do not invent extra controls or facts to fill space.
- Inter for body, controls, labels and dates; Poppins for the main figure/name. Reviewed main scale: 24px mobile, 30px from 640px. Keep smaller reviewed role sizes group-specific; proposals to increase them are not silently adopted.
- Match icon, heading, panel and footer alignment within a group. Share the 58px glyph and 12px glyph-to-label gap. Retain 16px header-to-panel spacing where applied. Group 2 reserves a 174px header area to align its matching panels; Group 1 does not require the same reservation.
- Reuse materials and components, not identical internal layouts. Group 1 contains a list and checklist; Group 2 contains metrics and a scrolling leaderboard.
- Preserve readable content and controls under enlarged text with reflow/full-view exceptions rather than clipping a fixed slot.

## Material reference

Use the complete reviewed HTML rules as the visual reference; do not approximate the shine independently for each card.

| Component | Reviewed treatment |
|---|---|
| Card | Fine white border at 0.16 opacity; outer shadows 0 24px 48px -12px black 0.45 and 0 8px 20px -4px black 0.25; inset highlights 0 1.5px 1px white 0.35 and 0 -2px 4px black 0.25. |
| Glyph | 58px square, 18px corners; 135° white gradient 0.45 → 0.12; blur 18px; white border 0.65; outer and inset shadows from the reference. |
| Recess | Black fill 0.28; blur 16px; white border 0.12; inset 0 2.5px 6px black 0.45, lower highlight 0 1px 0 white 0.12. |
| Beam | Same centred shape: top -36px, 290 × 190px, blur 18px; stops 0/44/75%. Group 1 uses its reviewed state treatment; Group 2 uses indigo #818cf8 at 0.85/0.22/transparent. |

## Reviewed palette

| Surface/use | Values and scope |
|---|---|
| Group 1 healthy blue | #0284c7 / #0369a1 / #0f172a. |
| Group 1 attention amber | #d97706 / #b45309 / #1c1917. |
| Group 1 blocked rose | #e11d48 / #9f1239 / #0f172a. |
| Group 2 purple | 155°, #4338ca at 0%, #312e81 at 45%, #0f172a at 100%; identical on 2.1 and 2.2. |
| Group 2 fill bars | 90°, #818cf8 → #38bdf8 → #34d399. |

CJ rejected a lighter numerical purple match. Consistency comes from material, spacing and components; blue and purple are not required to have identical numerical lightness/chroma. Do not change the accepted gradients to enforce such a rule.

Status must be expressed in text. Group 1 uses restrained green for confirmed ready/scheduled items and neutral for in-progress items. Group 2 uses neutral lavender below target/zero/missing, green for positive growth or target met, and rose for negative growth. No unsupported On track prediction. Missing is not zero. Group 1 readiness is not publication or scheduling.

## Reusable interactions

- Sync: small icon plus label, no circular button background; visible result and freshness. Placeholder controls must not pretend an import succeeded. Dashboard Sync all is planned; no group-level Sync.
- Contextual route: right footer action with arrow; Group 1 Prepare release reviews one project, Buffer details covers scheduled projects. Both Group 2 actions are white. Group 1 retains its reviewed treatment rather than being restyled by this consolidation.
- Group 2 platform selector: All / Shorts / TikTok / Reels, one row and one selection. Brand icons retained. Visible height 36px, radius 12px, extended 44px tap height, #ffffff1a selected fill. Responsive padding/gaps and keyboard rules are defined in dashboard/group-2/SPECIFICATION.md.
- Group 1 asset tiles are native buttons opening file popups. File links and association controls belong inside those popups; Prepare release owns whole-project review. Group 2 clip rows remain real controls.
- Overlays: labelled, scrollable within the viewport, with close control, keyboard focus, Escape dismissal and focus return. Android Back requires native verification.

## Reviewed geometry

| Group | Normal card slot | Recess behaviour |
|---|---|---|
| 1 | Minimum 512px at ≥360px; 532px below 360px; paired growth for content | Shared largest header/recess/footer measurements; eight checks in four two-column rows. |
| 2 | Equal 880px slots, verified normal reference geometry | Matching panel heights: 575px below 640px, 583px from 640px; five 72px leaderboard row spaces within a 360px scroll viewport. |

For a new group, first settle its useful dashboard content, measure its tallest legitimate state, then agree the group height. Do not force it into either existing slot.

## Verification and unresolved items

Check relevant mobile/desktop widths, long text, platform/state changes, clipping, overlap, focus and footer alignment. Aim for 44px touch targets; visual chips can be smaller with correctly separated hit areas. Contrast acceptance targets remain 4.5:1 normal text, 3:1 large text and meaningful boundaries/focus. Full measured contrast and actual Android scaling/Back verification remain outstanding; this document does not claim compliance has been proved.

[9 October browser verification](dashboard/verification/2026-10-09.md) covers approved changes and explicit limits.

Animation planning is deferred until a working app. Existing reference CSS may contain transitions; those are not a newly approved native motion specification.

## Group 2 integration enforcement — 9 October

The private test now consumes shared semantic tokens for both cards' gradient, glass materials, header/icon geometry, responsive insets and typography. See [tokens](DESIGN_TOKENS.md) and [component contracts](dashboard/group-2/COMPONENTS.md). The shared heading exception below 360px is 22px on both cards. Inter/Poppins font delivery is explicit; system fonts are fallback only. The canonical visual references are unchanged. Source verification is distinct from rendered acceptance; current phone/desktop appearance remains to be checked.

## Supporting documents

- [Card index](dashboard/README.md)
- [Group 1 usage and connections](dashboard/group-1/USAGE-AND-CONNECTIONS.md)
- [Group 2 specification](dashboard/group-2/SPECIFICATION.md)
- [Review plan](dashboard/PLAN.md)
- [Original Group 1 specification](../references/dashboard/source/group-1-spec-2026-10-05.md): provenance; superseded where current specifications record later decisions. Its proposals remain proposals.



## Group 1 current components

[Group 1 components](dashboard/group-1/COMPONENTS.md) define purpose/anatomy/states/content/accessibility/responsiveness. Reuse blue/navy modal shell, 32px radius, responsive 20/24px insets, static initial-heading focus, 85dvh scroll boundary and reachable sticky Close. File popup centres category icon/status/filename(s)/minimal text links; editable preparation fields align labels left for scanning. Preparation shows outstanding categories and Shorts review, rather than every passed filename. Buffer empty state centres a quiet calendar icon without invented counts or FAQ filler.

Four status states use symbols with accessible wording: ✓ Pass, × Missing, ! Needs attention, - Not checked. Missing/error/stale/unconnected are different meanings. Buttons/links have 44px targets and focus outlines. Semantic tokens own fields, supporting text, links and sections; existing historical card CSS still contains scoped geometry overrides. Consolidation does not claim every legacy style is fully tokenised or measured WCAG compliance.

## Group 3.1 and shared shell — 11 October

Approved green Payhip identity: 155deg #065f46 / #044e39 at42% / #022c22; green beam #34d399 at .75/.18/transparent with existing shared geometry/materials. Current 3.1 is one desktop half-width slot, min590px with accessible growth, 32px card/22px recess/20px mobile and24px desktop insets. Match shared 58px glyph and12px label gap. Three tier rows replace MP3/WAV labels. See Group3 spec/components for states and connection limits. This does not approve 3.2/3.3 palettes or a three-card grid.

Shared header: three native links, Release/Performance/Sales, aria-current,48px targets,12px compact/13px desktop link text,16px shell radius and12px active-link radius;960px maximum, desktop inline and phone stacked. Compact native details/summary for setup;14px controls/12px help text/44px targets. Saved YouTube restore collapses its setup. Existing Drive-open-if-unconfigured behaviour stays. No change to existing card internal dimensions or colours.

Shared-shell delivery: scripts/sync-dashboard-styles.mjs embeds the same source stylesheet before build so navigation/canvas do not depend on a second request. All pages explicitly use #0f172a and dark colour-scheme. Active navigation has white .32 border/.12 fill with a quiet inset highlight; inactive segments retain boundaries on hover. This fixes the screenshot-proven unstyled shell; rendered post-fix device acceptance remains pending.


11 October recovery: direct CSS imports into route handlers caused the framework to wrap GET as a React component and produce live500 responses. Removed those imports and the unused CSS route. Prebuild syncs CSS into HTML. verify-compiled-pages.mjs executes the compiled checklist/commerce handlers, verifies200/401 and scans all three handlers for accidental React wrapping. Source-only tests were insufficient.

Payhip setup uses the same compact shell panel above its card: native details, 12px labels/help,14px fields/actions,44px targets,12px field corners and explicit loading/save/error/verification state. Secret inputs are password-style and cleared after save; restored saved credentials are never displayed.

Payhip reporting states retain the green card material and fixed three-tier recess. Quiet footer Refresh sales updates prospective data; View sales owns order/refund/coverage details and reversible test exclusion. Observed licence dropdowns belong in compact setup, not the card. Unverified/loading/failure uses dashes with text; verified zero observed sales is distinct from unavailable. Unallocated GBP and refund attention remain explicit. No new palette or geometry introduced; rendered acceptance remains pending.


## 12 October — verified email source and focused details

User screenshots confirm real Mailchimp2 active subscribers,1 monthly signup/0 unsubscribes and successful access after redirect repair. CJ requested removing small explanatory card/FAQ copy, improving newsletter spacing, subscriber emails/dates in details and Sync footers. Card now omits coverage paragraph and duplicate current-total/monthly-activity copy; newsletter has consistent12px gaps and centred envelope empty state. View details fetches authenticated selected-audience active members on open,50 per page with Load more, emails/signup dates/status/source (missing date explicit; no inferred history). Current active audience list is independent of monthly aggregate selection; no stored subscriber payloads. Newsletter empty and unavailable states use icon/centred copy; no FAQ filler. Both3.1/3.2 footer refresh actions use existing16px outline Sync glyph/44px text control; email busy disabled/spinner with reduced-motion support.

Shared empty-state contract: centred34px outline category icon, concise title/supporting line,12px spacing; never fabricate counts/actions. Use within private details and empty recessed sections. Useful loaded data replaces this anatomy. Green material/shared typography maintained. Build/compiled route/private200/401,Mailchimp storage/reporting and Payhip commerce/shell checks pass; fresh rendered polish/member-list response pending. No sending enabled.

## Dashboard size redesign — confirmed 12 October 2026

Use two dashboard card sizes at normal text settings: **Compact430px** and **Large880px**, with a **20px inter-card gap**. Dimensions include internal padding/borders. Two Compact cards stacked plus one gap equal one Large:430+20+430=880. Cards within a group share the same size; different groups can differ. Preserve existing two-column widths/960px cap/840px breakpoint,20/24px internal insets, materials, typography and44px controls unless a focused redesign requires an agreed change. No205px Small or655px Medium tier: those earlier proposals are superseded. Do not introduce another size without a demonstrated content need.

This is the confirmed target grid, not a claim that existing cards already fit it. Implement Group3 first as the Compact proof: redesign both Payhip and Email List together and validate populated/empty/loading/error/long-content states. Details retain richer information; do not clip useful content or shrink touch targets to meet the height. Group1 remains at its current measured pair sizing until reviewed;512/532px are minima, not actual rendered heights. Assess it next and agree a content/layout redesign if neither size fits; do not stretch it to880px just to fill space. Group2 retains880px and its functional leaderboard viewport; verify combined dashboard alignment after Group3/Group1 review.

Mobile uses the normal compact/large targets with natural vertical stacking; enlarged text and exceptional long content require accessible reflow/full-view exceptions, never clipping. Alignment of a combined dashboard at desktop applies to normal-size states and excludes external connection/selection panels. A combined dashboard has not been implemented. Current routes and existing card geometry remain unchanged until each redesign is built and verified.


## Group3 Compact redesign — 12 October

CJ authorised matched430px Group3 cards and a clearer sales/detail hierarchy based on screenshots showing mismatched recess tops and dense numbers. Current normal-size pair uses shared84px horizontal glyph/identity header,44px period,remaining recess,44px footer and8px track gaps with existing20/24px insets;58px glyph,fonts,colours,radii and20px pair gap preserved. Payhip hides redundant large empty-state block; three tier rows carry values and header carries unavailable/attention status. Target button remains functional in View sales. Email uses smaller activity tiles and compact icon/title newsletter empty state; full text stays in details. Both footer controls use existing Sync icon/text and44px targets.

Received sales dialog replaces dense summary sentence with prominent GBP amount/caption and2×2 labelled Paid orders/Refunds/Free checkouts/Excluded tests tiles. Show unallocated/attention note only when nonzero. Reporting caveats sit in expandable Reporting notes. Order rows separate state,date,amount and item/option; reversible test exclusion unchanged. Empty orders use centred receipt icon/title/copy. No revenue/refund/mapping/API logic changed.

Overflow observers switch both desktop cards to shared growth tracks for long content/enlarged text rather than clipping; fixed430 normal sizing is a target pending rendered verification. Build,compiled200/401/no-wrapper,commerce state/security/reporting and dashboard-shell tests pass; no supported browser QA available. Need fresh phone/desktop/long-title/error/enlarged-text verification. Group1/2 unchanged; Group1 review follows Group3 acceptance. Current redesign supersedes min590px vertical header/unequal recess rules in earlier sections.


## 12 October — spacing repair and revised size tokens

CJ screenshot confirms cramped icon/title, off-centre newsletter icon, beam outside card and first-tier separator. Authorised slightly larger Compact/Large sizes and more footer separation. Current normal targets **Compact450px / Large920px / gap20px**, superseding430/880;450+20+450=920. Group3 centred identity reserves142px including12px glyph-label spacing; period/footer44px,8px track gaps, equal remaining recess. Card clips beam to32px corners again; overflow exceptions change content tracks rather than expose glow. Newsletter empty-state wrapper spans recess width and centres contents. First Standard row border removed explicitly (hidden sales-empty div meant first-of-type selector previously missed it). Recess-to-footer spacing increased. Group2 uses920px slot with extra footer separation; content/leaderboard viewport unchanged. Group1 remains awaiting review.

Build/compiled200/401,commerce state and YouTube regression checks pass; refreshed screenshot/long-text/scaled rendering remains unverified. No backend/accounting/permissions changes. Preserve matched pair sizing and sensible accessible reflow.


## Visual acceptance and future Sync all — 12 October13:17UK

CJ accepts current Groups1/2/3 appearance as visually consistent with the shared design system, with nothing visibly out of place in his review. Record as user visual acceptance, not measured universal accessibility or every-state verification. Current normal sizes Compact450px/Large920px/gap20px remain.

After the combined dashboard is assembled, add a primary Sync all action at the top and make individual card Sync controls less prominent while retaining targeted retry/manual refresh. This is future approved direction, not implemented in this slice. Sync all refreshes connected data; it must not publish, schedule, approve or move releases. Show per-source outcomes/freshness and partial failures honestly; preserve existing independent selections. No change to current Sync controls now.


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
