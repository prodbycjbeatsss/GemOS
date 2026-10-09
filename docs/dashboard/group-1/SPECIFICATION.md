# Group 1 — visual and interaction specification

Updated 9 October 2026. Finalised visual reference: [preview.html](preview.html). Master rules: [DESIGN_SYSTEM.md](../../DESIGN_SYSTEM.md). Purpose, data meanings and integrations: [USAGE-AND-CONNECTIONS.md](USAGE-AND-CONNECTIONS.md).

## Geometry and material

- One column below 840px; two equal columns from 840px. Group capped at 960px, centred, with a 20px gap.
- Both card slots: 512px at ≥360px; 532px at 320–359px. Standard 20/24px outer insets, 32px card corners, 22px recess corners.
- Match glyph and main-heading positions and footer bottom edges. Shared 58px glyph, 12px glyph-to-label gap, reviewed 24/30px main type scale and 16px heading-to-panel gap.
- Recess heights can differ: the buffer accommodates three projects and the checklist all seven parts. Do not stretch rows to fill empty space.
- Inter body and Poppins main answer. Blue/amber/rose state treatments are the reviewed Group 1 palette in the master document. Keep actual preview glyph, beam and inset-shadow treatment.

## Card 1.1

- Header: Release Buffer, weeks-ahead answer and coverage date/supporting state.
- Project rows use 50px minimum height, 4px vertical padding/gaps and 1.3/1.4 name/date line heights so fallback fonts fit the normal slots.
- At most three project rows. Show artist/track, date and status; names can wrap within the fixed slot.
- Next Up and Scheduled have restrained green badges; In Progress remains neutral. State eligibility is defined in usage notes, not inferred from colour.
- More than three projects: Show all opens a labelled scrollable dialog; dashboard slot stays fixed.
- Empty list: No upcoming projects. Zero buffer does not imply there are no projects: unfinished or later projects still remain visible.
- One footer; Release management → on the right. Project rows open release-management preview/details.

## Card 1.2

- Header: Pre Release Checklist, project name and correct n/7 Files Ready count.
- Seven informational parts, with compact icons, descriptions and Pass/Missing text. Shorts represents six source files, not six additional checklist categories. Current categories: Remix WAV, Beat MP3, Stems archive, Project ZIP, Thumbnail, YouTube video and Shorts.
- Multiple missing parts can be displayed simultaneously. No overall green-card requirement; missing state uses the reviewed rose treatment.
- Asset rows are not tappable. One footer: Sync and status left, Release details → right. No dashboard test controls.
- Sync currently reports Drive not connected. This is a preview result, not a scan.

## Acceptance and review boundaries

At normal text size, preserve equal group slots, no card/footer or row clipping, long-name handling and stable empty/overfull states. Verify informational versus interactive affordances, modal focus/dismissal and visible sync result.

The original full specification is retained as [historical provenance](../../../references/dashboard/source/group-1-spec-2026-10-05.md). Its proposals do not silently change this finalised visual reference. Full measured contrast, actual Android scaling/Back and live connections remain unverified. Approved R01–R03/R10 changes are implemented. Enlarged fonts that overflow enable accessible reflow: cards grow, full names/descriptions wrap, checklist parts use one column and footers wrap. Normal font sizes restore fixed slots. See [9 October verification](../verification/2026-10-09.md).


## Confirmed readiness states — 9 October 2026

Use the file convention and rules in USAGE-AND-CONNECTIONS.md. Filename differences alone do not block readiness. An unclear asset role or competing eligible candidates show Needs confirmation, not Pass or a plain Missing result. Keep asset rows informational; candidate review belongs in Release details. Do not count unresolved categories as ready. Folder/filename conventions and this state are approved requirements; the separate private scanner page now implements these states; canonical preview labels remain legacy. Hosted scan and rendered acceptance remain unverified. See ../integration-tests/youtube/ASSETS.md.

## Checklist title and Release details — 9 October 2026

The private test uses the remix track title, with original project folder metadata retained in details. Display cap: 48 graphemes including ellipsis; maximum two visual heading lines; full title available in details and accessible naming. This limits display only, not input filenames. Asset labels may wrap. Release details uses Group 1 materials/type, sticky heading/44px close target, readiness/freshness summary, status badges, wrapped filenames and styled candidate selectors. Informational dashboard rows remain untappable. Overflow detection includes the recessed panel. These changes are implemented in the private test; revised rendered fit is not yet verified. See ../integration-tests/youtube/ASSETS.md.


## Private comparison page: paired cards

CJ approved restoring the Group 1 pair on the private checklist page for comparing proportions. Card 1.1 uses the accepted reference anatomy/material with three illustrative projects/dates/statuses and a visible Example/Preview only label. It performs no live buffer calculation or scheduling query; its rows/footer open an explanatory preview dialog with Escape/close/focus-return behaviour. Card 1.2 continues using the existing Drive result. Desktop is two equal columns from 840px within 960px; mobile stacks 1.1 above 1.2. Normal fixed reference slots remain; when overflow activates the shared one-column asset reflow, both cards receive a shared minimum height calculated from the tallest natural card, including mobile. This is a comparison slice, not approval of a permanent one-column redesign or filler content. Syntax, title regression and production build pass; rendered matching height, enlarged-text behaviour and phone/dialog acceptance remain unverified. Next: CJ refreshes the same /checklist page and reviews both cards together. No new consent or sample link is required.
