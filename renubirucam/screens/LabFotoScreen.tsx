import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { CameraProfile } from '../constants/CameraProfiles';

interface LabFotoScreenProps {
  selectedCamera: CameraProfile;
}

export function LabFotoScreen({ selectedCamera }: LabFotoScreenProps) {
  const [lightLeak, setLightLeak] = useState(65);
  const [grain, setGrain] = useState(30);
  const [dateStampEnabled, setDateStampEnabled] = useState(true);
  const [selectedDateColor, setSelectedDateColor] = useState('#FF6B35');

  const DATE_COLORS = ['#FF6B35', '#FFAA00', '#FFFFFF', '#00FF66'];

  const handleSave = () => {
    Alert.alert('Tersimpan di Galeri', 'Foto berhasil disimpan dengan metadata dan efek emulsi film analog.');
  };

  const handleShare = () => {
    Alert.alert('Bagikan Foto', 'Membuka menu bagikan bawaan perangkat...');
  };

  const handleReset = () => {
    setLightLeak(selectedCamera.effect.lightLeakChance * 100);
    setGrain(selectedCamera.effect.grainIntensity);
    setDateStampEnabled(true);
    setSelectedDateColor(selectedCamera.effect.dateStampColor || '#FF6B35');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Photo Frame / Canvas Display */}
      <View style={styles.printFrameContainer}>
        <View style={styles.filmBorder}>
          <View style={styles.photoCanvas}>
            {/* Simulation Photo preview */}
            <View
              style={[
                styles.photoBackground,
                { backgroundColor: selectedCamera.palette.secondary },
              ]}
            >
              <Text style={styles.photoIcon}>{selectedCamera.icon}</Text>
              <Text style={styles.photoWatermark}>RENUBIRU EMULSION LAB</Text>
            </View>

            {/* Light leak simulation overlay */}
            <View
              style={[
                styles.lightLeakOverlay,
                { opacity: lightLeak / 100 },
              ]}
            />

            {/* Grain overlay */}
            <View
              style={[
                styles.grainOverlay,
                { opacity: grain / 100 },
              ]}
            />

            {/* Date Stamp */}
            {dateStampEnabled && (
              <View style={styles.dateStampBox}>
                <Text style={[styles.dateStampText, { color: selectedDateColor }]}>
                  '98 10 24
                </Text>
              </View>
            )}

            {/* Sprocket holes indicator */}
            <View style={styles.sprocketTop}>
              <View style={styles.sprocketHole} />
              <View style={styles.sprocketHole} />
              <View style={styles.sprocketHole} />
            </View>
          </View>

          {/* Film stamp border bottom */}
          <View style={styles.filmFooterInfo}>
            <Text style={styles.filmCodeText}>EMULSI C-41 AKTIF · {selectedCamera.code}</Text>
            <TouchableOpacity onPress={handleReset}>
              <Text style={styles.resetText}>↺ Reset Asli</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Adjustment Sliders */}
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>LAB PENGEMBANGAN EMULSI</Text>

        {/* Light Leak Slider */}
        <View style={styles.controlRow}>
          <View style={styles.labelRow}>
            <Text style={styles.controlLabel}>✨ INTENSITAS LIGHT LEAK</Text>
            <Text style={styles.controlValue}>{lightLeak}%</Text>
          </View>
          <View style={styles.stepButtonRow}>
            {[0, 25, 50, 75, 100].map(val => (
              <TouchableOpacity
                key={val}
                style={[styles.stepButton, lightLeak === val && styles.stepButtonActive]}
                onPress={() => setLightLeak(val)}
              >
                <Text style={[styles.stepText, lightLeak === val && styles.stepTextActive]}>
                  {val}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Grain Texture */}
        <View style={styles.controlRow}>
          <View style={styles.labelRow}>
            <Text style={styles.controlLabel}>░ TEKSTUR GRAIN & DEBU</Text>
            <Text style={styles.controlValue}>{grain}%</Text>
          </View>
          <View style={styles.stepButtonRow}>
            {[0, 20, 40, 60, 80].map(val => (
              <TouchableOpacity
                key={val}
                style={[styles.stepButton, grain === val && styles.stepButtonActive]}
                onPress={() => setGrain(val)}
              >
                <Text style={[styles.stepText, grain === val && styles.stepTextActive]}>
                  {val}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Date Stamp Toggle */}
        <View style={styles.controlRow}>
          <View style={styles.labelRow}>
            <Text style={styles.controlLabel}>📅 CAP TANGGAL NOSTALGIA</Text>
            <TouchableOpacity
              style={[styles.toggleBtn, dateStampEnabled && styles.toggleBtnActive]}
              onPress={() => setDateStampEnabled(!dateStampEnabled)}
            >
              <Text style={styles.toggleText}>{dateStampEnabled ? 'AKTIF' : 'NONAKTIF'}</Text>
            </TouchableOpacity>
          </View>

          {dateStampEnabled && (
            <View style={styles.colorRow}>
              <Text style={styles.colorLabel}>WARNA:</Text>
              <View style={styles.colorList}>
                {DATE_COLORS.map(c => (
                  <TouchableOpacity
                    key={c}
                    style={[
                      styles.colorDot,
                      { backgroundColor: c },
                      selectedDateColor === c && styles.colorDotActive,
                    ]}
                    onPress={() => setSelectedDateColor(c)}
                  />
                ))}
              </View>
            </View>
          )}
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionRow}>
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>📥 SIMPAN KE GALERI</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Text style={styles.shareButtonText}>📤 BAGIKAN</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: 16,
    paddingBottom: 40,
    gap: 16,
  },
  printFrameContainer: {
    alignItems: 'center',
  },
  filmBorder: {
    backgroundColor: '#0a0a0c',
    padding: 16,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    width: '100%',
    maxWidth: 360,
  },
  photoCanvas: {
    width: '100%',
    aspectRatio: 3 / 4,
    borderRadius: 3,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#1a1a1a',
  },
  photoBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoIcon: {
    fontSize: 54,
    opacity: 0.8,
  },
  photoWatermark: {
    ...Typography.labelMeta,
    color: 'rgba(0,0,0,0.4)',
    letterSpacing: 2,
    marginTop: 8,
  },
  lightLeakOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#FF6B35',
    mixBlendMode: 'screen' as any,
  },
  grainOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: '#000000',
    opacity: 0.1,
  },
  dateStampBox: {
    position: 'absolute',
    bottom: 16,
    right: 16,
  },
  dateStampText: {
    ...Typography.lcdMd,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 2,
  },
  sprocketTop: {
    position: 'absolute',
    top: 6,
    left: 8,
    right: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sprocketHole: {
    width: 8,
    height: 12,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 1,
  },
  filmFooterInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant,
  },
  filmCodeText: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
  },
  resetText: {
    ...Typography.labelMeta,
    color: Colors.shutterOrange,
  },
  panel: {
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    padding: 16,
    gap: 16,
  },
  panelTitle: {
    ...Typography.lcdSm,
    color: Colors.warmSteel,
    letterSpacing: 1,
  },
  controlRow: {
    gap: 8,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  controlLabel: {
    ...Typography.bodySm,
    color: Colors.cream,
    fontSize: 11,
  },
  controlValue: {
    ...Typography.lcdSm,
    color: Colors.shutterOrange,
    fontWeight: '700',
  },
  stepButtonRow: {
    flexDirection: 'row',
    gap: 8,
  },
  stepButton: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  stepButtonActive: {
    borderColor: Colors.shutterOrange,
    backgroundColor: 'rgba(255,107,53,0.15)',
  },
  stepText: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
  },
  stepTextActive: {
    color: Colors.shutterOrange,
    fontWeight: '700',
  },
  toggleBtn: {
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  toggleBtnActive: {
    borderColor: Colors.shutterOrange,
    backgroundColor: 'rgba(255,107,53,0.15)',
  },
  toggleText: {
    ...Typography.labelMeta,
    color: Colors.shutterOrange,
  },
  colorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  colorLabel: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
  },
  colorList: {
    flexDirection: 'row',
    gap: 10,
  },
  colorDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  colorDotActive: {
    borderColor: '#ffffff',
    borderWidth: 2,
    transform: [{ scale: 1.15 }],
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flex: 1,
    backgroundColor: Colors.shutterOrange,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
  },
  saveButtonText: {
    ...Typography.lcdSm,
    color: Colors.onPrimaryContainer,
    fontWeight: '700',
  },
  shareButton: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerHigh,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  shareButtonText: {
    ...Typography.lcdSm,
    color: Colors.cream,
  },
});
