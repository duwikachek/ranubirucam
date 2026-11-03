import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import {
  CAMERA_PROFILES,
  CAMERA_CATEGORIES,
  CameraProfile,
} from '../constants/CameraProfiles';
import { CameraIcon } from '../components/CameraIcons';

interface KoleksiScreenProps {
  selectedCamera: CameraProfile;
  onCameraSelect: (camera: CameraProfile) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
}

export function KoleksiScreen({
  selectedCamera,
  onCameraSelect,
  favorites,
  onToggleFavorite,
}: KoleksiScreenProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchText, setSearchText] = useState('');

  const filtered = CAMERA_PROFILES.filter(cam => {
    const matchCat = activeCategory === 'all' || cam.category === activeCategory;
    const matchSearch =
      searchText === '' ||
      cam.name.toLowerCase().includes(searchText.toLowerCase()) ||
      cam.code.toLowerCase().includes(searchText.toLowerCase());
    return matchCat && matchSearch;
  });

  const renderCameraCard = ({ item }: { item: CameraProfile }) => {
    const isSelected = item.id === selectedCamera.id;
    const isFav = favorites.includes(item.id);

    return (
      <TouchableOpacity
        style={[styles.card, isSelected && styles.cardSelected]}
        onPress={() => onCameraSelect(item)}
        activeOpacity={0.8}
      >
        {/* Color swatch */}
        <View
          style={[styles.colorSwatch, { backgroundColor: item.palette.primary }]}
        />

        <View style={styles.cardContent}>
          {/* Icon + code */}
          <View style={styles.cardHeader}>
            <CameraIcon id={item.id} size={26} />
            <Text style={styles.cardCode}>{item.code}</Text>
            <TouchableOpacity
              onPress={() => onToggleFavorite(item.id)}
              style={styles.favBtn}
            >
              <Text style={styles.favIcon}>{isFav ? '❤️' : '🤍'}</Text>
            </TouchableOpacity>
          </View>

          {/* Name & tagline */}
          <Text style={styles.cardName}>{item.name}</Text>
          <Text style={styles.cardTagline}>{item.tagline}</Text>

          {/* Category badge */}
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>
              {CAMERA_CATEGORIES.find(c => c.id === item.category)?.label ?? item.category}
            </Text>
          </View>
        </View>

        {/* Active indicator */}
        {isSelected && (
          <View style={styles.activeBar} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Category Filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoryScroll}
        contentContainerStyle={styles.categoryScrollContent}
      >
        {CAMERA_CATEGORIES.map(cat => (
          <TouchableOpacity
            key={cat.id}
            style={[
              styles.categoryChip,
              activeCategory === cat.id && styles.categoryChipActive,
            ]}
            onPress={() => setActiveCategory(cat.id)}
          >
            <Text
              style={[
                styles.categoryChipText,
                activeCategory === cat.id && styles.categoryChipTextActive,
              ]}
            >
              {cat.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Camera count */}
      <View style={styles.countBar}>
        <Text style={styles.countText}>{filtered.length} KAMERA</Text>
      </View>

      {/* Camera Grid */}
      <FlatList
        data={filtered}
        renderItem={renderCameraCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  categoryScroll: {
    maxHeight: 52,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
  },
  categoryScrollContent: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
    flexDirection: 'row',
  },
  categoryChip: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    backgroundColor: Colors.surfaceContainer,
  },
  categoryChipActive: {
    borderColor: Colors.shutterOrange,
    backgroundColor: 'rgba(255,107,53,0.15)',
  },
  categoryChipText: {
    ...Typography.lcdSm,
    color: Colors.warmSteel,
    fontSize: 10,
  },
  categoryChipTextActive: {
    color: Colors.shutterOrange,
  },
  countBar: {
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.outlineVariant,
  },
  countText: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
  },
  listContent: {
    padding: 12,
    gap: 12,
  },
  row: {
    gap: 12,
  },
  card: {
    flex: 1,
    backgroundColor: Colors.surfaceContainer,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    overflow: 'hidden',
    position: 'relative',
  },
  cardSelected: {
    borderColor: Colors.shutterOrange,
    backgroundColor: Colors.surfaceContainerHigh,
  },
  colorSwatch: {
    height: 6,
    width: '100%',
  },
  cardContent: {
    padding: 10,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
    gap: 4,
  },
  cardIcon: {
    fontSize: 18,
  },
  cardCode: {
    ...Typography.lcdSm,
    color: Colors.shutterOrange,
    flex: 1,
    fontSize: 10,
  },
  favBtn: {
    padding: 2,
  },
  favIcon: {
    fontSize: 14,
  },
  cardName: {
    ...Typography.bodyMd,
    color: Colors.cream,
    fontWeight: '600',
    marginBottom: 2,
  },
  cardTagline: {
    ...Typography.bodySm,
    color: Colors.warmSteel,
    marginBottom: 8,
    fontSize: 11,
  },
  categoryBadge: {
    backgroundColor: Colors.surfaceContainerHigh,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 2,
    alignSelf: 'flex-start',
  },
  categoryText: {
    ...Typography.labelMeta,
    color: Colors.olive,
    fontSize: 9,
  },
  activeBar: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 3,
    backgroundColor: Colors.shutterOrange,
  },
});
