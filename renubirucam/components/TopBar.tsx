import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { CameraProfile } from '../constants/CameraProfiles';

interface TopBarProps {
  activeCamera: CameraProfile;
  frameCount: number;
  maxFrames: number;
  batteryLevel: number;
  onSettingsPress?: () => void;
  onMenuPress?: () => void;
}

export function TopBar({
  activeCamera,
  frameCount,
  maxFrames,
  batteryLevel,
  onSettingsPress,
  onMenuPress,
}: TopBarProps) {
  return (
    <View style={styles.container}>
      {/* Left: Status indicator + Camera code */}
      <View style={styles.left}>
        <View style={styles.statusDot} />
        <Text style={styles.cameraCode}>{activeCamera.code}</Text>
      </View>

      {/* Center: Camera name */}
      <View style={styles.center}>
        <Text style={styles.cameraName}>{activeCamera.name}</Text>
        <Text style={styles.cameraSubtitle}>LAB FOTO</Text>
      </View>

      {/* Right: Frame counter + battery + settings */}
      <View style={styles.right}>
        <Text style={styles.frameCounter}>
          {String(frameCount).padStart(2, '0')}/{maxFrames}
        </Text>
        <TouchableOpacity onPress={onSettingsPress} style={styles.settingsBtn}>
          <Text style={styles.settingsIcon}>⚙️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surfaceContainerLowest,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
  },
  left: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.shutterOrange,
  },
  cameraCode: {
    ...Typography.lcdMd,
    color: Colors.cream,
    fontSize: 12,
  },
  center: {
    flex: 2,
    alignItems: 'center',
  },
  cameraName: {
    ...Typography.lcdMd,
    color: Colors.cream,
    fontSize: 13,
    textTransform: 'uppercase',
  },
  cameraSubtitle: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
    fontSize: 8,
  },
  right: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 8,
  },
  frameCounter: {
    ...Typography.lcdSm,
    color: Colors.shutterOrange,
    fontSize: 11,
  },
  settingsBtn: {
    padding: 4,
  },
  settingsIcon: {
    fontSize: 14,
  },
});
