# Group 1 — visual and interaction specification

## Current checklist contract — 10 October 2026, eight required categories

CJ confirmed Beat WAV is required alongside Beat MP3 for future automated beat sales. This supersedes every earlier seven-category/7-of-7 contract and statement that Beat WAV is informational. The eight checks are ordered in four equal two-column rows: Project ZIP | Stems ZIP; Beat WAV | Beat MP3; Remix WAV | Thumbnail PNG; YouTube video MP4 | Shorts ×6 MP4. Shorts no longer spans two columns. File type is separate muted 10px supporting text below the 12px file name. “7z” is removed from the tile label only: stems still accept ZIP or 7z. Thumbnail PNG is the requested tile label; existing JPG/JPEG/PNG/WebP compatibility is retained, not narrowed by this presentation change.

Readiness denominator is eight everywhere. Beat WAV uses AUDIO plus compatible nonempty WAV metadata, excludes WIP and automatically recognises clear beat markers while excluding remix markers. Unclear files require association confirmation, and beat/remix WAV must be distinct files. MP3 cannot substitute for WAV. FLP remains outside the readiness total. Saved seven-category results are normalised by role into the new order, retain their original check timestamp, and leave Beat WAV Not checked until Sync; they cannot qualify as 8/8 from the old scan. The UI binds by role rather than array position. No forced consent or renaming is needed.

Synthetic asset checks cover full 8/8, independent WAV/MP3 eligibility, WIP/MIME mismatches, distinct audio, legacy migration, existing scan/auth/persistence behaviour. Existing title/geometry checks, syntax and production build pass. Live new Beat WAV scan and refreshed mobile/desktop rendering remain unverified. Previous 3/7 screenshots and seven-category notes below describe historical evidence.


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


## Current private Group 1 geometry/dialog contract — 10 October 2026

CJ approved returning the asset grid to two columns, matching both recessed panels and preventing independent card alignment, plus a common simpler pop-up style based on 1.1 and useful buffer details. Implemented shared Group 1 header/recess/footer/slot geometry, measured from the largest natural content in either card. Geometry is group-owned: a changed title, error/status, font or viewport cannot independently size one card or move its recess/footer. The two-column asset grid reserves 78px minimum rows and wrapped labels/statuses, with Shorts spanning both columns. The group retains the 840px desktop breakpoint/960px cap/20px gap and accepted blue/glass material, 58px glyph, 12px label gap, 16px panel gap, 32px card and 22px recess corners, Inter/Poppins and responsive 20/24px card insets. Card height is at least the earlier 512/532px baseline but grows as a matched pair to accommodate the complete two-column checklist; this live integration contract supersedes independent recess sizing and overflow-triggered one-column switching. Font loading, resize and observed intrinsic content changes recalculate common dimensions.

Both details dialogs now use one blue/navy fill, border/shadow, typography/insets, informational row/status styles and 44px Close control. 1.2 retains full track/folder metadata, readiness/freshness, filenames and candidate association. 1.1 adds the selected or all example project dates/statuses, 19-upload coverage requirement, consecutive-week/first-gap rule, exclusions, current Drive readiness as a separate fact and the next real scheduling-confirmation source needed. Its examples remain explicitly illustrative; it does not claim live scheduled coverage.

verify-layout.mjs passes across 128 combinations of long header/panel/footer dimensions and insets, plus the narrow-screen minimum; verify-title.mjs and changed JS syntax pass; production build passes. These are geometry-contract/source checks, not rendered browser evidence. Refreshed Android/desktop, all real font/status combinations, modal interaction and actual enlarged-text fit remain unverified. No supported browser QA is available. Do not claim an absolute no-use-case visual guarantee from these checks. Next: refresh the same /checklist and check both recesses/footers and both dialogs; no new consent required.


10 October follow-up: repair the screenshot-confirmed Group 1 regression with explicit full-width stretched grid columns and card-scoped natural-height measurement overrides. Geometry/title/build checks pass; refreshed desktop/mobile alignment still needs rendered verification. See the current ASSETS.md checkpoint.


## 10 October 2026 — compact file checklist redesign

CJ authorised a direct redesign within the accepted system, keeping only useful card information and allowing review afterwards. The private checklist now uses two columns of quiet 12px-radius file tiles: one 22px outline icon in a 24px slot, one category/format label and a compact status. Removed duplicate format subtitles, full-tile missing/ready colour washes and the separate bottom-right status position. Seven categories remain; Shorts ×6 spans the full row. Minimum tile height is 64px, gap 6px and padding 10px. The title remains track-only and capped; the summary is “n/7 ready”.

UI status vocabulary: Ready (backend Pass), Missing, Needs attention (backend Needs confirmation), Not checked before a result. Status wording plus a small check/minus/exclamation/dash distinguishes states without colour alone. Needs attention requires association review in Release details and cannot count as ready. Partial missing Shorts retain n/6 when nonzero; filenames, candidate selection, reasons, timestamps and full metadata remain in Release details. No scanner rules changed.

Shared card/recess/header/footer geometry, responsive breakpoint, blue/glass materials, Inter/Poppins, colours and radii remain. The smaller checklist can reduce the pair’s natural height without independent card sizing. JS syntax, existing geometry/title checks and production build pass. Browser-rendered mobile/desktop appearance and acceptance remain unverified. This is the live integration redesign; the original approved preview remains historical reference.


## 10 October — centred checklist tiles and symbol-only status

CJ requested centred text/icons and only a tick, red X or dash for status. Each of the eight tiles now centres the file icon, name, muted format caption and status vertically in a compact stack. Status uses a green ✓ for Ready, red × for Missing, amber ! for Needs attention and - for Not checked. Needs attention remains distinct from absent files. Status text and Shorts counts remain in accessible labels/title and Release details; colour is not the only distinction. No tile click target was added. Four-row ordering and eight required categories are unchanged. Shared pair measurement still owns recess/slot geometry. Tile minimum is 88px with 8px vertical/10px horizontal inset and 3px icon-to-copy gap; names use 12px/1.2, types 10px/1.2, and centred symbols 15px in a 20×16px box. Missing colour uses #fb7185.

JS syntax, existing title/layout checks and production build pass. Updated browser appearance remains unverified; private test is the review surface. Scanner eligibility, legacy scan handling and confirmation logic are unchanged.
