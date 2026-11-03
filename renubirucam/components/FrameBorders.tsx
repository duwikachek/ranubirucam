// FrameBorders.tsx - Koleksi 10 Bingkai Kreatif Vintage Otentik (PRD F-22)
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Typography } from '../constants/Typography';

export type FrameBorderType =
  | 'none'
  | 'film-35mm'
  | 'polaroid-classic'
  | 'polaroid-black'
  | 'slide-cardboard'
  | 'medium-format-6x6'
  | 'disposable-fqs'
  | 'dv-camcorder'
  | 'half-frame-diptych'
  | 'lo-fi-toy';

export interface FrameBorderDefinition {
  id: FrameBorderType;
  name: string;
  category: 'instant' | 'film' | 'slide' | 'digital' | 'minimal';
}

export const VINTAGE_FRAMES: FrameBorderDefinition[] = [
  { id: 'none', name: 'Tanpa Bingkai', category: 'minimal' },
  { id: 'film-35mm', name: '35mm Sprocket Film', category: 'film' },
  { id: 'polaroid-classic', name: 'Polaroid Putih', category: 'instant' },
  { id: 'polaroid-black', name: 'Polaroid Hitam Edisi', category: 'instant' },
  { id: 'slide-cardboard', name: 'Slide Mount 35mm', category: 'slide' },
  { id: 'medium-format-6x6', name: 'Medium Format 6x6', category: 'film' },
  { id: 'disposable-fqs', name: 'Kamera Sekali Pakai', category: 'film' },
  { id: 'dv-camcorder', name: 'Camcorder CRT 90s', category: 'digital' },
  { id: 'half-frame-diptych', name: 'Half-Frame Diptych', category: 'film' },
  { id: 'lo-fi-toy', name: 'Lensa Plastik Toy', category: 'minimal' },
];

interface FrameRendererProps {
  type: FrameBorderType;
  cameraName?: string;
  cameraCode?: string;
}

export function FrameRenderer({
  type,
  cameraName = 'RENU BIRU',
  cameraCode = '35MM',
}: FrameRendererProps) {
  if (type === 'none') return null;

  switch (type) {
    case 'polaroid-classic':
      return (
        <View style={styles.polaroidClassic} pointerEvents="none">
          <View style={styles.polaroidClassicBottom}>
            <Text style={styles.polaroidClassicText}>{cameraName}</Text>
          </View>
        </View>
      );

    case 'polaroid-black':
      return (
        <View style={styles.polaroidBlack} pointerEvents="none">
          <View style={styles.polaroidBlackBottom}>
            <Text style={styles.polaroidBlackText}>★ {cameraName.toUpperCase()} · EDITION</Text>
          </View>
        </View>
      );

    case 'film-35mm':
      return (
        <View style={styles.filmStripBorder} pointerEvents="none">
          <View style={styles.sprocketRowTop}>
            {Array.from({ length: 8 }).map((_, i) => (
              <View key={`t-${i}`} style={styles.sprocketHole} />
            ))}
          </View>
          <View style={styles.filmLegendRow}>
            <Text style={styles.filmLegendText}>▶ {cameraCode} SAFETY FILM</Text>
            <Text style={styles.filmLegendText}>18A ▶</Text>
          </View>
          <View style={styles.sprocketRowBottom}>
            {Array.from({ length: 8 }).map((_, i) => (
              <View key={`b-${i}`} style={styles.sprocketHole} />
            ))}
          </View>
        </View>
      );

    case 'slide-cardboard':
      return (
        <View style={styles.slideMount} pointerEvents="none">
          <View style={styles.slideMountInner} />
          <Text style={styles.slideMountText}>KODACHROME TRANSPARENCY</Text>
          <Text style={styles.slideMountDate}>PROCESSED BY KODAK</Text>
        </View>
      );

    case 'medium-format-6x6':
      return (
        <View style={styles.mediumFormat} pointerEvents="none">
          {/* Optical V-Notches (Hasselblad signature) */}
          <View style={styles.vNotchLeft} />
          <View style={styles.vNotchRight} />
          <Text style={styles.mediumFormatText}>6x6 HASSELBLAD SYSTEM</Text>
        </View>
      );

    case 'disposable-fqs':
      return (
        <View style={styles.disposableBorder} pointerEvents="none">
          <View style={styles.disposableTop}>
            <Text style={styles.disposableText}>QUICKSNAP 1986 FLASH</Text>
          </View>
          <View style={styles.disposableBottom}>
            <Text style={styles.disposableText}>EXPOSURES 24+3</Text>
          </View>
        </View>
      );

    case 'dv-camcorder':
      return (
        <View style={styles.dvBorder} pointerEvents="none">
          <View style={styles.dvSafeArea} />
          <Text style={styles.dvRec}>● REC [SP]</Text>
          <Text style={styles.dvTimecode}>00:14:28:02</Text>
        </View>
      );

    case 'half-frame-diptych':
      return (
        <View style={styles.halfFrame} pointerEvents="none">
          <View style={styles.halfFrameDivider} />
          <Text style={styles.halfFrameLabelLeft}>FRAME A</Text>
          <Text style={styles.halfFrameLabelRight}>FRAME B</Text>
        </View>
      );

    case 'lo-fi-toy':
      return (
        <View style={styles.loFiToy} pointerEvents="none">
          <View style={styles.loFiToyRing} />
          <Text style={styles.loFiToyLabel}>HOLGA OPTICAL LENS 60mm</Text>
        </View>
      );

    default:
      return null;
  }
}

const styles = StyleSheet.create({
  // 1. Polaroid Putih
  polaroidClassic: {
    ...StyleSheet.absoluteFill,
    borderWidth: 12,
    borderTopWidth: 12,
    borderBottomWidth: 54,
    borderColor: '#f5f0e6',
    justifyContent: 'flex-end',
  },
  polaroidClassicBottom: {
    position: 'absolute',
    bottom: -46,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  polaroidClassicText: {
    ...Typography.bodySm,
    color: 'rgba(50,45,40,0.65)',
    fontStyle: 'italic',
    fontSize: 12,
  },

  // 2. Polaroid Hitam
  polaroidBlack: {
    ...StyleSheet.absoluteFill,
    borderWidth: 14,
    borderTopWidth: 14,
    borderBottomWidth: 54,
    borderColor: '#0e0e11',
    justifyContent: 'flex-end',
  },
  polaroidBlackBottom: {
    position: 'absolute',
    bottom: -46,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  polaroidBlackText: {
    ...Typography.labelMeta,
    color: '#d4af37', // Gold foil
    letterSpacing: 2,
    fontSize: 9,
    fontWeight: '700',
  },

  // 3. 35mm Sprocket Film Strip
  filmStripBorder: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'space-between',
  },
  sprocketRowTop: {
    height: 14,
    backgroundColor: 'rgba(10,10,12,0.92)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  sprocketRowBottom: {
    height: 14,
    backgroundColor: 'rgba(10,10,12,0.92)',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  sprocketHole: {
    width: 9,
    height: 7,
    backgroundColor: '#000000',
    borderRadius: 1.5,
    borderWidth: 0.5,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  filmLegendRow: {
    position: 'absolute',
    top: 14,
    left: 10,
    right: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filmLegendText: {
    ...Typography.labelMeta,
    color: '#FFB800',
    fontSize: 7,
    letterSpacing: 1.5,
    fontWeight: '700',
  },

  // 4. Slide Mount 35mm
  slideMount: {
    ...StyleSheet.absoluteFill,
    borderWidth: 16,
    borderColor: '#e8dec8',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  slideMountInner: {
    ...StyleSheet.absoluteFill,
    borderWidth: 1,
    borderColor: '#b8aa90',
  },
  slideMountText: {
    ...Typography.labelMeta,
    color: '#aa2211',
    fontSize: 8,
    letterSpacing: 1,
    fontWeight: '700',
  },
  slideMountDate: {
    ...Typography.labelMeta,
    color: '#666655',
    fontSize: 7,
    letterSpacing: 0.5,
  },

  // 5. Medium Format 6x6
  mediumFormat: {
    ...StyleSheet.absoluteFill,
    borderWidth: 10,
    borderColor: '#0a0a0c',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 2,
  },
  vNotchLeft: {
    position: 'absolute',
    left: -2,
    top: '48%',
    width: 6,
    height: 10,
    backgroundColor: '#000000',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  vNotchRight: {
    position: 'absolute',
    right: -2,
    top: '48%',
    width: 6,
    height: 10,
    backgroundColor: '#000000',
    borderTopLeftRadius: 3,
    borderBottomLeftRadius: 3,
  },
  mediumFormatText: {
    ...Typography.labelMeta,
    color: '#777788',
    fontSize: 7,
    letterSpacing: 1,
  },

  // 6. Disposable FQS
  disposableBorder: {
    ...StyleSheet.absoluteFill,
    borderWidth: 8,
    borderColor: '#2b442b',
    justifyContent: 'space-between',
  },
  disposableTop: {
    backgroundColor: '#c8a860',
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  disposableBottom: {
    backgroundColor: '#c8a860',
    paddingVertical: 2,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  disposableText: {
    ...Typography.labelMeta,
    color: '#1b2a1b',
    fontSize: 8,
    fontWeight: '700',
  },

  // 7. DV Camcorder
  dvBorder: {
    ...StyleSheet.absoluteFill,
    borderWidth: 6,
    borderColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'space-between',
    padding: 8,
  },
  dvSafeArea: {
    ...StyleSheet.absoluteFill,
    margin: 8,
    borderWidth: 1,
    borderColor: 'rgba(0,255,102,0.25)',
    borderStyle: 'dashed',
  },
  dvRec: {
    ...Typography.lcdSm,
    color: '#ff2222',
    fontSize: 10,
    fontWeight: '700',
  },
  dvTimecode: {
    ...Typography.lcdSm,
    color: '#00ff66',
    fontSize: 9,
    alignSelf: 'flex-end',
  },

  // 8. Half-Frame Diptych
  halfFrame: {
    ...StyleSheet.absoluteFill,
    borderWidth: 8,
    borderColor: '#0a0a0c',
    flexDirection: 'row',
  },
  halfFrameDivider: {
    position: 'absolute',
    left: '50%',
    top: 0,
    bottom: 0,
    width: 6,
    marginLeft: -3,
    backgroundColor: '#0a0a0c',
  },
  halfFrameLabelLeft: {
    position: 'absolute',
    bottom: 4,
    left: 8,
    ...Typography.labelMeta,
    color: 'rgba(255,255,255,0.4)',
    fontSize: 7,
  },
  halfFrameLabelRight: {
    position: 'absolute',
    bottom: 4,
    right: 8,
    ...Typography.labelMeta,
    color: 'rgba(255,255,255,0.4)',
    fontSize: 7,
  },

  // 9. Lo-Fi Toy Holga
  loFiToy: {
    ...StyleSheet.absoluteFill,
    borderWidth: 10,
    borderColor: '#100c14',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 2,
  },
  loFiToyRing: {
    ...StyleSheet.absoluteFill,
    borderWidth: 2,
    borderColor: 'rgba(153,102,204,0.3)',
    borderRadius: 8,
    margin: 4,
  },
  loFiToyLabel: {
    ...Typography.labelMeta,
    color: '#cc99ff',
    fontSize: 7,
    letterSpacing: 1,
  },
});

