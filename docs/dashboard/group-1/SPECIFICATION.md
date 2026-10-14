# Group 1 — current visual and interaction specification

## Uniform sync timestamp component — 14 October 2026

CJ requests a single line underneath Sync on all cards. Shared dashboard.css tokens now define10px Inter/14px line/standard muted colour, nowrap and inline time. Source footer Sync stacks its timestamp beneath the44px action; Finance60px and paired Release72px footer tracks keep the original outer card sizes. Automation tiles use the same line after their Sync row. Visible format is Last synced: HH:mm:ss (UK); full date/year and UK time remain in time datetime/title and accessible label. Missing time uses an accessible Not recorded explanation with a compact dash. Manual Costs retains Last saved; unconnected Buffer has no fabricated Sync. Earlier beside-button/multiline date layouts are superseded. Metrics, palettes and durable sync records unchanged. Timestamp/bulk/project/commerce/layout/group/shell checks and build pass; signed-in rendered phone/desktop verification remains pending. Site source d7ad704b9a5f33a343d25bc1c024acb95c7b1dc4.

## Shared card sync timestamps — 14 October 2026

All source card footers now show the same owner-scoped last successful completion record as the Automation grid, with UK date/time including seconds. Time labels refresh on source requests, page focus/visibility and every 30 seconds while visible; reads create no runs. Failed attempts retain last success. Manual Subscription Costs shows Last saved; unconnected Buffer shows Not connected. Automation grid dates now include seconds; its own freshness remains Records refreshed. Does not claim metrics represent this exact time or backfill 24h snapshots. Fixed sizes, metric tiles and provider contracts retained. Source 03ba6c3efa9ef2d0b6e61535476b111558256bf9. Timestamp, card-sync, monitor, bulk UI, project, commerce, state/layout checks, production build and compiled page checks pass. Signed-in rendered footer verification still pending.

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

Project switching automatically starts a fresh scan after successful selection using existing read permission. Keep manual Sync for later file changes; display Checking during the scan and stale/error wording on failure. Failed selection does not scan.


## Group1 Large sizing — 12 October12:34UK

CJ authorised Group1 only. Both Release Buffer and Checklist now target920px Large; groupGeometry defaults to920 and uses shared largest header/recess/footer measurements, preserving two16px gaps and exact border-inclusive insets. Enlarged/long content can grow both together above920. CSS fallback slot920 and versioned checklist script; all eight centred checks and existing icon/title/material/footer/control/source rules retained. No fake Buffer content, new permissions or behaviour. Group2 source is unchanged in this slice; footer fix remains next.

Geometry contract now checks920 minimum and exact920 typical state. Project UI,asset eligibility and production build pass. Compiled-page test initially selected JS route by reused marker, falsely treating document.createElement as a React wrapper; restrict discovery to HTML document routes, then genuine200/401/no-wrapper checks pass. No CSS route imports added. Fresh phone/desktop and enlarged-text rendering remain pending; existing device evidence does not prove new920 fit. Earlier512/532 minima are superseded for current Group1 integration.
