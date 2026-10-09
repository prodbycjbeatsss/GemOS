# YouTube test — current decisions

Updated 9 October 2026. This is the current checkpoint; older follow-up notes in README/HANDOFF are history where they differ. Canonical design-reference HTML is unchanged.

## 2.1 — current test design finalised by CJ

| Area | Final choice |
|---|---|
| Scope | Selected Shorts only in the test; intended finished card covers all short-form content on selected platforms, independent of release selection. |
| Reporting period | 7d / 28d / 90d / 365d compact pills under platforms; 28d default; exact returned dates shown. |
| Main result | Source-reported selected-period views. |
| Metrics | Average viewed (full accessible name/definition: Average percentage viewed), signed Likes, content-attributed Subscribers gained, Shares. Google's aggregate is displayed unchanged. |
| Metric alignment | Matching label/value/note rows; no independent centring drift. |
| Material/geometry | Accepted purple/glass material; normal 575/583px recess matching 2.2; accessibility overflow reflow retained. |
| Lower recess | Small request-stage/completion/failure status and last successful import time; remaining space clear. |
| Sync | Circular-arrow rotation during requests, reduced-motion alternative; manual Sync revalidates ownership and fetches fresh reports. |
| Range changes | Retain clearly labelled old values until an atomic replacement; reuse verified metadata; memory cache enables zero-request switching to loaded ranges, explicitly marked cached. |
| Persistence | Tab-session input preferences; saved shared server connection restoration; legacy fallback only when unconfigured. Reports/range cache remain memory-only. No new links required for development. |
| Missing/coverage | Missing is unavailable, not zero. Growth/target remain hidden pending coverage checks. All/TikTok/Reels remain unconnected. |

Finalised refers to the current test design and behaviour, not a finished production connection. Controlled state/request checks pass. Earlier browser evidence covers prior iterations; the latest rendered alignment/cache interaction still lacks supported-browser verification. Exact Studio agreement, complete coverage, whole-channel discovery, actual Google renewal and TikTok/Reels remain outstanding. CJ's real imports establish successful source-to-screen activity, not those remaining claims. No private analytics figures or identifiers are stored here.

## 2.2 — implementation complete; first-release verification pending

CJ accepted this implementation as complete on 9 October. Real first-release view capture and displayed ranking are unverified; keep that verification open. The scrolling change is implemented but awaits Android swipe confirmation.

The private test accepts 1–6 user-confirmed same-release Shorts; three is valid. One shared saved read-only Google connection serves both cards. Release name, links and imported metadata now persist per owner/channel in D1 and restore after refresh. Reports/range caches on 2.1 remain memory-only. Canonical design previews and the finalised 2.1 interactions are unchanged.

Manual import/Sync can save a public owned Short's cumulative Data API view count when both the request and return occur from publication +24h through +24h15m inclusive. This is an observed count around 24 hours, not an exact reconstructed first-day Analytics total. The first qualifying count is frozen. Zero is valid; missing, invalid, early, late or nonpublic counts stay unavailable. Old lifetime counts never replace missed snapshots. Saved counts rank descending; ties share competition ranks (1,1,3). Tap for exact capture timestamps and the full title. Unavailable entries remain below ranked entries in selection order. No fabricated growth or rank changes. No relative bars were added in this test slice.

Normal recess dimensions remain 575/583px, with the established 360px scroll region and 72px rows. The scoped 12px trophy gap is retained. Vertical swipes now chain to the page when the list fits or reaches either end; only overflowing rows scroll inside the list. Six Shorts are optional. TikTok/Reels remain unconnected.

A protected unattended writer and owner-only private scheduler-configuration download are implemented. The built-in hourly task runner cannot meet the capture window. The five-minute Google Cloud Scheduler job has been created in the existing project; live logs verify successful endpoint calls. The short job-name fix is deployed; a post-fix run at 20:05 UK persisted as scheduled and CJ reports the updated sync message. Manual Sync works during the window without that schedule. [Capture contract and setup](CAPTURE.md) is the authority for storage, permissions, run status and verification limits. Successful scheduled endpoint calls are verified; a real qualifying Short capture remains pending.

Controlled capture tests pass for boundaries, return lateness, zero, invalid/missing/private/foreign counts, immutable storage, ownership, saved selections, service key checks, scheduled run logging, old-release query avoidance and disconnect races. Frontend regressions pass including saved-release restoration, tie ranks and zero, plus unchanged 2.1 range/cache behaviour. Production build passes. Fixtures are synthetic. Rendered phone/desktop layout and a real newly published Short's capture remain unverified.


## Historical checkpoints

### 9 October — phone feedback: icon spacing and sync meaning

CJ confirmed release metadata displays on Android; the trophy lacked the 12px bottom gap used on 2.1 because a shared glyph rule reset its margin. A scoped 2.2 override restores that gap. Completion now says “Titles loaded · views not connected”; the footer says “Titles loaded” to distinguish this metadata import from view capture. No view counts or rankings have been implemented; first-24-hour capture remains pending. Screenshot evidence identifies the pre-fix spacing issue; the corrected rendering remains unverified in this environment.


### 9 October — one saved connection for both cards

CJ authorised upgrading the existing Google connection. The private test now has a supported Worker/D1 backend, encrypted per-user token storage, offline OAuth callback, server refresh and a bounded read proxy used by both cards after configuration. The legacy browser connection remains active until setup is complete. Runtime encryption key and callback URI are configured; the existing Web client's ID/secret and authorised callback remain required before real saved access can be enabled. [Backend contract and setup](BACKEND.md) record exact steps. Synthetic backend/frontend checks and production build pass; live Google, hosted token writes/refresh and rendering are unverified. Google Testing mode limits refresh tokens to seven days. No capture scheduler or view rankings are connected by this upgrade.


### 9 October — runtime credentials applied

CJ supplied the existing Web OAuth client details and reports adding the authorised callback URL. Client ID and client secret were configured using native Sites runtime tools; the client secret is marked secret. The existing encryption key was retained. Redeployment of the existing private version succeeded with the new environment revision. No credential values or uploaded file contents were added to the repository. Next: CJ opens the same test page, approves Connect YouTube once and verifies restoration after refresh. Real Google callback/token writes and refresh are still unverified; automatic snapshot capture remains pending.


Hosted verification on 9 October: protected service POST succeeded and GET read back its persisted manual-service-check run; zero release selections existed, so no real view count was captured. Owner-only scheduler configuration is enabled in runtime. The private deployment succeeded at environment revision 4. Source commit: 44732262b69f09c83af4c6b0ffd53d18c0b4fc8b. This initial deployment checkpoint preceded Google Cloud job creation; the later live Scheduler follow-up below supersedes it. Import the release once to save it in the new store. Real scheduled/source capture remains unverified.


### 9 October — live Scheduler success and short job-name fix

CJ created the five-minute Google Cloud Scheduler job through the browser console and reported Success. Production logs independently show Google-Cloud-Scheduler POST requests reaching /api/youtube/run-captures with HTTP 200 at 19:55 and 20:00 UK. The run records persisted but were wrongly classified as manual-service-check: Google supplied the short job ID, while the original check expected a full resource path. The status check now accepts the exact short ID or exact full projects/locations/jobs form. Synthetic regressions cover both forms, unknown jobs and missing headers. Existing credentials, schedule, capture window and frozen counts are unchanged. A successful scheduler run does not prove a real qualifying Short was captured. Post-fix scheduled classification was verified at 20:05 UK and CJ reports the corrected sync status.


### First-release verification — still open

Import a public owned Short before 24 hours and leave it selected through 24h15m. Confirm a real count is stored inside the window, source and timestamps agree, views/rank display correctly (zero is valid), and refresh restores the same frozen result. Existing July Shorts stay unavailable because no qualifying snapshot was stored. Historical release reporting and automatically advancing 2.1 dates are proposals only; neither was added.
