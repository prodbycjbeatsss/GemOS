# GemOs repository review

**Follow-up:** CJ approved R01–R03 and R10 on 8 October; fixes are pending implementation. Subsequent metric, capture and notification decisions are recorded in [HANDOFF.md](HANDOFF.md) and current group usage notes. The findings below preserve the original dated review, including then-open decisions.

8 October 2026. Reviewed baseline: aba3760997cd858d2fb318e96bf569d814ac1900. Reorganisation and documentation corrections are included in this change; the two card previews remain unchanged. This is a reference review, not a production release approval.

[Open the HTML report](REVIEW.html).

## R01 — Group 1 can cut off the third project date

- Status: Needs approval; Confirmed in the existing preview.
- Priority: Medium.
- Impact: When the web font cannot load, the third project date extends below the recessed panel at mobile widths and at the desktop breakpoint. You can lose useful scheduling information.
- Evidence / reproduction: Open the ready state with three projects, block remote fonts, and inspect widths 320, 390 and 840 CSS pixels. At 390 the date bottom is 710.47px while the panel ends at 708.5px; at 840 it extends about 13px below the panel. The normal 1280px desktop test fits.
- Expected: Keep all three project dates visible inside the accepted fixed card geometry.
- Recommendation / resolution: Approve a focused spacing or row-budget adjustment, then check both the intended font and the fallback font. No card code has been changed.
- Source: [docs/dashboard/group-1/preview.html#L240](https://github.com/prodbycjbeatsss/GemOS/blob/main/docs/dashboard/group-1/preview.html#L240)

## R02 — Group 1 loses content when text is enlarged

- Status: Needs approval; Confirmed in a controlled browser probe.
- Priority: Medium.
- Impact: The fixed panels hide content when text becomes much larger. This matters for someone who needs larger text to read the dashboard.
- Evidence / reproduction: At 390 CSS pixels, capture each computed font size and double it once. The project and readiness panel content clips; parts of the checklist disappear. This is a controlled font-size probe, not a native Android font-scaling or browser-zoom test.
- Expected: Enlarged text must remain available; the design system allows an accessibility reflow exception to the normal fixed-size rule.
- Recommendation / resolution: Approve an enlarged-text layout strategy before changing code. Validate it on Android as well as in the browser.
- Source: [docs/dashboard/group-1/preview.html#L241](https://github.com/prodbycjbeatsss/GemOS/blob/main/docs/dashboard/group-1/preview.html#L241)

## R03 — Group 1 throws an error if its styling CDN is unavailable

- Status: Needs approval; Confirmed in the existing preview.
- Priority: Low.
- Impact: The preview still has embedded styling, but an unguarded Tailwind configuration creates a JavaScript error when its external script fails to load.
- Evidence / reproduction: Block the HTTPS CDN request and open Group 1. The browser reports “tailwind is not defined” from the configuration near the top of the document. Tested card interactions still work.
- Expected: The reference should open without an avoidable error when a remote dependency is unavailable.
- Recommendation / resolution: On the next approved code pass, remove an unused dependency or guard the configuration after checking what relies on it.
- Source: [docs/dashboard/group-1/preview.html#L13](https://github.com/prodbycjbeatsss/GemOS/blob/main/docs/dashboard/group-1/preview.html#L13)

## R04 — Agent instructions pointed at missing guidance

- Status: Fixed in docs; Confirmed; documentation corrected.
- Priority: Medium.
- Impact: An agent could be told to read files that were absent or to apply frameworks more rigidly than the profile intended.
- Evidence / reproduction: AGENTS.md and CLAUDE.md referred to a missing Four Cs overview and a missing voice document. Both now point to the existing evaluation rubric and available framework guidance; a concise voice guide records confirmed preferences without inventing writing samples.
- Expected: Both entry points should route to real, consistent instructions.
- Recommendation / resolution: Completed. No custom writing samples or new personal facts were invented.
- Source: [AGENTS.md](https://github.com/prodbycjbeatsss/GemOS/blob/main/AGENTS.md)

## R05 — Connection labels could imply live integrations

- Status: Fixed in docs; Confirmed; documentation corrected.
- Priority: Medium.
- Impact: Historical setup dates are not proof that dashboard analytics or publishing work. Confusing these could make mock figures look more trustworthy than they are.
- Evidence / reproduction: The connection registry now separates GitHub access verified in this workspace from historical, unverified setup notes and planned GemOs integrations. The old registry is preserved in the archive.
- Expected: State what was tested, where it was tested, and what is still unverified.
- Recommendation / resolution: Completed. Live API access and deployed dashboard connections still require separate tests.
- Source: [connections.md](https://github.com/prodbycjbeatsss/GemOS/blob/main/connections.md)

## R06 — Current card references were mixed with combined documents

- Status: Fixed in docs; Confirmed; organisation corrected.
- Priority: Low.
- Impact: It was harder to find the current preview and distinguish visual rules from data and connection rules.
- Evidence / reproduction: Each reviewed group now has preview.html, SPECIFICATION.md and USAGE-AND-CONNECTIONS.md. The dashboard index, shared design system, plan and agent routes point to them. Previous combined documents are archived.
- Expected: One obvious current home per group, with shared rules above the group-specific documents.
- Recommendation / resolution: Completed. Preview contents are preserved; Groups 3–5 remain unreviewed and do not have invented final specifications.
- Source: [docs/dashboard/README.md](https://github.com/prodbycjbeatsss/GemOS/blob/main/docs/dashboard/README.md)

## R07 — Old and new rules needed a clear order of authority

- Status: Fixed in docs; Confirmed; documentation consolidated.
- Priority: Medium.
- Impact: Earlier descriptions could be read as exact first-24-hour data or as having no reserved header space, conflicting with later decisions and actual geometry.
- Evidence / reproduction: Current Group 2 documents describe snapshots captured around 24 hours with the actual capture time recorded, matched panels and the reserved header geometry. The shared system distinguishes Group 1’s independent panels from Group 2’s matched panels. Earlier documents are historical.
- Expected: Current rules should agree with the accepted preview and confirmed decisions; unresolved details should remain explicitly open.
- Recommendation / resolution: Completed in documentation. Timing tolerance and final heading wording remain decisions, not inferred requirements.
- Source: [docs/dashboard/group-2/SPECIFICATION.md](https://github.com/prodbycjbeatsss/GemOS/blob/main/docs/dashboard/group-2/SPECIFICATION.md)

## R08 — The leaderboard heading needs to reflect snapshot timing

- Status: Open decision / evidence gap; Known open product decision.
- Priority: Decision.
- Impact: “Shorts Views (24hrs)” can sound like an exact first-24-hour total, while the agreed approach captures a count around that point.
- Evidence / reproduction: The preview retains the approved earlier heading. The newer snapshot approach records capture time, but its tolerance and honest final label are unsettled.
- Expected: The label and details should accurately describe the measurement you choose.
- Recommendation / resolution: Agree timing tolerance, heading and missed-capture handling together. Keep a missed snapshot unranked; do not silently substitute a later lifetime count.
- Source: [docs/dashboard/group-2/USAGE-AND-CONNECTIONS.md](https://github.com/prodbycjbeatsss/GemOS/blob/main/docs/dashboard/group-2/USAGE-AND-CONNECTIONS.md)

## R09 — Some mock analytics are not yet proven obtainable

- Status: Open decision / evidence gap; Known integration evidence gap.
- Priority: Decision.
- Impact: An attractive metric can be difficult or impossible to import with the intended API and account permissions. A lifetime count is also different from activity during the last 28 days.
- Evidence / reproduction: The feasibility document records source limitations. Stayed to watch is not established as an obtainable API metric; TikTok and Instagram clip-attributed follows remain unverified. No real account import has been tested. Group 1’s required platform set and scheduling schema also remain open.
- Expected: Every live field needs a definition, source, period and explicit missing-data behaviour.
- Recommendation / resolution: Resume with the YouTube Stayed to watch replacement, then settle platform metrics and reporting scope. Validate a small authorised YouTube import before building automation. Activepieces remains optional.
- Source: [docs/dashboard/ANALYTICS-FEASIBILITY.md](https://github.com/prodbycjbeatsss/GemOS/blob/main/docs/dashboard/ANALYTICS-FEASIBILITY.md)

## R10 — A schedule comment describes the opposite of the actual rule

- Status: Needs approval; Confirmed in the existing source.
- Priority: Low.
- Impact: A future developer could follow the stale comment and count scheduled weeks beyond a gap, weakening the agreed buffer rule.
- Evidence / reproduction: The comment near line 598 says to count beyond gaps; the function near line 664 stops at the first gap. Current behaviour agrees with the usage document.
- Expected: Comments and behaviour should both describe consecutive scheduled weeks.
- Recommendation / resolution: Correct the comment on the next approved code pass. The working buffer behaviour does not need changing.
- Source: [docs/dashboard/group-1/preview.html#L598](https://github.com/prodbycjbeatsss/GemOS/blob/main/docs/dashboard/group-1/preview.html#L598)

## R11 — Some inherited kit information is still incomplete

- Status: Open decision / evidence gap; Confirmed documentation gap.
- Priority: Information.
- Impact: The wider repository contains onboarding placeholders and references to absent contract guidance. These are not evidence of a completed operating system.
- Evidence / reproduction: aios-intake.md remains a template. The storefront context mentions contract material that is not supplied. No working scheduled dashboard notification or automation was verified.
- Expected: Separate supplied facts, templates, intended connections and tested functionality.
- Recommendation / resolution: Complete these when that workflow is in scope. Do not fabricate personal answers, legal templates, credentials or automation status.
- Source: [aios-intake.md](https://github.com/prodbycjbeatsss/GemOS/blob/main/aios-intake.md)

## Verification scope

- **Repository coverage:** 167 tree entries; 68 text/source files read. Limit: Compiled vendor output, binary media and dependency lockfile contents were not independently audited.
- **Group 1 normal states:** 48 combinations across 320, 390, 840 and 1280px; buffer and missing-asset states exercised. Equal group card heights and no page-wide horizontal overflow. Limit: Third-date clipping occurs under the fallback-font conditions described in R01.
- **Group 2 normal states:** 32 combinations across four widths, two batches and four platform selections. No failures in the tested layout and state assertions. Limit: No live figures, API loading or authenticated integration tested.
- **Interaction checks:** Single selection, scrolling, dialog Escape/focus return and placeholder Sync behaviour checked. Limit: Native Android Back and device font scaling still need device tests.
- **Source checks:** 10 canonical JS/MJS syntax checks, shell syntax and package JSON checks passed. Paired read skill Markdown mirrors matched. Limit: No full 3D-brain build, dependency security audit or production performance assessment.
- **Accessibility limits:** Controlled enlarged-text probe exposed R02; keyboard dialog behaviour checked. Limit: No full WCAG conformance or measured contrast claim.

## Report format research

[W3C evaluation overview](https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/) informed explicit scope, evidence and limits. [Mozilla bug-writing guidance](https://bugzilla.mozilla.org/page.cgi?id=bug-writing.html) informed reproduction steps and expected versus actual behaviour. This is not a WCAG certification.

## Next action

CJ reviews and approves any reference-code fixes. Resume the card plan with the YouTube Stayed to watch replacement and source definitions; no live integration or automation is claimed.
