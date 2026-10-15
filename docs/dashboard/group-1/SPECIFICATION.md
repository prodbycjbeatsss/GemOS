# Group 1 — current visual and interaction specification

Updated 10 October 2026. Applies to the private `/checklist` integration. `preview.html` is a historical reviewed mock, not the current connected implementation. [Usage](USAGE-AND-CONNECTIONS.md) owns eligibility and source rules; [components](COMPONENTS.md) owns reusable interaction contracts.

## Pair geometry and materials

One column below 840px; two equal columns from 840px, centred within 960px with 20px gap. Desktop selector sits above 1.2; both cards occupy the same row beneath it. Mobile order: Buffer, Check release, Checklist.

Both cards use the accepted blue/glass material, 32px card corners, 22px recess corners, 20px mobile/24px desktop inset, 58px glyph with 18px corners and 12px glyph-to-label gap. Inter body and Poppins main answer, 24px mobile/30px desktop. Shared measurements use the greatest required header, recess and footer heights across the pair. Both slots grow together for legitimate content or enlarged text, with normal920px Large minimum and accessible growth. No independent recess growth or one-column checklist fallback.

## YouTube schedule connection —15October2026

Release Buffer now reads YouTube Studio. A complete UK week needs one main video Monday and one Short each day Tuesday–Sunday. This first YouTube-only connection supersedes the earlier19-platform proposal; TikTok/Reels are not claimed as scheduled. Check12 full weeks from next Monday (today if Monday), count consecutive complete weeks, stop at first gap. Later complete weeks remain visible but do not extend coverage.

Only future private status.publishAt is scheduling evidence. Owned duration/dimensions/rotation establish main/Short format, with succeeded processing; unknown format/processing stays unverified/partial. Titles do not establish remix affiliation. Wrong-day/duplicate uploads, planned dates and Drive readiness cannot fill missing slots. A successful empty scan can show zero; a provider failure retains saved data.

Source Sync and Automation1.1/Sync all use the same fixed GET-only provider import under existing permissions and tables. Cached GET restores owner/channel/revision/current-anchor reports without provider work or run creation. Headline shows Covered until <last complete Sunday> or No complete weeks; source states remain distinct. Recess shows nearby weeks and n/7/missing days. Native Buffer details shows all12 weeks and day-level actual uploads/times/links. Multiple owned channels require source selection. Shared timestamp sits below Sync. Material and paired920px geometry stay unchanged.

See [schedule contract](../integration-tests/youtube/SCHEDULE.md). New coverage/UI tests plus affected sync/checklist/analytics/capture/monitoring/Automation/shell/group/dialog/geometry/Drive regressions, production build and compiled200/401 checks pass. First live owner schedule comparison and rendered phone/accessibility checks remain pending. No upload, schedule-write or publication action is added.


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
- Buffer details:12 UK weeks with day-level schedule, missing slots and unverified uploads.
- Picker: stage groups, short title/artist, selected tick, full original name available; selection stays local to 1.2.

All use the existing blue/navy modal material, 32px shell, responsive insets, visible focus and 44px controls. File popup remains compact at 420px maximum; preparation at 560px. Static heading receives initial focus, dialog starts at top, content scrolls within 85dvh and Close remains reachable in a sticky footer. Escape dismisses; close restores trigger focus. Native Android Back still needs device verification.

## Evidence

CJ reported the prior picker, file links and metadata UI working and supplied successful Gelato 41 4/8 scan screenshots. Controlled DOM/source tests cover state and focus logic; geometry tests cover paired measurements. The new preparation/move flow requires real Google consent, a complete test project, phone/desktop and local sync verification. No complete WCAG audit or universal layout guarantee is claimed.

Project switching automatically starts a fresh scan after successful selection using existing read permission. Keep manual Sync for later file changes; display Checking during the scan and stale/error wording on failure. Failed selection does not scan.


## Group1 Large sizing — 12 October12:34UK

CJ authorised Group1 only. Both Release Buffer and Checklist now target920px Large; groupGeometry defaults to920 and uses shared largest header/recess/footer measurements, preserving two16px gaps and exact border-inclusive insets. Enlarged/long content can grow both together above920. CSS fallback slot920 and versioned checklist script; all eight centred checks and existing icon/title/material/footer/control/source rules retained. No fake Buffer content, new permissions or behaviour. Group2 source is unchanged in this slice; footer fix remains next.

Geometry contract now checks920 minimum and exact920 typical state. Project UI,asset eligibility and production build pass. Compiled-page test initially selected JS route by reused marker, falsely treating document.createElement as a React wrapper; restrict discovery to HTML document routes, then genuine200/401/no-wrapper checks pass. No CSS route imports added. Fresh phone/desktop and enlarged-text rendering remain pending; existing device evidence does not prove new920 fit. Earlier512/532 minima are superseded for current Group1 integration.
