# Dashboard — start here

## Current deployed contract — reconciled 15 October 2026

Site version **74**, source `14101e638b8bdef89f031fa380af697a0837a9a1`, was successfully deployed on 14 October at 21:03 UTC. This contract takes precedence over older selected-sample/release-only/Compact Automation notes below. Historical previews remain provenance.

- **2.1:** channel-wide YouTube Shorts activity, with 7/28/90/365-day periods, four original metric tiles and up to three highest-viewed Shorts for the same reporting period. Official content-type classification; no manually chosen video sample in the configured production path. TikTok/Reels remain unavailable. See [channel reporting](integration-tests/youtube/CHANNEL-SHORTS.md).
- **2.2:** Weekly Shorts, grouped Monday–Sunday by Europe/London publication date, independent of titles/remix names. Current week defaults; up to 52 past weeks. Headline sums current cumulative views of confirmed/format-eligible Shorts uploaded that week; rows show current views and competition ranks. These are lifetime-to-sync counts for that upload batch, not views earned only during the week. Unknown classification stays unranked; missing confirmed counts make the total unavailable. Frozen 24-hour snapshots remain in details and the checker, never backfilled from later counts.
- **Sync:** source cards and Automation tiles show a shared single-line UK time including seconds beneath the action; full date remains in machine-readable/accessibility text. Last successful completion survives failed attempts. Manual costs says Last saved; unconnected sources have no invented timestamp.
- **Automation:** one cobalt 920px Large card, nine centred status tiles; three columns desktop/two phone, 20px plain icons, 12px titles/11px status and dates, 8px padding/12px gaps. Individual Sync and sequential Sync all retain safe read-only actions and truthful partial/skipped/failed outcomes.
- **Evidence:** CJ reports Sync all/timestamps and the later channel-wide/weekly Shorts changes working. A 10–15-view difference from Studio is accepted; its cause is unconfirmed. Controlled tests are separate from that acceptance; fresh rendered accessibility/device checks and a real qualifying 24-hour capture remain unverified.


## Current grouping — 13 October 2026

CJ approved moving Email List from Group3 to Group2 and Subscription Costs from Group4 to Group3, with destination size/colour rules. Group2 is **Audience & Performance**:2.1 Short-form performance,2.2 24-hour Shorts ranking,2.3 Email List; all purple Large920px. Group3 is **Finance**:3.1 Payhip,3.2 YouTube earnings,3.3 YouTube payouts,3.4 Subscription Costs; all green Compact454px. Finance is a2×2 desktop grid with12px vertical/20px horizontal gaps. No new standalone group. Group4 Automation Performance is now live at /automations with the first YouTube checker adapter. Publishing Cadence remains unimplemented.

Email keeps its independent Mailchimp settings/reporting/member popup on /. Subscription costs keep manual saved histories/top-ups/logos/management on /commerce. API/storage/scopes unchanged. /costs is an authenticated303 redirect to /commerce. Historical IDs/colours below are superseded by this grouping; original mocks remain provenance.


Updated 11 October 2026. GemOS owns reviewed designs and the private connected integration. telemetric-cards-test-suite is for experiments. Canonical preview.html files are historical mocks; current live behaviour is specified here and implemented under integration-tests/youtube.

| Need | Authority |
|---|---|
| Resume / next work | [HANDOFF](HANDOFF.md) / [PLAN](PLAN.md) |
| Shared appearance | [Design system](../DESIGN_SYSTEM.md) / [tokens](../DESIGN_TOKENS.md) |
| Group 1 presentation / interactions | [Specification](group-1/SPECIFICATION.md) / [components](group-1/COMPONENTS.md) |
| Group 1 purpose / sources | [Usage](group-1/USAGE-AND-CONNECTIONS.md) |
| Asset validation / preparation and folders | [ASSETS](integration-tests/youtube/ASSETS.md) / [PROJECTS](integration-tests/youtube/PROJECTS.md) |
| Group 2 design / data | [Specification](group-2/SPECIFICATION.md) / [usage](group-2/USAGE-AND-CONNECTIONS.md) |
| Group 2 current implementation and evidence | [STATUS](integration-tests/youtube/STATUS.md) / [CAPTURE](integration-tests/youtube/CAPTURE.md) |
| Group 3.1 design / connection status | [Specification](group-3/SPECIFICATION.md) / [usage](group-3/USAGE-AND-CONNECTIONS.md) / [components](group-3/COMPONENTS.md) |
| Group 4 Automation Performance | [Specification](group-4/SPECIFICATION.md) / [usage](group-4/USAGE-AND-CONNECTIONS.md) / [components](group-4/COMPONENTS.md) |
| Research / earlier review | [Feasibility](ANALYTICS-FEASIBILITY.md) / [review](REPOSITORY-REVIEW.md) / [9October evidence](verification/2026-10-09.md) |
| Historical previews | [Group 1](group-1/preview.html) / [Group 2](group-2/preview.html) |

The design system owns shared appearance; group specification owns presentation; usage owns meaning/eligibility; integration contracts own APIs/state. Later confirmed decisions are incorporated into current documents, rather than appended as conflicting rules. decisions/log.md and archives/dashboard retain rationale/evidence as history. Group 1 is connected to Drive checks/preparation; Group 2 has partial Google imports/capture infrastructure. Neither is a complete automated release system. Group 3.1 now has private server-saved Payhip connection settings and prospective webhook ingestion. Receiver is public with CJ’s approval and first £0 coupon notification is verified. Prospective sales reporting/mapping/test exclusions are implemented; actual variation capture and paid/refund verification remain pending. Group 3 now has four implemented cards. Manual Costs is now3.4 Finance; Email List is2.3 Audience & Performance. Automation Performance is Group4, implemented with partial monitored coverage. Publishing Cadence remains unimplemented. Current verification limits are in HANDOFF.

Read affected contracts and AGENTS before changes. Update code, current documentation, plan and significant decision log together. Preserve group-specific layouts. Report observed source/access separately from user-reported setup and controlled tests. Unsettled choices need discussion; previously accepted authorisation persists.
