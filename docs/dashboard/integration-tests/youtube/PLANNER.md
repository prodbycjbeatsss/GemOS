# Release Planner — separate design prototype

Confirmed15October2026. Separate self-contained ui/planner.html, served at the owner-private /planner route. Existing dashboard cards and APIs stay unchanged.

## Confirmed scope

- One main release per week; unfinished working titles accepted.
-19 platform entries per release: Monday main YouTube remix, Tuesday–Sunday one upload each for YouTube Shorts, TikTok and Instagram Reels.
- Cards show thumbnail, title, status and planned time. No profile pictures, avatars or comment buttons. Each platform has its own tinted card plus name/icon; colour is supplementary.
- Today action; Week/Month/Year view controls. Desktop week is a seven-column board with release summary and platform filters. Mobile week uses a seven-day strip and a selected-day list with three separate platform cards on short-form days. Month is an overview with mobile selected-day details; Year opens months.
- Dark/light switch uses softened navy/slate and pale blue-grey surfaces. No pure black/white colours. Theme selection alone persists locally; preview releases/status changes reset on reload.

## Design system

Reuse Inter body/Poppins headings,32px outer/22px recessed/12px control radii,20px mobile/24px desktop insets,12px internal gaps, fine borders, contained highlight and recessed glass material. Planner calendar is a wider workspace exception, not a fixed920px dashboard card. Platform tints and softened light tokens are scoped to this prototype; they do not recolour existing cards. Local vector thumbnail illustrations are labelled examples.

## Prototype boundary

Three fictional weekly releases illustrate the layout. A persistent notice labels example content and reset-on-reload behaviour. Planned/Files ready/Scheduled are illustrative statuses; no Drive scan, upload, actual schedule confirmation or publishing occurs. Add release validates a Monday, title and time and enforces one release/week. Opening a card shows its details and allows a preview-only status edit. No provider/backend calls or release-plan storage are added.

Real implementation later needs owner-scoped plan storage, project/folder association, independent readiness evidence, explicit platform upload matching and truthful unconnected TikTok/Reels states.19 planned entries must not silently change Release Buffer's separately accepted seven-YouTube-upload coverage rule.

## Validation

verify-planner.cjs runs the actual inline script against DOM fixtures:19 separate entries, mobile day selection, week/month/year navigation, filters, Today, soft-theme toggle, theme-only persistence, one release/week validation, unfinished drafts, literal titles and safe dialog focus/backdrop. Production build and compiled authenticated200/unauthenticated401 route checks accompany delivery. Source-token text contrast is measured for the theme/card combinations. This does not establish rendered layout, fonts, clipping, actual touch targets, Android Back or full accessibility conformance. Phone/desktop visual acceptance remains to be checked with CJ.
