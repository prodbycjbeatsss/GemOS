# Release Planner — specification

Updated17October2026. Separate owner-private /planner route using the GemOS design system. Shared product wording: [glossary.md](../../../glossary.md).

## Layout

Use the available screen width on phone and desktop with responsive gutters; no1536px cap or simulated phone frame. Remove the release-summary box/sidebar. Release identity remains on individual example posts and in details. Week/Month/Year and Today/navigation remain; one platform-selector group sits directly below view controls. Selectors wrap to two columns on mobile.

Four independent destinations: YouTube, YouTube Shorts, TikTok, Instagram Reels. Each has a recognisable native coloured SVG logo, text label and card tint. Main and Shorts filter separately without duplicating posts. All filters remain available in both sources; an empty/unverified destination is not fabricated data.

Week: seven-column desktop board with contained horizontal scrolling if needed; mobile week-strip and selected-day agenda. Month: individual compact platform entries on desktop and date grid/day agenda on mobile. Year:12 miniature month grids opening Month view. Previous/next advances the selected period. Today retains the view.

Keep Inter/Poppins,32/22/12px radii,20/24px gutters (12px narrow-phone exception), fine borders, glass/recessed materials and contained highlights. Dark navy/slate and pale blue-grey themes avoid pure black/white; preference alone persists locally. Existing dashboard card palettes/geometry stay unchanged.

## Shared source and status ownership

My plans is the default source (see saved-plan section below). YouTube schedule remains a separate read-only source. GET /api/youtube/schedule reuses the exact saved owner/channel/connection-revision/current-anchor report shown by Release Buffer. No provider query, write or monitored run occurs on reading the calendar. Reload on focus/source selection; Sync the existing Release Buffer workflow to refresh Studio data. Source timestamp remains visible.

Each actual upload has its real ID/title/UK publication time. Verified main/Short format determines the filter; unknown format/processing stays Unverified. Expired timestamps or retained results after a failed read say Stale, never Published. Deduplicate video IDs. Successful empty results, no saved check, disconnected source, required channel selection and errors remain distinct. Lost access or channel mismatch clears the records.

An actual upload's Artwork unavailable placeholder is explicit; no invented thumbnail/project link. Do not join an upload to a remix/project by matching date or title. Asset readiness says Not checked until an explicit shared project association exists. TikTok/Reels actual scheduling remains unverified until connected. Calendar status is read-only: no status dropdown or Apply control.

The calendar does not alter Buffer's seven-YouTube-upload coverage eligibility or its first-gap stopping rule. A scheduled wrong-day upload can appear without filling a required slot.

## Saved plans and Publishing settings — delivered17October2026

Settings → Publishing at /settings persists four initially blank local times and Europe/London timezone. New release plans inherit those defaults; all four must be set before generating19 posts. Defaults do not automatically rewrite existing plans. Review plan changes previews and explicitly applies eligible default changes, preserving personal overrides and platform-linked records.

My plans is the default source. Add release accepts an unfinished working title and Monday week; one active release/week and104 active weeks maximum. Save persists19 posts (1 main +6 per short-form destination), stable IDs, intended local/UTC timing, timezone, time source/default revision and record revisions. Open a saved post directly in one dialog with an editable release working title, read-only timing/facts and a selected-post Settings link. Name changes apply to all19 posts in that release; no second edit screen. Settings → Publishing → Individual planned posts edits dates/times within that release week, applies the current default and moves the whole release week retaining times/overrides. Calendar only edits an existing working title; its existing week/fold fields are disabled and title-save uses the stored week.

Owner-catalogue optimistic concurrency rejects stale edits and settings-write races. Save/reload/focus restores shared private records; unsaved modal/settings edits are protected from refresh. Dates use DST-aware UK conversion, rejecting nonexistent times and requiring first/second occurrence choice when repeated. Planning APIs cannot set provider-confirmed status or bind arbitrary platform IDs. Project/readiness/artwork/media associations remain the next slice, so readiness is Not checked.

Shared ui/planner-styles.txt is served as /planner.css to reuse soft-theme rules on Calendar and Settings. The .txt raw import avoids the framework's CSS-route wrapping; authenticated script/style routes are covered by compiled response tests. Calendar and Settings utilities are available from all dashboard groups.

## Example plans

A separate Example plans source supports visual review with fictional content. One main YouTube remix Monday plus one Short/TikTok/Reel each Tuesday–Sunday gives19 separate entries/week. All examples say Planned only, expressing intended time without readiness/scheduling confirmation. Examples never mix with actual source records.

The example Add release flow appears while Example plans is selected; My plans has its own persistent flow. It accepts an unfinished working title, valid Monday and time, rejects duplicate weeks and creates19 in-memory entries. Drafts reset on reload. Post details show planned timing plus asset readiness Not checked, a source explanation and dashboard link. Native dialogs support Close, Escape, backdrop dismissal and focus return.

## Settings-only timing rule —version79

Confirmed17October2026: existing post date/time edits and release-week moves belong exclusively in Settings → Publishing. Calendar times remain read-only; no drag/drop or inline timing edit. Creating a new calendar plan may select its initial Monday; subsequent timing changes use Settings. A direct link from each saved post selects it in the Settings form. Changing a planned time does not update provider-confirmed scheduling; future rescheduling remains a separate explicit operation. Working-title edits remain in Calendar.

Source `c2f0d30d58d3caa3cc676f813d1f3d6bca802d3c`, private version79. Updated real UI/API fixtures cover control location, deep links, conflict handling and unchanged Calendar week during a title edit; build/compiled private200/401 pass. No rendered proof claimed.

## Delivery and limits

Version78 adds Publishing settings and durable plans, source `877cf52f41c55747c91fab8a3b9bb3b68c6ca595`. Backend SQLite and actual UI-script/API fixtures, generated schema checks, Planner/group regressions and compiled owner200/401 build checks pass. No rendered or live owner-save acceptance is claimed.

Historical version77 delivery:

Delivered private Site version77, source `dc826293ef091983d36ee61d326c922bdd5cb4b8`, on16October2026. [Runtime contract and checks](../integration-tests/youtube/PLANNER.md).

Actual inline-script and saved-API fixture tests, source-token contrast checks, existing scheduling backend fixtures, production build and compiled private200/401 checks pass. No browser-rendered/device QA or live owner-cache comparison is claimed.

Next: review actual responsive rendering in both themes, then explicit project/asset/upload associations sharing dashboard records. Saved owner-scoped plans/settings are delivered. No source-derived fact becomes manually editable.


## Editor clarification —version80

A saved card is one editor, combining its release working-title input with read-only timing/evidence and Settings link. The title is shared by all19 release posts, not an upload title written back to platforms. Release/post UUIDs remain unchanged by editing. Drive folder IDs exist separately; explicit project association is still next.

Do not show UK clock-change fields for ordinary times. Reveal first occurrence (BST) / second occurrence (GMT) only if server validation identifies a duplicated local hour, and hide after resolution/relevant input changes. A nonexistent spring-forward time still requires another time. UI/API fixtures and production/compiled auth checks pass; no rendered device claim.
