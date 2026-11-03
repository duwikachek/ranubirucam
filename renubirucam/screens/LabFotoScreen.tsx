import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  Share,
  Image,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { CameraProfile } from '../constants/CameraProfiles';
import { AnalogEmulsionOverlay } from '../engine/AnalogEmulsionOverlay';
import { captureAndSaveAnalogPhoto } from '../engine/CapturePipeline';
import { VINTAGE_FRAMES, FrameBorderType } from '../components/FrameBorders';

interface LabFotoScreenProps {
  selectedCamera: CameraProfile;
}

export function LabFotoScreen({ selectedCamera }: LabFotoScreenProps) {
  const [importedImage, setImportedImage] = useState<string | null>(null);
  const [lightLeak, setLightLeak] = useState(selectedCamera.effect.lightLeakChance * 100 || 60);
  const [grain, setGrain] = useState(selectedCamera.effect.grainIntensity || 35);
  const [dateStampEnabled, setDateStampEnabled] = useState(true);
  const [selectedDateColor, setSelectedDateColor] = useState(selectedCamera.effect.dateStampColor || '#FF6B35');
  const [selectedFrame, setSelectedFrame] = useState<FrameBorderType>('none');

  const printViewRef = useRef<any>(null);

  const DATE_COLORS = ['#FF6B35', '#FFAA00', '#FFFFFF', '#00FF66'];

  const handlePickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'],
        allowsEditing: true,
        quality: 0.95,
      });

      if (!result.canceled && result.assets && result.assets[0]?.uri) {
        setImportedImage(result.assets[0].uri);
      }
    } catch (err: any) {
      Alert.alert('Gagal Membuka Galeri', err?.message || 'Tidak dapat memuat gambar.');
    }
  };

  const handleSave = async () => {
    const res = await captureAndSaveAnalogPhoto(printViewRef);
    if (res.success) {
      Alert.alert(
        '📥 Tersimpan',
        `Hasil cetak emulsi ${selectedCamera.name} berhasil diproses.`
      );
    } else {
      Alert.alert('Info Cetak', 'Foto tersimpan ke memori perangkat.');
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        title: `Hasil Foto Cetak - ${selectedCamera.name}`,
        message: `Diproses dengan emulsi analog ${selectedCamera.name} di Renu Biru Cam. #renubirucam #vintagefilm`,
      });
    } catch (err: any) {
      console.log('Share error:', err);
    }
  };

  const handleReset = () => {
    setLightLeak(selectedCamera.effect.lightLeakChance * 100 || 50);
    setGrain(selectedCamera.effect.grainIntensity || 30);
    setDateStampEnabled(true);
    setSelectedDateColor(selectedCamera.effect.dateStampColor || '#FF6B35');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Import Photo Bar (PRD F-30) */}
      <View style={styles.importBar}>
        <TouchableOpacity style={styles.importBtn} onPress={handlePickImage} activeOpacity={0.8}>
          <Text style={styles.importBtnIcon}>🖼️</Text>
          <Text style={styles.importBtnText}>
            {importedImage ? 'GANTI FOTO DARI GALERI' : 'PILIH FOTO DARI GALERI UNTUK DIOLAH'}
          </Text>
        </TouchableOpacity>
        {importedImage && (
          <TouchableOpacity
            style={styles.removeImportBtn}
            onPress={() => setImportedImage(null)}
          >
            <Text style={styles.removeImportText}>✕ Reset Kanvas</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Photo Frame / Canvas Display */}
      <View style={styles.printFrameContainer}>
        <View style={styles.filmBorder}>
          <View
            ref={printViewRef}
            collapsable={false}
            style={styles.photoCanvas}
          >
            {/* If user imported an image from phone gallery */}
            {importedImage ? (
              <Image
                source={{ uri: importedImage }}
                style={StyleSheet.absoluteFill}
                resizeMode="cover"
              />
            ) : (
              /* Simulation Base Photo */
              <View
                style={[
                  styles.photoBackground,
                  { backgroundColor: selectedCamera.palette.secondary },
                ]}
              >
                <Text style={styles.photoIcon}>{selectedCamera.icon}</Text>
                <Text style={styles.photoWatermark}>RENUBIRU EMULSION LAB</Text>
                <Text style={styles.photoCamName}>{selectedCamera.name}</Text>
                <Text style={styles.photoHint}>Ketuk tombol di atas untuk olah foto HP kamu</Text>
              </View>
            )}

            {/* Real-time Shader & Emulsion Overlay */}
            <AnalogEmulsionOverlay
              camera={{
                ...selectedCamera,
                effect: {
                  ...selectedCamera.effect,
                  dateStampColor: selectedDateColor,
                },
              }}
              customLightLeak={lightLeak}
              customGrain={grain}
              showDateStamp={dateStampEnabled}
              dateStampText="'98 10 24"
              frameBorderType={selectedFrame}
            />
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

      {/* Adjustment Sliders (F-21 & F-20) */}
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

        {/* Grain Texture Slider */}
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

        {/* Date Stamp Toggle & Color Selector */}
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

      {/* Frame Border Picker (Step 5C — PRD F-22) */}
      <View style={styles.panel}>
        <Text style={styles.panelTitle}>🎞 BINGKAI FOTO VINTAGE</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.framePicker}
        >
          {VINTAGE_FRAMES.map(frame => (
            <TouchableOpacity
              key={frame.id}
              style={[
                styles.frameChip,
                selectedFrame === frame.id && styles.frameChipActive,
              ]}
              onPress={() => setSelectedFrame(frame.id)}
              activeOpacity={0.8}
            >
              <Text style={[
                styles.frameChipText,
                selectedFrame === frame.id && styles.frameChipTextActive,
              ]}>
                {frame.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
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
  importBar: {
    gap: 6,
  },
  importBtn: {
    backgroundColor: Colors.surfaceContainerHigh,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.shutterOrange,
    gap: 8,
  },
  importBtnIcon: {
    fontSize: 18,
  },
  importBtnText: {
    ...Typography.lcdSm,
    color: Colors.shutterOrange,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  removeImportBtn: {
    alignSelf: 'center',
    paddingVertical: 4,
  },
  removeImportText: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
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
  photoCamName: {
    ...Typography.bodySm,
    color: 'rgba(0,0,0,0.3)',
    fontWeight: '700',
    marginTop: 4,
  },
  photoHint: {
    ...Typography.labelMeta,
    color: 'rgba(0,0,0,0.35)',
    marginTop: 10,
    fontSize: 9,
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
  // Frame Picker styles
  framePicker: {
    flexDirection: 'row',
    gap: 8,
    paddingVertical: 4,
  },
  frameChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.surfaceContainerHigh,
  },
  frameChipActive: {
    borderColor: Colors.shutterOrange,
    backgroundColor: 'rgba(255,107,53,0.18)',
  },
  frameChipText: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
    fontSize: 10,
  },
  frameChipTextActive: {
    color: Colors.shutterOrange,
    fontWeight: '700',
  },
});
