# Release Planner — responsive calendar

Updated16October2026. Separate owner-private /planner route, implemented in ui/planner.html. Shared product wording: root glossary.md in GemOS.

## Layout and destinations

Use available screen width with responsive gutters, no1536px cap and no simulated phone frame. The former release summary and sidebar are removed. One row of platform selectors follows Week/Month/Year, wrapping into two columns on mobile. Each destination has a recognisable native coloured SVG logo, name and its own tint: YouTube, YouTube Shorts, TikTok, Instagram Reels. Main and Shorts filter independently.

Keep shared Inter/Poppins typography,32/22/12px radii, fine borders, contained highlights, recessed materials and soft navy/mist dark/light themes. Existing dashboard card geometry/palettes are unchanged. Theme preference alone persists locally. No pure black/white colours.

Week is a desktop seven-day board and mobile week-strip/day agenda. Month keeps individual platform entries on desktop and selected-day agenda on mobile; Year opens months. Today and previous/next retain selected view. Native dialogs are read-only and retain Close, Escape, outside-click and focus return. There is no status dropdown or Apply control.

## Shared scheduling source

YouTube schedule is the default view. It uses GET /api/youtube/schedule, the existing authenticated saved-report endpoint used by Release Buffer. It does not make a provider request or create an automation run. On focus or source selection, reload that shared cache; source freshness is visible. Refresh actual Studio data with Release Buffer's existing Sync workflow. No new tables, scopes, credentials or schema.

Read actual video IDs/titles/publication timestamps/format/processing from the saved report. Main and Shorts remain separate; unknown format or processing is Unverified. Past publication timestamps and retained results after a failed read are Stale, never proof of publication. A wrong-day upload may be scheduled but does not thereby fill Buffer's required slot. This view does not change Buffer coverage or infer a release/remix relationship.

Disconnected, not checked, multiple-channel choice, successful empty report and failed reads have distinct messages. Transient failure retains clearly labelled saved results; lost access or channel mismatch clears them. Deduplicate by video ID. Titles use literal DOM text; YouTube links use validated IDs. Actual uploads without an artwork association show Artwork unavailable. No invented thumbnails, project relationship or file-readiness result. Asset readiness remains Not checked until an explicit shared project association exists. TikTok/Reels remain unverified and are never filled with fictional uploads in this view.

## Example plans

Example plans is a separate, clearly labelled source for visual review. Three fictional releases demonstrate19 entries/week: Monday main YouTube remix; Tuesday–Sunday each have YouTube Shorts, TikTok and Reels. All are Planned only: intended timing, not confirmed readiness/scheduling. No source evidence is joined to examples by date or title.

Add release is available only in Example plans; accepts an unfinished working title, valid Monday/time and enforces one release/week. The in-memory draft resets on reload. There is no saved plan, provider write, upload, publication or automated folder move.19 example entries do not change Buffer's seven-YouTube-upload rule.

## Validation and remaining work

verify-planner.cjs executes the actual inline script with DOM/fetch fixtures:19 entries, four independent filters, mobile days, navigation, theme-only persistence, literal titles, draft validation, read-only dialogs, shared saved schedule GET, correct formats/processing, expiry, deduplication, source errors/retention, channel mismatch and lost access. Source-token contrast covers text and all four platform tints in both themes including hover. Existing scheduling backend fixtures, production build and compiled owner200/unauthorised401 checks accompany delivery.

No supported rendered browser/device QA is available in this managed session. These checks do not establish actual fonts, clipping, touch targets, composited contrast, Android Back or complete accessibility. Owner live cache contents have not been independently inspected. Next: review both themes/layouts, then owner-scoped saved plans plus explicit project/asset/upload associations; reuse the dashboard records rather than adding editable status fields.

## Publishing settings and saved plans —17October2026

Settings → Publishing is at /settings. Four owner-saved default times start blank; Europe/London conversion handles GMT/BST. Changing settings does not rewrite plans. Review plan changes previews eligible posts before an explicit apply; overrides and platform-linked records are excluded. Stale settings/plan revisions reject the operation, including a settings change between read and atomic save.

My plans is now the default calendar source. Add release persists an unfinished working title and Monday release week, with19 stable post IDs using the four configured times. Open a saved post to edit its intended date/time within that week, or use its current Publishing default. Edit release changes its title or moves the whole week, retaining post times/overrides. There is no provider rescheduling/upload, project association or readiness inference. Examples and actual saved YouTube schedules stay separate sources. Failed reads retain labelled saved plans; missing access clears them. Unsaved modal edits are not overwritten by focus refreshes. Concurrent writes use an owner-catalogue revision; posts/releases also retain their own revisions for future job fencing.

Two additive D1 tables hold Publishing settings and the owner's bounded release-plan catalogue. Runtime handlers do not create migration-owned tables. Generated0009 migration/snapshot/journal and db/schema.ts are committed. Existing schemas/data are untouched. The catalogue supports104 active weeks, one release/week, with unique stable release/post IDs. Defaults and plan records survive browser reload/device changes; browser storage holds only theme preference.

Shared ui/planner-styles.txt now serves both Calendar and Settings via an authenticated route. Calendar/Settings utility links are added outside the existing four dashboard-group links. Card layouts and data scopes stay unchanged.

Additional validation: verify-publishing.mjs uses SQLite and actual request handlers for saved defaults/plans, owner/origin/input guards,19 slots, override/reset, rename/week shift, preview/apply, settings race fencing, duplicate weeks, GMT/BST and repeated/missing local hours. verify-publishing-ui.mjs runs the real settings/planning script against those handlers to check save/load, fresh-client persistence, time editing, conflict errors and apply behaviour. Production compiled settings/script/CSS200/401 checks accompany delivery. These are controlled fixtures; no rendered browser/device acceptance or live saved-user-data test is claimed.

The shared CSS is imported as a raw .txt asset and served as text/css. This avoids the framework CSS transform wrapping an HTTP route as a React component; compiled response checks cover this regression.


## Settings-only timing rule —17October2026

CJ superseded calendar time editing: saved post dates/times and existing release-week moves are now managed only in Settings → Publishing → Individual planned posts. Calendar saved-post details show timing read-only and link directly to /settings?post=<stable ID>. The calendar can create a new plan and edit its working title; an existing week field is disabled and the save uses its stored week, preventing field manipulation from moving the plan. Example clock-time input is hidden. Settings retains default/override, clock-change choices, concurrency checks and explicit apply behaviour. No schema, provider or uploader change.

Real UI/API fixtures verify calendar contains no post date/time inputs, its deep link selects the intended Settings post, Settings time saves refresh a new calendar client, stale Settings tabs reject writes, and week moves occur in Settings while calendar title edits preserve the stored week. Rendered device checks remain unverified.

## Single calendar editor and conditional clock guidance —17October2026

A saved card opens one dialog containing its release working-title input, read-only timing/facts and selected-post Settings link. Save name updates the shared release title for all19 planned posts without a second edit screen. Stable release/post IDs are unchanged. The explicit project-folder association is still a later integration step; existing Drive projects already have folder IDs.

Clock-change selectors are hidden normally. If server validation finds a repeated UK local time, reveal a plain-language first-BST/second-GMT choice in the relevant form, then hide after save or relevant date/time changes. Initial release creation and Settings individual/default-apply flows keep full DST validation. Normal18:00-style times show no clock-change controls. Real UI/API fixtures cover one-click naming, stable identities and the repeated01:30 case; no rendered device check is claimed.
