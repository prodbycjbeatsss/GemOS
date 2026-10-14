# 2.2 Weekly Shorts — 14 October 2026

## Current views presentation

CJ requested a numeric total headline instead of Shorts Views (24hrs), current views on every upload row, and numbered leaderboard places. Production rows now rank by current cumulative views; headline sums confirmed/format-eligible Shorts uploaded in the selected UK week. Ties share ranks; genuine zero is valid. Missing confirmed counts make the total unavailable, rather than a misleading subtotal. Pending classification remains unranked and excluded from the total while its returned upload view count can still be shown. These are lifetime-to-sync views for the weekly batch, not views earned only during the week.24h snapshots stay immutable and are shown only in details; the scheduled checker remains connected. Old report caches without current-view fields refresh once. This supersedes the snapshot-only visible ranking statements below.


CJ approved replacing the manually selected remix/release batch with uploads grouped Monday–Sunday by Europe/London publication date. Current week is the default; previous/next arrows allow up to52 past weeks and prevent future selection. No title matching or remix affiliation is claimed.2.1 remains independent.

## Discovery and capture

Owner-checked uploads playlist, up to10 pages of50, followed by batches of50 videos. Includes two prior days for Sunday/Monday capture crossover; those prior-week videos do not appear in the current week. Public valid publication dates only. Reject incomplete pagination/foreign metadata. Owner fileDetails supplies dimensions/rotation plus contentDetails duration; public square/vertical uploads up to180s are format-eligible. Horizontal/long/live items are excluded. Analytics video/creatorContentType confirms or excludes candidates when returned. Missing format/classification remains explicitly pending and unranked; titles are not classifiers. Snapshot candidates may be frozen in-window before delayed classification, but are not ranked until eligible/confirmed. No API scopes or schema changes.

Fixed official API URLs, saved encrypted OAuth, owner checks, same-origin POST, bounded selection/body and connection revision fencing remain. Sensitive uploaded filename/streams are not persisted. Existing manually selected release history is retained as legacy and no longer drives production2.2.

Existing scheduled updater now discovers recent channel uploads without a manual release selection. Sole owned channel is automatic; multiple channels require saved weekly channel selection. Checker always monitors the current week plus crossover, regardless of the historical week viewed. Immutable snapshots use the existing24h–24h15m request/response window and INSERT OR IGNORE. No current/later lifetime count can backfill a missed window. Legacy snapshots can match exact owned video/publication identifiers.

Weekly report caches use existing owner-scoped automation_sync_targets. GET restores a matching UK week without new sync/provider work; POST Sync explicitly refreshes and records completion. Sync all uses saved weekly channel/week. New-week cache mismatches refresh rather than showing last week's list.

## Verification

Controlled SQLite/provider/UI checks cover UK/DST boundaries, history, independent titles, horizontal/long exclusion, pending classification, immutable snapshots, no backfill, automatic discovery without release selection, page-load cache reads, ownership and auth/origin/input guards. Existing capture/card-sync/automation/monitor/UI/layout checks pass. Production and scheduled provider behaviour still require owner verification; successful deployment does not prove live24h capture. Existing five-minute external scheduler configuration is retained, not recreated.

Sources: https://support.google.com/youtube/answer/15424877 ; https://developers.google.com/youtube/v3/docs/videos ; https://developers.google.com/youtube/analytics/channel_reports

Prior user evidence: Sync all and uniform timestamps passed.2.1 is approximately10–15 views below Studio; user accepts it, cause unconfirmed.2.2 live discovery and next24h snapshot remain pending.
