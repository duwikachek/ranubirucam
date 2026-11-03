import React, { useState, useEffect } from 'react';
import { StyleSheet, View, SafeAreaView, Platform, StatusBar as RNStatusBar } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Colors } from './constants/Colors';
import { CAMERA_PROFILES, CameraProfile, getCameraById } from './constants/CameraProfiles';
import { TopBar } from './components/TopBar';
import { BottomNav, TabName } from './components/BottomNav';
import { CameraScreen } from './screens/CameraScreen';
import { KoleksiScreen } from './screens/KoleksiScreen';
import { CeritaScreen } from './screens/CeritaScreen';
import { LabFotoScreen } from './screens/LabFotoScreen';
import { VideoScreen } from './screens/VideoScreen';
import {
  getStoredFavorites,
  saveStoredFavorites,
  getLastUsedCamera,
  saveLastUsedCamera,
  getStoredFrameCount,
  saveStoredFrameCount,
} from './store/StorageService';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabName>('kamera');
  const [selectedCamera, setSelectedCamera] = useState<CameraProfile>(CAMERA_PROFILES[0]);
  const [favorites, setFavorites] = useState<string[]>(['grn', 'kfuns', 'fc100']);
  const [frameCount, setFrameCount] = useState<number>(18);

  // Muat data tersimpan saat aplikasi dibuka (F-12)
  useEffect(() => {
    async function loadData() {
      const storedFavs = await getStoredFavorites();
      setFavorites(storedFavs);

      const lastCamId = await getLastUsedCamera();
      const cam = getCameraById(lastCamId);
      if (cam) setSelectedCamera(cam);

      const storedCount = await getStoredFrameCount();
      setFrameCount(storedCount);
    }
    loadData();
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const updated = prev.includes(id)
        ? prev.filter(item => item !== id)
        : [...prev, id];
      saveStoredFavorites(updated);
      return updated;
    });
  };

  const handleCameraSwitch = () => {
    setActiveTab('koleksi');
  };

  const handleUseCamera = (camera: CameraProfile) => {
    setSelectedCamera(camera);
    saveLastUsedCamera(camera.id);
    setActiveTab('kamera');
  };

  const handleFrameCountChange = (newCount: number) => {
    setFrameCount(newCount);
    saveStoredFrameCount(newCount);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
      <View style={styles.container}>
        {/* Top Mechanical Status Bar */}
        <TopBar
          activeCamera={selectedCamera}
          frameCount={frameCount}
          maxFrames={36}
          batteryLevel={88}
          onSettingsPress={() => setActiveTab('lab-foto')}
        />

        {/* Dynamic Screen Body */}
        <View style={styles.screenContainer}>
          {activeTab === 'kamera' && (
            <CameraScreen
              selectedCamera={selectedCamera}
              onCameraSwitch={handleCameraSwitch}
              frameCount={frameCount}
              onFrameCountChange={handleFrameCountChange}
            />
          )}
          {activeTab === 'koleksi' && (
            <KoleksiScreen
              selectedCamera={selectedCamera}
              onCameraSelect={(cam) => {
                setSelectedCamera(cam);
                saveLastUsedCamera(cam.id);
                setActiveTab('cerita');
              }}
              favorites={favorites}
              onToggleFavorite={toggleFavorite}
            />
          )}
          {activeTab === 'cerita' && (
            <CeritaScreen
              selectedCamera={selectedCamera}
              onUseCamera={handleUseCamera}
            />
          )}
          {activeTab === 'lab-foto' && (
            <LabFotoScreen
              selectedCamera={selectedCamera}
            />
          )}
          {activeTab === 'video' && (
            <VideoScreen
              selectedCamera={selectedCamera}
            />
          )}
        </View>

        {/* Bottom Analog Deck Navigation */}
        <BottomNav
          activeTab={activeTab}
          onTabPress={(tab) => setActiveTab(tab)}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.surfaceContainerLowest,
    paddingTop: Platform.OS === 'android' ? RNStatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  screenContainer: {
    flex: 1,
  },
});
