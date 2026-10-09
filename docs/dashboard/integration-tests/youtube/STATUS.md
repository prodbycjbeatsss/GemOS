# YouTube test — current decisions

Updated 9 October 2026. This is the current checkpoint; older follow-up notes in README/HANDOFF are history where they differ. Canonical design-reference HTML is unchanged.

## 2.1 — current test design finalised by CJ

| Area | Final choice |
|---|---|
| Scope | Selected Shorts only in the test; intended finished card covers all short-form content on selected platforms, independent of release selection. |
| Reporting period | 7d / 28d / 90d / 365d compact pills under platforms; 28d default; exact returned dates shown. |
| Main result | Source-reported selected-period views. |
| Metrics | Average viewed (full accessible name/definition: Average percentage viewed), signed Likes, content-attributed Subscribers gained, Shares. Google's aggregate is displayed unchanged. |
| Metric alignment | Matching label/value/note rows; no independent centring drift. |
| Material/geometry | Accepted purple/glass material; normal 575/583px recess matching 2.2; accessibility overflow reflow retained. |
| Lower recess | Small request-stage/completion/failure status and last successful import time; remaining space clear. |
| Sync | Circular-arrow rotation during requests, reduced-motion alternative; manual Sync revalidates ownership and fetches fresh reports. |
| Range changes | Retain clearly labelled old values until an atomic replacement; reuse verified metadata; memory cache enables zero-request switching to loaded ranges, explicitly marked cached. |
| Persistence | Tab-session input preferences and short-lived token restoration; reports/range cache remain memory-only. No new links required for development. |
| Missing/coverage | Missing is unavailable, not zero. Growth/target remain hidden pending coverage checks. All/TikTok/Reels remain unconnected. |

Finalised refers to the current test design and behaviour, not a finished production connection. Controlled state/request checks pass. Earlier browser evidence covers prior iterations; the latest rendered alignment/cache interaction still lacks supported-browser verification. Exact Studio agreement, complete coverage, whole-channel discovery, persistent backend login and TikTok/Reels remain outstanding. CJ's real imports establish successful source-to-screen activity, not those remaining claims. No private analytics figures or identifiers are stored here.

## 2.2 — release metadata test implemented

The selected-release Shorts card is implemented on the same private test page, using the existing read-only YouTube connection. It accepts 1–6 user-confirmed same-release Shorts; three is a valid complete selected batch. Import only titles, visibility and publication metadata, with ownership checks. The actual imported number is shown without invented uploads. One Data API request; no Analytics or statistics request is made for 2.2. Its selection and updates are independent of 2.1's period and figures.

The setup asks for a release name and links. Cards appear side by side on desktop, stacked on mobile. Purple/glass material and normal 575/583px recess sizes are retained, with overflow reflow for enlarged/long content. Each unranked row has a full accessible title, one-line visible title, availability state and UK publication time; tap for full details. Six rows use the established 360px scroll region. No medals, ranked counts or growth bars imply an available snapshot. Sync has progress, completion/failure status and reduced-motion support. Input preferences survive refresh in tab-session storage; imported metadata remains memory-only.

Public Shorts under 24 hours show Waiting for 24h, with capture explicitly disconnected. Older Shorts show 24-hour snapshot unavailable. Missing, invalid or future publication times are unavailable; private/unlisted publication is not confirmed because reported metadata may reflect upload time. No qualifying snapshots are stored: today's lifetime counts are never backfilled into first-24-hour results. The inclusive 24h–24h15m capture window and automatic durable capture remain a later implementation step. TikTok/Reels remain unconnected.

Controlled state/request checks pass for three/six Shorts, one-request imports, ownership failures, publication states, literal titles, dialog focus, rejected seven-link/unconfirmed selections, no lifetime backfill and unchanged 2.1 range/cache behaviour. JavaScript syntax and duplicate-ID/structure checks pass. These are synthetic fixtures, not Studio validation. Supported rendered-browser verification is unavailable in this environment; current phone/desktop fitting remains unverified. No private analytics payload is committed.
