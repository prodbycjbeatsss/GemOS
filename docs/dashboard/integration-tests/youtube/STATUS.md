# YouTube integration — current status

Updated 15 October 2026. Current authority: [dashboard handoff](../../HANDOFF.md), [channel-wide reporting](CHANNEL-SHORTS.md), [weekly upload reporting](WEEKLY-SHORTS.md), and [capture](CAPTURE.md).

## 2.1 Channel-wide Shorts

Production covers all owned-channel Shorts activity in the selected 7/28/90/365-day Pacific period. Google content classification, signed Likes/real zero, aggregate retention, paginated counts, Top3 period videos, original metric tiles, owner cache and stale-response guards are implemented. Legacy selected-video test paths are historical fallback; they do not define the configured source. TikTok/Reels remain unavailable.

## 2.2 Weekly Shorts

Production discovers public uploads by Monday–Sunday Europe/London publication week, current week/default and52 previous weeks. No title matching or manually selected release is required. Headline and ranks use current cumulative views for eligible uploads, with individual row views and tie places. These are lifetime-to-sync counts for a weekly upload cohort. Unknown classification stays unranked; unavailable confirmed counts do not become zero. Frozen24h snapshots remain details/checker evidence, not the visible ranking source.

## Acceptance and limits

CJ reports both cards and Sync all/uniform timestamps working. A roughly10–15-view Studio difference is accepted; its cause is unconfirmed. A real qualifying24h capture, TikTok/Reels queries and measured current rendered/device/accessibility checks remain unverified. Earlier manual-selected-release and sample-only notes are superseded.

Eight focused reporting/sync/state/automation/capture checks pass during15October reconciliation. No new build/provider request/deployment was performed. Version74/source14101e638b8bdef89f031fa380af697a0837a9a1 is the mirrored source.
