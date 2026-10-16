# Release Planner — specification

Updated16October2026. Separate owner-private /planner route using the GemOS design system. Shared product wording: [glossary.md](../../../glossary.md).

## Layout

Use the available screen width on phone and desktop with responsive gutters; no1536px cap or simulated phone frame. Remove the release-summary box/sidebar. Release identity remains on individual example posts and in details. Week/Month/Year and Today/navigation remain; one platform-selector group sits directly below view controls. Selectors wrap to two columns on mobile.

Four independent destinations: YouTube, YouTube Shorts, TikTok, Instagram Reels. Each has a recognisable native coloured SVG logo, text label and card tint. Main and Shorts filter separately without duplicating posts. All filters remain available in both sources; an empty/unverified destination is not fabricated data.

Week: seven-column desktop board with contained horizontal scrolling if needed; mobile week-strip and selected-day agenda. Month: individual compact platform entries on desktop and date grid/day agenda on mobile. Year:12 miniature month grids opening Month view. Previous/next advances the selected period. Today retains the view.

Keep Inter/Poppins,32/22/12px radii,20/24px gutters (12px narrow-phone exception), fine borders, glass/recessed materials and contained highlights. Dark navy/slate and pale blue-grey themes avoid pure black/white; preference alone persists locally. Existing dashboard card palettes/geometry stay unchanged.

## Shared source and status ownership

YouTube schedule is the default source. GET /api/youtube/schedule reuses the exact saved owner/channel/connection-revision/current-anchor report shown by Release Buffer. No provider query, write or monitored run occurs on reading the calendar. Reload on focus/source selection; Sync the existing Release Buffer workflow to refresh Studio data. Source timestamp remains visible.

Each actual upload has its real ID/title/UK publication time. Verified main/Short format determines the filter; unknown format/processing stays Unverified. Expired timestamps or retained results after a failed read say Stale, never Published. Deduplicate video IDs. Successful empty results, no saved check, disconnected source, required channel selection and errors remain distinct. Lost access or channel mismatch clears the records.

An actual upload's Artwork unavailable placeholder is explicit; no invented thumbnail/project link. Do not join an upload to a remix/project by matching date or title. Asset readiness says Not checked until an explicit shared project association exists. TikTok/Reels actual scheduling remains unverified until connected. Calendar status is read-only: no status dropdown or Apply control.

The calendar does not alter Buffer's seven-YouTube-upload coverage eligibility or its first-gap stopping rule. A scheduled wrong-day upload can appear without filling a required slot.

## Example plans

A separate Example plans source supports visual review with fictional content. One main YouTube remix Monday plus one Short/TikTok/Reel each Tuesday–Sunday gives19 separate entries/week. All examples say Planned only, expressing intended time without readiness/scheduling confirmation. Examples never mix with actual source records.

Add release appears only in Example plans. It accepts an unfinished working title, valid Monday and time, rejects duplicate weeks and creates19 in-memory entries. Drafts reset on reload. Post details show planned timing plus asset readiness Not checked, a source explanation and dashboard link. Native dialogs support Close, Escape, backdrop dismissal and focus return.

## Delivery and limits

Delivered private Site version77, source `dc826293ef091983d36ee61d326c922bdd5cb4b8`, on16October2026. [Runtime contract and checks](../integration-tests/youtube/PLANNER.md).

Actual inline-script and saved-API fixture tests, source-token contrast checks, existing scheduling backend fixtures, production build and compiled private200/401 checks pass. No browser-rendered/device QA or live owner-cache comparison is claimed.

Next: review actual responsive rendering in both themes, then owner-scoped saved plans and explicit project/asset/upload associations sharing dashboard records. No source-derived fact becomes manually editable.
