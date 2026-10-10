# Dashboard cards — start here

Updated 9 October 2026. Reviewed references belong in GemOS. telemetric-cards-test-suite is for experiments. Each reviewed group has one folder with three current files.

| Need | Open |
|---|---|
| Resume in a new chat | [HANDOFF.md](HANDOFF.md) |
| Music-release discovery, selector and folder setup | [PROJECTS.md](integration-tests/youtube/PROJECTS.md) |
| Next work and decisions | [PLAN.md](PLAN.md) |
| Shared fonts, material, colours and geometry rules | [Master design system](../DESIGN_SYSTEM.md) |
| Group 1 preview | [group-1/preview.html](group-1/preview.html) |
| Group 1 layout and interactions | [group-1/SPECIFICATION.md](group-1/SPECIFICATION.md) |
| Group 1 purpose, data and intended connections | [group-1/USAGE-AND-CONNECTIONS.md](group-1/USAGE-AND-CONNECTIONS.md) |
| Group 2 preview | [group-2/preview.html](group-2/preview.html) |
| Group 2 layout and interactions | [group-2/SPECIFICATION.md](group-2/SPECIFICATION.md) |
| Group 2 purpose, metrics and intended connections | [group-2/USAGE-AND-CONNECTIONS.md](group-2/USAGE-AND-CONNECTIONS.md) |
| API research across all 11 original cards | [ANALYTICS-FEASIBILITY.md](ANALYTICS-FEASIBILITY.md) |
| Latest fix verification and captures | [9 October evidence](verification/2026-10-09.md) |
| Review findings and remaining gaps | [REPOSITORY-REVIEW.md](REPOSITORY-REVIEW.md) |
| Historical Group 1 source | [Source specification](../../references/dashboard/source/group-1-spec-2026-10-05.md) |

## Source authority

DESIGN_SYSTEM.md governs reusable appearance. Each SPECIFICATION.md governs that group's presentation, geometry and interactions. Its USAGE-AND-CONNECTIONS.md governs purpose, measurements, eligibility, sources and source limitations. PLAN.md tracks sequence rather than approving requirements. Research establishes documented feasibility rather than approving product changes or proving a working connection. Confirmed later decisions supersede earlier proposals; preserve their rationale in decisions/log.md.

Group 1 is a finalised visual reference, with open integration and accessibility checks. Group 2 is the latest reviewed layout; metric choices, snapshot wording and partial-review behaviour are confirmed, with implemented/browser-verified preview changes and untested integrations. Neither HTML set has live connections. No Groups 3–5 folders are created before review. Original all-card HTML and audit remain chat source inputs, not finalised card sets.

Current files stay in their group folders. Superseded mixed documents are in archives/dashboard/2026-10-08/pre-group-folders; historical provenance is not current authority. Use Git history for previous HTML versions.

## Update discipline

Read the master and both documents for the affected group before changes. Update data decisions in usage notes, visual decisions in the specification, progress in PLAN.md and significant decisions in decisions/log.md. Compare related documents and the actual preview. Update master rules only when shared design changes are agreed. Ask about unsettled choices and obtain CJ's confirmation before code edits.

- [HTML review report](REVIEW.html) — findings, evidence, completed doc fixes and decisions still needed.


## First integration test

[YouTube manual import test — setup, source and controlled verification](integration-tests/youtube/README.md). Private hosted experiment; actual Google authorisation and Studio comparison pending. Reviewed previews remain mock references.
