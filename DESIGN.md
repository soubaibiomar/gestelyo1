---
name: Gestelyo
description: A white and electric blue product system led by large original product screens.
colors:
  primary: "#075bff"
  primary-hover: "#0048d5"
  ink: "#101d48"
  muted: "#52617d"
  canvas: "#fff"
  line: "#dfe7f3"
  pale-panel: "#f2f7ff"
  discount-bg: "#dfeaff"
  discount-ink: "#0046c9"
typography:
  display:
    fontFamily: '"Albert Sans Variable", "Manrope Variable", sans-serif'
    fontSize: "clamp(38px, 3.85vw, 64px)"
    fontWeight: 750
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: '"Albert Sans Variable", "Manrope Variable", sans-serif'
    fontSize: "clamp(32px, 3.2vw, 48px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  body:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "16px"
    lineHeight: 1.8
  control:
    fontFamily: '"Manrope Variable", sans-serif'
    fontSize: "14px"
rounded:
  control: "8px"
  panel: "14px"
  tab: "6px"
  tag: "5px"
spacing:
  compact-gap: "14px"
  column-gap: "20px"
  panel-padding: "30px"
  mobile-gutter: "20px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.canvas}"
    rounded: "{rounded.control}"
    padding: "14px 23px"
    height: "48px"
    typography: "{typography.control}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.control}"
    padding: "14px 23px"
  discount-tag:
    backgroundColor: "{colors.discount-bg}"
    textColor: "{colors.discount-ink}"
    rounded: "{rounded.tag}"
    padding: "5px 9px"
  pricing-card:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    rounded: "{rounded.panel}"
    padding: "30px"
---

# Design System: Gestelyo

## Current revision after user feedback

The user rejected the decorative ribbon treatment and requested changes to style and motion. This revision supersedes the ribbon and split hero descriptions below. The active implementation is the final Product theatre block in editorial.css and ProductStage in ProductVisuals.jsx.

The hero pairs a 650 weight display heading with a compact introduction, then places the supplied screen in a full width electric blue stage. Desktop module controls run vertically beside the image; mobile controls run horizontally above it. A shared selection marker travels between modules while the image exits and enters with a bounded horizontal mask. Scroll brings the screen from seven degrees of perspective to flat, with scale moving from 0.94 to 1. Reduced motion disables spatial transitions. There is no automatic module cycling.

The workflow section uses a navy reading surface and pale blue selected states. Pricing shares a pale canvas, with a navy Business panel, white action and accessible light text. Discounts remain annual only. The original screenshot crops, facts, routes and semantic controls are preserved. The earlier generated mockup fidelity gate is historical and is not claimed as passed by this revision.

## Overview

**Creative North Star: "A common movement"**

The shipped marketing site uses a white canvas, electric blue controls and navy type. The original Gestelyo logo and supplied product captures provide the identity and evidence. One architectural ribbon wraps the homepage product view; quiet navigation and module controls remain legible around it.

The system is spacious without hiding content. Broad product imagery alternates with readable explanatory sections. The marketing site and local demo share some colors, but the demo retains its separate, denser interface. This document describes the marketing cascade, with `editorial.css` loaded last; it does not replace the demo styles.

**Key Characteristics:**

- Original product screenshots with truthful fictitious data captions.
- Albert Sans display headings and Manrope reading text.
- White surfaces, pale blue section backgrounds and restrained borders.
- A blue SVG ribbon with small scroll movement and explicit module exploration.

## Colors

Electric blue supplies identity and action, while navy and muted blue gray carry the reading hierarchy.

### Primary

- **Electric blue:** Primary actions, selected tabs, product links and the central ribbon gradient stop.
- **Pressed blue:** The primary button hover background.
- The ribbon also uses the observed deep blue and bright blue stops in `BrandRibbon.jsx`. These are local illustration materials, not additional interface accents.

### Neutral

- **Navy ink:** Main headings and body emphasis.
- **Muted blue gray:** Descriptions, captions and secondary navigation.
- **White canvas:** Main background, controls and product annotations.
- **Fine blue gray line:** Tables, pricing borders and section separators.
- **Pale blue panel:** Explanatory panels and active workflow stages.

### Named Rules

**The Action Blue Rule.** Use electric blue for actions, selected states and the existing brand ribbon; preserve navy for primary reading text.

## Typography

**Display Font:** Albert Sans Variable with Manrope Variable and sans serif fallback.

**Body Font:** Manrope Variable with sans serif fallback.

The display face is compact and confident, with tight tracking; the body face keeps explanatory copy clear. The hierarchy is responsive rather than a single fixed scale.

### Hierarchy

- **Display:** Homepage heading uses the frontmatter role; below 550px it becomes 37px with 1.06 line height. Interior headings use `clamp(40px,4.7vw,70px)`, weight 700 and 1.05 line height, becoming 40px on small screens.
- **Headline:** Shared section headings use the frontmatter role, becoming 34px below 550px.
- **Title:** Pricing names use 28px, weight 700 and 1.1 line height; workflow details use 28px with tight tracking.
- **Body:** Reading sections use the frontmatter role with contextual line heights from 1.65 to 1.9. Long editorial paragraphs cap at 72ch.
- **Control:** Buttons and desktop navigation use the control size. Secondary captions are smaller and stay on white ground.
- **Price:** Albert Sans weight 750, tabular numbers, `clamp(35px,3.3vw,49px)`; phone cards use 45px.

## Layout

Marketing content has a 1440px maximum container and desktop width `calc(100% - 96px)`. Gutters become 30px below 1200px and 20px below 550px. The header is 80px high, 76px on phones. Navigation collapses below 1050px.

The homepage uses a 43% / 57% copy and product split, then stacks below 800px. Only its product frame has a slight rotation; the caption and details remain unrotated on white surfaces. This is a hero treatment rather than a rule for every screenshot. Product and explanation sections use broad two column layouts, with single column reading on smaller screens. Section spacing commonly ranges from 65px to 90px.

Pricing uses three equal columns with 20px gaps. Below 800px each plan becomes a full width two column panel; below 550px it becomes a single column card. Editorial pages have a 240px contents column beside the text, stacking below 800px. Comparison tables retain horizontal scrolling regions.

## Elevation & Depth

Most surfaces are flat, separated by white space, fine borders or pale blue fills. Shadows are structural exceptions for product imagery and open navigation, rather than a treatment applied to every container.

### Shadow Vocabulary

- **Product frame:** `0 18px 38px #0a286f16`; separates the screenshot from the ribbon.
- **Navigation panel:** `0 18px 50px #10234a22`; raises an open desktop menu.
- **Module selector:** `0 6px 18px #10234a0c`; separates the floating tab strip from the image.

### Named Rules

**The Evidence Frame Rule.** Give product imagery the shallow lift already used by the frame; keep pricing and explanatory panels flat.

## Shapes

Controls use gentle corners, panels use larger corners, and compact selected tabs and discount labels use the smaller frontmatter radii. Borders are generally one pixel. The ribbon is continuous stroked SVG geometry, layered behind and in front of the product view; it is not a replacement logo.

Screenshot crops conceal the original sidebar promotional badge while retaining the supplied raster itself. General captures use a 1.529 aspect ratio; the homepage uses 1.83 on desktop and 1.65 on smaller screens. The image width is 116.3% with a negative 16.3% left margin. These values describe the current asset crop, not a universal image rule.

## Components

### Buttons

Primary buttons are solid blue with white text; secondary buttons are white with a fine blue gray border. Both use the control radius and frontmatter padding. Primary hover darkens and lifts 2px over 0.2s; reduced motion removes the lift. Secondary hover changes border and text to blue with a very pale fill.

Keyboard focus is visible. The base stylesheet's more specific button, anchor, input and select focus rules retain a 3px `#1571ff` outline with 4px offset; the final generic focus rule uses primary blue and 5px offset for other focusable elements.

### Inputs / Fields

Contact fields use white backgrounds, a one pixel `#c1cfe5` border, the control radius and 15px text. Their caret is blue. This extraction does not establish unimplemented error or disabled treatments.

### Navigation

Desktop navigation uses 14px, weight 650 links and explicit menu buttons. Active pages turn blue. Menus have white backgrounds and the panel radius, close with Escape, and become static panels inside the mobile menu. The supplied logo remains an image with descriptive alternative text.

### Product Explorer

Pilotage, CRM and Analyses are keyboard operable tabs with arrow, Home and End navigation. Selected tabs are blue with white text. Switching captures fades and reveals the original image over 0.26s using `cubic-bezier(.22,1,.36,1)`; the details action toggles a 1.23 image scale. Captions identify supplied mockups and fictitious data.

### Workflow Explorer

Four explicit stages update descriptive content and a two pixel progress line. Progress transitions over 0.4s; details fade and move 8px over 0.18s. Reduced motion makes these transitions immediate. There is no automatic tab cycling.

### Ribbon

The decorative ribbon is hidden from assistive technology. Scroll progress maps to a 45px vertical displacement and rotation from minus 5 to 3 degrees. Reduced motion removes these transforms. Keep the geometry behind controls and the white annotation surfaces readable.

### Pricing

White bordered plan panels share the same hierarchy. Business has a blue border and pale blue background. The annual and monthly switch uses an explicit pressed state. Annual discounts appear only as compact labels in annual mode; monthly mode has no discount labels. Plans retain the approved data in `pricing.mjs`, including user counts and additional user pricing. Enterprise remains a separate quotation panel.

## Do's and Don'ts

### Do:

- **Do** preserve the supplied logo and actual product screenshots.
- **Do** preserve keyboard tab navigation, visible focus and reduced motion behavior.
- **Do** use blue selected states with semantic pressed or selected attributes.
- **Do** keep annual discounts confined to annual mode.
- **Do** keep captions truthful about mockups and fictitious data.

### Don't:

- **Don't** treat screenshot business names or figures as verified customer proof.
- **Don't** add a new palette or replace supplied screen content with generated ERP screens.
- **Don't** make the demo inherit the marketing site's spacious density by default.
- **Don't** turn every panel into a ribbon composition or lifted surface.

Not canonized: the automated original screenshot plate fidelity gate remains unresolved. This document records the implemented system, not a formal numerical match to the approved comp. Legacy glyph bullets and tiny uppercase labels that remain outside the main pricing list are carried defects, not primitives to copy to new surfaces.

## Responsive correction, 10 October 2026

The original logo asset remains unchanged. Its image now follows the container width with its natural proportions and vertical centering; obsolete fixed crops and mobile offsets are removed. Header controls fit a 320px viewport, mobile navigation has 44px touch targets and a vertically scrollable panel bounded by dynamic viewport height. Breadcrumbs and actions wrap, contact fields use 16px input text, and comparison tables scroll inside their own region.

Verification: all 31 routes at 320, 390, 568, 768, 1024, 1280 and 1920px in Edge Chromium with reduced motion. No document width overflow, header/footer logo overflow or JavaScript page errors. Collapsed menus and submenus opened and closed at each applicable width, including 568px landscape with a 320px height. Pricing annual switch exercised. Physical devices, Safari and Firefox were not tested. Evidence is in outputs/responsive-verification.json and responsive-after captures.
