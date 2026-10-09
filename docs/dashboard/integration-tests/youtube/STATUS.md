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

## 2.2 — approved next test

Add a selected-release Shorts card on this same private page, reusing the YouTube connection. Accept 1–6 user-confirmed same-release Shorts; CJ has three, which is a complete selected batch for testing, not three invented missing uploads. Import titles and publication metadata, show snapshot availability and clip details. No qualifying 24-hour snapshots exist in this test yet: do not backfill today's counts into first-24-hour results. A scheduler/durable capture is a later step; TikTok/Reels stay unconnected.
