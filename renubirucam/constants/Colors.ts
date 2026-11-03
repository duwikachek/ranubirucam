// Design tokens dari DESIGN.md - Analog Precision Design System
export const Colors = {
  // Backgrounds & Surfaces
  background: '#121316',
  surface: '#121316',
  surfaceDim: '#121316',
  surfaceBright: '#38393c',
  surfaceContainerLowest: '#0d0e11',
  surfaceContainerLow: '#1b1b1f',
  surfaceContainer: '#1f1f23',
  surfaceContainerHigh: '#292a2d',
  surfaceContainerHighest: '#343538',

  // On-surface text colors
  onSurface: '#e3e2e6',
  onSurfaceVariant: '#e1bfb5',

  // Primary - Vintage Amber/Signal Orange
  primary: '#ffb59d',
  primaryContainer: '#ff6b35',
  onPrimary: '#5d1900',
  onPrimaryContainer: '#5f1900',
  inversePrimary: '#ab3500',
  primaryFixed: '#ffdbd0',
  primaryFixedDim: '#ffb59d',

  // Secondary - Warm Cream
  secondary: '#cac6be',
  secondaryContainer: '#494740',
  onSecondary: '#32302a',
  onSecondaryContainer: '#b9b5ac',

  // Tertiary - Muted Olive
  tertiary: '#becaba',
  tertiaryContainer: '#919d8e',
  onTertiary: '#283328',

  // Outline
  outline: '#a98a80',
  outlineVariant: '#594139',
  surfaceTint: '#ffb59d',
  inverseSurface: '#e3e2e6',
  inverseOnSurface: '#2f3034',

  // Semantic aliases (used in components)
  shutterOrange: '#ff6b35',   // Primary action / shutter
  cream: '#F4EFE6',           // Key headlines, active readouts
  olive: '#758173',           // Metadata, inactive indicators
  charcoal: '#121316',        // Base background
  machinedPlate: '#1A1B20',   // Elevated surfaces
  warmSteel: '#8E8D8A',       // Inactive / borders
  lcdonOrange: '#FF6B35',     // LCD active digits
  lcdonCream: '#F4EFE6',      // LCD active text

  // Error
  error: '#ffb4ab',
  onError: '#690005',
  errorContainer: '#93000a',

  // Transparent helpers
  overlay20: 'rgba(0,0,0,0.2)',
  overlay40: 'rgba(0,0,0,0.4)',
  overlay60: 'rgba(0,0,0,0.6)',
  overlay80: 'rgba(0,0,0,0.8)',
};

export type ColorKey = keyof typeof Colors;
