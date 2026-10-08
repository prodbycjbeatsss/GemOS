# Dashboard cards — start here

Updated 8 October 2026. This folder collects the reviewed card references, their rules and the next work. Finished/reviewed references belong in GemOS; telemetric-cards-test-suite remains for experiments.

| Need | Open |
|---|---|
| What to do next | [PLAN.md](PLAN.md) |
| Shared visual rules | [Master design system](../DESIGN_SYSTEM.md) |
| Group 1 purpose, behaviour and intended connections | [GROUP-1.md](GROUP-1.md) |
| Group 2 agreed layout, metrics, behaviour and verification | [GROUP-2.md](GROUP-2.md) |
| What each original card can realistically obtain | [ANALYTICS-FEASIBILITY.md](ANALYTICS-FEASIBILITY.md) |
| Finalised Group 1 HTML reference | [group-1.html](../../references/dashboard/groups/group-1.html) |
| Latest Group 2 HTML reference | [group-2.html](../../references/dashboard/groups/group-2.html) |
| Original shared/Group 1 specification | [Source specification](../../references/dashboard/source/group-1-spec-2026-10-05.md) |

## Status

Group 1 is finalised as a visual reference. Group 2's latest reviewed layout is saved, while API-driven metric changes and snapshot wording remain open. Neither HTML file has live platform connections. The Group 2 document includes newer confirmed behaviour not yet applied to its HTML; code changes still require CJ's confirmation.

The original all-card index and audit remain source inputs to this chat, not finalised Groups 3–5. Those groups await card-by-card review.

## Documentation precedence

Latest confirmed decisions in group specs and decisions/log.md override older proposals. DESIGN_SYSTEM.md governs reusable appearance. PLAN.md tracks work rather than inventing requirements. Research identifies feasibility rather than approving product changes. Keep a single current HTML reference per group; use Git history for previous versions.

## Update discipline

When a decision changes, update its group spec and PLAN.md; append meaningful operational/architectural decisions to decisions/log.md. Change DESIGN_SYSTEM.md only for an agreed shared rule. Keep the shared master and group exceptions consistent. Never label an untested connection as working.
