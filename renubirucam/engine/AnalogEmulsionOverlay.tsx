import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Svg, {
  Defs,
  RadialGradient,
  LinearGradient,
  Stop,
  Rect,
  Circle,
} from 'react-native-svg';
import { CameraProfile } from '../constants/CameraProfiles';
import { SurpriseState } from './SurpriseEngine';
import { Typography } from '../constants/Typography';
import { FrameRenderer, FrameBorderType } from '../components/FrameBorders';

interface AnalogEmulsionOverlayProps {
  camera: CameraProfile;
  surprise?: SurpriseState;
  showDateStamp?: boolean;
  dateStampText?: string;
  customLightLeak?: number; // 0-100 override from LabFoto
  customGrain?: number; // 0-100 override from LabFoto
  frameBorderType?: FrameBorderType; // override from LabFoto frame picker
  width?: number | string;
  height?: number | string;
}

// Map camera.effect.frameBorder string → FrameBorderType
function mapFrameBorder(raw: string | undefined): FrameBorderType {
  switch (raw) {
    case 'polaroid': return 'polaroid-classic';
    case 'film-strip': return 'film-35mm';
    case 'slide': return 'slide-cardboard';
    case 'dv-overlay': return 'dv-camcorder';
    default: return 'none';
  }
}

export function AnalogEmulsionOverlay({
  camera,
  surprise,
  showDateStamp = true,
  dateStampText = "'98 10 24",
  customLightLeak,
  customGrain,
  frameBorderType,
  width = '100%',
  height = '100%',
}: AnalogEmulsionOverlayProps) {
  // Hitung parameter emulsi
  const vignetteIntensity = camera.effect.vignetteIntensity / 100;
  const colorTint = camera.effect.colorTint;
  const colorTintOpacity = camera.effect.colorTintOpacity;

  // Light leak parameter
  const leakPower =
    customLightLeak !== undefined
      ? customLightLeak / 100
      : surprise?.hasLightLeak
      ? surprise.leakIntensity
      : 0;
  const leakColor = surprise?.leakColor || camera.effect.lightLeakColor || '#FF6B35';

  // Grain intensity
  const grainVal =
    customGrain !== undefined
      ? customGrain / 100
      : (camera.effect.grainIntensity / 100) * (1 + (surprise?.grainJitter || 0));

  const frameType = camera.effect.frameBorder;
  // Resolve frame border: prop override > camera default mapping
  const resolvedFrameType: FrameBorderType = frameBorderType ?? mapFrameBorder(frameType);

  return (
    <View style={[styles.container, { width: width as any, height: height as any }]} pointerEvents="none">
      {/* 1. SVG Gradient Shaders (Vignette & Light Leak) */}
      <Svg style={StyleSheet.absoluteFill}>
        <Defs>
          {/* Radial Vignette Falloff Shader */}
          <RadialGradient
            id="vignetteGrad"
            cx="50%"
            cy="50%"
            rx="60%"
            ry="60%"
            fx="50%"
            fy="50%"
          >
            <Stop offset="0%" stopColor="#000000" stopOpacity="0" />
            <Stop offset="65%" stopColor="#000000" stopOpacity={(vignetteIntensity * 0.4).toFixed(2)} />
            <Stop offset="100%" stopColor="#000000" stopOpacity={vignetteIntensity.toFixed(2)} />
          </RadialGradient>

          {/* Procedural Light Leak Dispersion Shader */}
          {leakPower > 0 && (
            <LinearGradient
              id="lightLeakGrad"
              x1={surprise ? `${Math.round(surprise.leakOriginX * 100)}%` : '100%'}
              y1={surprise ? `${Math.round(surprise.leakOriginY * 100)}%` : '0%'}
              x2="50%"
              y2="50%"
            >
              <Stop offset="0%" stopColor={leakColor} stopOpacity={leakPower.toFixed(2)} />
              <Stop offset="45%" stopColor={leakColor} stopOpacity={(leakPower * 0.4).toFixed(2)} />
              <Stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </LinearGradient>
          )}
        </Defs>

        {/* Render Vignette */}
        <Rect width="100%" height="100%" fill="url(#vignetteGrad)" />

        {/* Render Light Leak */}
        {leakPower > 0 && (
          <Rect width="100%" height="100%" fill="url(#lightLeakGrad)" />
        )}

        {/* Render Dust Specks from Surprise Engine */}
        {surprise?.dustSpecks.map((speck, i) => (
          <Circle
            key={i}
            cx={`${speck.x}%`}
            cy={`${speck.y}%`}
            r={speck.size}
            fill="#FFFFFF"
            opacity={speck.opacity}
          />
        ))}
      </Svg>

      {/* 2. Color Emulsion Tint Layer */}
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: colorTint,
            opacity: colorTintOpacity,
          },
        ]}
      />

      {/* 3. Analog Film Grain Simulation Layer */}
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: '#000000',
            opacity: Math.min(grainVal * 0.35, 0.4),
          },
        ]}
      />

      {/* 4. Authentic Frame Borders — powered by FrameBorders.tsx */}
      <FrameRenderer
        type={resolvedFrameType}
        cameraName={camera.name}
        cameraCode={camera.code}
      />

      {/* 5. Retro 7-Segment / Phosphor Date Stamp */}
      {showDateStamp && (
        <View style={styles.dateStampContainer}>
          <Text
            style={[
              styles.dateStamp,
              { color: camera.effect.dateStampColor || '#FF6B35' },
            ]}
          >
            {dateStampText}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },
  // Polaroid Frame
  polaroidFrame: {
    ...StyleSheet.absoluteFill,
    borderWidth: 12,
    borderTopWidth: 12,
    borderBottomWidth: 54,
    borderColor: '#f4ede2',
    justifyContent: 'flex-end',
  },
  polaroidInner: {
    ...StyleSheet.absoluteFill,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
  },
  polaroidBottomArea: {
    position: 'absolute',
    bottom: -46,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  polaroidChalkText: {
    ...Typography.bodySm,
    color: 'rgba(50,45,40,0.6)',
    fontStyle: 'italic',
    fontSize: 11,
  },
  // 35mm Film Strip Frame
  filmStripBorder: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'space-between',
    pointerEvents: 'none',
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
  // Slide Mount Frame
  slideMount: {
    ...StyleSheet.absoluteFill,
    borderWidth: 16,
    borderColor: '#e8dec8',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 2,
  },
  slideMountBorder: {
    ...StyleSheet.absoluteFill,
    borderWidth: 1,
    borderColor: '#b8aa90',
  },
  slideMountText: {
    ...Typography.labelMeta,
    color: '#772211',
    fontSize: 8,
    letterSpacing: 1,
    fontWeight: '700',
  },
  // Date Stamp
  dateStampContainer: {
    position: 'absolute',
    bottom: 18,
    right: 18,
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 2,
  },
  dateStamp: {
    ...Typography.lcdMd,
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 2,
    textShadowColor: 'rgba(0,0,0,0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
});
