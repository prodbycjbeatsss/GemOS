# Release Planner — specification

Confirmed15October2026 by CJ. Separate self-contained HTML design preview at /planner, within the existing owner-private Site. Existing dashboard cards remain unchanged.

## Confirmed revision — 16 October 2026 (pending implementation)

CJ reviewed version76 and requested:
- Use the available screen width on phone and desktop, with responsive gutters. No phone-shaped frame or narrow simulated device container; remove the1536px cap where it limits the workspace.
- Remove the Night Shift/release-summary box from the top on mobile and its desktop sidebar equivalent. Release identity stays on individual posts and in details.
- Put one platform-selector row directly below Week/Month/Year in both layouts. Permit wrapping on narrow screens while keeping every option accessible.
- Four distinct filters: YouTube, YouTube Shorts, TikTok, Instagram Reels. Keep the weekly count at1+6+6+6=19; this change must not duplicate YouTube posts.
- Use recognisable coloured platform logos alongside labels and retain platform card tints. Preserve soft dark/light themes and the established typography/materials.
- Remove the manually editable demonstration-status control and “Preview status” wording. Real readiness/scheduling facts must come from the same underlying records/services as the dashboard cards. Planning dates are separate editable intent.
- Use [the shared glossary](../../../glossary.md) as the wording authority. Keep planning, asset readiness, review/queue stage and platform confirmation distinct.

The execution environment failed to connect on16October. These are confirmed requirements, not deployed changes. Version76 still has the previous summary/filter/status demonstration. Do not claim shared-record integration until implemented and checked.

## Version76 implementation (historical baseline)

The sections below describe the deployed prototype baseline. The confirmed revision above supersedes conflicting layout/status choices as the next target; it does not retroactively change the deployed code.

## Workflow and content

One main release/week. Monday has one main YouTube remix; each Tuesday–Sunday has three independent entries: YouTube Shorts, TikTok and Instagram Reels (19 total/week). An incomplete project/working title can be planned. Cards contain thumbnail, title, status and planned time. Remove reference profile pictures/comment controls.

Illustrative Planned/Files ready/Scheduled statuses are visibly example data. Preview edits reset on reload; local theme preference alone persists. Production integration will preserve independent plan, readiness and actual platform evidence.19 planner entries do not change Release Buffer's separately agreed seven-YouTube-upload rule.

## Views

- Week default: seven-column desktop board with thumbnail cards and a slim release/platform-filter sidebar. Internal calendar scroll preserves readable day widths on narrower desktops.
- Mobile below840px: collapsible release summary and platform filters, seven-day strip with date activity markers, selected-day agenda with three separate cards on short-form days.
- Month: date grid with separate compact platform entries on desktop; activity dots and selected-day agenda on mobile.
- Year:12 miniature month grids; selecting a month opens Month view.
- Today returns to the current UK date while retaining the selected view. Previous/next advances a week/month/year appropriately.
- Clicking a post opens a labelled native dialog with thumbnail/title/platform/date/time/example status and preview-only status editing.
- Add release creates19 in-memory posts after a title, valid Monday and time; duplicate weeks are rejected. No full project/files are required.

## Design system and themes

Inter body/Poppins headings;32px outer,22px recess,12px controls;24px desktop/20px mobile insets with12px narrow-phone outer exception,12px internal gaps. Recessed glass, fine borders, contained highlight and44px primary action targets reuse GemOS visual principles. Calendar is a wider1536px workspace exception rather than a fixed920px dashboard card.

Dark navy/slate and pale blue-grey themes avoid pure black/white. Platform-tinted cards also carry platform names/icons. Theme tokens are scoped to planner.html; global dashboard palettes remain unchanged. Source-token contrast checks cover normal text/platform labels at4.5:1 against base/card backgrounds, including hover. Actual compositing/rendering still requires review.

## Evidence and next action

Runtime contract/tests: [PLANNER](../integration-tests/youtube/PLANNER.md). Actual inline-script tests and compiled auth/build checks pass; no browser-rendered measurement claim. CJ should review desktop/Android, light/dark, Week/Month/Year, long titles, dialogs and empty/filter states before connected Planner implementation.

References supplied by CJ: desktop thumbnail calendar screenshot and mobile week-strip/day-list example. These inform layout only; profile/comment features are omitted and GemOS materials replace source styling.
