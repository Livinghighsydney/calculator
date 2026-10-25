---
name: Harbour Ops
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#006c4a'
  on-secondary: '#ffffff'
  secondary-container: '#82f5c1'
  on-secondary-container: '#00714e'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#0f0069'
  on-tertiary-container: '#7671ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#85f8c4'
  secondary-fixed-dim: '#68dba9'
  on-secondary-fixed: '#002114'
  on-secondary-fixed-variant: '#005137'
  tertiary-fixed: '#e2dfff'
  tertiary-fixed-dim: '#c3c0ff'
  on-tertiary-fixed: '#0f0069'
  on-tertiary-fixed-variant: '#3323cc'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
  surface-canvas: '#F8FAFC'
  surface-card: '#FFFFFF'
  surface-subtle: '#F1F5F9'
  border-crisp: '#E2E8F0'
  border-strong: '#CBD5E1'
  text-primary: '#0F172A'
  text-secondary: '#475569'
  text-muted: '#94A3B8'
  emerald-subtle: '#ECFDF5'
  emerald-text: '#047857'
  indigo-subtle: '#EEF2FF'
  indigo-text: '#4338CA'
  amber-warning: '#D97706'
  amber-subtle: '#FFFBEB'
  rose-alert: '#E11D48'
  rose-subtle: '#FFF1F2'
typography:
  headline-xl:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.015em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
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
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
  tabular-numeric-lg:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  tabular-numeric-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1.25rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-tablet: 1.5rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system defines a high-precision, institutional-grade operational environment engineered for portfolio asset managers, yield analysts, and property operators managing Sydney residential real estate. The visual character merges modern fintech utility with rigorous editorial clarity—prioritizing fast data ingestion, accurate decision-making, and frictionless workflow execution.

The aesthetic balances precision engineering with understated warmth:
- **Clean Utility:** Dense, structured interfaces where layout geometry, typographic hierarchy, and purposeful borders do the organizational heavy lifting rather than heavy drop shadows or decorative graphics.
- **Editorial Legibility:** Crisp sans-serif typography tuned for high tabular data density, clear financial metrics, and unambiguous state changes.
- **Controlled Accents:** Deep slate and warm zinc neutrals ground the interface, while targeted emerald indicates yield gains, revenue uplift, and positive market spreads, balanced by technical indigo for automated recommendations and interactive highlights.
- **Operational Focus:** Low visual fatigue during extended sessions across high-resolution desktop workstation setups, with robust adaptations for tablet inspections.

## Colors

The palette establishes an authoritative, functional hierarchy designed for high-density financial inspection and property data analysis:

- **Primary (`#0F172A` - Deep Slate):** Anchors core visual gravity. Used for primary interactive actions, high-emphasis text, active navigation states, and strong table headers.
- **Secondary (`#059669` - Sydney Green / Emerald):** Signifies financial optimization, yield increases, active status indicators, and positive variance relative to market benchmarks. Paired with `emerald-subtle` (`#ECFDF5`) for badge fills.
- **Tertiary (`#4F46E5` - Precision Indigo):** Denotes automated algorithmic suggestions, dynamic pricing recalculations, multi-select active tags, and system insights.
- **Neutral (`#64748B` - Slate Neutral):** Provides balanced intermediate hierarchy for secondary icons, inactive states, column titles, and structural divider lines.

### Functional Nuances
- **Canvas vs. Card Distinction:** Surfaces sit on a warm slate tint (`#F8FAFC`), while analytical cards and data grids rest on pure white (`#FFFFFF`) framed with 1px borders in `#E2E8F0`.
- **Numeric Contrast:** Metric values and yields strictly leverage high-contrast `text-primary` (`#0F172A`) to ensure zero ambiguity under office daylight or bright multi-monitor setups.

## Typography

Typographic orchestration relies on **Plus Jakarta Sans** for high-impact structural headlines and **Inter** for dense transactional UI, numeric readouts, and body text:

- **Headlines (Plus Jakarta Sans):** Geometric yet refined, providing architectural structure to dashboard headers, modal titles, and card sections without consuming excessive vertical space.
- **Body and Controls (Inter):** Deployed for forms, sub-labels, table records, and tooltips. Tabular numbers (`font-feature-settings: 'tnum' 1, 'cv05' 1`) must be enforced across all pricing columns, weekly rental yields (`$PW`), vacancy days, and median comparisons to prevent jitter during real-time data streaming.
- **Metadata and Micro-Labels:** Styled in uppercase or title-case `label-sm` with letter spacing (`0.04em`) to establish crisp visual distinction between column headers and table rows.

## Layout & Spacing

The layout model enforces structured information throughput via a hybrid fluid 12-column grid system paired with strict 4px/8px modular spacing:

- **Layout Grid:** 12-column fluid grid on desktop (`> 1200px`) with fixed structural sidebars (240px collapsed, 280px expanded). Gutters sit at `1.5rem` (24px) to separate high-density analytic tiles cleanly.
- **Section Margins:** Outer margin scales dynamically: `1rem` on mobile breakpoints, `1.5rem` on tablet, and `2rem` on wide administrative monitors.
- **Component Padding Scale:**
  - `space-xs` (4px): Fine alignment between icons and micro-labels, badge internal padding.
  - `space-sm` (8px): Input padding (vertical), gap between segmented control items, table cell vertical padding (compact).
  - `space-md` (12px): Standard table cell horizontal inset, dropdown list item spacing, standard input horizontal padding.
  - `space-lg` (20px): Internal padding for analytics cards, KPI metric containers, and modal headers.
  - `space-xl` (32px): Separation between unrelated dashboard sections and operational overview charts.

## Elevation & Depth

Visual separation relies on crisp physical architecture—low-contrast outlines, subtle hairline dividers, and controlled ambient depth rather than exaggerated dropshadows:

- **Surface Tiers:**
  - *Base Floor (`surface-canvas` #F8FAFC):* The application foundation.
  - *Layer 1 (`surface-card` #FFFFFF):* Cards, tables, property listings, and control bars. Framed with a 1px border (`#E2E8F0`).
  - *Layer 2 (Elevated Controls & Floating Popovers):* Filter popovers, contextual pricing modals, and active tooltips. Uses pure `#FFFFFF`, a 1px border (`#CBD5E1`), and an ambient shadow: `0 4px 12px -2px rgba(15, 23, 42, 0.06), 0 2px 4px -1px rgba(15, 23, 42, 0.03)`.
  - *Layer 3 (Overlays & Dialogs):* Operational override drawers and approval dialogs utilize `0 20px 25px -5px rgba(15, 23, 42, 0.1), 0 8px 10px -6px rgba(15, 23, 42, 0.04)` over an atmospheric backdrop blur (`rgba(15, 23, 42, 0.4)` with `backdrop-filter: blur(4px)`).
- **Hairline Borders:** Borders are universally 1px solid. Border contrast steps up subtly on interactive focus (`#0F172A` or `#4F46E5`), preserving tight structural definition across data views.

## Shapes

The design system adopts a calibrated **Soft (`1`)** shape language:
- Standard interactive elements (buttons, inputs, select triggers, table rows) feature `0.25rem` (4px) corner radii.
- Medium card containers, metric summaries, and filter bars feature `0.5rem` (8px) corner radii (`rounded-lg`).
- Modals, flyout panels, and key pricing drawer containers feature `0.75rem` (12px) corner radii (`rounded-xl`).
- Micro status indicators, metric delta badges, and pill tags utilize continuous full radii (`9999px`) to maintain instant cognitive separation from rectangular action triggers.

## Components

### Buttons
- **Primary:** Background `#0F172A`, text `#FFFFFF`, 4px border radius. Hover state transitions to `#1E293B`. Active state `#020617`. Height 36px for standard, 32px for compact table-action modes.
- **Secondary / Ghost:** Background transparent, border 1px solid `#E2E8F0`, text `#0F172A`. Hover transitions background to `#F1F5F9` and border to `#CBD5E1`.
- **Recommendation Trigger (Indigo):** Background `#4F46E5`, text `#FFFFFF`. Hover `#4338CA`. Used exclusively for automated yield optimization execution and bulk pricing updates.

### Data Tables
- **Header:** Background `#F8FAFC`, 1px solid bottom border (`#E2E8F0`). Text styled in `label-sm` with `text-secondary`, non-breaking text, sort icons inline.
- **Row Styling:** Height 44px (compact mode: 36px). White background transitioning to `#F8FAFC` on hover. Selected rows highlight with `#EEF2FF` and an inset 2px left border in `#4F46E5`.
- **Tabular Cells:** Explicit alignment—text columns left-aligned, status badges centered, financial currencies (`$PW`, bond totals, yield percentages) right-aligned with tabular numerals enabled.

### Segmented Controls
- Exterior container with 4px border radius, 2px internal padding, background `#F1F5F9`, border 1px solid `#E2E8F0`.
- Segment item: Height 28px, 4px radius, `label-md` font weight. Active item renders `#FFFFFF` background with subtle 1px border (`#E2E8F0`) and sharp text `#0F172A`; inactive item renders transparent with `text-secondary`.

### Badges & Status Chips
- **Yield Surplus (Emerald):** Background `#ECFDF5`, border 1px solid `#A7F3D0`, text `#047857`. Pill shape.
- **Market Parity / Neutral (Slate):** Background `#F1F5F9`, border 1px solid `#E2E8F0`, text `#475569`.
- **Underpriced / Urgency (Amber):** Background `#FFFBEB`, border 1px solid `#FDE68A`, text `#B45309`.
- **High Vacancy Risk (Rose):** Background `#FFF1F2`, border 1px solid `#FECDD3`, text `#BE123C`.

### Form Inputs & Search Fields
- 1px border `#E2E8F0`, background `#FFFFFF`, text `#0F172A`, placeholder `#94A3B8`.
- Focus ring: 1px border `#4F46E5` accompanied by a 2px outer glow (`rgba(79, 70, 229, 0.15)`). Zero offset.
- Inline prefix icons (e.g., suburb search pin, currency `$`) positioned at 12px inset in `text-muted`.

### Operational Metric Cards (KPIs)
- Border 1px solid `#E2E8F0`, background `#FFFFFF`, 8px border radius, 16px to 20px internal padding.
- Visual hierarchy: Micro-label in `label-sm` (`text-secondary`), followed by the dominant numerical yield readout in `tabular-numeric-lg` (`text-primary`), paired with an inline trend pill indicating weekly change.