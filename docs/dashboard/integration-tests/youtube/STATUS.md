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

## 2.2 — saved release and qualifying snapshot slice

The private test accepts 1–6 user-confirmed same-release Shorts; three is valid. One shared saved read-only Google connection serves both cards. Release name, links and imported metadata now persist per owner/channel in D1 and restore after refresh. Reports/range caches on 2.1 remain memory-only. Canonical design previews and the finalised 2.1 interactions are unchanged.

Manual import/Sync can save a public owned Short's cumulative Data API view count when both the request and return occur from publication +24h through +24h15m inclusive. This is an observed count around 24 hours, not an exact reconstructed first-day Analytics total. The first qualifying count is frozen. Zero is valid; missing, invalid, early, late or nonpublic counts stay unavailable. Old lifetime counts never replace missed snapshots. Saved counts rank descending; ties share competition ranks (1,1,3). Tap for exact capture timestamps and the full title. Unavailable entries remain below ranked entries in selection order. No fabricated growth or rank changes. No relative bars were added in this test slice.

Normal recess dimensions remain 575/583px, with the established 360px scroll region and 72px rows. The scoped 12px trophy gap is retained. Six Shorts are optional. TikTok/Reels remain unconnected.

A protected unattended writer and owner-only private scheduler-configuration download are implemented. The built-in hourly task runner cannot meet the capture window. Five-minute Google Cloud Scheduler setup in the existing project is prepared; no job has yet been created or verified. Manual Sync works during the window without that schedule. [Capture contract and setup](CAPTURE.md) is the authority for storage, permissions, run status and verification limits. Do not mark automatic capture connected until a real scheduled run succeeds.

Controlled capture tests pass for boundaries, return lateness, zero, invalid/missing/private/foreign counts, immutable storage, ownership, saved selections, service key checks, scheduled run logging, old-release query avoidance and disconnect races. Frontend regressions pass including saved-release restoration, tie ranks and zero, plus unchanged 2.1 range/cache behaviour. Production build passes. Fixtures are synthetic. Rendered phone/desktop layout and a real newly published Short's capture remain unverified.


## Historical checkpoints

### 9 October — phone feedback: icon spacing and sync meaning

CJ confirmed release metadata displays on Android; the trophy lacked the 12px bottom gap used on 2.1 because a shared glyph rule reset its margin. A scoped 2.2 override restores that gap. Completion now says “Titles loaded · views not connected”; the footer says “Titles loaded” to distinguish this metadata import from view capture. No view counts or rankings have been implemented; first-24-hour capture remains pending. Screenshot evidence identifies the pre-fix spacing issue; the corrected rendering remains unverified in this environment.


### 9 October — one saved connection for both cards

CJ authorised upgrading the existing Google connection. The private test now has a supported Worker/D1 backend, encrypted per-user token storage, offline OAuth callback, server refresh and a bounded read proxy used by both cards after configuration. The legacy browser connection remains active until setup is complete. Runtime encryption key and callback URI are configured; the existing Web client's ID/secret and authorised callback remain required before real saved access can be enabled. [Backend contract and setup](BACKEND.md) record exact steps. Synthetic backend/frontend checks and production build pass; live Google, hosted token writes/refresh and rendering are unverified. Google Testing mode limits refresh tokens to seven days. No capture scheduler or view rankings are connected by this upgrade.


### 9 October — runtime credentials applied

CJ supplied the existing Web OAuth client details and reports adding the authorised callback URL. Client ID and client secret were configured using native Sites runtime tools; the client secret is marked secret. The existing encryption key was retained. Redeployment of the existing private version succeeded with the new environment revision. No credential values or uploaded file contents were added to the repository. Next: CJ opens the same test page, approves Connect YouTube once and verifies restoration after refresh. Real Google callback/token writes and refresh are still unverified; automatic snapshot capture remains pending.


Hosted verification on 9 October: protected service POST succeeded and GET read back its persisted manual-service-check run; zero release selections existed, so no real view count was captured. Owner-only scheduler configuration is enabled in runtime. The private deployment succeeded at environment revision 4. Source commit: 44732262b69f09c83af4c6b0ffd53d18c0b4fc8b. No Google Cloud job has been created. Import the release once to save it in the new store. Real scheduled/source capture remains unverified.
