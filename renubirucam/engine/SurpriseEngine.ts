// SurpriseEngine.ts - Elemen Kejutan Per Jepretan (Analog DNA PRD F-03)
// Menjamin setiap foto analog memiliki keunikan organik sendiri tanpa ada 2 foto yang identik.

import { CameraProfile } from '../constants/CameraProfiles';

export interface SurpriseState {
  hasLightLeak: boolean;
  leakAngle: number; // 0, 45, 90, 135, 180, 225, 270, 315
  leakIntensity: number; // 0.1 to 1.0
  leakOriginX: number; // 0 to 1
  leakOriginY: number; // 0 to 1
  leakColor: string;
  grainJitter: number; // -15% to +15%
  colorTempShift: number; // -5% to +5%
  dustSpecks: Array<{
    x: number;
    y: number;
    size: number;
    opacity: number;
  }>;
}

export function generateSurprise(camera: CameraProfile): SurpriseState {
  const rand = Math.random();
  const hasLightLeak = rand < camera.effect.lightLeakChance;

  // Sudut cahaya bocor acak
  const angles = [0, 45, 90, 135, 180, 225, 270, 315];
  const leakAngle = angles[Math.floor(Math.random() * angles.length)];

  // Posisi sumber cahaya bocor (biasanya di tepi frame)
  let leakOriginX = 0;
  let leakOriginY = 0;
  if (leakAngle >= 315 || leakAngle <= 45) {
    leakOriginX = 1;
    leakOriginY = Math.random();
  } else if (leakAngle > 45 && leakAngle <= 135) {
    leakOriginX = Math.random();
    leakOriginY = 0;
  } else if (leakAngle > 135 && leakAngle <= 225) {
    leakOriginX = 0;
    leakOriginY = Math.random();
  } else {
    leakOriginX = Math.random();
    leakOriginY = 1;
  }

  // Variasi warna leak (warm amber / orange / ruby red / soft cyan)
  const leakColors = [
    camera.effect.lightLeakColor || '#FF6B35',
    '#FF4500',
    '#FFA500',
    '#FF1493',
    '#FFD700',
  ];
  const leakColor = leakColors[Math.floor(Math.random() * leakColors.length)];

  // Variasi intensitas leak
  const leakIntensity = hasLightLeak ? 0.3 + Math.random() * 0.5 : 0;

  // Jitter grain
  const grainJitter = (Math.random() - 0.5) * 0.3; // -15% sd +15%

  // Pergeseran warna emulsi halus
  const colorTempShift = (Math.random() - 0.5) * 0.1;

  // Partikel debu acak per frame (terutama untuk kamera disposable & toy)
  const dustCount =
    camera.category === 'disposable' || camera.category === 'toy'
      ? Math.floor(Math.random() * 4) + 1
      : Math.random() > 0.6
      ? 1
      : 0;

  const dustSpecks = Array.from({ length: dustCount }).map(() => ({
    x: Math.random() * 100, // percentage
    y: Math.random() * 100,
    size: Math.random() * 2 + 1,
    opacity: 0.2 + Math.random() * 0.4,
  }));

  return {
    hasLightLeak,
    leakAngle,
    leakIntensity,
    leakOriginX,
    leakOriginY,
    leakColor,
    grainJitter,
    colorTempShift,
    dustSpecks,
  };
}
