import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { CameraProfile } from '../constants/CameraProfiles';

interface CeritaScreenProps {
  selectedCamera: CameraProfile;
  onUseCamera: (camera: CameraProfile) => void;
}

export function CeritaScreen({ selectedCamera, onUseCamera }: CeritaScreenProps) {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      {/* Hero Header */}
      <View style={styles.heroCard}>
        <View style={[styles.heroBadge, { backgroundColor: selectedCamera.palette.primary }]}>
          <Text style={styles.heroIcon}>{selectedCamera.icon}</Text>
        </View>
        <Text style={styles.cameraCode}>{selectedCamera.code}</Text>
        <Text style={styles.cameraName}>{selectedCamera.name}</Text>
        <Text style={styles.cameraTagline}>"{selectedCamera.tagline}"</Text>

        <TouchableOpacity
          style={styles.useButton}
          onPress={() => onUseCamera(selectedCamera)}
          activeOpacity={0.8}
        >
          <Text style={styles.useButtonText}>GUNAKAN KAMERA INI</Text>
        </TouchableOpacity>
      </View>

      {/* Cerita & Sejarah */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>CERITA & KARAKTER</Text>
        <Text style={styles.sectionBody}>{selectedCamera.description}</Text>
        <View style={styles.metaRow}>
          <Text style={styles.metaLabel}>INSPIRASI:</Text>
          <Text style={styles.metaValue}>{selectedCamera.inspiration}</Text>
        </View>
      </View>

      {/* Elemen Kejutan (Unpredictable Analog Feel) */}
      <View style={styles.section}>
        <View style={styles.surpriseHeader}>
          <Text style={styles.sectionTitle}>ELEMEN KEJUTAN</Text>
          <Text style={styles.surpriseTag}>ANALOG DNA</Text>
        </View>
        <View style={styles.surpriseCard}>
          <Text style={styles.surpriseIcon}>🎲</Text>
          <Text style={styles.surpriseText}>{selectedCamera.surpriseElement}</Text>
        </View>
      </View>

      {/* Palet Warna */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>PALET WARNA EMULSI</Text>
        <View style={styles.paletteContainer}>
          <View style={styles.paletteItem}>
            <View style={[styles.swatch, { backgroundColor: selectedCamera.palette.primary }]} />
            <Text style={styles.swatchLabel}>Primary</Text>
            <Text style={styles.swatchHex}>{selectedCamera.palette.primary}</Text>
          </View>
          <View style={styles.paletteItem}>
            <View style={[styles.swatch, { backgroundColor: selectedCamera.palette.secondary }]} />
            <Text style={styles.swatchLabel}>Secondary</Text>
            <Text style={styles.swatchHex}>{selectedCamera.palette.secondary}</Text>
          </View>
          <View style={styles.paletteItem}>
            <View style={[styles.swatch, { backgroundColor: selectedCamera.palette.accent }]} />
            <Text style={styles.swatchLabel}>Accent</Text>
            <Text style={styles.swatchHex}>{selectedCamera.palette.accent}</Text>
          </View>
        </View>
      </View>

      {/* Skenario Terbaik */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>REKOMENDASI PEMOTRETAN</Text>
        <View style={styles.chipRow}>
          {selectedCamera.shootingScenario.map((scenario, idx) => (
            <View key={idx} style={styles.scenarioChip}>
              <Text style={styles.scenarioText}>{scenario}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Tips Pemotretan */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>TIPS FOTOGRAFI ANALOG</Text>
        {selectedCamera.tips.map((tip, idx) => (
          <View key={idx} style={styles.tipItem}>
            <Text style={styles.tipNumber}>0{idx + 1}</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}
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
  heroCard: {
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    padding: 20,
    alignItems: 'center',
  },
  heroBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  heroIcon: {
    fontSize: 32,
  },
  cameraCode: {
    ...Typography.lcdSm,
    color: Colors.shutterOrange,
    letterSpacing: 2,
    marginBottom: 4,
  },
  cameraName: {
    ...Typography.headlineMd,
    color: Colors.cream,
    textAlign: 'center',
  },
  cameraTagline: {
    ...Typography.bodySm,
    color: Colors.warmSteel,
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 4,
    marginBottom: 16,
  },
  useButton: {
    backgroundColor: Colors.shutterOrange,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  useButtonText: {
    ...Typography.lcdSm,
    color: Colors.onPrimaryContainer,
    fontWeight: '700',
    letterSpacing: 1,
  },
  section: {
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    padding: 16,
    gap: 10,
  },
  sectionTitle: {
    ...Typography.lcdSm,
    color: Colors.warmSteel,
    letterSpacing: 1,
  },
  sectionBody: {
    ...Typography.bodyMd,
    color: Colors.onSurface,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 4,
  },
  metaLabel: {
    ...Typography.labelMeta,
    color: Colors.olive,
  },
  metaValue: {
    ...Typography.labelMeta,
    color: Colors.cream,
  },
  surpriseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  surpriseTag: {
    ...Typography.labelMeta,
    color: Colors.shutterOrange,
    borderWidth: 1,
    borderColor: Colors.shutterOrange,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
  },
  surpriseCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 12,
    borderRadius: 4,
    borderLeftWidth: 3,
    borderLeftColor: Colors.shutterOrange,
  },
  surpriseIcon: {
    fontSize: 22,
  },
  surpriseText: {
    ...Typography.bodySm,
    color: Colors.cream,
    flex: 1,
  },
  paletteContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  paletteItem: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
  },
  swatch: {
    width: '100%',
    height: 38,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  swatchLabel: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
  },
  swatchHex: {
    ...Typography.labelMeta,
    color: Colors.cream,
    fontSize: 9,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  scenarioChip: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
  },
  scenarioText: {
    ...Typography.bodySm,
    color: Colors.cream,
    fontSize: 11,
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    backgroundColor: Colors.surfaceContainerLowest,
    padding: 10,
    borderRadius: 4,
  },
  tipNumber: {
    ...Typography.lcdSm,
    color: Colors.shutterOrange,
    fontWeight: '700',
  },
  tipText: {
    ...Typography.bodySm,
    color: Colors.onSurface,
    flex: 1,
  },
});

