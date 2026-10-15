# Release Buffer — YouTube scheduling

Confirmed by CJ on15October2026: Studio is the first scheduling source. A fully covered week needs all seven uploads: one main video Monday and one Short each day Tuesday–Sunday. This YouTube connection supersedes the old unconnected19-platform coverage proposal; TikTok and Reels are not claimed as scheduled. Future GemOS planning remains separate.

## Coverage and dates

Check12 complete Monday–Sunday weeks, starting with the next Monday in Europe/London (today when Monday). Weeks before that anchor are outside future coverage. Count consecutive complete weeks and stop at the first gap; later full weeks stay visible in details but do not extend the headline. If all12 are full, say at least12; no gap beyond the scan horizon is inferred. Titles do not identify remixes; the Monday slot uses non-Short video format, not a title match.

Use the owner's private status.publishAt timestamp, strictly in the future, converted to UK publication date. Public uploads, snippet upload dates, ready Drive files and dates planned elsewhere are not scheduling evidence. Main/Short format uses owned duration, dimensions and rotation; live/unknown/invalid formats do not count. Processing must be succeeded. Unknown format/processing is shown as unverified and makes the source result partial. One scheduled upload fills only its date/type slot; duplicate uploads on another day cannot fill a gap.

## API and storage

Owner-authenticated GET /api/youtube/schedule restores connected channels and matching owner/channel/connection-revision/current-anchor cache, with no provider requests and no monitored run. POST accepts only optional channel, same origin, bounded JSON and an owned channel. Multiple channels require explicit source selection; a sole channel selects automatically.

Provider calls are GET only, fixed official YouTube channels/playlistItems/videos endpoints under existing youtube.readonly permission. The uploads playlist is completely paginated, max100pages of50; no upload-date cutoff, because an old upload can be scheduled for the future. Incomplete/looping lists, missing/mismatched video metadata, foreign ownership or provider failure retain the previous report and report failure. No video update/insert/delete, extra scope, schema migration or schedule write is added.

Owner-scoped automation_sync_targets stores youtube-schedule-report and youtube-schedule-sync. Raw file metadata is not retained; private titles exist only in the owner report, never telemetry. Connection revision fencing and request-start ordering guard cache writes. GET hides reports from a changed/disconnected connection or old anchor.

Source Sync and Automation card1.1/Sync all call the same fixed schedule handler. youtube-schedule-sync logs real work; GET/cache/status reads create no runs. Existing duplicate leases and redacted telemetry remain. Shared last-success timestamp survives failed attempts. The source UI retains labelled saved results after failures, restores cached reports on focus, supports owned-channel choice and provides12-week/day details with real YouTube links and native dialog focus/Close/outside-tap handling.

## Validation and limits

verify-youtube-schedule.mjs exercises seven slots, gap stopping, later complete weeks, duplicate dates, wrong types, processing/format uncertainty, UK/DST boundaries, old-upload pagination, ownership/origin/input guards, GET-only provider calls, failure retention, disconnect fencing and the monitored Sync-all adapter. verify-schedule-buffer-ui.cjs exercises source states, duplicate-click guard, request selection, literal titles, safe links, failure retention, disconnect clearing and dialog focus. Existing checklist/analytics/capture/sync/monitoring/shell/group/dialog regressions, production build and compiled200/401 checks accompany delivery.

Controlled checks do not establish live account schedule access or rendered phone/desktop/Android Back/contrast/enlarged-text correctness. First live check: open Release → Release Buffer → Sync and compare the first incomplete week and its scheduled dates with YouTube Studio. Never fabricate coverage when that provider request fails.

Official field contract: https://developers.google.com/youtube/v3/docs/videos#status.publishAt
