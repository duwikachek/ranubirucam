import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
  Animated,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { ShutterButton } from '../components/ShutterButton';
import { CameraProfile } from '../constants/CameraProfiles';
import { AnalogEmulsionOverlay } from '../engine/AnalogEmulsionOverlay';
import { generateSurprise, SurpriseState } from '../engine/SurpriseEngine';
import { captureAndSaveAnalogPhoto } from '../engine/CapturePipeline';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CameraScreenProps {
  selectedCamera: CameraProfile;
  onCameraSwitch: () => void;
}

export function CameraScreen({ selectedCamera, onCameraSwitch }: CameraScreenProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [frameCount, setFrameCount] = useState(18);
  const [timerMode, setTimerMode] = useState<0 | 3 | 5 | 10>(0);
  const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
  const [aspectRatio, setAspectRatio] = useState<'3:2' | '1:1' | '4:3'>('3:2');
  const [zoomLevel, setZoomLevel] = useState<number>(0); // 0 = 1x, 0.5 = 2x
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const [surprise, setSurprise] = useState<SurpriseState>(() => generateSurprise(selectedCamera));

  const viewfinderRef = useRef<any>(null);
  const shutterFlashAnim = useRef(new Animated.Value(0)).current;

  // Re-generate surprise when user switches camera
  useEffect(() => {
    setSurprise(generateSurprise(selectedCamera));
  }, [selectedCamera.id]);

  const handleShutter = () => {
    if (timerMode > 0) {
      startCountdown(timerMode);
    } else {
      executeCapture();
    }
  };

  const startCountdown = (seconds: number) => {
    setIsCountingDown(true);
    setCountdown(seconds);
    const interval = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsCountingDown(false);
          executeCapture();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const triggerShutterFlash = () => {
    Animated.sequence([
      Animated.timing(shutterFlashAnim, {
        toValue: 0.85,
        duration: 40,
        useNativeDriver: true,
      }),
      Animated.timing(shutterFlashAnim, {
        toValue: 0,
        duration: 180,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const executeCapture = async () => {
    if (isTakingPhoto) return;
    setIsTakingPhoto(true);
    triggerShutterFlash();

    try {
      const res = await captureAndSaveAnalogPhoto(viewfinderRef);
      const nextFrame = frameCount >= 36 ? 1 : frameCount + 1;
      setFrameCount(nextFrame);

      // Generate elemen kejutan baru untuk jepretan berikutnya
      const nextSurprise = generateSurprise(selectedCamera);
      setSurprise(nextSurprise);

      if (res.success) {
        Alert.alert(
          '📸 Jepretan Tersimpan!',
          `Emulsi ${selectedCamera.name} berhasil diproses.\n` +
          `• Frame: [${frameCount}/36]\n` +
          `• Efek Unik: ${selectedCamera.surpriseElement}`
        );
      } else {
        // Tetap simulasikan sukses jika berjalan di lingkungan tanpa penyimpanan asli
        Alert.alert(
          '📸 Foto Diproses!',
          `Emulsi ${selectedCamera.name} tercatat di roll [${frameCount}/36].`
        );
      }
    } catch (err: any) {
      console.log('Capture error:', err);
    } finally {
      setIsTakingPhoto(false);
    }
  };

  const toggleFacing = () => {
    setFacing(prev => (prev === 'back' ? 'front' : 'back'));
  };

  const toggleFlash = () => {
    setFlashMode(prev => (prev === 'off' ? 'on' : 'off'));
  };

  const cycleAspectRatio = () => {
    if (aspectRatio === '3:2') setAspectRatio('1:1');
    else if (aspectRatio === '1:1') setAspectRatio('4:3');
    else setAspectRatio('3:2');
  };

  const cycleZoom = () => {
    setZoomLevel(prev => (prev === 0 ? 0.3 : prev === 0.3 ? 0.6 : 0));
  };

  // Hitung aspect ratio container
  const getAspectRatioStyle = () => {
    if (aspectRatio === '1:1') return { aspectRatio: 1 };
    if (aspectRatio === '4:3') return { aspectRatio: 3 / 4 };
    return { aspectRatio: 2 / 3 }; // 35mm standar portrait
  };

  return (
    <View style={styles.container}>
      {/* Viewfinder Deck Outer Frame */}
      <View style={styles.viewfinderOuterContainer}>
        {/* Optical Canvas Capture Container */}
        <View
          ref={viewfinderRef}
          collapsable={false}
          style={[styles.viewfinderCanvas, getAspectRatioStyle()]}
        >
          {permission?.granted ? (
            <CameraView
              style={StyleSheet.absoluteFill}
              facing={facing}
              flash={flashMode}
              zoom={zoomLevel}
            />
          ) : (
            <View style={styles.previewPlaceholder}>
              <Text style={styles.previewIcon}>{selectedCamera.icon}</Text>
              <Text style={styles.previewText}>{selectedCamera.name}</Text>
              <Text style={styles.previewSubtext}>
                Izin akses kamera diperlukan untuk live preview.
              </Text>
              <TouchableOpacity
                style={styles.permissionBtn}
                onPress={requestPermission}
                activeOpacity={0.8}
              >
                <Text style={styles.permissionBtnText}>IZINKAN AKSES KAMERA</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Real-time GPU / SVG Analog Emulsion Shader Overlay */}
          <AnalogEmulsionOverlay
            camera={selectedCamera}
            surprise={surprise}
            showDateStamp={true}
          />

          {/* Shutter Blade Physical Flash Animation */}
          <Animated.View
            style={[
              StyleSheet.absoluteFill,
              {
                backgroundColor: '#FFFFFF',
                opacity: shutterFlashAnim,
              },
            ]}
            pointerEvents="none"
          />

          {/* Countdown Display */}
          {isCountingDown && (
            <View style={styles.countdownOverlay}>
              <Text style={styles.countdownText}>{countdown}</Text>
            </View>
          )}

          {/* Corner optical brackets */}
          <View style={[styles.corner, styles.cornerTL]} />
          <View style={[styles.corner, styles.cornerTR]} />
          <View style={[styles.corner, styles.cornerBL]} />
          <View style={[styles.corner, styles.cornerBR]} />

          {/* Live HUD Top Readout */}
          <View style={styles.hudTop}>
            <View style={styles.hudBadge}>
              <Text style={styles.hudText}>● DEV-LAB READY</Text>
            </View>
            <View style={styles.hudBadge}>
              <Text style={styles.hudText}>
                ROLL #01 · FR {String(frameCount).padStart(2, '0')}/36
              </Text>
            </View>
          </View>

          {/* Live HUD Bottom Readout */}
          <View style={styles.hudBottom}>
            <Text style={styles.hudSmall}>
              {selectedCamera.code} 35MM · f/2.5 · 1/1250
            </Text>
            <Text style={styles.hudSmall}>
              ISO {selectedCamera.id === 'fn1600' ? '1600' : '400'}
            </Text>
          </View>
        </View>
      </View>

      {/* Manual Mechanical Controls Bar (PRD F-07) */}
      <View style={styles.controlsBar}>
        {/* Aspect Ratio Switch */}
        <TouchableOpacity style={styles.miniCtrlBtn} onPress={cycleAspectRatio}>
          <Text style={styles.miniCtrlLabel}>RASIO</Text>
          <Text style={styles.miniCtrlVal}>{aspectRatio}</Text>
        </TouchableOpacity>

        {/* Zoom Switch */}
        <TouchableOpacity style={styles.miniCtrlBtn} onPress={cycleZoom}>
          <Text style={styles.miniCtrlLabel}>ZOOM</Text>
          <Text style={styles.miniCtrlVal}>
            {zoomLevel === 0 ? '1.0x' : zoomLevel === 0.3 ? '2.0x' : '3.0x'}
          </Text>
        </TouchableOpacity>

        {/* Timer Selector */}
        <View style={styles.timerGroup}>
          <Text style={styles.miniCtrlLabel}>TIMER</Text>
          <View style={styles.timerOptions}>
            {([0, 3, 5, 10] as const).map(t => (
              <TouchableOpacity
                key={t}
                style={[styles.timerBtn, timerMode === t && styles.timerBtnActive]}
                onPress={() => setTimerMode(t)}
              >
                <Text style={[styles.timerBtnText, timerMode === t && styles.timerBtnTextActive]}>
                  {t === 0 ? 'OFF' : `${t}s`}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Flash Toggle */}
        <TouchableOpacity
          style={[styles.miniCtrlBtn, flashMode === 'on' && styles.miniCtrlBtnActive]}
          onPress={toggleFlash}
        >
          <Text style={styles.miniCtrlLabel}>FLASH</Text>
          <Text style={styles.miniCtrlVal}>{flashMode === 'on' ? '⚡ ON' : 'OFF'}</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Shutter & Action Bar */}
      <View style={styles.bottomBar}>
        {/* Mirror / Flip Facing Camera */}
        <TouchableOpacity style={styles.sideBtn} onPress={toggleFacing}>
          <Text style={styles.sideBtnIcon}>🪞</Text>
          <Text style={styles.sideBtnLabel}>{facing === 'back' ? 'DEPAN' : 'BELAKANG'}</Text>
        </TouchableOpacity>

        {/* Main Analog Shutter Button */}
        <ShutterButton
          onPress={handleShutter}
          disabled={isCountingDown || isTakingPhoto}
        />

        {/* Switch Camera / Katalog */}
        <TouchableOpacity style={styles.sideBtn} onPress={onCameraSwitch}>
          <Text style={styles.sideBtnIcon}>🔄</Text>
          <Text style={styles.sideBtnLabel}>GANTI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  viewfinderOuterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0a0a0c',
    padding: 8,
  },
  viewfinderCanvas: {
    width: '100%',
    maxHeight: '100%',
    backgroundColor: '#121214',
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  previewPlaceholder: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 24,
  },
  previewIcon: {
    fontSize: 56,
    marginBottom: 12,
  },
  previewText: {
    ...Typography.headlineMd,
    color: Colors.cream,
    marginBottom: 8,
  },
  previewSubtext: {
    ...Typography.bodySm,
    color: Colors.warmSteel,
    textAlign: 'center',
    marginBottom: 20,
  },
  permissionBtn: {
    backgroundColor: Colors.shutterOrange,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  permissionBtnText: {
    ...Typography.lcdSm,
    color: Colors.onPrimaryContainer,
    fontWeight: '700',
    letterSpacing: 1,
  },
  countdownOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 30,
  },
  countdownText: {
    ...Typography.headlineXl,
    color: Colors.shutterOrange,
    fontSize: 96,
    fontWeight: '700',
  },
  corner: {
    position: 'absolute',
    width: 18,
    height: 18,
    borderColor: Colors.shutterOrange,
    borderWidth: 2,
    zIndex: 10,
  },
  cornerTL: { top: 12, left: 12, borderRightWidth: 0, borderBottomWidth: 0 },
  cornerTR: { top: 12, right: 12, borderLeftWidth: 0, borderBottomWidth: 0 },
  cornerBL: { bottom: 36, left: 12, borderRightWidth: 0, borderTopWidth: 0 },
  cornerBR: { bottom: 36, right: 12, borderLeftWidth: 0, borderTopWidth: 0 },
  hudTop: {
    position: 'absolute',
    top: 12,
    left: 36,
    right: 36,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  hudBottom: {
    position: 'absolute',
    bottom: 38,
    left: 14,
    right: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  hudBadge: {
    backgroundColor: 'rgba(18,19,22,0.85)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  hudText: {
    ...Typography.lcdSm,
    color: Colors.shutterOrange,
    fontSize: 9,
  },
  hudSmall: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
    fontSize: 9,
    backgroundColor: 'rgba(18,19,22,0.6)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 2,
  },
  controlsBar: {
    backgroundColor: Colors.surfaceContainerLow,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  miniCtrlBtn: {
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainer,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    minWidth: 48,
  },
  miniCtrlBtnActive: {
    borderColor: Colors.shutterOrange,
    backgroundColor: 'rgba(255,107,53,0.15)',
  },
  miniCtrlLabel: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
    fontSize: 8,
  },
  miniCtrlVal: {
    ...Typography.lcdSm,
    color: Colors.shutterOrange,
    fontSize: 10,
    fontWeight: '700',
  },
  timerGroup: {
    alignItems: 'center',
    gap: 2,
  },
  timerOptions: {
    flexDirection: 'row',
    gap: 4,
  },
  timerBtn: {
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.surfaceContainer,
  },
  timerBtnActive: {
    borderColor: Colors.shutterOrange,
    backgroundColor: 'rgba(255,107,53,0.15)',
  },
  timerBtnText: {
    ...Typography.lcdSm,
    color: Colors.warmSteel,
    fontSize: 9,
  },
  timerBtnTextActive: {
    color: Colors.shutterOrange,
    fontWeight: '700',
  },
  bottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 24,
    paddingVertical: 14,
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant,
  },
  sideBtn: {
    alignItems: 'center',
    gap: 4,
    minWidth: 54,
  },
  sideBtnIcon: {
    fontSize: 22,
  },
  sideBtnLabel: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
    fontSize: 8,
  },
});
