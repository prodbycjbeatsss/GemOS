# Group 1 — current visual and interaction specification

Updated 10 October 2026. Applies to the private `/checklist` integration. `preview.html` is a historical reviewed mock, not the current connected implementation. [Usage](USAGE-AND-CONNECTIONS.md) owns eligibility and source rules; [components](COMPONENTS.md) owns reusable interaction contracts.

## Pair geometry and materials

One column below 840px; two equal columns from 840px, centred within 960px with 20px gap. Desktop selector sits above 1.2; both cards occupy the same row beneath it. Mobile order: Buffer, Check release, Checklist.

Both cards use the accepted blue/glass material, 32px card corners, 22px recess corners, 20px mobile/24px desktop inset, 58px glyph with 18px corners and 12px glyph-to-label gap. Inter body and Poppins main answer, 24px mobile/30px desktop. Shared measurements use the greatest required header, recess and footer heights across the pair. Both slots grow together for legitimate content or enlarged text, with minimum 512px (532px below 360px). No independent recess growth or one-column checklist fallback.

## 1.1 Release Buffer

The current source is unconnected: header No schedule yet / Scheduling not connected. Centre a calendar icon and No releases to show inside the matched recess, with short supporting copy. No example releases, count dash, invented zero-week coverage or empty row filler. Buffer details opens a compact centred empty state. The populated route will show actual project/date/platform-confirmation breakdown once scheduling records exist; it is not an FAQ or a view of the selected checklist scan.

## 1.2 Pre Release Checklist

Header uses the short track name, including explicitly saved metadata; otherwise derive it from the connected remix/folder. Cap display at 48 graphemes and two lines; retain full accessible title. Show n/8 ready. Eight native button tiles in four equal two-column rows:

| Left | Right |
|---|---|
| Project · ZIP | Stems · ZIP |
| Beat · WAV | Beat · MP3 |
| Remix · WAV | Thumbnail · PNG |
| YouTube video · MP4 | Shorts ×6 · MP4 |

Every tile centres an outline icon, name, muted file-type caption and symbol. Green ✓ Pass, red × Missing, amber ! Needs attention, neutral - Not checked; accessible wording and Shorts count accompany symbols. Minimum 88px tiles, 6px gap, 8px vertical/10px horizontal padding, 12px corners, 22px outline in 24px slot. Names 12px/1.2, formats 10px/1.2, status 15px. No direct Drive links on tiles.

Footer: Sync and last-check state on left; Prepare release → on right. Saved check is explicitly not refreshed; failed scan retains the last successful result with stale wording. No failed scan becomes a Missing result.

## Dialog responsibilities

- File popup: category icon, PASS/Missing/Needs attention/Not checked, connected filename(s), minimal Open file links; No file connected with file-X icon if absent. Resolve ambiguous associations here, with six ordered selectors for Shorts. Candidate names are not labelled connected until confirmation succeeds.
- Prepare release: artist/track header, muted beat descriptor, progress/timestamp, editable artist/title/BPM/key/credits and minimal folder link. Show outstanding categories only, linking to their file popups. Review passed Shorts in Tuesday–Sunday order, then Save review. Confirm ready rechecks eight categories and the reviewed snapshot; production projects move to connected Release Queue. Projects already queued are reviewed without a second move. No duplicated list of every passed asset.
- Buffer details: overall confirmed scheduled projects, currently a truthful empty state.
- Picker: stage groups, short title/artist, selected tick, full original name available; selection stays local to 1.2.

All use the existing blue/navy modal material, 32px shell, responsive insets, visible focus and 44px controls. File popup remains compact at 420px maximum; preparation at 560px. Static heading receives initial focus, dialog starts at top, content scrolls within 85dvh and Close remains reachable in a sticky footer. Escape dismisses; close restores trigger focus. Native Android Back still needs device verification.

## Evidence

CJ reported the prior picker, file links and metadata UI working and supplied successful Gelato 41 4/8 scan screenshots. Controlled DOM/source tests cover state and focus logic; geometry tests cover paired measurements. The new preparation/move flow requires real Google consent, a complete test project, phone/desktop and local sync verification. No complete WCAG audit or universal layout guarantee is claimed.
