// Typography tokens dari DESIGN.md - Space Grotesk + Space Mono
import { TextStyle } from 'react-native';

export const FontFamily = {
  // Space Grotesk - Chassis & Structural Copy
  grotesk: 'SpaceGrotesk-Regular',
  groteskMedium: 'SpaceGrotesk-Medium',
  groteskSemiBold: 'SpaceGrotesk-SemiBold',
  groteskBold: 'SpaceGrotesk-Bold',

  // Space Mono - Optical & Instrument HUD (ISO, shutter speed, aperture, frame count)
  mono: 'SpaceMono-Regular',
  monoBold: 'SpaceMono-Bold',
};

export const Typography: Record<string, TextStyle> = {
  headlineXl: {
    fontFamily: FontFamily.groteskBold,
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 36,
    letterSpacing: -0.01 * 30,
  },
  headlineLg: {
    fontFamily: FontFamily.groteskSemiBold,
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    letterSpacing: -0.01 * 24,
  },
  headlineMd: {
    fontFamily: FontFamily.groteskSemiBold,
    fontSize: 22,
    fontWeight: '600',
    lineHeight: 28,
  },
  bodyLg: {
    fontFamily: FontFamily.grotesk,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  bodyMd: {
    fontFamily: FontFamily.grotesk,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  bodySm: {
    fontFamily: FontFamily.grotesk,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
  // LCD / Instrument HUD - pakai Space Mono
  lcdLg: {
    fontFamily: FontFamily.monoBold,
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0.08 * 20,
  },
  lcdMd: {
    fontFamily: FontFamily.monoBold,
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    letterSpacing: 0.06 * 14,
  },
  lcdSm: {
    fontFamily: FontFamily.mono,
    fontSize: 11,
    fontWeight: '400',
    lineHeight: 14,
    letterSpacing: 0.04 * 11,
  },
  labelMeta: {
    fontFamily: FontFamily.mono,
    fontSize: 10,
    fontWeight: '400',
    lineHeight: 12,
    letterSpacing: 0.1 * 10,
  },
};
