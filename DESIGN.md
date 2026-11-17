---
name: Hahakigami website
description: The marketing site as a flat-printed retail software box; box art sells, the back panel tells the truth.
colors:
  cord: "#c42a20"
  carton: "#0e1319"
  straw: "#e9d9b4"
  straw-dim: "#8f8670"
  on-red: "#f6efdf"
  paper: "#f2ede1"
  panel: "#ffffff"
  ink: "#16140f"
  ink-soft: "#3b372d"
  muted: "#5a5446"
  table: "#cfc9bc"
typography:
  display:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "calc((100cqw - 2 * var(--pad)) * 0.1)"
    fontWeight: 900
    lineHeight: 0.95
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 125"
  headline:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(34px, 4vw, 56px)"
    fontWeight: 900
    lineHeight: 1
    letterSpacing: "-0.01em"
    fontVariation: "'wdth' 112"
  title:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "clamp(30px, 3.4vw, 46px)"
    fontWeight: 900
    lineHeight: 1
    fontVariation: "'wdth' 118"
  panel-title:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "30px"
    fontWeight: 900
    fontVariation: "'wdth' 120"
  numeral:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "64px"
    fontWeight: 900
    lineHeight: 1
    fontVariation: "'wdth' 125"
  subtitle:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "18px"
    fontWeight: 800
  lead:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "19px"
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Archivo Variable, system-ui, -apple-system, Segoe UI, sans-serif"
    fontSize: "13px"
    fontWeight: 800
    letterSpacing: "0.14em"
  mono-label:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "13px"
    fontWeight: 600
    letterSpacing: "0.08em"
  mono-figure:
    fontFamily: "JetBrains Mono Variable, ui-monospace, SF Mono, Menlo, monospace"
    fontSize: "12px"
    fontWeight: 500
    lineHeight: 1.5
  jp-mark:
    fontFamily: "Zen Kaku Gothic New, Hiragino Sans, Hiragino Kaku Gothic ProN, Yu Gothic, Noto Sans CJK JP, sans-serif"
    fontWeight: 900
rounded:
  print: "0px"
  screen: "12px"
spacing:
  gap: "12px"
  cell: "22px"
  block: "40px"
  gutter-mobile: "16px"
  gutter: "56px"
  section-mobile: "72px"
  section: "96px"
  spine: "96px"
components:
  button-primary:
    backgroundColor: "{colors.cord}"
    textColor: "{colors.on-red}"
    rounded: "{rounded.print}"
    padding: "16px 22px"
  button-soon:
    backgroundColor: "transparent"
    textColor: "{colors.straw}"
    rounded: "{rounded.print}"
    padding: "16px 22px"
  button-outline:
    backgroundColor: "transparent"
    textColor: "{colors.straw}"
    rounded: "{rounded.print}"
    padding: "16px 22px"
  button-outline-hover:
    backgroundColor: "{colors.straw}"
    textColor: "{colors.carton}"
  spine-tab:
    backgroundColor: "transparent"
    textColor: "{colors.straw}"
    padding: "10px 6px"
    typography: "{typography.label}"
  spine-tab-current:
    backgroundColor: "{colors.cord}"
    textColor: "{colors.on-red}"
  spine-tab-hover:
    backgroundColor: "{colors.straw}"
    textColor: "{colors.carton}"
  panel:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    rounded: "{rounded.print}"
    padding: "18px 22px"
  segmented-toggle-on:
    backgroundColor: "{colors.straw}"
    textColor: "{colors.carton}"
    padding: "7px 12px"
  screen-window:
    backgroundColor: "{colors.carton}"
    textColor: "{colors.straw}"
    rounded: "{rounded.screen}"
    padding: "12px"
---

# Design System: Hahakigami website

> Scope: this file covers the marketing website in this repository only. The desktop app's chrome follows the user's macOS accent colour; its rules live in the app repository (`docs/adr/0001` and `src/tokens.css`). The app's opt-in Guardian theme is the one exception: it borrows carton, straw, cord red and this type on a neutral white board instead of paper, scoped under `:root[data-theme="guardian"]` in the app's `src/tokens.css`.

## Overview

**Creative North Star: "The Retail Box"**

The site is a software box, printed flat. Each part of the page is a part of the box. The sticky left spine is the box's spine. The first viewport is the box front: near-black carton, the Guardian art bleeding off the right edge, and a full-width spot-colour band with the wordmark. Everything after that is the back panel, an off-white card of ruled boxes, thick keylines and a spec sheet. The footer is the bottom flap, with a barcode. The whole box sits on a warm grey table that shows either side of the page at wide viewports.

It is dense and printed, never glossy. Depth comes from ink and rules, not light. The display face is very heavy and set at expanded widths, so it reads like box packaging. Figures, dates and code are set in mono, like the small print on a spec label. Dashed versus solid is a real code: solid means on disk, Hahakigami, available; dashed means logical size, a competitor, or not available yet.

**Key Characteristics:**
- Two surfaces only: the dark carton (box front, spine, terminal, app window, bottom flap) and the off-white paper back panel, set on the table colour.
- One spot colour, cord red, used for actions, the current nav tab and the wordmark band.
- Square ruled boxes with 2–4px keylines. The only rounded corners belong to things that depict a Mac screen.
- Expanded heavy Archivo for display, JetBrains Mono for figures and labels.
- Solid means real or present. Dashed means logical, competitor or not yet available.
- One motion moment (bars growing on the spec sheet) plus the treemap re-flowing when you switch its size basis.

## Colors

A printed two-surface palette: dark carton and off-white paper, straw for type on carton, and one spot red.

### Primary
- **Cord Red** (cord): the Guardian's knotted cord. It is the spot colour: the live Download button, the current spine tab, the spine's 4px edge line, the wordmark band across the box front, and the text-selection highlight on paper.

### Neutral
- **Carton** (carton): the Guardian art's own background. It is the box front, spine, bottom flap, terminal block and app-window frame. Any element carrying the `carton` surface class switches its focus ring and selection colours to straw.
- **Straw** (straw): the bristles. Text and keylines on carton, the hover fill for outline buttons and spine tabs, the pressed segment of the treemap toggle, the barcode bars, and the second line of the headline.
- **Dim Straw** (straw-dim): secondary strokes on carton: the top-edge rule, code comments and scrollbar thumbs.
- **On-Red Cream** (on-red): text on cord red. It is also the colour of the headline's first line on carton.
- **Paper** (paper): the back-panel card behind every section after the hero.
- **Panel White** (panel): the inside of a spec panel. It lifts a spec panel off the paper by tone alone.
- **Ink** (ink): text and every rule on paper (rules use the `rule` alias of ink). It is also the solid bar fill on the spec sheet. Hairlines are ink mixed to 20–33% opacity.
- **Soft Ink** (ink-soft): step descriptions, one notch quieter than body.
- **Muted** (muted): mono labels on section flaps, chart axes and footnotes.
- **Table** (table): the surface the box stands on (page background outside the 1320px box).

### Named Rules
**The Spot Colour Rule.** Cord red goes only on actions, the current tab and the wordmark band. Never use red for decoration, headings, icons or emphasis in body copy. Its scarcity is what lets the band read as print.

**The Surface Swap Rule.** Carton surfaces flip their local tokens: focus and selection become straw. Put any new dark element on the `carton` class rather than hand-setting colours, so the swap comes with it.

## Typography

**Display Font:** Archivo Variable (width axis, self-hosted via Fontsource), with system-ui fallback
**Body Font:** Archivo Variable
**Label/Mono Font:** JetBrains Mono Variable, with ui-monospace / SF Mono fallback
**Japanese mark:** Zen Kaku Gothic New 900, self-hosted only as the two unicode-range slices for 箒 and 神

**Character:** Archivo at 900 weight and 112–125% width does the shouting, like box packaging. JetBrains Mono does the small print: measurements, dates, axes, code. All numerals are tabular, site-wide.

### Hierarchy
- **Display** (900, width 125%, 0.95 line height, sized at 10% of the band's own inner width): the HAHAKIGAMI wordmark in the red band only. It is sized from its container so it can never overflow. 箒神 sits beside it at half that size.
- **Headline** (900, width 112%, clamp 34–56px, 36–60px on mobile, line height 1): the box-front headline. Two lines: the first in on-red cream, the second in straw.
- **Title** (900, width 118%, clamp 30–46px): section headings on a back-panel flap.
- **Panel title** (900, width 120%, 30px): the heading inside a spec panel, over a 10px ink bar. Privacy column heads use the same voice at 24px.
- **Numeral** (900, width 125%, 64px): the step numbers 1–4.
- **Subtitle** (800, 18–20px): feature and step names.
- **Lead** (400, 19px, 1.5 line height, max 44ch): the one paragraph under the headline.
- **Body** (400, 15–17px, 1.45–1.55 line height, max 50–65ch): back-panel copy.
- **Label** (700–800, 13–14px, 0.14–0.18em tracking, uppercase): spine tabs, the box's top-edge strip, spec-sheet group names.
- **Mono label** (600, 13px, 0.08em tracking, uppercase, muted): the right-hand fact on each section flap.
- **Mono figure** (500–600, 11–13px): chart values and axes, treemap sizes, terminal code, footer fine print.

### Named Rules
**The Expanded Weight Rule.** Display roles are always 900 weight at a widened width (112% or more). Normal-width 900 reads like a web app, not packaging.

**The Small-Print Rule.** Measured numbers, dates and code are set in mono. Prose is never set in mono.

## Layout

The box is a centred grid, at most 1320px wide: a 96px spine column, then the faces. At 860px and below, the spine becomes a horizontal sticky tab bar along the top and the box becomes one column.

The box front fills at least one viewport. Its rows, top to bottom, are: top-edge strip, stage, band, foot. The pitch column stops where the art begins. The art is out of flow, about min(54vw, 720px) wide, bleeds 110px past the right edge and runs under the red band. On mobile the top-edge strip moves to the bottom of the box front, below the buttons, so it never reads as an eyebrow over the headline. The art drops into flow below the copy (at most 72% / 420px), never behind it.

On the back panel, the page gutter is 56px on desktop and 16px on mobile. Sections are 96px apart on desktop, 72px on mobile. Each section opens with a flap (title left, mono fact right, a 4px ink rule under it, 40px below). Content uses asymmetric two-column grids (1.6:1, 1.3:1, 1:1.5) with 32–40px gaps, or ruled multi-cell rows (4 steps, 3 privacy columns). Those rows collapse to 2 and then 1 column at 860px and 520px. Cell padding is about 22–24px.

**The Shared Axis Rule.** Every bar on the spec sheet uses one seconds axis (0–25s). Never rescale a bar group on its own to make a result look bigger.

## Elevation & Depth

Flat print. There are no shadows anywhere. Depth comes from the surface swap (carton against paper against table), from tone (a white panel on paper), and from the weight of the rules (a 1px hairline, a 2–3px keyline, a 4px box edge, a 10px panel bar). The treemap blocks get their edge from an inset carton outline, not a shadow.

**The Flat Print Rule.** No box-shadow, no 3D box shading, no gradients for light. If something has to stand out, give it a heavier rule or a surface swap.

## Shapes

Square by default. Everything printed on the box (buttons, panels, ruled cells, the requirements strip, the version tag, toggles) has 0 radius and a straw or ink keyline. Rounded corners appear only on objects that depict a Mac screen or icon: the app-window frame around the treemap, the terminal block and the app icon in the spine. That contrast is what separates "a picture of the app" from "the box".

Dashed versus solid is a form rule:
- **Solid:** on-disk size, Hahakigami's own bars, available actions.
- **Dashed:** logical size, the competitor's bars, the Download button while no signed build exists.

**The Solid-Dashed Rule.** A dashed stroke always means logical, competitor or not yet available, and nothing else. Never use dashes for decoration.

## Components

### Buttons
Heavy, square, packaging-label buttons: 800 weight, 17px, 0.02em tracking, padding 16px 22px.
- **Primary (Download, live):** cord fill, on-red text.
- **Coming soon:** transparent, straw text, 2px dashed straw border, "· coming soon" at 600 weight. Announced as disabled (`aria-disabled`), still focusable, `not-allowed` cursor. It replaces the primary until a signed build exists.
- **Outline (GitHub):** transparent with a 2px solid straw border. On hover it fills straw with carton text.
- **Focus:** a 3px outline offset 3px, in ink on paper and straw on carton.

### Spine navigation
The box spine: sticky, full height, carton, with a 4px cord-red right edge. It holds the app icon, then vertical uppercase tabs reading bottom to top (800, 11–13px scaled by viewport height, 0.18em), then the vertical HAHAKIGAMI name (16–26px, scaled by viewport height; hidden on windows shorter than 720px, since the name is already on the band). The current tab is cord red with on-red text. One tab is always current, and the first viewport counts as Steps. On hover a tab fills straw with carton text. On mobile it becomes a horizontal tab bar with a 4px cord-red bottom edge; the icon and name are hidden.

### Section flap
The heading strip that opens every back-panel section: a title on the left, a mono label on the right, both on one baseline, with a 4px ink rule underneath. The mono label states a fact about the section (a count, a date, a scope). It sits beside the title, never above it.

### Ruled cells
The steps row and the privacy row: a 3px ink border around the row, with 3px dividers between cells. Cells have about 22–24px padding and no fill.

### Spec panel
A white panel with a 4px ink border, padding 18px 22px, and a panel title over a 10px ink bar. Inside, rows are split by ink hairlines at 27%. It is used for the benchmark chart and for the requirements definition list.

### Spec bars (signature)
Bars on one shared 0–25s axis, over a track of 20% gridlines. Hahakigami is a solid ink bar; the competitor is a 2px dashed ink outline. Values are right-aligned mono. A legend repeats the solid/dashed code, and a caveat sits under a 2px rule. The one motion moment: bars grow over 700ms with cubic-bezier(0.16, 1, 0.3, 1), staggered 70ms, once 35% of the panel is visible. With reduced motion or no JS they are fully drawn from the start.

### App window and treemap
A carton frame with 12px radius and 12px padding, standing in for the app. The bar holds window dots on the left and a square segmented toggle (On disk / Logical) on the right. The toggle has a 2px straw border; the pressed segment fills straw. Blocks use the straw tonal ramp with carton text, a type size that follows bytes, and an inset 2px carton outline that turns dashed in Logical mode. Grid tracks re-flow over 500ms with the same ease-out curve.

### Requirements strip and top edge
- **Requirements strip:** a row of bold 14px facts in square cells, 2px straw border and dividers.
- **Top edge:** an uppercase 14px label row with the product category and a boxed version tag, over a 2px dim-straw rule. It is the box's printed top edge; on mobile it moves to the bottom edge.

### Terminal block
Carton, rounded like a screen, 22px padding. Code is mono 13px at 1.7 line height, with comments in dim straw. It scrolls sideways, and is focusable and labelled so keyboard users can scroll it.

### Bottom flap
Carton footer: the name at 40px/900, mono fine print, a straw barcode, and the Download button repeated.

## Do's and Don'ts

### Do:
- **Do** take every colour and font from `src/lib/tokens.css`, and put dark elements on the `carton` class so focus and selection swap automatically.
- **Do** keep cord red for actions, the current tab and the wordmark band only.
- **Do** set display type at 900 weight and 112–125% width, and set measurements, dates and code in JetBrains Mono.
- **Do** draw structure with square ink or straw rules (1px hairline, 2–3px keyline, 4px edge, 10px panel bar).
- **Do** use dashed strokes for logical size, competitors and not-yet-available actions, and solid for everything real.
- **Do** put every comparative bar on one shared axis and keep the caveat beside it.
- **Do** keep the art clear of the copy: out of flow beside the copy on desktop, in flow below it on mobile.

### Don't:
- **Don't** use box-shadow, 3D box shading or lighting gradients. The box is printed flat.
- **Don't** round anything that isn't a picture of a Mac screen or icon.
- **Don't** use red for headings, decoration or emphasis.
- **Don't** use dashed strokes as decoration.
- **Don't** put a small uppercase label directly above a headline. The top-edge strip is a box edge with its own rule, and it moves below the buttons on mobile for exactly this reason.
- **Don't** apply this palette or type to the desktop app's default chrome, which follows the macOS accent colour (ADR 0001, `src/tokens.css`). The opt-in Guardian theme is the only place it appears in the app.
