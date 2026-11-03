---
name: Analog Precision
colors:
  surface: '#121316'
  surface-dim: '#121316'
  surface-bright: '#38393c'
  surface-container-lowest: '#0d0e11'
  surface-container-low: '#1b1b1f'
  surface-container: '#1f1f23'
  surface-container-high: '#292a2d'
  surface-container-highest: '#343538'
  on-surface: '#e3e2e6'
  on-surface-variant: '#e1bfb5'
  inverse-surface: '#e3e2e6'
  inverse-on-surface: '#2f3034'
  outline: '#a98a80'
  outline-variant: '#594139'
  surface-tint: '#ffb59d'
  primary: '#ffb59d'
  on-primary: '#5d1900'
  primary-container: '#ff6b35'
  on-primary-container: '#5f1900'
  inverse-primary: '#ab3500'
  secondary: '#cac6be'
  on-secondary: '#32302a'
  secondary-container: '#494740'
  on-secondary-container: '#b9b5ac'
  tertiary: '#becaba'
  on-tertiary: '#283328'
  tertiary-container: '#919d8e'
  on-tertiary-container: '#2a3429'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390c00'
  on-primary-fixed-variant: '#832600'
  secondary-fixed: '#e7e2d9'
  secondary-fixed-dim: '#cac6be'
  on-secondary-fixed: '#1d1c16'
  on-secondary-fixed-variant: '#494740'
  tertiary-fixed: '#d9e6d6'
  tertiary-fixed-dim: '#becaba'
  on-tertiary-fixed: '#141e14'
  on-tertiary-fixed-variant: '#3e4a3e'
  background: '#121316'
  on-background: '#e3e2e6'
  surface-variant: '#343538'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Space Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
  body-lg:
    fontFamily: Space Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Space Grotesk
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Space Grotesk
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lcd-lg:
    fontFamily: Space Mono
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 24px
    letterSpacing: 0.08em
  label-lcd-md:
    fontFamily: Space Mono
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
    letterSpacing: 0.06em
  label-lcd-sm:
    fontFamily: Space Mono
    fontSize: 11px
    fontWeight: '400'
    lineHeight: 14px
    letterSpacing: 0.04em
  label-meta:
    fontFamily: Space Mono
    fontSize: 10px
    fontWeight: '400'
    lineHeight: 12px
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style
The design system channels the mechanical discipline and physical delight of classic mid-century rangefinders and SLR bodies (such as the Leica M-series, Olympus OM-1, and Contax T2). It marries retro-tactile skeuomorphism with modern utilitarian minimalism. 

Targeted at deliberate photographers, analog enthusiasts, and visual purists, the interface evokes the weighted calibration of mechanical gears, tactile step-dials, knurled metal grips, and the deliberate pause before depressing a shutter. The emotional response is intentional, precise, grounded, and timelessly mechanical—eliminating noisy digital clutter in favor of physical metaphors that feel physically engineered rather than purely rendered.

## Colors
The palette derives directly from camera chassis metallurgy, vulcanite leatherette bodies, stamped brassing, and illuminated mechanical displays:

- **Primary (`#FF6B35` - Vintage Amber/Signal Orange):** Reserved strictly for actionable shutter activations, frame-advance states, active metering indicators, and manual-focus warning pins.
- **Secondary (`#F4EFE6` - Warm Cream / Enamel White):** Evokes the screen-printed and engraved dial markings on classic camera bodies. Used for key headlines, active readouts, and primary mechanical labels.
- **Tertiary (`#758173` - Muted Olive Field):** Used for metering balance zones, optical depth-of-field scales, battery health, and non-intrusive metadata.
- **Neutral (`#121316` - Matte Charcoal Base):** The foundational substrate mimicking anodized magnesium and vulcanite camera casing.
- **Neutral Elevated (`#1A1B20` - Machined Plate):** Surface tier for knurled wheels, top-plate bezels, viewfinder overlays, and tactile cards.
- **Neutral Subdued (`#8E8D8A` - Warm Steel Grey):** Inactive indicators, mechanical scale tick-marks, film speed markings, and neutral borders.

## Typography
Typography is split strictly into two functional layers: **Engineering Construct** and **Mechanical Readout**:

1. **Space Grotesk (Chassis & Structural Copy):** Provides an architectural, mid-century modernist aesthetic with tight geometries. It renders labels, operational instructions, menu configurations, and film roll names.
2. **Space Mono (Optical & Instrument HUD):** Represents mechanical stamping and backlit 7-segment/retro LCD counter logic. Used unconditionally for ISO indices (`ISO 400`), shutter durations (`1/500s`), aperture values (`f/2.8`), frame count counters (`[24/36]`), EV exposure compensation, and printed date stamps (`'98 10 24`). All numerical metrics must be displayed with tabular layout consistency to preserve alignment during live changes.

## Layout & Spacing
The layout simulates the physical proportions of an optical camera deck. Viewfinder interfaces stick faithfully to classic analog aspect ratios: 3:2 (35mm standard), 1:1 (6x6 medium format), and 4:3 (645 format), boxed within dark frame-gutters.

- **Mobile Viewport:** Operates as a dual-grip handheld deck. Top bar handles status parameters (film roll, remaining frames, battery, EV index); middle canvas handles the framed optical target; bottom cluster handles physical dials, the shutter cylinder, and quick-setting thumbwheels.
- **Tablet / Desktop:** Adapts to a split bench table. The camera frame stays centered and locked to native aspect ratios with matte letterboxing, while lateral panels display darkroom adjustments, contact sheets, and mechanical dial trays.
- Spacing relies on a rigid 4px/8px incremental rhythm, ensuring bezel insets and mechanical lines maintain machine-calibrated alignment.

## Elevation & Depth
Elevation is rendered through tactile relief, chamfered metallic edges, and stamped debossing rather than amorphous ambient drop shadows:

- **Level 0 (Body Base - `#121316`):** The primary chassis background featuring a continuous micro-grain stipple texture (simulating camera leatherette).
- **Level 1 (Machined Insets - Debossed):** Sub-panels, LCD windows, and frame counter wells. Rendered with an inner shadow (`inset 0 2px 4px rgba(0,0,0,0.7)`) and a subtle bottom lip highlight (`0 1px 0 rgba(244, 239, 230, 0.08)`).
- **Level 2 (Surface Plates & Cards - `#1A1B20`):** Elevated dials and contextual setting sheets. Defined by a crisp 1px perimeter border (`#8E8D8A` at 20% opacity) and an extrusion drop shadow (`0 4px 8px rgba(0, 0, 0, 0.6)`).
- **Level 3 (Tactile Raised Controls - Knurled & Threaded):** Shutter buttons, selection dials, and thumb latches. Styled with a hard-lit top highlight edge (`inset 0 1px 0 rgba(255,255,255,0.2)`) and a dense physical base shadow (`0 6px 14px rgba(0, 0, 0, 0.8)`). Depressing controls physically shifts them down 1.5px and eliminates base shadows, replicating a mechanical click.

## Shapes
A conservative, precision-machined edge radius (`roundedness: 1` / 4px base radius) anchors the design in authentic analog industrial fabrication. 

- Control dials, lens selector collars, and the circular shutter trigger retain pure circular geometry (`rounded-full`).
- Information cards, LCD readouts, and viewfinder view-ports utilize tight `0.25rem` (4px) to `0.5rem` (8px) corners, avoiding soft, hyper-modern organic shapes.
- Cut-out indicator windows and exposure notches use distinct 45-degree chamfers or tight rounded corners to mirror punched metal and die-cut sheet iron.

## Components

### Shutter Button (Primary Trigger)
The visual centerpiece: a multi-tiered circular metallic control. Outer ring features a dark knurled bezel; inner button features a dual-state mechanical throw. Half-press engages focus/metering locks with an audible/haptic click; full depress fires the shutter accompanied by a mechanical exposure pulse. Finished in concentric circular brushed steel with an optional center-threaded screw-hole graphic.

### Mechanical Rotary Dials (ISO, Shutter Speed, Aperture)
Rotary wheels that support drag and stepped scrolling. Each stop snaps decisively with haptic feedback. Dial values are set in `Space Mono` typography with stamped tick marks in `#8E8D8A`. The selected value highlights in sharp `#FF6B35` with an engraved indicator needle.

### Film Counter & LCD HUD
Modeled after late-80s segmented and low-power monochrome LCD readouts. Framed in a debossed inset chassis (`#0E0F12`), the active number displays in luminous Warm Cream (`#F4EFE6`) or Amber (`#FF6B35`) over a faint, ghosted segment background. Includes frame count (e.g., `S`, `1` through `36`, `E`), battery cell blocks, and flash readiness.

### Buttons & Toggle Switches
- **Standard Action Buttons:** Low-profile machined plates with a 1px contour line (`#8E8D8A` at 25%), displaying labels in uppercase `Space Grotesk`.
- **Toggle Switches:** Bimodal mechanical flick switches (used for Flash: OFF/ON, Auto-Wind, Self-Timer) featuring an integrated physical slit with a tiny amber or olive mechanical dot indicator.

### Chips & Parameter Badges
Compact, rectangular chips formatted like laboratory tape or stamped metal plates. Background `#1A1B20` with a fine border (`#8E8D8A`, 30% opacity). Typography uses `label-lcd-sm` in `Space Mono`. Active chips illuminate with an amber accent border and warm cream text.

### Lists & Roll Archives (Contact Sheet View)
Roll summaries emulate darkroom negative sleeves and binder contact sheets. Thumbnails utilize rigid 3:2 crops with perforated edge markings (sprocket holes) along the borders. Film stocks are labeled using industrial code typography (e.g., `PORTRA-400-EX`, `TRI-X-400`).

### Checkboxes & Radios
Replaced with mechanical indicator pins:
- **Radio:** Rotary wheel selection position or an optical split-circle viewfinder indicator.
- **Checkbox:** Recessed square window with an analog red/amber mechanical flag that slides horizontally into place when engaged.

### Input Fields & Sliders
- **Inputs:** Styled as engraved parameter plates with inset shadows and mono readouts. Cursor is an amber terminal block.
- **Sliders (EV / Focus Ring):** Mimic lens-barrel focus throw ribbons with stamped millimeter and EV graduation lines.