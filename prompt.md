# Project Prompts Log

This document records the prompt history and specifications used to generate and develop this project.

---

## Prompt 1: Initial Application UI & Design System Specification

**Timestamp:** 2026-10-06T21:36:18-07:00

```markdown
Build me an app with screens that look like this. You can hotlink images from the html
---
name: Singapore Civic Transit Modern
colors:
  surface: '#f7f9ff'
  surface-dim: '#d7dadf'
  surface-bright: '#f7f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f1f4f9'
  surface-container: '#ebeef3'
  surface-container-high: '#e5e8ee'
  surface-container-highest: '#e0e3e8'
  on-surface: '#181c20'
  on-surface-variant: '#4f434e'
  inverse-surface: '#2d3135'
  inverse-on-surface: '#eef1f6'
  outline: '#81737f'
  outline-variant: '#d3c1cf'
  surface-tint: '#8d3e93'
  primary: '#4f0058'
  on-primary: '#ffffff'
  primary-container: '#6b1d73'
  on-primary-container: '#e68de8'
  inverse-primary: '#fea9ff'
  secondary: '#b6171e'
  on-secondary: '#ffffff'
  secondary-container: '#da3433'
  on-secondary-container: '#fffbff'
  tertiary: '#511900'
  on-tertiary: '#ffffff'
  tertiary-container: '#752800'
  on-tertiary-container: '#ff9061'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffd6fb'
  primary-fixed-dim: '#fea9ff'
  on-primary-fixed: '#36003d'
  on-primary-fixed-variant: '#72247a'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb3ac'
  on-secondary-fixed: '#410003'
  on-secondary-fixed-variant: '#930010'
  tertiary-fixed: '#ffdbce'
  tertiary-fixed-dim: '#ffb598'
  on-tertiary-fixed: '#370e00'
  on-tertiary-fixed-variant: '#7e2c00'
  background: '#f7f9ff'
  on-background: '#181c20'
  surface-variant: '#e0e3e8'
  lta-seats-available: '#00875A'
  lta-standing-available: '#D97706'
  lta-crowded: '#DC2626'
  transit-canvas: '#F4F6F9'
  surface-card: '#FFFFFF'
  surface-subtle: '#EEF1F6'
  badge-double-deck: '#3B82F6'
  badge-wab-blue: '#0284C7'
typography:
  display-xl:
    fontFamily: Space Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Space Grotesk
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-transit-service:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.02em
  title-timing-large:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-timing-pill:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: '700'
    lineHeight: 16px
    letterSpacing: 0.01em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-mobile: 0.75rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

This design system establishes a high-clarity, high-frequency civic transit experience for Singapore's commuters, operators, and tourists. The brand aesthetic merges the authoritative public-sector heritage of SBS Transit with modern commuter expectations: glanceable, ultra-reliable, hyper-efficient, and accessible under intense tropical sunlight or quick-glance mobile usage on moving buses and MRT trains.

The design movement combines **Modern High-Contrast Utility** with **Tactile Civic Ergonomics**. Clean crisp cards set against airy, cool-tinted slate neutral backdrops allow operational information to take front stage. Bold typographic indicators, strict three-tiered passenger occupancy signaling (Seats Available, Standing Available, Limited Standing), and crisp transit vehicle badges (Single Deck, Double Deck, Wheelchair Accessible Bus) remove cognitive friction during transit discovery and live arrival queries.

## Colors

The core palette honors the established SBS Transit brand identity through deep royal purple (`#6B1D73`) as the authoritative primary anchor, accompanied by the civic transit red accent (`#D32F2F`) and energetic interchange orange (`#EB601B`) drawn from the operator's operational identity. 

To ensure parity with the Land Transport Authority (LTA) national standard:
- **LTA Seats Available / Normal (`#00875A`)**: Emitted for live arrival timings with open seating (`Arr`, `2 min`).
- **LTA Standing Available (`#D97706`)**: High-contrast amber warning for moderate commuter load.
- **LTA Crowded / Limited Standing (`#DC2626`)**: Critical red indicator notifying commuters of full capacity.
- **Neutral Canvas (`#F4F6F9`) & Surface Cards (`#FFFFFF`)**: Pure high-contrast surfaces ensuring readability even in bright outdoor sunlight at roadside bus stops.

## Typography

The type system blends the structural, technical authority of **Space Grotesk** for service route numbers, arrival minutes, and section headlines with the high-legibility utilitarian nature of **Inter** for descriptions, stop listings, and road metadata.

- **Route Identity & Timing**: Bus route numbers (e.g., `147`, `190`, `502`) and ETA tokens (`Arr`, `4m`, `12m`) strictly deploy `Space Grotesk` with tabular figures to avoid layout jitter during live-interval data refreshes.
- **Civic Accessibility**: Body text renders in `Inter` with elevated line heights to maintain rapid legibility across standard and scaled display states (`A+`, `A`, `A-`).

## Layout & Spacing

A modular 8-point spatial rhythm governs layout consistency across desktop dispatch tables and compact mobile arrival views:
- **Mobile Handheld (320px - 767px)**: Fluid single-column layout with 16px (`1rem`) outer margins and 12px gutters. Arrival cards employ tight 12px internal padding to maximize real estate for adjacent arrival timing columns (Next Bus, Subsequent, 3rd Bus).
- **Tablet / Transit Kiosks (768px - 1023px)**: 8-column layout with 24px margins, allowing split-pane interfaces (Bus Stop List on the left, Real-Time Service Stream on the right).
- **Desktop Interchanges & Portal (1024px+)**: 12-column fixed-max layout (1280px container max-width) with 32px (`2rem`) margins, suited for multi-route schedules, route maps, and corporate announcements.

## Elevation & Depth

To guarantee instantaneous scanability under outdoor ambient conditions, elevation relies primarily on **crisp structural borders** coupled with **tonal layers**, keeping shadows restrained and minimal.

- **Base Cards**: Neutral white background (`#FFFFFF`) framed by a subtle 1px border (`#E2E8F0`). Zero drop-shadow in resting state to avoid muddying high-density tabular schedules.
- **Active / Expanded Bus Stop Rows**: Elevation is expressed through a clean 1.5px brand stroke (`#6B1D73`) alongside a subtle tinted ambient lift: `0px 4px 12px rgba(107, 29, 115, 0.08)`.
- **Floating Controls & Quick Search Tabs**: Floating bottom sheets and search overlays utilize high-elevation depth: `0px 8px 24px rgba(17, 24, 39, 0.12)` with a 1px white top highlight.

## Shapes

The design system implements a **Rounded (Level 2)** geometry balance, combining modern commuter friendliness with the disciplined clarity of mass transit:
- **Cards & Service Blocks**: 8px (`0.5rem`) border radius, preserving structured alignment in high-density listings.
- **Service Route Badges & Arrival Status Pills**: Pill-shaped (`9999px` / `rounded-full`) for high-contrast visibility, visually separating alphanumeric transit codes from surrounding tabular content.
- **Form Inputs & Action Buttons**: 8px to 10px roundedness with prominent 44px minimum touch targets for reliable one-handed operation while commuting.

## Components

### Bus Service Arrival Row
The cornerstone transit component displays route numbers, destination directions, and a three-stage arrival timing triad (Next Bus, 2nd Bus, 3rd Bus):
- **Service Badge**: Space Grotesk Bold, 20px, encapsulated in a high-contrast container with a crisp 1.5px boundary. Express and City Direct routes (e.g., `502`) feature a distinctive crimson or purple identifier tag.
- **Timing Pills**: Dynamic color-coded pills reflecting real-time LTA bus loads:
  - Green (`#00875A` text & subtle tint background) for Seats Available.
  - Amber (`#D97706` text & subtle tint background) for Standing Available.
  - Red (`#DC2626` text & subtle tint background) for Limited Standing / Crowded.
- **Vehicle Type & WAB Icons**: Positioned directly beneath each timing pill: miniature badges indicating Double Deck (`DD`), Single Deck (`SD`), and Wheelchair Accessible Bus (`WAB` accessibility glyph).

### Bus Stop Search & Filter Bar
- **Tabbed Switcher**: Direct toggle between "Search by Service No." and "Search by Bus Stop No." using pill segments with a primary purple active state (`#6B1D73`) and white bold text.
- **Input Container**: Clean white fill, 48px height, 1px neutral border expanding to a 2px purple focus ring with a clear CTA trigger ("Get Timings").

### Buttons & Interactive Controls
- **Primary CTA**: Deep purple (`#6B1D73`), white bold text, 10px border radius, subtle hover shift to `#56155D`.
- **Secondary CTA**: Neutral white surface with a 1.5px primary purple border and purple label text.
- **Accessibility Font Resizer**: A grouped triad button (`A-`, `A`, `A+`) anchored in navigation headers, rendered in crisp high-contrast outlines for immediate text size adjustment.

### Transit Alert & Interruption Cards
- Outlined banner using vibrant red (`#D32F2F`) or caution orange (`#EB601B`) borders with a soft 5% background tint. Houses service diversions, route disruptions, and Sengkang/interchange berth updates with distinct bold titles and timestamp tags.
```

---

## Prompt 2: GitHub Repository Push

**Timestamp:** 2026-10-06T21:54:12-07:00

```bash
git push https://<GITHUB_PERSONAL_ACCESS_TOKEN>@https://github.com/joyeo310-commits/mcp-bus.git
```

---

## Prompt 3: Backend API Architecture & LTA DataMall v3 Integration

**Timestamp:** 2026-10-06T22:13:34-07:00

```markdown
1) create a /api folder under the project main to store all the apis 
2) create a/api/health.js to monitor if the apis are working 
3)integrate the LTA bus information api endpoint GETGET https://datamall2.mytransport.sg/ltaodataservice/v3/BusArrival?BusStopCode=04121
Header:  AccountKey:

# BusStopCode is the only required parameter.
# Add &ServiceNo=7 to ask about one service only.
# Refreshes every 20 seconds. JSON comes back by default.
```

---

## Prompt 4: Prompts Documentation

**Timestamp:** 2026-10-06T22:36:41-07:00

```markdown
create a prompt.md containing all my prompts located at main project
```

---

## Prompt 5: Remove the word trunk

**Timestamp:** 2026-10-06T23:36:29-07:00

```markdown
remove the word trunk
```

