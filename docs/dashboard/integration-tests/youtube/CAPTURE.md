# Selected-release 24-hour snapshots

The shared saved Google connection serves both cards. POST /api/youtube/release saves one current release per owner/channel (1–6 user-confirmed Shorts). GET restores it after refresh. A new selection replaces the current selection; prior frozen snapshots remain stored for their exact video/publication timestamp.

A snapshot stores the cumulative YouTube Data API v3 videos.statistics.viewCount returned between 24h and 24h15m after publication. Both request and return timestamps must fall inside that window. This is a near-24-hour observed count, subject to Google's reporting delay, not a reconstructed exact first-24-hour Analytics report. Current counts cannot fill a missed historical window. Only public, owned, available videos with valid publication time and nonnegative integer counts qualify. Zero is valid. Missing, early, late and private/unlisted results remain unavailable. INSERT OR IGNORE freezes the first qualifying count; later counts cannot overwrite it.

Rank descending, with competition ties (1,1,3); unavailable entries retain selection order below ranked entries. Saved counts include exact request/return timestamps in details. Normal recess dimensions, fixed-height scroll rows and title/icon spacing remain unchanged. Browser rendering has not been verified in the managed environment.

## Background checker

POST /api/youtube/run-captures uses private Sites service access (OAI-Sites-Authorization) plus YOUTUBE_UPDATER_KEY (Authorization). It reads active saved connections and release selections, renews Google access server-side, captures eligible counts, and records a run. Old completed public selections need no Google query. Disconnect stops unattended access. Metadata for pending/nonpublic selections is refreshed, including scheduled publication becoming public. A late or failed run cannot backfill snapshots.

GET /api/youtube/capture-health uses the same service authorization and reports owner readiness and the persisted last run. Manual service verification is recorded separately from a scheduled job. Scheduled status requires an authenticated request carrying the configured Cloud Scheduler job-name header. Last-success time is evidence of that run, not a guarantee the schedule remains enabled. Sync/import refreshes card status; no automatic page polling was added.

Secrets are runtime values, never source: YOUTUBE_UPDATER_KEY, SITES_SERVICE_TOKEN, YOUTUBE_CAPTURE_OWNER_ID, alongside the existing Google credentials and unchanged encryption key. Migration 0001 adds selections, snapshots and run logs; 0000 is unchanged.

## Google Cloud Scheduler setup

The built-in task runner's hourly minimum cannot meet the capture window. Use one Google Cloud Scheduler HTTP job every five minutes in the existing project. The owner-only page can download a private flags file; it contains service credentials and must not be committed or shared. Upload to Cloud Shell, select the existing project, and run the three commands shown in the setup panel. Job: gemos-youtube-capture, location europe-west2, UTC cron */5 * * * *, no retries, 60-second deadline. Avoid duplicate job creation; inspect an existing same-name job before updating. Delete the uploaded/downloaded flags file after setup.

Run the job once and verify a successful execution and saved last-run status before calling automatic capture connected. Google may require project billing; the user must decide and enable it. This setup is not a second Google/YouTube login. Google's external Testing refresh-token expiry can still require reconnecting after seven days.

Verification: node verify-capture.mjs, node verify-backend.mjs, node verify-state.cjs, supported production build. Fixtures are synthetic. Live first-window capture requires a newly published qualifying Short; old releases cannot prove it.


## Completion checkpoint — 9 October

CJ accepts 2.2 implementation as complete, with real first-release snapshot and displayed ranking unverified. Google Scheduler endpoint calls and persisted scheduled classification are verified, including a post-fix run at 20:05 UK; CJ reports the updated sync status. First release check: import a public owned Short before 24h, retain the selection through 24h15m, confirm a stored qualifying count, matching source/timestamps, displayed views/rank, and persistence after refresh. Do not fabricate historical first-day values or describe synthetic checks as live capture proof. Historical release reporting and automatically advancing 2.1 dates are separate proposals, not implemented.

Leaderboard vertical scrolling now uses native scroll chaining: short lists pass gestures to the page; overflowing lists scroll internally and pass scrolling to the page at either end. The 360px list and 575/583px recess dimensions remain. Rendered Android scrolling still needs user verification; no browser QA was available.
