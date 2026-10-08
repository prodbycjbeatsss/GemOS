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
