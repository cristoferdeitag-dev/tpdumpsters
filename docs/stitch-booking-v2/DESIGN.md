---
name: Industrial Integrity
colors:
  surface: '#fbf9f8'
  surface-dim: '#dbd9d9'
  surface-bright: '#fbf9f8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f5f3f3'
  surface-container: '#efeded'
  surface-container-high: '#eae8e7'
  surface-container-highest: '#e4e2e2'
  on-surface: '#1b1c1c'
  on-surface-variant: '#5b403e'
  inverse-surface: '#303030'
  inverse-on-surface: '#f2f0f0'
  outline: '#906f6d'
  outline-variant: '#e4bdbb'
  surface-tint: '#bb1428'
  primary: '#a2001c'
  on-primary: '#ffffff'
  primary-container: '#c8202f'
  on-primary-container: '#ffdfdd'
  inverse-primary: '#ffb3af'
  secondary: '#5f5e5e'
  on-secondary: '#ffffff'
  secondary-container: '#e2dfde'
  on-secondary-container: '#636262'
  tertiary: '#4d4f4f'
  on-tertiary: '#ffffff'
  tertiary-container: '#666767'
  on-tertiary-container: '#e6e6e6'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#ffdad8'
  primary-fixed-dim: '#ffb3af'
  on-primary-fixed: '#410006'
  on-primary-fixed-variant: '#930019'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1b1c1c'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#e2e2e2'
  tertiary-fixed-dim: '#c6c6c7'
  on-tertiary-fixed: '#1a1c1c'
  on-tertiary-fixed-variant: '#454747'
  background: '#fbf9f8'
  on-background: '#1b1c1c'
  surface-variant: '#e4e2e2'
typography:
  display-xl:
    fontFamily: Work Sans
    fontSize: 48px
    fontWeight: '700'
    lineHeight: '1.1'
  headline-lg:
    fontFamily: Work Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Work Sans
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-bold:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  base: 8px
  section-padding: 80px
  container-max-width: 1200px
  gutter: 24px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style

This design system is built on the pillars of **reliability, efficiency, and industrial strength**. It is designed specifically for a logistics and rental service audience, balancing the ruggedness of the waste management industry with a clean, high-end digital experience that builds immediate trust.

The visual style follows a **High-Contrast Corporate** movement. It utilizes a heavy "Z-pattern" layout to guide users toward conversion points, using bold color blocks and rigid structural alignment. The aesthetic is intentionally "utility-first"—avoiding unnecessary decorative elements in favor of massive headlines, clear information hierarchy, and tactile action buttons that feel impactful.

## Colors

The color palette is anchored by **Industrial Red (#C8202F)**, a color that commands attention and signals action. This is the primary driver for all CTAs and brand identifiers. 

**Secondary Charcoal (#222222)** provides a heavy, grounded contrast, used for headers, footers, and large section backgrounds to create "zones" of information. **Light Gray (#F5F5F5)** serves as the primary canvas for cards and UI backgrounds, preventing the interface from feeling too stark, while a darker **Neutral Gray (#4A4A4A)** is reserved for secondary text and icons to ensure optimal readability and AA accessibility standards.

## Typography

This design system utilizes a two-font stack to differentiate between high-impact messaging and functional data. 

**Work Sans** is used for all headlines and display text. Its slightly wider apertures and robust construction convey the "heavy-duty" nature of the brand. **Inter** is used for all body copy, forms, and UI labels. It was selected for its exceptional legibility at small sizes and its neutral, systematic tone that doesn't distract from the primary content. Tight line-heights are preferred for headlines to create a "dense," professional feel, while body copy is given more generous leading to facilitate easy reading of technical details.

## Layout & Spacing

The layout follows a **Fixed 12-Column Grid** system with a maximum container width of 1200px. This ensures that content remains readable and centralized on larger monitors, reflecting a structured and organized business model.

Spacing follows an 8px base grid. Sectional transitions use significant vertical padding (80px) to give the bold typography room to breathe. Components within cards use a tighter "Stack" rhythm (12px or 24px) to keep related information (like price and dumpster size) visually grouped.

## Elevation & Depth

To maintain a professional and trustworthy appearance, this design system avoids overly complex shadows or blurs. Depth is achieved primarily through **Tonal Layers** and **Subtle Ambient Shadows**.

- **Cards:** Use a soft, low-opacity shadow (0px 4px 20px rgba(0,0,0,0.08)) against the light gray background to create a lift effect.
- **Surface Tiers:** Use the Secondary Charcoal for high-priority informational blocks (like the "Why Choose Us" section) to create a sense of recession and contrast against white surfaces.
- **Interactive States:** Buttons use a slight vertical shift (2px) and a deepening of the shadow upon hover to provide tactile feedback without looking "gamey."

## Shapes

The shape language is **Soft (0.25rem)**. This subtle rounding on buttons and card containers removes the harshness of sharp corners—making the brand feel modern and accessible—while retaining enough "squareness" to appear disciplined and industrial. 

CTAs should never be fully pill-shaped; they must maintain their rectangular structural integrity to align with the grid-based layout.

## Components

### Buttons
Primary buttons are solid Industrial Red with white text. Secondary buttons are white with a 1px Charcoal border or Charcoal background with white text. All buttons use 0.25rem corner radius and bold Inter labels.

### Cards
Rental cards feature a white background with a subtle border or shadow. They must include a clear image of the dumpster, followed by a headline, bulleted specifications, and a full-width primary CTA at the bottom.

### Inputs & Forms
Form fields use a white background with a 1px light gray border. On focus, the border transitions to Industrial Red. Labels are placed above the field in "label-bold" typography.

### Accordions (FAQ)
Use simple, high-contrast dividers. Headers should be bold Charcoal text with a Chevron icon. Expanded states should use a slightly tinted light-gray background to differentiate the answer from the question.

### Status Indicators
For availability or tracking, use small circular chips: Green (Available), Yellow (Low Stock), Red (Booked). These provide quick visual scanning for contractors managing multiple job sites.