---
name: SalesPulse
description: A clean, flat, Linear-inspired light SaaS system for a plain-language e-commerce KPI dashboard.
colors:
  pulse-emerald: "#0F7A4D"
  pulse-emerald-deep: "#0C6540"
  ink: "#14161A"
  muted-600: "#4B5563"
  muted-500: "#6B7280"
  page-bg: "#FAFAF9"
  surface: "#FFFFFF"
  border-neutral: "#E4E6EA"
  border-dashed: "#D3D6DC"
  success-bg: "#F3FBF7"
  success-border: "#A7E3C5"
  error: "#D92D20"
  error-bg: "#FEF6F5"
  error-border: "#FDA29B"
typography:
  display:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "40px"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.02em"
  body:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.55
  stat-value:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "28px"
    fontWeight: 700
    letterSpacing: "-0.01em"
  label:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "15px"
    fontWeight: 600
  caption:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "13.5px"
    fontWeight: 400
  micro:
    fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
    fontSize: "12.5px"
    fontWeight: 400
rounded:
  sm: "8px"
  lg: "14px"
spacing:
  sm: "8px"
  md: "16px"
  lg: "32px"
  xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.pulse-emerald}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "13px 24px"
  button-primary-hover:
    backgroundColor: "{colors.pulse-emerald-deep}"
  kpi-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "20px 22px"
  chart-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
  insights-panel:
    backgroundColor: "{colors.success-bg}"
    textColor: "{colors.ink}"
    rounded: "{rounded.lg}"
    padding: "24px"
---

# Design System: SalesPulse

## Overview

**Creative North Star: "The Quiet Instrument Panel"**

SalesPulse is built for a small business owner with zero technical background, so the system reads like a single well-made instrument rather than a marketing site: one flat surface, one accent color, no chrome that has to be learned. It borrows its restraint from Linear and Stripe's calmer surfaces, not their marketing pages: neutral grounds, a single confident accent, and generous, deliberate whitespace instead of cards-with-shadows everywhere. The one indulgence is the brand mark itself, a small pulse-line glyph that ties the product name ("Pulse") to the literal shape of a sales trend line, since every KPI screen that follows will show that same shape as real chart data.

Nothing about the visual system announces "dashboard software." There is no eyebrow copy, no eyebrow-and-headline template, no eyebrow-driven section rhythm. Hierarchy comes from type weight, spacing, and the single accent color, never from decoration.

**Key Characteristics:**
- Flat by default: borders and tint fills carry state, not drop shadows.
- One accent (deep emerald) used identically everywhere it appears: brand mark, primary actions, focus rings, links, success states.
- System font stack only, no webfont loading, so the app stays fully functional offline.
- Two-tier corner radius: small (buttons, the brand mark) and large (containers), never mixed within one component.

## Colors

A neutral off-white ground with a single saturated accent; semantic red and green tints are reserved for state feedback, never decoration.

### Primary
- **Pulse Emerald** (#0F7A4D): the one brand accent. Used on the brand mark fill, the primary CTA button, link-style actions ("Change file"), and every focus ring. Its hover state is **Pulse Emerald Deep** (#0C6540).

### Neutral
- **Ink** (#14161A): primary text and headlines. Never pure black.
- **Muted 600** (#4B5563): body/subtext copy that needs to read clearly at paragraph size.
- **Muted 500** (#6B7280): secondary/caption text - header tagline, captions, helper text under the CTA.
- **Page** (#FAFAF9): the app's base background.
- **Surface** (#FFFFFF): header bar and the upload zone's resting fill.
- **Border Neutral** (#E4E6EA): hairline dividers (header bottom border).
- **Border Dashed** (#D3D6DC): the upload zone's resting dashed edge.

### Named Rules
**The One Accent Rule.** Pulse Emerald is the only brand *decorative* color on the page. It never competes with a second hue for UI chrome (buttons, links, focus rings); when a second color appears in chrome (error red), it signals a real state, not a stylistic choice. **Exception - data visualization.** Charts that plot more than one series (currently only the region-breakdown stacked bar) are exempt: series identity is a functional requirement, not brand decoration, and uses the dataviz skill's validated categorical palette instead (see Chart Colors below). Single-series charts (the revenue trend line, the top-products bars) still use Pulse Emerald, so the rule holds everywhere a color choice is actually optional.

### Chart Colors (categorical - region breakdown only)
Fixed order, validated for CVD-safe adjacency (`validate_palette.js`, worst adjacent ΔE 9.1 light / normal-vision floor 22.9, both well clear of the 8/15 targets): **1 blue** `#2a78d6`, **2 orange** `#eb6834`, **3 aqua** `#1baf7a`, **4 yellow** `#eda100`. A 5th+ region folds into **Other** using Muted 500 (`#6B7280`), never a 5th hue. Slots 3 (aqua) and 4 (yellow) fall below 3:1 contrast on white by design (the validator's contrast check WARNs on them) - the region breakdown chart always ships its written region/value/percent list alongside the bar as the required relief channel, never color alone.

### Status/Delta Colors (charts and KPI deltas)
The MoM growth KPI card and any future up/down indicator reuse the existing UI tokens rather than a separate chart-status palette: **up/good = Pulse Emerald** (#0F7A4D), **down/bad = Error Red** (#D92D20). One red across the whole app (form errors and negative deltas alike) reads as one coherent semantic system rather than two different "warning reds."

## Typography

**Display Font:** System UI stack (-apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif)
**Body Font:** Same system stack

**Character:** One family throughout, no serif, no display webfont. The system stack is a deliberate choice, not a fallback: it keeps the app fully functional with zero network requests after `npm install`, and its neutral, slightly-condensed character reads as "Linear-clean" rather than "default browser font."

### Hierarchy
- **Display** (700, 40px desktop / 32px mobile, 1.15 line-height, -0.02em tracking): the single hero headline only.
- **Stat value** (700, 28px desktop / 24px mobile, -0.01em tracking, proportional figures never `tabular-nums`): KPI card values only. Deliberately smaller than Display - four equally-weighted stat values would fight a single hero figure for attention, so none of them is styled as one.
- **Body** (400, 16px, 1.55 line-height, max ~42ch): hero subtext and any explanatory copy.
- **Body small** (400, 14.5px, 1.55 line-height, max ~68ch): compact readable sentences inside a card - currently only the Insights Panel's observation text, which needs to read as prose, not a UI label.
- **Label** (600, 15px): primary interactive text - button labels, upload-zone titles ("Drag your orders CSV here"), chart-card titles.
- **Caption** (400, 13.5px): secondary/supporting text - zone subtitles, sample-data captions, "Change file" / "Try again" links.
- **Micro** (400-600, 12.5-13px): header tagline, header note, upload-zone format hint.

### Named Rules
**The No-Eyebrow Rule.** No uppercase tracked label ever sits above a heading. The heading carries its own weight.

## Layout

**Landing:** two-column asymmetric grid on desktop (copy column `minmax(0, 440px)` + flexible upload column, 64px gap, 1080px max content width), collapsing to a single centered column under 860px. Section padding is generous (88px top / 96px bottom desktop, 36-48px on mobile) rather than vertically centering content, so the hero commits to the top of the viewport instead of floating in empty space.

**Dashboard:** same 1200px-max centered container as the rest of the app. A slim toolbar row (data-source caption + "Back to upload" reset link) sits above a 4-column KPI row (→ 2 → 1 columns under 860px/480px), then a chart grid: the revenue-trend line chart spans the full width, with top-products and region-breakdown side by side beneath it (1.4fr/1fr desktop, stacking to one column under 860px). Deliberately varied layout families (a KPI row, a full-width line chart, a bar chart, a stacked bar + list) rather than repeating one card shape three times.

Header is a fixed 72px flex row shared by both screens, capped at one line, with secondary text (tagline, "No account needed") hidden below 640px to keep the bar single-line on small screens.

## Elevation & Depth

Flat by default. No box-shadows exist anywhere in the current implementation; state is communicated entirely through border color/style and background tint (dashed neutral border at rest, solid emerald-tinted border + fill on drag-over/success, solid red-tinted border + fill on error).

### Named Rules
**The Flat-By-Default Rule.** Surfaces never lift on shadow. If a future component needs to show elevation, prefer a tint or border-weight change before reaching for box-shadow.

## Shapes

Two-tier radius scale for UI chrome: **sm (8px)** for buttons and the brand mark, **lg (14px)** for containers (the upload zone, KPI cards, chart cards). No pill shapes. **Chart marks are the one documented exception**, governed by the dataviz skill's fixed mark spec instead of this scale: bar ends and the region-breakdown stacked-bar container use a **4px** data-end radius, square at the baseline, regardless of the sm/lg tiers above. Never introduce a third UI-chrome radius; the exception is scoped to chart marks only.

## Components

### Buttons
- **Shape:** 8px radius (sm)
- **Primary:** Pulse Emerald fill (#0F7A4D), white text, 13px/24px padding, 15px/600 label type. Hover darkens to #0C6540; active nudges down 1px (`translateY(1px)`) for tactile feedback.
- **Focus:** 2px Pulse Emerald outline, 3px offset.

### Cards / Containers (Upload Zone)
- **Corner Style:** 14px radius (lg)
- **Background:** white at rest, hover, and while parsing; light emerald tint (#F3FBF7) on drag-over; light red tint (#FEF6F5) on error.
- **Border:** 1.5px dashed neutral (#D3D6DC) at rest and hover; solid neutral while parsing; solid red (#FDA29B) on error.
- **Internal Padding:** 32px/24px, min-height 260px, content centered.
- States implemented: idle, hover, drag-active, parsing (spinner + filename, non-interactive), error (message + "Try again"). A successfully parsed file does not linger in an "accepted" state - it navigates straight to the Dashboard, since the CSV is actually read and validated now rather than just accepted by extension. Error-state links render in error red rather than inheriting the brand accent, so recovery actions read as part of the error, not a stray success cue.
- **Format hint row** (`.upload-meta`, directly below the zone): a one-line Micro-type (13px, Muted 500) note on the required/optional columns, paired with a "Download sample CSV" text link (13px/600, Pulse Emerald, underline on hover) that generates a static 20-row example file client-side. Same row on desktop (space-between), stacks hint-above-link on narrow widths.

### KPI Card
- **Shape:** 14px radius (lg), 1px neutral border, white background, flat (no shadow).
- **Content:** label (Caption-ish sentence case, no colon, Muted 500) above value (Stat-value type, Ink). An optional trend row below the value pairs a small triangle arrow with a short context string ("vs last month"), colored Pulse Emerald (up) or Error Red (down) - never color alone, the arrow direction plus the signed percentage in the value carry the meaning twice over.
- Exactly 4 on the dashboard, in a single responsive row (4 → 2 → 1 columns); none is styled larger than the others - no card claims "hero figure" status.

### Chart Card
- **Shape:** 14px radius (lg), 1px neutral border, white background, matches KPI Card exactly so the dashboard reads as one system.
- **Header:** Label-weight title (15px/600) + optional Caption subtitle (13px, Muted 500), left-aligned, no eyebrow above it.
- Houses one Recharts chart via `ResponsiveContainer`; the container's height always includes the axis band (never a fixed height that clips tick labels).

### Charts
- **Revenue trend** (single-series line, full-width row): 2px Pulse Emerald line, no resting dots (`dot={false}`), 5px accent dot only on hover/focus (`activeDot`). Horizontal gridlines only, hairline Border Neutral, solid never dashed. Y-axis ticks use compact currency (`$4.2K`); tooltip shows the exact month + full currency value.
- **Top products** (single-series horizontal bar, top 8 by revenue): one Pulse Emerald fill for every bar (nominal categories never get a value-ramp), 4px rounded bar end/square baseline, product names truncated with an ellipsis at ~22 characters (the tooltip and the untruncated data still carry the full name), compact-currency value label past each bar's end.
- **Revenue by region** (categorical, part-to-whole): a single full-width horizontal **stacked** bar, never a pie/donut (the dataviz skill explicitly deprioritizes donut for part-to-whole). Fixed-order categorical fills (see Chart Colors), 2px white gap between segments (a `stroke` in the surface color, not a border color), paired with a written region/value/percent list directly below as the required contrast-relief channel. One combined tooltip lists every region's value on hover, per the "one tooltip, every series" rule.
- **Chart empty state** (`.chart-empty`, shared class): when a chart would otherwise render something misleadingly sparse - currently the revenue trend line with fewer than 2 months of data, which would draw as a single floating dot with no line - swap the plot for a centered, muted one-line message inside a same-height Page-bg (#FAFAF9) box, rather than shipping a near-blank or single-point chart. The box keeps the exact plot height so the card doesn't jump size compared to its populated state. Top-products and region-breakdown never hit this case (both always have >=1 real item once any order exists), so they don't need it.

### Insights Panel
- **Shape:** 14px radius (lg), 1px solid Success Border (#A7E3C5), Success Bg fill (#F3FBF7) - the one card on the dashboard with a tinted background rather than white, so it reads as synthesized commentary rather than raw data.
- **Title:** "What this means for your business", set in Label type (15px/600), acting as the card's real heading - not an eyebrow above a bigger headline.
- **Body:** up to 4 short entries (Body-small type, 14.5px), no bullet glyphs and no per-item icon. Each entry is exactly 2 sentences: an observation carrying a real number, then a recommended action - the action's wording branches on the data (e.g. a climbing revenue streak gets inventory/staffing advice, a declining one gets "dig into pricing/marketing/seasonality"), never a fixed caption. Generated entirely client-side in `utils/insights.js` from the loaded orders - no network calls, no LLM.
- Deliberately avoids a colored `border-left` strip as the "highlight" mechanism (a banned lazy-highlight pattern); the tinted fill is the whole treatment.
- Renders nothing (not an empty card) when zero observations are computable, e.g. a single data point with no month-over-month or product-mix signal to report.

### Navigation (Header)
- Single-line flex row, 72px height, white background, 1px neutral bottom border. Brand mark + wordmark + tagline stacked on the left, a quiet reassurance note ("No account needed") right-aligned. Tagline and note both hide below 640px to keep the bar from wrapping.

### Brand Mark (signature component)
A 34x34px rounded-square (8px radius) filled with Pulse Emerald, containing a white two-stroke pulse-line glyph (a flat line rising into a heartbeat-style peak). It is the only hand-drawn decorative mark in the system, deliberately simple, and doubles as a visual preview of the line-chart shape the product will render once KPI charts are built.

## Do's and Don'ts

### Do:
- **Do** keep Pulse Emerald as the only *decorative* accent across every future screen (KPI cards, single-series charts, insights panel); reuse it for "positive/up" indicators.
- **Do** keep all containers flat (border + tint, never box-shadow) - KPI cards and chart cards included.
- **Do** keep the two-tier UI-chrome radius scale (8px buttons/marks, 14px containers); chart marks alone follow the dataviz 4px mark-spec exception.
- **Do** keep typography to the single system font stack; do not introduce a webfont without revisiting the "must run offline" constraint in PRODUCT.md.
- **Do** use the documented 4-color categorical palette (blue/orange/aqua/yellow, fixed order) for any future chart with more than one series; run `validate_palette.js` again before adding a 5th color rather than eyeballing it.
- **Do** pair any WARN-contrast chart color (aqua, yellow) with a visible text label - never rely on the segment/bar color alone.
- **Do** use a full tinted-background fill (Success Bg + Success Border) as the "this card is different" signal for synthesized/derived content like the Insights Panel; it is the one card style allowed to depart from plain white.

### Don't:
- **Don't** add an eyebrow/kicker label above any section heading, including chart-card titles.
- **Don't** introduce a second decorative UI accent color; reserve red strictly for error/negative-delta states.
- **Don't** use box-shadow for elevation; use border/tint state changes instead.
- **Don't** center hero content vertically in the viewport; keep it anchored near the top with generous but capped padding (see Layout).
- **Don't** use a colored `border-left`/`border-right` strip as a card's "highlight" treatment - it's a banned lazy pattern; use a tinted fill instead (see Insights Panel).
- **Don't** call an external API or LLM to generate the Insights Panel's text; it must stay rule-based and computed client-side from the loaded orders only.
- **Don't** use a donut/pie chart for part-to-whole data; use a stacked bar (see Charts).
- **Don't** style more than one KPI value as a "hero figure" - all four stay equally weighted at the Stat-value size.
