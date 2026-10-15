# GemOS private YouTube test

Accepted cards live in ui/. Server connection routes live in app/ and server/. Database migrations live in drizzle/. Hosted build uses the Sites Vinext starter. Google configuration and completion limits are documented in GemOS docs/dashboard/integration-tests/youtube/BACKEND.md. No secrets or private reports belong in source.

### Automations tile styling — 14 October 2026

The 920px Large cobalt card retains its two-column desktop group slot. Its inner status grid uses three columns on desktop and two on phones, 12px gaps, 8px tile padding and centred 20px icons. Individual Sync and Sync all use the established transparent 11px/600 icon-and-text control with a 16px stroke icon and 44px hit target. Routine details remain in footer run history; tiles retain an issue link when attention is needed. Status and last successful sync remain visible. Controlled interaction/backend checks pass; rendered phone/desktop verification remains pending.

### Short-form sync setup — 14 October 2026

Live diagnosis found no saved `shorts-analytics-sync` target. A Google connection alone does not establish the separately confirmed 2.1 Shorts sample. The Automations grid now reports Setup required, links to the source's Shorts input, and skips bulk sync until a saved or valid same-tab confirmed sample is available. A skipped/failed attempt retains its reason on the tile after refreshing status. No success timestamp/run is fabricated, and 2.2's release selection is never reused. Initialise by choosing and confirming the 2.1 sample and successfully syncing it on Audience & Performance. Backend fixtures verify the setup flag clears after real query completion; UI fixtures verify disabled setup controls, bulk exclusion and persistent skip feedback. Live owner execution after setup remains to verify.

## Current 2.1 scope — 14 October 2026

The configured production card now reports channel-wide Shorts using YouTube's official creatorContentType classification, rather than the manual sample. See CHANNEL-SHORTS.md for requests, dates, persistence, verification and limits. This supersedes the sample-setup guidance above. 2.2 now independently discovers uploads by UK publication week; see WEEKLY-SHORTS.md. Sync all uses the same service and current Pacific reporting date.
