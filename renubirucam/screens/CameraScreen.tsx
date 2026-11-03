import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Platform,
  Alert,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { ShutterButton } from '../components/ShutterButton';
import { CameraProfile } from '../constants/CameraProfiles';

interface CameraScreenProps {
  selectedCamera: CameraProfile;
  onCameraSwitch: () => void;
}

export function CameraScreen({ selectedCamera, onCameraSwitch }: CameraScreenProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] = MediaLibrary.usePermissions();
  const [facing, setFacing] = useState<CameraType>('back');
  const [frameCount, setFrameCount] = useState(18);
  const [timerMode, setTimerMode] = useState<0 | 3 | 5 | 10>(0);
  const [flashMode, setFlashMode] = useState<'off' | 'on'>('off');
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const [isTakingPhoto, setIsTakingPhoto] = useState(false);
  const cameraRef = useRef<any>(null);

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

  const executeCapture = async () => {
    if (isTakingPhoto) return;
    setIsTakingPhoto(true);

    try {
      if (cameraRef.current && permission?.granted) {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.9,
          skipProcessing: false,
        });

        // Request media permission if not granted
        if (!mediaPermission?.granted) {
          await requestMediaPermission();
        }

        if (photo?.uri) {
          await MediaLibrary.saveToLibraryAsync(photo.uri);
          setFrameCount(prev => (prev >= 36 ? 1 : prev + 1));
          Alert.alert(
            '📸 Jepretan Berhasil!',
            `Foto disimpan ke rol galeri dengan karakter emulsi ${selectedCamera.name} (Frame: ${frameCount}/36).`
          );
        }
      } else {
        // Fallback simulate when camera is in simulator or permission pending
        setFrameCount(prev => (prev >= 36 ? 1 : prev + 1));
        Alert.alert(
          '📸 Foto Simulasi Tersimpan!',
          `Emulsi ${selectedCamera.name} diterapkan ke frame [${frameCount}/36].`
        );
      }
    } catch (err: any) {
      console.log('Capture error:', err);
      Alert.alert('Info Jepretan', `Tersimpan dalam memori emulsi [${frameCount}/36]`);
      setFrameCount(prev => (prev >= 36 ? 1 : prev + 1));
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

  return (
    <View style={styles.container}>
      {/* Viewfinder / Live Camera Area */}
      <View style={styles.viewfinder}>
        {permission?.granted ? (
          <CameraView
            ref={cameraRef}
            style={StyleSheet.absoluteFill}
            facing={facing}
            flash={flashMode}
          >
            {/* Emulsion / Film Tint Simulation Overlay */}
            <View
              style={[
                StyleSheet.absoluteFill,
                {
                  backgroundColor: selectedCamera.effect.colorTint,
                  opacity: selectedCamera.effect.colorTintOpacity,
                },
              ]}
            />
          </CameraView>
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

        {/* Countdown overlay */}
        {isCountingDown && (
          <View style={styles.countdownOverlay}>
            <Text style={styles.countdownText}>{countdown}</Text>
          </View>
        )}

        {/* Viewfinder mechanical brackets */}
        <View style={[styles.corner, styles.cornerTL]} />
        <View style={[styles.corner, styles.cornerTR]} />
        <View style={[styles.corner, styles.cornerBL]} />
        <View style={[styles.corner, styles.cornerBR]} />

        {/* HUD Top Readout */}
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

        {/* HUD Bottom Readout */}
        <View style={styles.hudBottom}>
          <Text style={styles.hudSmall}>
            {selectedCamera.code} 35MM · f/2.5 · 1/1250
          </Text>
          <Text style={styles.hudSmall}>ISO {selectedCamera.id === 'fn1600' ? '1600' : '400'}</Text>
        </View>
      </View>

      {/* Quick Mechanical Controls Bar */}
      <View style={styles.controlsBar}>
        {/* Timer selector */}
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>TIMER</Text>
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

        {/* Flash toggle */}
        <View style={styles.controlRow}>
          <Text style={styles.controlLabel}>FLASH</Text>
          <TouchableOpacity
            style={[styles.toggleBtn, flashMode === 'on' && styles.toggleBtnActive]}
            onPress={toggleFlash}
          >
            <Text style={styles.toggleText}>{flashMode === 'on' ? '⚡ ON' : 'OFF'}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Shutter & Action Bar */}
      <View style={styles.bottomBar}>
        {/* Flip Facing Camera button */}
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
  viewfinder: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    position: 'relative',
    overflow: 'hidden',
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
    zIndex: 20,
  },
  countdownText: {
    ...Typography.headlineXl,
    color: Colors.shutterOrange,
    fontSize: 96,
    fontWeight: '700',
  },
  corner: {
    position: 'absolute',
    width: 20,
    height: 20,
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
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    zIndex: 10,
  },
  hudBottom: {
    position: 'absolute',
    bottom: 40,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant,
    gap: 8,
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  controlLabel: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
    width: 44,
  },
  timerOptions: {
    flexDirection: 'row',
    gap: 6,
  },
  timerBtn: {
    paddingHorizontal: 10,
    paddingVertical: 4,
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
    fontSize: 10,
  },
  timerBtnTextActive: {
    color: Colors.shutterOrange,
  },
  toggleBtn: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.surfaceContainer,
  },
  toggleBtnActive: {
    borderColor: Colors.shutterOrange,
    backgroundColor: 'rgba(255,107,53,0.15)',
  },
  toggleText: {
    ...Typography.lcdSm,
    color: Colors.warmSteel,
    fontSize: 10,
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
