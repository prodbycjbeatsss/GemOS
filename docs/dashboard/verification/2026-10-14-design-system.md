# Design-system source check — 14 October 2026

Scope: all10 dashboard cards across4 groups, plus the9 inner Automation status tiles. This is a source/token and controlled-state check, not a screenshot-based visual audit.

## Current group contracts checked

| Group | Cards | Normal size / material |
|---|---|---|
|1 Release|Release Buffer,Pre Release Checklist|920px paired Large; reviewed blue/state material; shared largest header/recess/footer measurements |
|2 Audience & Performance|Short-form Performance,24-hour Shorts ranking,Email List|920px Large; shared purple gradient/glyph/recess/header tokens |
|3 Finance|Payhip,YouTube earnings,YouTube payouts,Subscription Costs|454px Compact; shared green material,146px header/44px period and footer;2×2 desktop |
|4 Automations|Automation Performance|920px Large; reviewed cobalt material; compact centred status grid |

Shared source rules:32px card/22px recess corners,58px glass top glyph/28px symbol,20px phone and24px desktop insets, Inter/Poppins roles, clipped spotlight, shared glass/shadows, one footer,44px action targets,12px vertical/20px desktop column gap. Component layouts and documented group-specific exceptions are retained. Group4 beam stops0/42/75 are an explicit token exception; the surface42% stop and spotlight colour remain unchanged. Current Group4 inner tiles:20px plain icons,12px title/11px state/date,8px padding/12px gap; three columns desktop/two phone. Original2.1 metric tiles remain restored; the Top Shorts list and outside-tile copy cleanup remain.

## Confirmed source drift repaired

1. Subscription header used58px first track while the other Finance headers use66px including the8px glyph margin. Updated cost identity to66/14/36/18 with4px gaps, fitting146px and aligning its label/result rows.
2. Subscription card reduced its padding to16px below360px. Restored the shared Group3 inset token (20px phone/24px desktop).
3. Subscription popup used24px total viewport inset andwhite.25 border versus the shared32px viewport inset/white.16 border. Matched these while keeping its580px cap,85dvh content limit and established green material.
4. Group1 retained20px vertical spacing from an earlier rule. Applied12px row gap while retaining20px desktop column spacing and16px internal header/recess/footer gaps.
5. Finance and Email Sync icon gaps differed from the5px shared control. Normalised to5px;44px targets, icon size, font weight and transparent background retained.
6. Canonical docs still advertised prior Group4 Compact size/glass tile/saved sample setup. Current contract notes updated to the deployed accepted Large/plain-icon/channel-wide implementation.

## Validation

Passing controlled checks: group migration/ownership/unique IDs, paired geometry and enlarged-content cases, dashboard shell, project UI/loading/error/focus, commerce states, shared modal backdrop/focus, per-card/bulk sync controls and actual analytics UI state. Production build and compiled HTML/private200/401 response checks are required before delivery. No data/API/storage/auth changes were made by this styling correction.

## Evidence limitation

The cloud browser opened the exact private Site and observed “Log in to access” with Continue with ChatGPT. No dashboard screenshots/computed boxes were accessible in that browser session. Rendered phone/desktop geometry, font loading, clipping, hit-box measurements and contrast were not verified. No browser session, permission or private audience was changed to bypass the sign-in wall. A signed-in visual sweep remains required before claiming full visual/accessibility conformance.


Deployment: Source3dd8deb76343305a1142a27eb74f8aaaf13ae6cc; private appgdep_6acfe022fac881918a80f7ea0d2f945e succeeded; production and compiled200/401 checks passed. Draft PR2 remains the primary-repo checkpoint; main is unchanged.
