# GemOs Section 2 — refinement specification

Updated 8 October 2026. Companion to ../DESIGN_SYSTEM.md. Shared agreed rules remain authoritative; the older audit is advisory. No further code changes without CJ’s confirmation. Ask about unsettled product decisions.

## Confirmed card 2.1 decisions

- Purpose: track short-form performance and views targets across YouTube Shorts, TikTok and Instagram Reels. Snapchat is excluded from 2.1 and its combined target.
- Period: rolling last 28 days, compared with the preceding non-overlapping 28 days. This supersedes the earlier calendar-month choice. Advance periods with the latest complete imported day, not the clock alone.
- Main figure: views once, with its unit and growth comparison. Combined views are reported plays, not deduplicated people.
- All tiles: YouTube Shorts views, TikTok views, Instagram Reels views, combined shares. Do not combine incompatible watch metrics. Combined shares require matching scope and periods.
- YouTube tiles: average percentage viewed, stayed to watch, subscribers gained, shares.
- TikTok tiles: average watch time, watched full video, followers gained, shares.
- Instagram tiles: average watch time, shares, follows attributed to Reels, saves.
- Confirmed status colours: neutral lavender for progress below target, zero growth and unavailable states; restrained green only for Target met or positive growth; rose for negative growth. Keep signed percentages in text and hide the headline comparison when its data is unavailable. Badge type sizes remain unchanged (10px growth, 11px target).
- Each platform target is editable. All sums the three targets. Display actual views, target and percentage achieved; Target met at or above 100%. No On track forecast, countdown or required daily velocity.
- Platform selection: individual softly rounded chips fully visible in one row, with no enclosing selector bar. Visible labels are All / Shorts / TikTok / Reels. All retains its grid icon; each platform keeps its brand glyph and full accessible platform name. Compact padding and gaps fit all four at 320px without wrapping or horizontal swiping. 36px visible height and 12px corners supersede the earlier 44px pill treatment. Confirmed roomier refinement: responsive horizontal padding is 4px below 360px, 7px at 360–389px, 9px at 390–639px and 12px above, reduced to 10px at 840–899px where two columns first appear. Gaps are 3px below 360px, 5px at 360–389px, 6px at 390–399px and 8px from 400px. The selector uses 8px more of the recessed panel’s inset on each side, keeping chips inside the panel and preserving the outer card’s 20/24px padding. At 320px retain 4px chip padding so larger gaps still fit without shrinking text.
- Confirmed brand treatment: YouTube red/white, TikTok white with cyan/pink accents, Instagram gradient with a white camera. Brand colours remain visible in both selected and inactive chips. All retains its neutral grid icon. Icons keep existing responsive 12/14/16px boxes and centred alignment. Inline SVGs have no external asset dependency.
- Exactly one chip is selected at all times. Expose a radio group and checked states; support arrow keys, Home/End, visible focus and selected-chip scrolling. Each chip has a 36px visible height with an invisible 4px extension above and below, retaining a 44px tap height without overlap between neighbouring chips.
- Selected chip uses the same translucent fill as the metric tiles (#ffffff1a), with a fine lavender inset border and white text; inactive chips have a quiet glass fill/border.
- Metric tiles use fixed row heights at each breakpoint: 136px below 360px, 112px at 360–639px, 104px from 640px. Reserve equal label/value/note slots so All and platform selections do not resize the tiles. Each slot spans the tile’s full inner width and centres its text; explicitly reset the old flex spacing rule for the grid layout. Target section reserves 128px. Enlarged text retains the reflow exception.
- Footer: Analytics details → on the right in white, matching 2.2’s white Ranking details action. A left-side Sync action and sync status replace the former comparison line. One footer only. Action retains Group 1’s 600 weight, 5px label/arrow gap and 8px × 2px padding. Comparison periods remain explained in Analytics details.
- Data-through label belongs beneath the reporting-period heading. Details show exact ranges, metric explanations and target editing.
- Partial data: display available views with Partial data and identify missing platforms. Hide combined growth and target status until required data is complete. Unknown values must never become zero.

## Confirmed card 2.2 decisions

- Purpose: learn which clips attracted the most viewing within a release batch. Rank by a frozen view-count snapshot captured around each upload’s own 24-hour mark; this supersedes the exact first-24-hour reporting requirement. Remove velocity, momentum and normalised-baseline claims.
- Batch selection: compact artist-and-track dropdown. Open on the current batch. Other batches remain selectable. The example dropdown contains the current and next batches.
- Reuse 2.1’s All / Shorts / TikTok / Reels chips, including brand icons, single-selection keyboard behaviour, selected fill, corners, padding and gaps. All ranks individual platform uploads together; a source clip posted on multiple platforms can appear multiple times. Explain differing platform view definitions in details.
- Only rank an upload once it has completed 24 hours and a valid snapshot around the 24-hour mark has been imported. Store actual publication and capture times and freeze the captured count. Later lifetime views are not a substitute for missed captures; missed results remain unranked. The acceptable capture-time tolerance is still to agree. Do not rank a capture made before the age threshold. Before then, show the upload below the ranked results, muted but readable, unranked, with its age and views so far. Results awaiting import remain unranked. Missing data is never zero.
- Remove rank-change arrows and unsupported algorithm explanations. Completed rows show rank, title, platform and captured views. The precise heading and snapshot explanation need CJ’s confirmation before changing the HTML.
- Show five fixed row spaces and permit manual vertical scrolling within the recessed area. Chips and batch selector remain outside the scrolling list. Show a subtle bottom fade only when more content is below; no automatic scrolling. Empty and shorter lists retain the same panel size.
- Keep relative-view bars: leader in the selected tab has a full bar; other lengths are views divided by that leader’s views. No bar for unranked uploads. Preserve the original podium ring treatment. Bars match 2.1’s target-fill gradient exactly: 90°, #818cf8 → #38bdf8 → #34d399.
- Tapping a row opens clip details with exact views, publication time in Europe/London, reporting status and an actual Watch clip URL when available. Example uploads have no invented links or platform-homepage fallback.
- Match 2.1’s exact purple gradient (#4338ca / #312e81 / #0f172a at 0/45/100%, 155°), retaining shared glyph/shine/dock material and outer insets. Main heading: Shorts Views (24hrs). One footer follows the shared rhythm, with Ranking details right and Sync/status left. Header supporting line shows only the selected batch’s date range. Example batches: Teeth & Claws runs Tuesday 6–Sunday 11 October 2026; Air Max 90s runs Tuesday 13–Sunday 18 October 2026. The date line updates with selection.
- Animation planning is deferred until the app works; native Android implementation remains a later decision.
- Planned Android review notification: on Monday, notify CJ once the selected batch’s last Sunday upload has completed its full 24-hour window and the required usable 24-hour snapshots have been imported. Handling missed snapshots in the final-review notification remains to agree; do not silently wait forever or call incomplete results complete. Open the final batch leaderboard for review. Do not call incomplete results final; delay the notification if results are unavailable. The HTML preview does not send notifications. Permission handling and native delivery will be settled during app implementation.

## Group geometry in this working preview

These are implementation values for review, not newly locked design tokens or a demand to reuse Section 1’s height.

- Centred group capped at 960 CSS px; 20px gap. Two equal columns from 840px, one column below.
- Both reviewed cards use an equal fixed 880px slot at normal viewing widths. Increased from the provisional slots to accommodate the batch selector, full heading and five visible scrolling rows without compression or overlap. Subject to CJ’s visual review; enlarged-text reflow remains an exception.
- Insets: 20px below 640px, 24px from 640px. Card corners 32px, recessed panels 22px, metric tiles 12px.
- Shared 58px glyph and 12px gap to labels. Matching-panel refinement supersedes the earlier compact header flow: both headers reserve at least 174px so panel tops align. Top insets and footer edges align.
- Inter for body and Poppins for main figures/titles, with system fallbacks. A Google Fonts connection supplies these fonts when available.
- Confirmed palette decision (6 October): restore card 2.1’s original rich purple gradient, #4338ca at 0%, #312e81 at 45% and #0f172a at 100%, at 155°. The lighter numerical match to Group 1’s blue was rejected after visual review and is superseded. Shared design consistency comes from the agreed card shadows, glyph/dock materials, spacing and indigo beam geometry/strength; identical lightness/chroma across hues is not required. Card 2.2 now uses the exact same rich purple gradient as 2.1, confirmed by CJ on 6 October.
- Matching recessed panels: 575px below 640px, 583px from 640px; shared 12/16px inner padding and 22px corners. Both headers reserve at least 174px to align panel tops in the normal layout. Preserve metric tile sizes and five-row leaderboard viewport; extra 2.1 space awaits review.
- Per-card Sync follows Group 1’s icon-plus-text control with no circular background; status starts Not synced and becomes Not connected in this offline preview. No separate group Sync; a dashboard-wide Sync all is planned. Live refresh must preserve cached figures and report source availability.
- Card 2.2 list viewport: 360px with five 72px row spaces. The batch selector and chips do not scroll with the list.
- No data or platform switch changes a normal card slot. At extreme zoom/narrow layout, permit reflow rather than clipping controls.

## Preview data and boundaries

- Original supplied views: YouTube 92,400; TikTok 54,600; Instagram 26,800. Correct combined result: 173,800, excluding Snapchat’s 10,400.
- Original platform targets: 100,000 / 60,000 / 30,000. Correct combined target: 190,000.
- All figures are illustrative, not live imports. The sample reports data through 4 October 2026. Current range: 7 September–4 October; comparison: 10 August–6 September.
- CJ authorised labelled example figures for design review. Previous-period views are illustrative: YouTube 74,500, TikTok 47,900, Instagram 24,600. Growth is computed from these example records, not copied as an unsupported claim.
- Example shares: YouTube 1,260, TikTok 840, Instagram 420; All = 2,520. Example TikTok average watch time 16.8s, Instagram follows 100, saves 310. All sample figures are labelled Example data; real unsupported metrics must still show Unavailable. Attribution must be verified before live use.
- Platform metrics must be collected/aggregated for activity during the selected window. API support, historical retrieval, retention weighting and source attribution remain unsettled. Do not substitute lifetime post totals or unweighted averages.
- Card 2.2 now follows the confirmed review above. Snapchat is excluded. Labelled examples reuse supplied clip names/counts and include illustrative additional platform uploads and newer uploads to demonstrate scrolling and waiting states. Sample reference: 11 October 2026, 18:00 UK; the current batch demonstrates completed and waiting uploads, and the next batch demonstrates an empty state. This is a future illustrative snapshot, clearly labelled as example data in the preview and details. No real upload URLs or live integrations are supplied.
- Native modal dialogs support keyboard focus, Escape, close buttons, backdrop dismissal and return focus. Targets save locally when storage is available; otherwise apply for the session with an explicit message.

## Still to review

Live integrations, dependable snapshot scheduling, acceptable capture-time tolerance and cross-platform data coverage. Actual Android font scaling and Back-button behaviour. Final animation planning after a working app. Current group dimensions remain subject to CJ’s visual review.

## Verification

Restored-version Chromium checks passed at 320, 360, 390, 412, 768, 1024 and 1280px across all four platform tabs (28 states). Both cards maintained equal fixed heights without reflow in normal viewing; no page overflow, card overflow or dock/footer overlap. Mobile and desktop screenshots were visually inspected. Swipeable selection, target editing, partial data, original clip details, Escape dismissal and focus return passed; no script errors. Actual Android Back behaviour, live imports and full measured contrast auditing remain unverified.

Icon-chip verification: all four selections checked at 320, 360, 390, 412, 768, 1024 and 1280px. Recessed panel and tile heights are identical across selections at each width. Exactly one checked chip; arrow-key selection works. No card/footer overlap, tile overflow or page overflow, and no script errors. Mobile and desktop captures inspected.

Aligned-chip verification: 28 states across 320, 360, 390, 412, 768, 1024 and 1280px passed. All / Shorts / TikTok / Reels fit fully within one row at every tested width; touch targets remain at least 44 × 44px. All metric labels, values and notes span their tile’s inner width and are centred. Panel and tile heights remain unchanged when switching platforms, both group cards remain equal height, keyboard selection works, and no overflow, footer overlap or script errors were observed. Mobile and desktop screenshots visually inspected.

Soft-chip verification: 52 selections across 320, 359, 360, 379, 380, 390, 399, 400, 412, 768, 840, 1024 and 1280px. Chip labels/icons and metric text are centred, chips are fully visible on one row, interior clearance is at least 4px, and chip heights/corners measure 36px/12px. Pointer hit testing confirms the invisible vertical extensions belong to the intended chip; keyboard selection works. Panel sizes remain stable across selections with no clipping, overlap or script errors. Mobile and desktop captures visually inspected. At 840px the existing group reflow exception produces equal 879.5px card heights; this is also present in the prior aligned-chip preview, caused by the unreviewed 2.2 content. Final group geometry at the two-column transition remains to settle during 2.2 review.

Footer/status refinement verification (6 October): 52 normal layout selections across the same 13 responsive widths passed, with stable panel sizes and centred chips/metrics. Sixty additional cases across All / Shorts / TikTok / Reels at 320, 390 and 1280px verified below-target neutrality, green Target met, rose negative growth, neutral zero growth and neutral missing-data target status with headline comparison hidden. The footer action measures weight 600, 5px arrow gap and indigo accent; no footer clipping or overlap, page overflow or script errors. Mobile and desktop screenshots inspected. Existing 840px group reflow remains recorded above.

Roomier-chip verification (6 October): 52 responsive platform selections passed with larger measured gaps, increased chip padding wherever space allows and unchanged outer-card insets (20px mobile / 24px desktop). Chips stay inside the recessed panel, on one row, with centred icons/text, 36px visual height, 44px extended tap height and no clipping or overlap. Panel sizes remain stable across platform selection; footer/status checks still pass. Mobile/desktop screenshots inspected. At 320px only the gap increases, since further chip padding would prevent the four labels fitting. Existing two-column transition reflow remains for the 2.2 review.

Superseded matched-purple experiment (6 October): matching Group 1’s base gradient lightness/chroma numerically produced a lighter, muted purple that CJ rejected. This experiment is not the current palette.

Restored-purple verification (6 October): restored the original 155° purple gradient and 0/45/100% stops. The HTML is byte-for-byte identical to the last Brand-Icons preview, preserving every other approved content, selector, status and layout change. No new layout checks were run for this colour-only restoration, following CJ’s request.

Card 2.2 refinement verification (6 October): 64 batch/platform states across 320, 360, 390, 412, 768, 840, 1024 and 1280px passed. Both cards remain equal fixed 880px slots; no normal-view reflow, page overflow or dock/footer overlap. All four chips fit one row. List viewport is 360px with five 72px row spaces, independent of platform and batch; ranked results precede unranked uploads. Manual scrolling, single-selection arrow keys, clip details, Escape and focus return passed without script errors. Mobile and desktop screenshots were inspected, including the corrected unobscured heading. Actual Android Back/font scaling and live first-24-hour retrieval remain unverified.

Colour/title/date refinement (6 October): card 2.2 uses the exact 2.1 gradient, heading Shorts Views (24hrs), batch date range instead of the header example-data timestamp, and a right-only Ranking details footer. Fixed geometry and approved chips/scroll behaviour remain.

Dated-purple verification (6 October): 32 batch/platform states at 320, 390, 840 and 1280px passed. Both cards resolve the identical purple gradient; each batch shows its intended Tuesday–Sunday dates, and the heading matches Shorts Views (24hrs). Equal fixed heights, chip fit, row order, empty next-batch state, manual scrolling, keyboard selection and dialog dismissal/focus return passed without script errors. Mobile screenshot inspected.

Bar/footer refinement (6 October): both detail footer actions use white text, with no left footer label. Card 2.2 relative-view fills match 2.1’s target-bar gradient. Only decoration and footer copy changed.

Matched-panel/Sync verification (6 October): 32 batch/platform states at 320, 390, 840 and 1280px passed. Both recessed panels share their height and position within the fixed 880px cards, with no page overflow or footer overlap. Chips, five-row viewport, pending order, manual scrolling, keyboard selection and dialog dismissal/focus return passed without script errors. Mobile and desktop captures inspected. Both left footer Sync controls report Not connected when pressed; this preview performs no live import. Both detail actions remain white.

## Integration feasibility review

See ANALYTICS-FEASIBILITY.md for the documentation review covering all 11 original cards and the revised Group 2 metrics. It is a feasibility review, not a tested integration or an approved analytics redesign. In particular, selected-window activity must not be replaced by lifetime totals for posts published in that window. The approved around-24-hour snapshot approach still needs capture-time tolerance and scheduling verification. YouTube Stayed to watch and clip-attributed follower metrics require further decisions or verification. Existing illustrative figures remain unchanged pending CJ’s decisions.

## Integration decisions — 8 October 2026

- Start with direct platform APIs; no paid analytics service is selected.
- TikTok Business and Instagram Creator/Business are provisional account types, reported by CJ as fairly certain; verify before integration testing.
- CJ approved snapshots captured around 24 hours for 2.2, with actual capture time recorded and missed captures unranked. Exact-window reporting is no longer required. Capture tolerance, display wording and missed-capture review behaviour remain unsettled.
- Activepieces is optional: evaluate only if it saves meaningful work compared with a small custom scheduler. No workflow engine or hosting choice is approved.
- See PLAN.md for the review sequence. Next: resolve the YouTube Stayed to watch tile in 2.1, then remaining metric and scope decisions before a real import test.
- This update changes documentation only. Current HTML still uses illustrative figures and the earlier title; no additional UI or integration code has been authorised.
