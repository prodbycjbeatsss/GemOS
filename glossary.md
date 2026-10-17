# GemOS glossary

Updated 16 October 2026. Shared product wording for the dashboard and Release Planner. Existing detailed source contracts own validation and eligibility; this glossary owns consistent meaning. Do not invent a second status system in the calendar.

## Core terms

| Term | Meaning | Source / editing rule |
|---|---|---|
| Project | The work and associated assets for a remix. It may be unfinished. | Owner/project records and explicit Drive-folder association where connected. |
| Release | One weekly main remix and its associated short-form posts. | Shared release/project association; a working title is permitted. |
| Post | One item intended for one publishing destination. | Its own destination, intended date/time and platform evidence. Cross-posts remain separate entries. |
| Planned | An intended date/time has been assigned. | Plan data. Does not claim files are ready or a platform has scheduled the post. |
| Files ready | Required assets pass the relevant current checks. | The same asset-check records used by Release readiness. For the complete release, all eight required categories must pass. Does not mean confirmed ready, queued or scheduled. |
| Confirm ready | The explicit reviewed action under the current preparation contract. | Requires saved review, fresh8/8 checks and an unchanged reviewed snapshot; may move the project to Release Queue under existing guards. It is not a free-form calendar status. |
| Release Queue | The connected Drive stage for projects queued through the supported workflow. | Actual checked folder location and recorded confirmation. A plan date does not move a project here. |
| Scheduled | The platform confirms future publication. | Provider evidence used by the dashboard. YouTube requires an owned private future publishAt, succeeded processing and verified eligible format under SCHEDULE.md. Never manually set from the Planner. |
| Not checked | The relevant check has not produced a result. | Check state; never substitute a fabricated ready/scheduled value. |
| Unverified | Available evidence cannot establish the claimed fact. | Preserve source-specific reason, including unknown format/processing or an unconnected destination. |
| Stale | A saved result may no longer describe the current state. | Retain its source/time and disclose staleness; it is not fresh confirmation. |
| Preview | The current design demonstration using fictional content. | A page-level explanation, not a release/post status. “Preview status” and manual status editing were removed in version77. |

Readiness, review/queue stage, planned timing and platform scheduling are independent facts. Show the relevant facts without collapsing them into one editable status. Source errors, partial results and unavailable data must remain explicit; they are not zero or proof that an item is unscheduled.

## Calendar destinations

| UI label | Meaning | Weekly entries per release |
|---|---|---|
| YouTube | Main remix video |1, Monday|
| YouTube Shorts | Short-form clips on YouTube |6, Tuesday–Sunday|
| TikTok | The corresponding TikTok posts |6, Tuesday–Sunday|
| Instagram Reels | The corresponding Instagram Reels posts |6, Tuesday–Sunday|

These are four separate calendar filters/destination labels. YouTube and YouTube Shorts share a provider connection, but have distinct format/slot rules. There are19 planned platform entries in total. Release Buffer coverage remains the separate seven-YouTube-upload rule; TikTok/Reels do not count towards it.

Use recognisable coloured platform logos alongside names, with distinct card tints. A logo/tint never conveys status by itself.

## Shared data rule

The calendar is another view of the same underlying release, asset-check and provider records used by the dashboard cards. It must not copy card text into a second database or maintain contradictory status values. Update shared records through the owning workflow, then refresh both views. Planning dates remain editable plan data; source-derived facts remain read-only.

Explicit project-to-upload association is required where a relationship is claimed; matching titles alone is not evidence. TikTok/Reels scheduling stays unverified until genuine provider evidence is available. Version77 reuses Release Buffer's existing saved YouTube report through the same GET endpoint. Version78 adds owner-scoped saved plans/defaults. Explicit project/asset/upload associations remain next; no readiness or remix association is inferred.

## Authoritative detail

- [Release readiness and preparation](docs/dashboard/group-1/USAGE-AND-CONNECTIONS.md)
- [Asset validation](docs/dashboard/integration-tests/youtube/ASSETS.md)
- [YouTube scheduling / Release Buffer](docs/dashboard/integration-tests/youtube/SCHEDULE.md)
- [Release Planner specification](docs/dashboard/planner/SPECIFICATION.md)

New or changed product wording belongs here alongside its affected specification. Record confirmed decisions in decisions/log.md; label unsettled terminology as proposed.


## Publishing settings and timing — confirmed16October2026

- **Default post time:** the owner-configured local publishing time for a destination, used when creating a new plan. The settings initially have no times; the owner chooses and saves them.
- **Post time override:** an explicit intended time saved for one post instead of its inherited default. It changes a plan, not a provider schedule.
- **Reschedule:** an explicit change to an already platform-scheduled post; it is confirmed only after the platform accepts the new time.
- **Upload scheduler:** future automation that transfers media and requests platform scheduling from the saved plan. The existing five-minute statistics checker is not an upload scheduler.

Settings → Publishing owns timezone/four destination defaults. Changes affect new plans; applying them to existing editable plans is explicit. Use Europe/London for UK planning and handle GMT/BST. Actual clock-time preferences must be chosen in Settings, not guessed from examples.


**My plans:** saved intended release/post records in the private OS database. Editing intended timing does not reschedule a platform upload. **Example plans:** fictional temporary layout examples, kept separate from My plans and the actual YouTube schedule. A saved working-title rename updates its plan cards; linked project metadata/artwork remains a later connection. **Use current Publishing default:** explicitly replace a post override with the destination's currently saved default time. **Review plan changes:** preview changes before applying current defaults to eligible existing plans; personal overrides/platform-linked records are excluded.
