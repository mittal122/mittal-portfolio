---
name: Mittal Domadiya Portfolio
description: A full-bleed shader portal for a DevOps and SRE engineer in training; one living field, one display face, everything else quiet.
colors:
  void: "#090B18"
  ink: "#12152A"
  night: "#1B1F3D"
  line: "#2A2F57"
  lilac: "#7C7EF8"
  lilac-soft: "#A3A5FF"
  mist: "#C9D6FF"
  mist-dim: "#8F9BCB"
  ember: "#FF6B3D"
typography:
  display:
    fontFamily: "Antonio, Impact, sans-serif"
    fontSize: "clamp(4.25rem, 15vw, 10.5rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Antonio, Impact, sans-serif"
    fontSize: "clamp(3.5rem, 11vw, 8.5rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Antonio, Impact, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 3.75rem)"
    fontWeight: 600
    lineHeight: 0.92
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
    letterSpacing: "normal"
  label:
    fontFamily: "Schibsted Grotesk, system-ui, sans-serif"
    fontSize: "0.6875rem"
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: "0.22em"
  data:
    fontFamily: "Martian Mono, ui-monospace, monospace"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "normal"
rounded:
  none: "0px"
  focus: "2px"
  full: "9999px"
spacing:
  gutter: "20px"
  gutter-sm: "32px"
  rail-left: "192px"
  rail-right: "208px"
  bar: "64px"
  section: "128px"
  section-lg: "192px"
components:
  button-primary:
    backgroundColor: "{colors.lilac}"
    textColor: "{colors.void}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-primary-hover:
    backgroundColor: "{colors.lilac-soft}"
    textColor: "{colors.void}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ember}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "0 24px"
    height: "52px"
  button-secondary-hover:
    backgroundColor: "rgba(255, 107, 61, 0.1)"
    textColor: "{colors.ember}"
  field:
    backgroundColor: "rgba(18, 21, 42, 0.8)"
    textColor: "{colors.mist}"
    typography: "{typography.body}"
    rounded: "{rounded.none}"
    padding: "12px 16px"
  menu-button:
    backgroundColor: "transparent"
    textColor: "{colors.mist}"
    rounded: "{rounded.full}"
    size: "44px"
  tag:
    backgroundColor: "transparent"
    textColor: "{colors.mist}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "6px 12px"
  readout-plate:
    backgroundColor: "rgba(9, 11, 24, 0.85)"
    textColor: "{colors.mist-dim}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    padding: "12px"
  card-featured:
    backgroundColor: "rgba(18, 21, 42, 0.7)"
    textColor: "{colors.mist}"
    rounded: "{rounded.none}"
    padding: "20px"
---

# Design System: Mittal Domadiya Portfolio

## Overview

**Creative North Star: "The Shader Portal"**

The whole site sits on one living surface: a full-bleed WebGL fragment shader of lilac interference filaments crossed by a single ember current, with fine film grain, drawn on a void-indigo ground. The field stands for the infrastructure the work runs on. Everything placed over it is quiet: mist type, 1px hairlines, outlined controls, and one tall condensed display face set very large against tiny tracked caps. Product truth (who it is for, what it must prove) lives in PRODUCT.md; this file is only the visual system.

Density is low and the voice is two-register: huge uppercase Antonio for names and page titles, small spaced-out Schibsted Grotesk caps for everything marginal (nav, metadata, buttons, readouts), and Martian Mono only where the text is data (years, stacks, status codes, diagram labels). The field is made legible by the shader itself, not by luck: it masks its bands out of the reading column and calms as the visitor scrolls from the portal into reading.

The world rejects the stacked-effect "dark purple glow kit": one shader, one display face, no second ambient effect layered on top.

**Key Characteristics:**
- One fragment shader is the only living surface; nothing else animates continuously except the projects map's packets.
- Void ground, mist text, lilac structure, ember as the single incandescent accent.
- Antonio display past 6rem by deliberate world choice, against 11px caps tracked at 0.22em.
- Square corners and 1px hairlines everywhere; round only for dots, pills, and the menu button.
- Fixed chrome (top bar, rails, readouts) sits on translucent void plates so it stays legible over the field.

## Colors

A cold void-indigo ground with mist type, lilac for structure, and ember reserved for the one thing that is live, chosen, or hovered.

### Primary
- **Signal Lilac** (lilac): the filament color of the shader and the structural accent. Fills the primary button (void text on it, 5.8:1), draws diagram strokes, scroll-rail progress, map node hover, and lit tool hubs. As text on void it holds 5.8:1, so it is legal for large or label text.
- **Soft Lilac** (lilac-soft): the hover state of the primary button (void on it, 8.8:1), lit map wires, and non-featured map packets.

### Secondary
- **Ember Current** (ember): the one incandescent accent (6.9:1 on void). Current-route dots and labels, every hover, the focus ring, text selection, input caret, the secondary button outline and text, the featured-project rings on the map, the selected map node, and the single ember mark in each mechanism diagram (where the human or deterministic core sits).

### Neutral
- **Void** (void): page ground, shader base color, theme-color, the color of text on lilac and ember fills, and (at 85% to 95% opacity) every plate behind fixed chrome.
- **Ink** (ink): raised surfaces at partial opacity: featured cards (70%) and form fields (80%).
- **Night** (night): the deep end of the ground gradient and the fill of a lit map hub.
- **Hairline Indigo** (line): 1px rules, card and field borders, unlit map wires, inactive rail dots, scrollbar thumb. Hairlines and outlines only; never text (it fails contrast).
- **Mist** (mist): primary text and display type (13.6:1 on void).
- **Dim Mist** (mist-dim): labels, metadata, placeholders, quiet links at rest (7.2:1 on void).

### Named Rules
**The One Ember Rule.** Ember means "live": current, hovered, focused, selected, or the human in the loop. It never fills a large area and never decorates a static element.

**The Hairline Rule.** `line` draws edges and nothing else. Any text that must be read uses mist or mist-dim.

## Typography

**Display Font:** Antonio (with Impact, sans-serif)
**Body Font:** Schibsted Grotesk (with system-ui, sans-serif)
**Label/Mono Font:** Martian Mono (with ui-monospace, monospace), for data only

All three are self-hosted variable-weight latin subsets under the SIL OFL (public/fonts/LICENSE.txt); Antonio and Schibsted Grotesk are preloaded.

**Character:** A tall condensed poster face at huge scale against small, airy tracked caps; the gap in scale between the two is the voice. Mono appears only where the content is genuinely data.

### Hierarchy
- **Display** (600, clamp(4.25rem, 15vw, 10.5rem), 0.92): the home name lockup only, uppercase, balanced. Larger section statements on home use the same face at clamp(3rem, 8vw, 6.5rem) to clamp(3.5rem, 12vw, 9rem).
- **Headline** (600, clamp(3.5rem, 11vw, 8.5rem), 0.92): every page title (PageHeader, Projects, 404). Project entry names use clamp(3rem, 8vw, 6rem).
- **Title** (600, clamp(2.25rem, 5vw, 3.75rem), 0.92): section headings inside a page.
- **Body** (400, 1.125rem rising to 1.25rem at sm, 1.625): lead and reading copy in mist, held to 44ch to 62ch.
- **Label** (500, 0.6875rem, 0.22em, uppercase): the marginal voice: nav, top bar, readouts, field labels, small subheadings, footer links. Buttons use the same treatment at 0.75rem.
- **Data** (400, 0.875rem or 0.75rem): years, periods, stacks, topics, the 404 code, tool hubs, and diagram text at 8 units.

### Named Rules
**The Two Registers Rule.** Text is either display (Antonio, uppercase, huge) or label/body (Schibsted). There is no mid-size bold sans heading tier; when a heading must be small, it is a label in mist.

**The Data-Only Mono Rule.** Martian Mono is reserved for values a machine would also produce: dates, versions, stacks, codes. Never for prose or headings.

**The No Kicker Rule.** Nothing sits above a heading as a category tag or eyebrow. Supporting lines (role line, tagline, metadata) go below the heading.

## Layout

A single reading column that clears fixed chrome. Content padding is 20px on phones, 32px from sm, then at lg the column steps right by 192px to clear the left route rail, and at xl the right side opens to 208px to clear the scroll rail and status readout. The shader's reading lane is tied to this column: on lg and up the bands are masked out of the left half; on phones the field is dimmed and the ember current is pushed to the right edge so it never strikes through copy.

The top bar is 64px and fixed. Page headers start 128px down (160px at lg); major sections breathe at 128px vertical (192px at lg). Prose holds to 44ch to 62ch. Home's first viewport is a full 100dvh column with the featured-project row starting at the fold. The projects map runs at a 1000×600 viewBox landscape and switches to a 600×700 portrait layout below 700px wide, with its project index beside it at xl and below it otherwise. Anchors land 6rem below the top of the viewport to clear the bar.

On phones and tablets (below lg) the left rail, crosshair rule, scroll rail, and status readout are hidden; a bottom thumb-zone pill nav carries three routes and the menu button, and the footer reserves bottom padding for it.

## Elevation & Depth

Depth comes from the field, not from shadows. The shader is the back layer (fixed, z -10); content and hairlines sit flat on it; fixed chrome floats on translucent void plates (85% for rails, readouts, the top bar and map index; 90% for the pill nav; 95% for the menu dialog over a 60% backdrop). There is no blur or backdrop-filter.

### Shadow Vocabulary
- **Lilac lift** (`box-shadow: 0 10px 28px -10px rgba(124, 126, 248, 0.7)`): the primary button only, as if the lilac fill draws a little light from the field beneath it.

### Named Rules
**The Plate Rule.** Anything fixed over the field sits on a void plate of at least 85% opacity. Text never relies on the field happening to be dark behind it.

**The One Lift Rule.** The primary button is the only element with a shadow. Cards, fields, and chrome stay flat.

## Shapes

Square corners and 1px strokes. Buttons, cards, fields, tags, plates, and the map frame are all 0 radius. Round appears only where the form is round by nature: status and route dots (6px), timeline and map nodes, the 44px circular menu button, the mobile pill nav, and the pill-shaped tool hubs on the map. The focus ring takes a 2px radius. Line drawings (mechanism diagrams, map wires) use non-scaling 1 to 1.6px strokes, dashed where they show a loop or a boundary.

## Components

### Buttons
Outlined or flat-filled rectangles that read like instrument controls.
- **Shape:** square (0 radius), minimum height 52px, 24px horizontal padding, label and trailing arrow pushed apart (justify-between, 24px gap).
- **Primary:** lilac fill, void text, semibold 0.75rem tracked caps, with the lilac lift. One per view group.
- **Hover / Focus:** primary moves to soft lilac fill and border; secondary deepens its border to full ember and gains a 10% ember wash. All transitions 300ms on the out-expo curve. Focus is the global 2px ember outline at 3px offset. Disabled drops to 60% opacity with a progress cursor.
- **Secondary:** transparent with a 70% ember outline and ember text; used for "write to me", external profiles, and repo links.
- **Quiet link:** label text in dim mist turning ember on hover (200ms); used for footer, menu, and "all seven" style navigation.

### Chips
- **Style:** square 1px outlined label or mono tags, 6px by 12px padding. Neutral tags use the hairline border with mist text; a note tag uses a 70% ember border and ember text. On a project entry, stack items that are map hubs take a 70% lilac border and mist text and turn ember on hover; others stay hairline with dim text.

### Cards / Containers
- **Corner Style:** square.
- **Background:** ink at 70%.
- **Shadow Strategy:** none (see Elevation & Depth).
- **Border:** 1px hairline, turning ember on hover or focus-within. The whole card is one link; its trailing arrow nudges 4px right on hover.
- **Internal Padding:** 20px, with a hairline-divided footer row.

### Inputs / Fields
- **Style:** full-width, ink at 80%, 1px hairline border, 12px by 16px padding, mist text at 1rem, square corners, ember caret, dim mist placeholder. Labels are mist label caps above the field.
- **Focus:** border turns lilac (the global ember outline is suppressed on fields); hover shifts the border to dim mist. Transitions 200ms.

### Navigation
- **Top bar:** fixed 64px bar on a void plate with a 70% hairline bottom rule. Name in mist caps at left, role caps beside it, a hairline "crosshair rule" with a centred 16px vertical tick filling the middle on lg, quiet GitHub and Email links, and the circular dotted menu button.
- **Left rail (lg+):** vertical label links spaced 28px apart, each led by a 6px dot; the current route has an ember dot and mist text, others a hairline dot that turns ember on hover.
- **Menu:** a native full-screen dialog on void at 95%; route names set in the display face at clamp(2.75rem, 9vw, 5.5rem), current route in ember, contact links in quiet caps along the bottom.
- **Mobile pill nav:** fixed rounded-full hairline pill on void at 90% at the bottom of the screen with three label links (active ember) and the menu button; all targets at least 44px.

### Status readout and scroll rail
Fixed instruments at the right edge on xl, each on a void plate. The scroll rail is a 160px hairline with a lilac progress fill, a hollow mist ring marking position, and a two-digit tabular percentage in label caps. The status readout sits bottom-right with an ember dot, stating availability in label caps.

### Mechanism diagram
Line drawings on a 240×120 grid: lilac 1.25px non-scaling strokes, Martian Mono 8-unit labels in mist with dim-mist captions, and exactly one ember mark at the point where the human or deterministic core sits. On the projects entry it reveals with a 1.1s left-to-right clip wipe, like a plotter pass.

### System map
Projects ring tool hubs; wires are hairline at rest and become soft lilac at 1.6px when lit, while unrelated nodes dim. Hubs are mono text in outlined pills (void fill, lilac border and night fill when lit). Featured projects carry a static ember ring; the selected node fills ember and its ring pulses once. Selecting a project tweens the viewBox over 700ms on the out-expo curve. Packets of light (ember from featured projects, soft lilac otherwise) travel the wires and pause offscreen and when the tab is hidden.

### Motion
One easing for everything: out-expo (`cubic-bezier(0.16, 1, 0.3, 1)`). Routes enter once with a 600ms fade, 8px blur, and 12px rise while the field flashes and settles (about 500ms). On the map: wires draw once (900ms), nodes settle (700ms), entries swap in (450ms). The field drifts slowly and the pointer bends it locally (fine pointers only; the native cursor stays). Under reduced motion the field draws a single still frame (redrawn only on resize and scroll), and the dissolve, wire draw, ring pulse, packets, camera tween, diagram wipe, and smooth scroll are all removed; their default state is the finished one. Without WebGL the field falls back to a static radial lilac-and-ember gradient on void.

## Do's and Don'ts

### Do:
- **Do** keep the shader as the only living surface and let it carry the atmosphere; everything placed on it stays flat and quiet.
- **Do** set page titles in uppercase Antonio 600 at 0.92 line height; sizes past 6rem are the world's deliberate choice, not an error.
- **Do** put every fixed or overlaid element on a void plate of at least 85% opacity.
- **Do** use ember only for live state: current, hover, focus, selection, and the single human-in-the-loop mark in a diagram.
- **Do** use the out-expo curve for all transitions and make the reduced-motion state the finished state.
- **Do** keep hit targets at 44px minimum and the 2px ember focus ring at 3px offset.

### Don't:
- **Don't** use `line` for any text; it is for hairlines and outlines only.
- **Don't** place kickers or eyebrows above headings; supporting lines go below.
- **Don't** add a second ambient effect (glows, particles, gradient blobs, glass blur) on top of the field.
- **Don't** add shadows beyond the primary button's lilac lift, or round the corners of rectangles.
- **Don't** set prose or headings in Martian Mono.
- **Don't** add a custom cursor, scroll inertia, or a percentage loader.
