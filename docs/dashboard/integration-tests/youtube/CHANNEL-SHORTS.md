# 2.1 channel-wide Shorts reporting

Confirmed by CJ, 14 October 2026: the normal Performance card must cover the channel's Shorts, replacing the manually selected 1–5-video test. 2.2 retains its independent selected-release snapshot contract. TikTok/Reels remain unavailable.

## Source and meaning

YouTube Analytics API v2 identifies Shorts with the exact `creatorContentType=SHORTS` dimension value. Requests use the documented `day,creatorContentType` dimensions for counts (views, signed likes, subscribers gained, shares), then select Shorts rows and sum their counts. Long-form, live and unknown types are excluded. The separate `creatorContentType`/`averageViewPercentage` report supplies Google's period aggregate; no average of daily percentages or duration/title inference is used. Requests never filter to sample video IDs. Bounded 200-row pages continue up to 20 pages; an incomplete/duplicate/malformed report fails rather than saving a truncated total.

Normal ranges: 7, 28, 90, 365 days. The source card defaults to yesterday in Pacific reporting time and offers an explicit latest requested date. Current and preceding periods have equal calendar length; newest returned Shorts day is shown separately, without claiming missing days are zero or fully processed. Missing Shorts rows/metrics show unavailable. Actual numerical zero is retained. Comparison/targets remain withheld pending coverage verification.

## Behaviour and persistence

`POST /api/youtube/shorts-report` accepts only channel, rangeDays and optional endDate. It requires owner identity, same-origin requests and an owned connected channel. The normal source Sync and Automation Sync all invoke the same reporting service, record a single real run and save owner-scoped reports/selections in the existing tables. No new scopes or migration. Provider failure retains the previous report; connection revision changes prevent stale cache writes. Old test-sample cache is not presented as channel-wide data.

Automation Sync defaults to current Pacific yesterday and reuses saved channel/range. A sole owned channel needs no setup; multiple channels require the source choice. Source page inputs for manual 2.1 sample links/confirmation are hidden; old browser-only test code remains as historical/local fallback, not the deployed configured path. 2.2 release links and frozen 24-hour counts are unchanged.

## Validation and limits

Controlled SQLite/provider tests: exact Shorts-only filtering, pagination, signed likes/actual zero, Google retention aggregate, missing metrics, current-date bulk sync, owner/origin/date/parameter validation, durable runs, cache preservation. Actual UI-script tests cover link-free Sync, range changes, stale/error retention, spinner lifecycle and saved report restoration while preserving release selection. Backend/capture/automation/monitoring/group placement/shell/dialog regressions pass. No supported rendered browser QA or successful owner live channel-wide response has been observed in this session. After deployment, press Sync on 2.1 and compare exact ranges with YouTube Studio's Shorts analytics.

Sources: https://developers.google.com/youtube/analytics/dimensions#creatorContentType ; https://developers.google.com/youtube/analytics/channel_reports#time-based-reports ; https://developers.google.com/youtube/analytics/channel_reports#playback-detail-reports .
