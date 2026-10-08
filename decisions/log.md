# Decisions Log

Append-only record of meaningful decisions and why they were made. `/level-up` Phase 2 (Method interview) writes scoped automation specs here. You can also append manually whenever you decide something worth remembering.

**Format per entry:**

```
## YYYY-MM-DD — Short title

**Decision:** what was decided.

**Why:** the reasoning, constraints, and what would change your mind.

**Alternatives considered:** what else was on the table.

**Owner:** who's accountable.
```

Keep it terse. Future-you will thank present-you for capturing the *why*, not just the *what*.

---

## 2026-09-06 - Audit evidence and routing maintenance

**Decision:** Ship audit rubric v2 and a small /link skill. Audit scores working evidence across the Four Cs, checks operating-manual routing and freshness, and passes one concrete gap into /level-up. A selected repair can improve an existing workflow instead of creating another skill.

**Why:** File counts, configured keys, named rituals, and recent edits do not prove an operational AIOS. Source findability and freshness need explicit checks.

**Alternatives considered:** Keeping presence-based scoring or requiring a hot cache. Neither reliably establishes retrieval quality or successful execution.

**Owner:** Nate Herk

---

## 2026-09-06 - Portable skills and automatic audit history

**Decision:** Ship all four skills for Claude Code and Codex, with bundled resources, matching operating manuals, and a script for regenerating Codex copies. Audit reports are saved automatically, preserve previous runs, and track findings across comparable inspections.

**Why:** Students need the same shared guidance when switching assistants and evidence of actual improvements over time. Intentional runtime adaptations, unknown verification, and confirmed defects are reported separately.

**Alternatives considered:** Single-assistant distribution or manual copy-pasting of prompt updates across platforms.

**Owner:** Nate Herk

---

## 2026-09-06 - Portable 3D Brain skill

**Decision:** Add `/3d-brain` for Claude Code and Codex. Ask for a name and categories, map selected local folders, and scaffold a bundled, configurable application with spherical placement, Cinema, and interactive growth replay.

**Why:** Shipping the working renderer preserves the intended appearance and interactions across AIOS installations. A prose-only prompt would produce inconsistent recreations. User config and graph data remain local; the public package includes only code, documentation, dependency notices, and fictional test inputs.

**Alternatives considered:** Pure ASCII art representation or web-hosted third-party visualisers.

**Owner:** Nate Herk

---

## 2026-09-06 - Add ongoing context interviews

**Decision:** Adapt Herk-2's grill-me skill for the student kit and ship matching Claude/Codex packages. Save every answer to brainstorms/, preserve resumable Q&A history, and update canonical context only with confirmed facts during requested context-building sessions.

**Why:** Onboarding is an initial snapshot. Ongoing interviews capture changing priorities, decisions, and preferences while keeping tentative ideas distinct from current business facts.

**Alternatives considered:** Overwriting canonical context on every chat interaction without human review.

**Owner:** Nate Herk

---

## 2026-09-29 — Mobile-first navigation and WCAG token system

**Decision:** Standardise on a fixed 4-tab mobile bottom bar (`[Overview, Graph, Chat, Skills]`), top-left slide-over drawer, desktop collapsible sidebar with pinned profile anchor, and a calibrated token matrix (4 dark surfaces, 4 light surfaces, 8 accent colourways).

**Why:** Guarantees WCAG 2.1 AA/AAA contrast compliance across all user-selected themes and prevents virtual keyboard clipping, touch-scroll hijacking, and nested scroll traps on mobile viewports.

**Alternatives considered:** Arbitrary hex colour picker, desktop-only layout, and a single responsive layout without dedicated mobile navigation patterns.

**Owner:** Colin Jones

---

## 2026-09-29 — Four Cs architecture and 3Ms operational framework

**Decision:** Adopt Nate Herk's Four Cs (Floor 01 Context, Floor 02 Connections, Floor 03 Capabilities, Floor 04 Cadence) and Three Ms frameworks (Mindset, Method, Machine) with L0–L4 Autonomy ratings, the Intern Rule, and the Kill Switch.

**Why:** Prevents disconnected automations, ensures deterministic scripts precede non-deterministic LLMs, and enforces view-only, scoped permissions with audit trails.

**Alternatives considered:** Unstructured agent-first setups, autonomous agents with unrestricted write access, and ad-hoc automations without an underlying architectural stack.

**Owner:** Colin Jones

---

## 2026-09-29 — Payhip automated digital storefront engine

**Decision:** Use Payhip backed by PayPal for automated per-video beat license sales and instant untagged audio file delivery, linking directly from YouTube/Shorts descriptions and automated pinned comments.

**Why:** Eliminates the manual email and Instagram DM negotiation bottleneck that loses midnight impulse buyers, without incurring the recurring monthly subscription fees of BeatStars.

**Alternatives considered:** Returning to BeatStars (monthly subscription overhead), manual DM/email bank transfers (high drop-off), and custom Stripe webhook infrastructure (high maintenance burden).

**Owner:** Colin Jones

---

## 2026-09-29 — Absorb Nexus metadata generator into local CJ-OS capability

**Decision:** Deprecate the standalone Base44 Nexus web app and absorb metadata generation, description formatting, and tag creation directly into CJ-OS as a local Floor 03 skill.

**Why:** Eliminates manual data entry across disparate tools and enables automated extraction of artist, title, and key/BPM directly from FL Studio audio exports.

**Alternatives considered:** Integrating the external Base44 web app via API or maintaining manual data entry in a separate browser tab.

**Owner:** Colin Jones

---

## 2026-09-29 — Centralise notes, catalogue, and backlog in Notion

**Decision:** Designate Notion as the canonical workspace for track catalogue databases, project backlogs, and release schedules, connecting to CJ-OS via MCP.

**Why:** Resolves scattered notes across devices, leverages Colin's familiar workflow, and provides clean structured data for Graphify to index.

**Alternatives considered:** Obsidian vault, loose Markdown/text files, Google Docs, and ClickUp.

**Owner:** Colin Jones

---

## 2026-09-30 — Streamline connections and eliminate enterprise bloat

**Decision:** Strip out Stripe, Skool, Slack, Fireflies, and lyric transcription ingestion from Floor 02 Connections. Standardise strictly on PayPal, Payhip, YouTube Studio, Google Workspace (Gmail/Calendar), Notion, and Local Files.

**Why:** Solitary music production and content creation workflows do not require team chat, meeting summarisation, or lyric RAG, which only pollute local context and waste tokens.

**Alternatives considered:** Leaving unused services configured as inactive or maintaining generic template integrations.

**Owner:** Colin Jones

---

## 2026-09-30 — Sunsama-style morning ritual for Floor 04 Cadence

**Decision:** Implement an interactive morning briefing script that ingests Google Calendar events via `gws-cli`, surfaces proactive task suggestions from the Notion backlog, and prompts interactive daily hit-list triage into `today.md`.

**Why:** Establishes an intentional start to the day, aligns immediate actions with quarterly upload and development priorities, and prevents reactive distractions.

**Alternatives considered:** Passive desktop notifications, uncurated to-do lists, and unstructured manual planning.

**Owner:** Colin Jones


## 2026-10-08 — Dashboard references and integration review

**Decision:** Keep reviewed/finished dashboard references in GemOS and experiments in telemetric-cards-test-suite. Use docs/dashboard/README.md as the index, docs/DESIGN_SYSTEM.md for shared appearance, group specs for behaviour/connections and PLAN.md for next work. Compare documents before changes and distinguish approved rules from proposals.

**Why:** CJ needs current files to be easy to find without contradictory design or data assumptions. Group 1 is visually finalised; Group 2 has a reviewed layout but unresolved API-driven metrics. Neither is a live integration.

**Alternatives considered:** Keeping final references only in the test suite or scattered chat attachments; forcing all cards into Group 1's internal layout.

**Owner:** CJ

## 2026-10-08 — Direct API feasibility and 24-hour snapshots

**Decision:** Investigate direct APIs first. Rank frozen snapshots captured around 24 hours, store actual capture times and leave missed captures unranked. Activepieces is optional, only if it saves work; scheduler/hosting are not chosen. TikTok Business and Instagram Creator/Business remain provisional account types.

**Why:** Exact first-24-hour reports are not established across platforms. Do not invent data, substitute later lifetime totals or commit to infrastructure before a small real import proves useful.

**Alternatives considered:** Exact-window-only results and a paid analytics provider first.

**Owner:** CJ


## 2026-10-08 — One folder per reviewed card group

**Decision:** Each reviewed group lives under docs/dashboard/group-N/ with preview.html, SPECIFICATION.md and USAGE-AND-CONNECTIONS.md. Shared rules stay in docs/DESIGN_SYSTEM.md. Older mixed documents are archived. The folder paths in the earlier organisation entry are superseded by these current routes.

**Why:** CJ asked for easy discovery and explicit separation of visual rules from purpose/data connections. Cross-document and repository review must accompany organisation changes.

**Alternatives considered:** Shared flat HTML/spec folders or duplicated current specifications.

**Owner:** CJ

## 2026-10-08 — Evidence limits from repository review

**Decision:** Connection setup claims and dated entries are not verified live integrations; use explicit current evidence in connections.md. Prior design-token compliance aspirations are not proof of WCAG compliance. Current card checks and open findings are recorded in docs/dashboard/REPOSITORY-REVIEW.md.

**Why:** Avoid misleading future agents into treating proposed rules, historical configuration or example figures as tested behaviour.

**Alternatives considered:** Keeping ambiguous connected-status dates or treating a design-system document as a completed accessibility audit.

**Owner:** CJ

## 8 October 2026 — Repository review fixes approved

CJ approved the fixes proposed in R01, R02, R03 and R10 of the repository review. Discuss remaining open decisions one at a time before applying the fixes and agreed changes together. Preserve the accepted card design; no unrelated redesign is authorised. Documentation corrections R04–R07 are already completed. API imports and account setup still require their own confirmed scope.

## 8 October 2026 — YouTube metric replacement

CJ chose B: replace Stayed to watch with Likes in card 2.1’s Shorts selection. Other Shorts tiles remain average percentage viewed, subscribers gained and shares. Real account reporting remains untested. Queue the preview change until the remaining decision review is complete.

## 8 October 2026 — TikTok metric replacement

CJ chose B: replace Followers gained with Comments in card 2.1’s TikTok selection. Other TikTok tiles remain average watch time, watched full video and shares, conditional on supported reports. Comment counts are documented, but selected-period activity still needs validation. Queue the preview change until the remaining decision review is complete.

## 8 October 2026 — Audience-growth consistency supersedes TikTok replacement

After supplying a TikTok Studio screenshot showing New followers for an individual video, CJ confirmed that Shorts, TikTok and Reels should all retain an audience-growth metric. Use Subscribers gained for Shorts and Followers gained for TikTok/Reels, attributed to the selected short-form content rather than silently substituting whole-account growth. This supersedes the earlier TikTok Comments replacement. YouTube Likes still replaces Stayed to watch. TikTok/Reels API access and selected-period attribution remain unverified; unsupported data shows unavailable, never a fabricated value or automatic replacement.

## 8 October 2026 — Overall performance and batch leaderboard retained

CJ chose A: keep 2.1 as the overall rolling last-28-days performance view and 2.2 as a single-release-batch leaderboard. Do not add a batch filter to 2.1 or convert it to a calendar month. The existing activity-during-period definition remains current; selected-period API coverage still requires validation.

## 8 October 2026 — Provisional capture tolerance

CJ chose A if feasible: aim for 24 hours after publication and provisionally accept usable snapshots up to 15 minutes late. Test before locking this rule. If too many captures fail, discuss a wider tolerance; there is no automatic widening. Captures before 24 hours do not qualify. Record actual capture time and keep missed captures unranked. Platform counter freshness is a separate limitation from request timing.

## 8 October 2026 — Leaderboard header wording confirmed

CJ approved keeping Shorts Views (24hrs), followed by Snapshot taken at 24h · up to 15 min later, followed by the selected batch dates including year (6–11 October 2026 for the first example batch). This replaces the prior dates-only secondary-header rule. The capture tolerance remains provisional pending tests. Queue the change with the approved fixes.

## 8 October 2026 — Partial Monday batch review approved

CJ chose A: after Sunday’s last clip reaches 24 hours, provide the Monday batch-review notification even if some snapshots are missing. Rank only usable snapshots and show unranked clips with their reason. Incomplete results are labelled Batch review rather than Final leaderboard. Exact delivery and retry/update scheduling await integration design/testing; no working notification is claimed. CJ requested a repository handoff, commits of all pending documents, and instructions for context continuity and token efficiency without lowering quality.

## 8 October 2026 — Handoff project context added

At CJ’s request, the dashboard handoff now explains GemOs’s broader purpose, release workflow, five dashboard groups, current reference/data-definition stage and deferred app architecture/integration work. This supplies context without approving a new stack, autonomous publishing or additional implementation scope.

## 8 October 2026 — All-tab shared reporting window

**Decision:** CJ chose A. The All tab uses one shared rolling 28-day date range, ending on the latest date with complete, compatible imported data across the required platforms (Shorts, TikTok and Reels). Compare with the immediately preceding non-overlapping 28 days using matching coverage. Individual platform tabs may show their own latest complete window and must label it. Validate source day boundaries before claiming compatibility; matching date labels alone do not establish equivalent coverage. Missing sources remain explicitly identified under the existing partial-data rules; hide combined growth and target status until required coverage is complete. A missing source does not become zero.

**Why:** Combined totals should cover matching dates rather than silently mix each platform’s latest window. Shared results may lag behind individual platform figures.

**Alternatives considered:** Combining each platform’s latest available 28-day window with different date ranges.

**Owner:** CJ
