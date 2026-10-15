# Group4 — Automation Performance contract

Current1.1 adapter: youtube-schedule-sync uses the same Source Sync/Sync-all handler. Fixed provider GET calls, cached owner-only reads without runs, partial unverified metadata; no new scope/schema. See [SCHEDULE](../integration-tests/youtube/SCHEDULE.md).

Updated15October2026; deployed version75. One cobalt920px Large card; nine centred tiles, three columns desktop/two phone. Plain20px icons,12px names/11px state and date,8px padding/12px gaps. Existing32px/22px radii,58px top glyph,20/24px insets and44px action targets remain. Shared single-line UK time with seconds sits beneath each Sync; full date remains accessible. Manual Costs says Last saved; Release Buffer uses confirmed YouTube schedule sync.

Individual Sync and sequential Sync all use fixed allowlisted read-only services, prevent duplicate execution and continue after failures. Current supported sources: YouTube schedule, Drive discovery/checks, channel-wide Shorts2.1, UK-weekly Shorts2.2, Mailchimp, received Payhip sales, YouTube earnings and payouts. Costs are manual; Buffer uses the confirmed seven-upload YouTube schedule.2.1 uses owned-channel/range selection;2.2 independently uses weekly channel/week. Neither requires or borrows a manual video sample.

Attention counts/history retain unresolved failed/unconfirmed operations even after later ordinary success. Checker retry resolves only linked eligible issues; dismissal needs a reason. Owner-only status/history reads create no runs. Sync never publishes/schedules/approves/moves/sends/purchases or rewrites manual records.

CJ reports Sync all and timestamps working. Eight reporting/sync/state/automation/capture controlled checks passed during15October reconciliation. Real qualifying24h capture and measured rendered/accessibility checks remain open. Source/deployment provenance and next work: [HANDOFF](../HANDOFF.md). API/storage details: [USAGE-AND-CONNECTIONS](USAGE-AND-CONNECTIONS.md).
