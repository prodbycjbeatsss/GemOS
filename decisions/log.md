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

## 8 October 2026 — Full cross-platform release-buffer requirement

**Decision:** CJ chose A. A covered release week requires confirmed scheduling for one main YouTube video plus six Tuesday–Sunday source shorts on each of YouTube Shorts, TikTok and Instagram Reels: 19 platform uploads in total. All required destinations must qualify before the week counts towards the release buffer. Planned uploads, reminder-only tasks and submitted scheduling requests without acceptance confirmation do not qualify. One source short reused across platforms is three platform uploads. Real scheduling support and confirmation records remain untested; this decision defines the requirement, not a working connection.

**Why:** The release buffer should reflect the full intended content cadence across all three short-form platforms.

**Alternatives considered:** Main YouTube video plus YouTube Shorts only, without TikTok/Reels blocking the buffer.

**Owner:** CJ

## 9 October 2026 — Automatic asset eligibility

**Decision:** CJ chose automatic file checks: an asset earns Pass when the correct project file exists, matches the required type and contains no literal (WIP) marker anywhere in its filename, checked case-insensitively. No separate manual approval is required. A marker such as (wip) or (WiP) excludes that file. Required sets must be complete: the Shorts part needs all six eligible source files; the WAV-stems part needs the required set defined by the project manifest. These checks establish file eligibility, not creative quality. Project matching, exact format validation and manifest details still need specification during scanner implementation; failed/no-access scans must not masquerade as missing files or a successful check.

**Why:** Preserve CJ’s existing WIP-based workflow and avoid a separate approval step for every asset.

**Alternatives considered:** Automatic checks plus explicit manual approval of each asset.

**Owner:** CJ

## 9 October 2026 — Approved dashboard reference fixes implemented

**Decision:** Apply authorised R01–R03/R10 fixes, Shorts Likes/Reels growth labels and snapshot subtitle/year dates. Keep normal slots; allow Group 1 enlarged-text reflow. Mock scheduling uses 19 uploads. Frozen mock snapshots enforce inclusive 24:00–24:15 capture eligibility and expose capture age. Missing-source reasons use the existing target-note slot to preserve Group 2 geometry.

**Why:** Reproduced bugs and browser checks establish the reference behaviour without claiming live imports. Passed 96 Group 1 normal states, eight enlarged-text probes, 64 Group 2 normal states and 32 availability combinations plus keyboard/dialog checks. Native Android, measured contrast and real account sources remain unverified.

**Evidence:** docs/dashboard/verification/2026-10-09.md and committed captures. Keep REVIEW.html as historical evidence. Next scope a YouTube import test for CJ’s approval.

**Owner:** CJ



## 2026-10-09 — Browser-only YouTube validation checkpoint

CJ accepted a minimal browser-only Google Identity Services OAuth test after requesting easier alternatives to a backend-first setup. Build and test it now; guide Google project/client configuration and user consent next; compare a real selected Shorts sample with Studio before expanding. Manual Connect/Sync uses only `yt-analytics.readonly` and `youtube.readonly`, a public client ID and in-memory short-lived access token. No client secret, refresh-token storage, paid analytics product or final backend/hosting architecture is selected. Private Sites hosts this isolated test only.

Implementation scopes the initial query to 1–5 user-confirmed Shorts, with ownership checked; it is explicitly a sample, not the accepted whole-channel card. Google basic report combinations support selected-video aggregate percentage/engagement; the test must not average daily percentages. Probe all metrics together for an observed daily cutoff, then import adjacent current/previous 28-day aggregates. Missing is unavailable; comparison and targets withheld pending coverage verification. Canonical reviewed previews stay unchanged. Controlled browser checks passed; real account setup, API imports, Studio agreement and unattended snapshots are not yet verified. See `docs/dashboard/integration-tests/youtube/README.md`.


## 2026-10-09 — YouTube refresh persistence and partial metric validation

CJ reported successful read-only connection, a successful older Short import and a failed three-year-old video import, then explicitly requested keeping login across refreshes. Same-tab sessionStorage now retains the short-lived access token, expiry, public client ID and selected channel; owned-channel API lookup revalidates restoration, and expiry/revocation/disconnect clear it. No refresh token or localStorage token is stored; long-lived unattended access still requires a separate server design. This supersedes memory-only auth for the isolated experiment.

The strict aggregate validator was a local failure point. Unexpected/missing supporting metrics now become unavailable individually, with safe metric/period/type diagnostics; valid numeric strings are accepted, and malformed/negative/fractional count values remain unavailable rather than zero. Exact live response cause is not yet established; retry and Studio comparison remain pending.


## 2026-10-09 — Preserve signed source-reported YouTube Likes

User-supplied API details and Studio export confirm signed period Likes. Preserve signed whole-number Likes in the isolated test, with source-reported wording and no inferred cause or net-likes definition. Other invalid/missing metrics remain unavailable. Export/API periods differ; exact-window verification remains pending. Private figures and identifiers are omitted. Controlled regressions passed.


## 2026-10-09 — Show the imported Shorts scope

CJ requested visible video titles in the importer. Display an Included Shorts list above the isolated test analytics card, with imported titles and IDs for the successful report. Keep scope and results together on failed retry; clear both when the selection changes or disconnects. Render external titles as text. This adds visibility to the manual sample import without changing canonical card designs or metric definitions.


## 2026-10-09 — Analytics reporting ranges and placement

CJ confirmed 7, 28, 90 and 365 days, with 28 default, and requested the selector beneath platform pills with metric tiles moved lower inside the recess. Implement this in the existing private YouTube sample importer, preserving normal card size and materials. Use equal-length adjacent current/previous activity windows, exact reporting dates and Google's aggregate percentage unchanged. Changed-range requests must not retain old results under a new range; automatically Sync after a loaded report's range changes. Canonical previews and the frozen 24-hour leaderboard remain unchanged. Source coverage and real longer-range Studio agreement remain to verify.


## 2026-10-09 — Compact ranges and honest sync feedback

CJ rejected the range dropdown as visually dull and too tall, required the recess to remain matched to 2.2, and requested a rotating circular-arrow Sync icon with current-stage/final-status feedback. Replace the dropdown with compact single-select day pills, preserve the chosen day windows, set normal recess to 575/583px and retain accessibility reflow. Drive messages from actual requests, stop animation on success/failure/cancellation, honour reduced motion, and show last successful import time in a small lower-recess status area. Leave the remaining space clear.

Clarify scope without jargon: intended 2.1 is all short-form content for selected platforms/date range; test remains selected Shorts only; 2.2 is one release's six clips across three platforms (up to 18 short uploads). CJ raised a shared header template; scope label/main result/timing is a proposal pending final wording, not a new channel-wide connection or canonical redesign.


## 2026-10-09 — Align metric rows and reduce repeated sample setup

CJ reported phone metric misalignment and fatigue with repeated connections/new links. Give tile labels/values/notes matching rows and a shorter Average viewed label while retaining the full definition/accessibility name. Remember links, classification confirmation and date settings in tab sessionStorage separately from tokens; restore locally without starting consent or requests. Reports remain in memory, and existing token expiry is unchanged. No new manual sample links are needed. Durable login and whole-channel Shorts discovery are next implementation topics; no backend choice or broader integration is locked by this fix. Canonical references remain unchanged.


## 2026-10-09 — Analytics-only updates and cached range switching

CJ approved avoiding a full-page/card refresh on each date-range click. Keep titles and prior figures visible with exact old dates and Updating until the new Analytics report succeeds. Reuse verified same-connection video metadata; cache loaded ranges in memory by channel/IDs/end/range and identify cached results with original timestamps. Manual Sync fetches fresh metadata/reports and invalidates other saved ranges. Selection/auth/lifecycle changes clear caches. Preserve clearly labelled old results on failure; never present them as the newly requested period. This supersedes the earlier clear-first range-change behaviour. No persistent report storage or new auth architecture is introduced.


## 2026-10-09 — Finalise 2.1 test and authorise 2.2 batch test

CJ finalised the current 2.1 test choices and requested a saved checkpoint, a fresh AGENTS.md read, then 2.2 on the same page. Consolidate current accepted choices in dashboard/integration-tests/youtube/STATUS.md, retaining honest outstanding integration/verification limits. 2.2 accepts 1–6 user-confirmed same-release Shorts; CJ's existing three are sufficient. Import titles/publication metadata and show 24-hour snapshot availability without fabricating historical counts. Existing read-only connection is shared; automatic capture/durable login remain future work.


## 2026-10-09 — 2.1 finalised; 2.2 metadata test added

CJ authorised saving all settled 2.1 choices, rereading AGENTS.md, then adding 2.2 to the same private test. A separate 2.1 documentation checkpoint was committed first. The selected-release test accepts 1–6 actual same-release Shorts; CJ's three-Short batch is valid. Reuse the existing read-only connection, retain the established card material/recess/list geometry, show titles/publication metadata and explicit unranked availability states. No invented uploads or substitution of current/lifetime views for missed first-24-hour snapshots. Capture/storage is a later slice. Current decisions and controlled verification limits: docs/dashboard/integration-tests/youtube/STATUS.md. Canonical preview references remain unchanged.


### 9 October — phone feedback: icon spacing and sync meaning

CJ confirmed release metadata displays on Android; the trophy lacked the 12px bottom gap used on 2.1 because a shared glyph rule reset its margin. A scoped 2.2 override restores that gap. Completion now says “Titles loaded · views not connected”; the footer says “Titles loaded” to distinguish this metadata import from view capture. No view counts or rankings have been implemented; first-24-hour capture remains pending. Screenshot evidence identifies the pre-fix spacing issue; the corrected rendering remains unverified in this environment.


### 9 October — one saved connection for both cards

CJ authorised upgrading the existing Google connection. The private test now has a supported Worker/D1 backend, encrypted per-user token storage, offline OAuth callback, server refresh and a bounded read proxy used by both cards after configuration. The legacy browser connection remains active until setup is complete. Runtime encryption key and callback URI are configured; the existing Web client's ID/secret and authorised callback remain required before real saved access can be enabled. [Backend contract and setup](integration-tests/youtube/BACKEND.md) record exact steps. Synthetic backend/frontend checks and production build pass; live Google, hosted token writes/refresh and rendering are unverified. Google Testing mode limits refresh tokens to seven days. No capture scheduler or view rankings are connected by this upgrade.


### 9 October — authorised saved release capture and ranking

CJ authorised the next 2.2 slice after saved shared access was reported restored. Persist one current 1–6-Short release per owner/channel and freeze the first owned public cumulative Data API count whose request and response both lie in the inclusive 24h–24h15m window. Zero ranks; unavailable counts never become zero; ties share competition ranks. Preserve 2.1 and established recess geometry. The hourly built-in runner cannot meet this window: prepare an authenticated five-minute Google Cloud Scheduler job in the existing project. No billing action or external job creation is performed without the user's setup. Automatic capture remains unverified until a successful real job run. Never backfill old counts. CAPTURE.md records the contract and synthetic verification.


### 9 October — live Scheduler success and short job-name fix

CJ created the five-minute Google Cloud Scheduler job through the browser console and reported Success. Production logs independently show Google-Cloud-Scheduler POST requests reaching /api/youtube/run-captures with HTTP 200 at 19:55 and 20:00 UK. The run records persisted but were wrongly classified as manual-service-check: Google supplied the short job ID, while the original check expected a full resource path. The status check now accepts the exact short ID or exact full projects/locations/jobs form. Synthetic regressions cover both forms, unknown jobs and missing headers. Existing credentials, schedule, capture window and frozen counts are unchanged. A successful scheduler run does not prove a real qualifying Short was captured. Await a fresh post-fix run before declaring corrected UI status verified.


### 9 October — completion status and scroll chaining

CJ accepted 2.2 implementation complete with real view capture/display unverified until the first release, then authorised the scrolling fix and GitHub update in response to the pending main-branch save request. Replace vertical overscroll containment with native auto chaining in the private test: scroll the page when rows fit or the list is at either boundary, while retaining internal scrolling for overflow and the accepted fixed dimensions. Checker runs and post-fix scheduled classification are verified; real qualifying view data is not. Retain the existing Google connection and scheduler. Historical release reporting and automatically moving 2.1 dates are not included in this completion scope.


### 2026-10-09 — shared Group 2 design contract

CJ requested fixing inconsistencies across cards 2.1/2.2. Retain the accepted purple gradient and glass fill; consolidate their shared surface, header/icon, responsive recess inset and status rules into one token/component contract. Load the already documented Inter/Poppins fonts. Preserve distinct metrics/list contents and existing source/capture behaviour. Source inspection and controlled checks are evidence; rendered phone/desktop acceptance and first-release capture remain open. See docs/DESIGN_TOKENS.md and docs/dashboard/group-2/COMPONENTS.md.


### 2026-10-09 — move next session to Group 1

CJ approved updating the handoff and returning to Group 1 review/connections in a new chat. Park 2.1 as finalised for the current selected-Shorts test and 2.2 as implementation-complete but unverified for the first real release capture. Latest rendered shared-design checks remain open. Do not block Group 1 on a new test upload or repeat Google setup. Review real Group 1 data sources and confirm the earlier six-Shorts contract against CJ's current three-Short releases before implementing it; variable manifest counts are not yet approved.


## 2026-10-09 — Group 1 retains six Tuesday–Sunday Shorts

CJ confirmed that three clips describe his past upload schedule. Once the system is in place he intends six clips each week, Tuesday–Sunday. Preserve Group 1's six eligible short source files as one of the seven checklist categories and one main YouTube video plus those six shorts on each of Shorts, TikTok and Reels: 19 confirmed scheduled uploads for a covered release week. No variable required-count change is approved. Existing three-clip Group 2 test batches remain valid historical samples. Live asset scanning and scheduling confirmations remain unconnected.


## 2026-10-09 — Group 1 file structure, readiness and ambiguity handling

CJ confirmed the Group 1 file convention and ambiguity gate on 9 October 2026. Working projects are on his computer and sync as whole project folders to Google Drive; GemOS scans the synced Drive copy. Use PROJECT (FLP and exported project ZIP), AUDIO (Remix WAV, Type Beat WAV and Type Beat MP3), Stems (stems ZIP), Artwork (thumbnail and main YouTube video), and Shorts (01–06). No bracket prefixes or separate Tagged file. The seven required categories are Remix WAV, Beat MP3, Stems archive, Project ZIP, Thumbnail, YouTube video and six Shorts. The exported FL Studio project ZIP is required for a finished release; FLP and Beat WAV are additional files outside the seven. Strict filename matching ignores capitalisation and checks designated project/folder/type plus the case-insensitive literal (WIP) exclusion. A likely typo does not automatically pass: show Needs confirmation; CJ may confirm the candidate or rename and rescan. A confirmed candidate is associated by Drive file ID so later renames retain the association, with type/WIP checks retained. If the unresolved candidate is the only candidate for a required asset, pause new scheduling/publication; an extra similar file does not block an eligible exact match. Do not automatically cancel previously confirmed scheduled uploads. Existing no-access/failed-scan/stale-result distinctions remain. This records requirements, not a working scanner or publisher. Manifest storage/UI, fuzzy-match threshold, archive-content verification, deeper file validation and policy for already-scheduled uploads remain open.

Exact example filenames and folder mapping are recorded in docs/dashboard/group-1/USAGE-AND-CONNECTIONS.md. Stems are currently unexported and laptop access is unavailable; test the scanner with honest missing states. The later convention supersedes Tagged MP3, loose WAV stems and generic release ZIP descriptions. No Drive scan, file movement, release scheduling or publication has been performed by this decision.


## 2026-10-09 — Flexible asset matching supersedes exact filenames

CJ confirmed flexible asset matching on 9 October 2026, superseding exact filenames, mandatory renaming and removal of bracket prefixes. Working projects sync from his computer to Google Drive. Use the selected project folder, case-insensitive subfolder names, compatible file type and role markers such as [REMIX], [BEAT], [ZIP], stems, thumbnail and YouTube Video to identify assets. Preserve BPM, key, artist pairings and collaborator credits in filenames; their presence or differences from a title template do not cause failure. Existing descriptive names without prefixes are also allowed when the role is clear. Stems accept .zip or .7z; the exported FL Studio project archive remains .zip and required. The seven checklist categories remain Remix WAV, Beat MP3, Stems archive, Project ZIP, Thumbnail, YouTube video and six Shorts; FLP and Beat WAV are additional files. Beat WAV does not substitute for missing Beat MP3. A clear unique eligible candidate can pass automatically; confirm only unclear roles or competing eligible candidates. Remember confirmed files by Drive ID while retaining project/location/type/access and case-insensitive literal (WIP) checks. Unresolved required assets show Needs confirmation and pause new scheduling/publication; unrelated extras do not block a clear match. Previously confirmed scheduled uploads are not automatically cancelled. No access/failed scan is not Missing. Metadata does not prove creative correctness or archive contents. Detailed role recognition, persistence, archive verification and freshness implementation remain open; no live GemOS scanner is yet implemented.

Connected Drive folder/subfolder reads succeeded for CJ's Gelato 41 sample in this chat. Existing role-prefixed WAV/project ZIP names and BPM/key/collaborator metadata should not require renaming. Its stems are 7z, Beat MP3 and Artwork assets were absent from the listings, and Shorts was empty. This establishes assistant connector access and sample metadata only, not deployed GemOS Drive access, scanner behaviour or archive verification. Private folder/file identifiers are omitted.


## 2026-10-09 — Scoped read-only Group 1 checklist test

CJ authorised proceeding with the scanner against the supplied Gelato 41 project. Implemented a separate /checklist page in the existing private Site, flexible role/type matching, per-owner D1 test associations/results and explicit optional Drive metadata consent on the existing Google client. Existing YouTube-only grants are not invalidated; added scopes are remembered. Three ready categories are expected from assistant-observed sample metadata, not a verified hosted scan. Controlled scanner/backend/capture/UI-state tests and production build pass; private deployment succeeded. Live Drive authorisation/scan, rendered UI and file-content/archive validation remain unverified. No Drive writes, publishing or scheduling operations were implemented. See docs/dashboard/integration-tests/youtube/ASSETS.md for contract and deployment.


## 2026-10-09 — Track-only checklist title and styled Release details

CJ reported the scan worked and supplied a screenshot showing saved Drive permission, scan completion and 3/7. He requested the remix name instead of the long folder title, a display limit/ellipsis, and refined details styling. Implemented track-title extraction with original metadata preserved, a 48-grapheme display cap and two-line clamp; full title and original folder name remain in designed Release details. Repaired dock overflow detection so concealed rows trigger accessibility reflow. Parsing/syntax/build pass and private deployment succeeded; refreshed phone/dialog verification remains open. The 48-character cap is an implementation choice for the requested limit, not a restriction on filenames. See docs/dashboard/integration-tests/youtube/ASSETS.md.


## 2026-10-09 — Restore Group 1 pair on private test

CJ approved restoring the Group 1 pair on the private checklist page for comparing proportions. Card 1.1 uses the accepted reference anatomy/material with three illustrative projects/dates/statuses and a visible Example/Preview only label. It performs no live buffer calculation or scheduling query; its rows/footer open an explanatory preview dialog with Escape/close/focus-return behaviour. Card 1.2 continues using the existing Drive result. Desktop is two equal columns from 840px within 960px; mobile stacks 1.1 above 1.2. Normal fixed reference slots remain; when overflow activates the shared one-column asset reflow, both cards receive a shared minimum height calculated from the tallest natural card, including mobile. This is a comparison slice, not approval of a permanent one-column redesign or filler content. Syntax, title regression and production build pass; rendered matching height, enlarged-text behaviour and phone/dialog acceptance remain unverified. Next: CJ refreshes the same /checklist page and reviews both cards together. No new consent or sample link is required.


## 2026-10-10 — Shared Group 1 geometry and useful buffer details

CJ approved returning the asset grid to two columns, matching both recessed panels and preventing independent card alignment, plus a common simpler pop-up style based on 1.1 and useful buffer details. Implemented shared Group 1 header/recess/footer/slot geometry, measured from the largest natural content in either card. Geometry is group-owned: a changed title, error/status, font or viewport cannot independently size one card or move its recess/footer. The two-column asset grid reserves 78px minimum rows and wrapped labels/statuses, with Shorts spanning both columns. The group retains the 840px desktop breakpoint/960px cap/20px gap and accepted blue/glass material, 58px glyph, 12px label gap, 16px panel gap, 32px card and 22px recess corners, Inter/Poppins and responsive 20/24px card insets. Card height is at least the earlier 512/532px baseline but grows as a matched pair to accommodate the complete two-column checklist; this live integration contract supersedes independent recess sizing and overflow-triggered one-column switching. Font loading, resize and observed intrinsic content changes recalculate common dimensions.

Both details dialogs now use one blue/navy fill, border/shadow, typography/insets, informational row/status styles and 44px Close control. 1.2 retains full track/folder metadata, readiness/freshness, filenames and candidate association. 1.1 adds the selected or all example project dates/statuses, 19-upload coverage requirement, consecutive-week/first-gap rule, exclusions, current Drive readiness as a separate fact and the next real scheduling-confirmation source needed. Its examples remain explicitly illustrative; it does not claim live scheduled coverage.

verify-layout.mjs passes across 128 combinations of long header/panel/footer dimensions and insets, plus the narrow-screen minimum; verify-title.mjs and changed JS syntax pass; production build passes. These are geometry-contract/source checks, not rendered browser evidence. Refreshed Android/desktop, all real font/status combinations, modal interaction and actual enlarged-text fit remain unverified. No supported browser QA is available. Do not claim an absolute no-use-case visual guarantee from these checks. Next: refresh the same /checklist and check both recesses/footers and both dialogs; no new consent required.


## 10 October 2026 — repair Group 1 width and measurement regression

CJ supplied a phone screenshot showing the checklist recess narrower than the buffer recess, with excessive bottom space despite equal outer slots. The prior geometry checks did not catch this rendered failure. Removed the legacy flex/justify-between utilities from both outer cards and explicitly set a single full-width, stretched grid column on the cards and their main regions. Both recesses now use the complete inner width. The temporary natural-height measurement now uses the same card-scoped selector specificity as the normal stretched-height rule, overriding height:100% with height:auto before measuring. This prevents the previous stretched height from feeding back into shared slot sizing. Accepted colours, radii, two-column checklist, modal content and mobile stacking breakpoint are retained.

Existing geometry/title checks and production build pass. Source/cascade inspection supports the repair, but no supported browser QA was available; corrected desktop/mobile rendering remains unverified. The user screenshot is evidence of the previous regression, not of the fix.


## 10 October 2026 — compact file checklist redesign

CJ authorised a direct redesign within the accepted system, keeping only useful card information and allowing review afterwards. The private checklist now uses two columns of quiet 12px-radius file tiles: one 22px outline icon in a 24px slot, one category/format label and a compact status. Removed duplicate format subtitles, full-tile missing/ready colour washes and the separate bottom-right status position. Seven categories remain; Shorts ×6 spans the full row. Minimum tile height is 64px, gap 6px and padding 10px. The title remains track-only and capped; the summary is “n/7 ready”.

UI status vocabulary: Ready (backend Pass), Missing, Needs attention (backend Needs confirmation), Not checked before a result. Status wording plus a small check/minus/exclamation/dash distinguishes states without colour alone. Needs attention requires association review in Release details and cannot count as ready. Partial missing Shorts retain n/6 when nonzero; filenames, candidate selection, reasons, timestamps and full metadata remain in Release details. No scanner rules changed.

Shared card/recess/header/footer geometry, responsive breakpoint, blue/glass materials, Inter/Poppins, colours and radii remain. The smaller checklist can reduce the pair’s natural height without independent card sizing. JS syntax, existing geometry/title checks and production build pass. Browser-rendered mobile/desktop appearance and acceptance remain unverified. This is the live integration redesign; the original approved preview remains historical reference.


## Current checklist contract — 10 October 2026, eight required categories

CJ confirmed Beat WAV is required alongside Beat MP3 for future automated beat sales. This supersedes every earlier seven-category/7-of-7 contract and statement that Beat WAV is informational. The eight checks are ordered in four equal two-column rows: Project ZIP | Stems ZIP; Beat WAV | Beat MP3; Remix WAV | Thumbnail PNG; YouTube video MP4 | Shorts ×6 MP4. Shorts no longer spans two columns. File type is separate muted 10px supporting text below the 12px file name. “7z” is removed from the tile label only: stems still accept ZIP or 7z. Thumbnail PNG is the requested tile label; existing JPG/JPEG/PNG/WebP compatibility is retained, not narrowed by this presentation change.

Readiness denominator is eight everywhere. Beat WAV uses AUDIO plus compatible nonempty WAV metadata, excludes WIP and automatically recognises clear beat markers while excluding remix markers. Unclear files require association confirmation, and beat/remix WAV must be distinct files. MP3 cannot substitute for WAV. FLP remains outside the readiness total. Saved seven-category results are normalised by role into the new order, retain their original check timestamp, and leave Beat WAV Not checked until Sync; they cannot qualify as 8/8 from the old scan. The UI binds by role rather than array position. No forced consent or renaming is needed.

Synthetic asset checks cover full 8/8, independent WAV/MP3 eligibility, WIP/MIME mismatches, distinct audio, legacy migration, existing scan/auth/persistence behaviour. Existing title/geometry checks, syntax and production build pass. Live new Beat WAV scan and refreshed mobile/desktop rendering remain unverified. Previous 3/7 screenshots and seven-category notes below describe historical evidence.


## 10 October — centred checklist tiles and symbol-only status

CJ requested centred text/icons and only a tick, red X or dash for status. Each of the eight tiles now centres the file icon, name, muted format caption and status vertically in a compact stack. Status uses a green ✓ for Ready, red × for Missing, amber ! for Needs attention and - for Not checked. Needs attention remains distinct from absent files. Status text and Shorts counts remain in accessible labels/title and Release details; colour is not the only distinction. No tile click target was added. Four-row ordering and eight required categories are unchanged. Shared pair measurement still owns recess/slot geometry. Tile minimum is 88px with 8px vertical/10px horizontal inset and 3px icon-to-copy gap; names use 12px/1.2, types 10px/1.2, and centred symbols 15px in a 20×16px box. Missing colour uses #fb7185.

JS syntax, existing title/layout checks and production build pass. Updated browser appearance remains unverified; private test is the review surface. Scanner eligibility, legacy scan handling and confirmation logic are unchanged.


## 2026-10-10 — approved release discovery and checklist-local project selection



## Current project discovery slice — 10 October 2026

CJ approved implementing read-only release discovery, a checklist-local selector and per-project saved checks before approval/moves. Music Releases uses In Production, Release Queue and Released stage connections; only In Production is required now. Existing Drive metadata scope is sufficient. The project list refreshes on page opening and manually, with cached-list failure handling. Current D1 storage is per owner + project folder ID and preserves the old scan/associations through lazy migration. Folder metadata is explicitly suggested, not publishing authority. The selector does not change 1.1 coverage, 2.1 analytics or 2.2 batch selection.

See [PROJECTS.md](../docs/dashboard/integration-tests/youtube/PROJECTS.md) for setup, boundaries, API, migration, tests and user verification. Approval, automatic moves, scheduling and publication remain unimplemented; no new Google write scope was requested. Eight-item readiness and centred symbol tiles remain. Controlled project/asset/frontend/backend/capture/state checks and production build pass; live stage discovery/migration and rendered phone/desktop appearance are unverified. User next: create/connect stage folders, then select and Sync one release.


## 10 October 2026 — app release chooser, connected-file inspection and empty buffer

CJ authorised an app-styled release selector popup and clickable checklist tiles showing connected filenames or No file connected. Preserve the existing design system, project isolation and eight-role readiness contract. Needs-attention association stays in Release details. CJ identified that the buffer should currently show no releases: remove illustrative rows/coverage from the live page and explicitly state scheduling is unconnected. A yearly 2027 parent is accepted above the three separately connected stage folders; use Gelato 41 for current testing. Supplied phone screenshots establish saved connections and one fresh scan; second-project switching and new dialogs still need real-user verification. No publisher, scheduler, automatic moves or new Drive scope added.


## 10 October 2026 — centred empty states and project-focused buffer details

CJ requested centred empty-buffer text with an icon, removal of the white count dash, centred missing-file popup with a file icon, and a buffer project breakdown instead of FAQ. Implemented centred icon/copy states within established Group 1 geometry/materials; the empty buffer dialog now shows no projects and Scheduling not connected. Removed explanatory FAQ and selected checklist readiness from buffer details. Actual project/date/platform breakdown remains dependent on confirmed scheduling records; no fictional rows or queue-folder scheduling inference. Controlled UI/geometry/build pass; refreshed phone centring not yet verified.


## 10 October 2026 — clean release metadata and connected-file icon

CJ specified artist/track heading, separate beat description, PASSED summary/next action/last-check timestamp, Project metadata with artist/track/combined BPM-key/clean credits and clickable Drive link, and category/PASS/filename sections. Remove Suggested details / original-folder block; preserve parsed raw metadata without granting publishing approval. Source title remains Gelato 41; Gelato 42 in example treated as typo. Artist display prefers confirmed remix filename, with first named artist fallback for x-separated Type Beat descriptor; retain full beat descriptor separately. Connected file popups receive matching category icon and centred content/Close. Controlled metadata/UI/geometry/build verification passed; fresh phone review pending.


## 10 October 2026 — minimal file links inside popups only

CJ requested quieter folder link and individual file links; clarified that smaller cards means their click popup, not dashboard tiles. Added borderless text links in Release details and per-tile file popup using valid saved folder/file IDs, with each Shorts file linked separately. No tile shortcuts added. New-tab links use fixed Google origin, ID validation, noopener/noreferrer and descriptive accessible names. Missing IDs/files get no fabricated link. Controlled link/state/title checks and production build pass; actual Google opening and new phone link styling remain unverified.
