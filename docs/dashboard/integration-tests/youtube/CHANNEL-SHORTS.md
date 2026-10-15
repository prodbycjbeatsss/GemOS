# Current authority — 15 October 2026

2.1 is channel-wide;2.2 now uses independent UK-week upload discovery/current cumulative views (WEEKLY-SHORTS.md), superseding selected-release statements in the implementation history below. CJ reports these features working. No exact Studio agreement or measured accessibility claim is made.

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

## Case compatibility repair — 14 October 2026

CJ's live 365-day report returned unavailable values despite a completed request. Exact uppercase `SHORTS` matching was too restrictive: another API client's primary implementation documents lowercase `shorts` responses (https://github.com/gomcpgo/youtube_analytics). The matcher now accepts both via case normalisation, excluding all non-Shorts types. Fixtures cover lowercase and uppercase daily/aggregate rows. The saved private report includes bounded returned type names/source-row/Shorts-row counts so the next real Sync can verify the exact source response; the precise live cause is not claimed verified yet. Main header now says Channel-wide Shorts. The independent July2.2 release correctly remains unranked without frozen24h snapshots; its sync feedback now explains that historical windows cannot be reconstructed.

## Quiet summary and top Shorts — 14 October 2026

CJ accepts live channel metrics (screenshot:199 views,107.42% average viewed,-2 Likes,0 subscribers,14 shares) and requests less copy plus the2–3 highest-viewed Shorts in the chosen period. The card now hides the above-card coverage box, repetitive tile notes, redundant data-through line, placeholder target/connection explanation and in-recess sync narrative. Exact data-through/source/warnings remain in Analytics details; the footer retains Sync status/time. Metric tiles use compact84px rows with existing typography/materials. Independent2.2 repetitive sync narrative is also hidden; snapshot eligibility remains unchanged.

Top Shorts displays up to3 titles and period views below the four metrics. Fixed owned-channel query:dimensions video, filters creatorContentType==shorts, metrics views, sort -views,maxResults3, using the exact current-period start/end. Up to3 owned metadata titles are loaded via the existing read-only Data API. Links use actual validated IDs. No lifetime-count substitution, publication-date filtering or reclassification from duration. A ranking failure retains aggregate metrics and shows Ranking unavailable; no invented top items. Controlled tests verify fixed filter/order/limit, literal titles, three-row UI, ranking-failure preservation and existing source/bulk sync. Live ranking response and rendered/device fit remain to verify after deployment.


## Metric tile correction — 14 October 2026

CJ explicitly asks to restore the metric tiles as they were. Removed the new84px/flex/padding/font overrides and the tile-note hiding rule, restoring original responsive dimensions, layout, typography, spacing and notes. The outside-tile text cleanup and period-specific Top3 Shorts remain. Top Shorts keeps its bounded internal scrolling within the established fixed card; no further tile redesign is authorised by this change.
