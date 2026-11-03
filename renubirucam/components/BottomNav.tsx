import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';

export type TabName = 'kamera' | 'koleksi' | 'cerita' | 'lab-foto' | 'video';

interface BottomNavProps {
  activeTab: TabName;
  onTabPress: (tab: TabName) => void;
}

const TABS: { id: TabName; label: string; icon: string }[] = [
  { id: 'kamera', label: 'Kamera', icon: '📷' },
  { id: 'koleksi', label: 'Koleksi', icon: '📚' },
  { id: 'cerita', label: 'Cerita', icon: '✨' },
  { id: 'lab-foto', label: 'Lab Foto', icon: '🧪' },
  { id: 'video', label: 'Video', icon: '🎬' },
];

export function BottomNav({ activeTab, onTabPress }: BottomNavProps) {
  return (
    <View style={styles.container}>
      {TABS.map(tab => {
        const isActive = tab.id === activeTab;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tab}
            onPress={() => onTabPress(tab.id)}
            activeOpacity={0.7}
          >
            <Text style={[styles.icon, isActive && styles.iconActive]}>
              {tab.icon}
            </Text>
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.label}
            </Text>
            {isActive && <View style={styles.activeIndicator} />}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.surfaceContainerLow,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant,
    paddingBottom: Platform.OS === 'android' ? 8 : 20, // safe area untuk iOS
    paddingTop: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    position: 'relative',
  },
  icon: {
    fontSize: 20,
    marginBottom: 2,
    opacity: 0.5,
  },
  iconActive: {
    opacity: 1,
  },
  label: {
    ...Typography.lcdSm,
    color: Colors.warmSteel,
    fontSize: 9,
    textAlign: 'center',
  },
  labelActive: {
    color: Colors.shutterOrange,
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 24,
    height: 2,
    backgroundColor: Colors.shutterOrange,
    borderRadius: 1,
  },
});
