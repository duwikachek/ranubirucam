// StorageService.ts - Penyimpanan Preferensi & Rol Film Offline (PRD F-12, F-33)
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  FAVORITES: '@renubirucam_favorites',
  LAST_CAMERA: '@renubirucam_last_camera',
  ROLL_PHOTOS: '@renubirucam_roll_photos',
  FRAME_COUNTER: '@renubirucam_frame_counter',
};

export interface RollPhoto {
  id: string;
  uri: string;
  cameraId: string;
  cameraName: string;
  cameraCode: string;
  timestamp: number;
  frameNumber: number;
  surpriseNote?: string;
}

// 1. Favorit Kamera
export async function getStoredFavorites(): Promise<string[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.FAVORITES);
    return raw ? JSON.parse(raw) : ['grn', 'kfuns', 'fc100'];
  } catch {
    return ['grn', 'kfuns', 'fc100'];
  }
}

export async function saveStoredFavorites(favorites: string[]): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.FAVORITES, JSON.stringify(favorites));
  } catch (err) {
    console.log('Error save favorites:', err);
  }
}

// 2. Kamera Terakhir Dipakai
export async function getLastUsedCamera(): Promise<string> {
  try {
    const id = await AsyncStorage.getItem(KEYS.LAST_CAMERA);
    return id || 'grn';
  } catch {
    return 'grn';
  }
}

export async function saveLastUsedCamera(cameraId: string): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.LAST_CAMERA, cameraId);
  } catch (err) {
    console.log('Error save last camera:', err);
  }
}

// 3. Frame Counter Rol Film
export async function getStoredFrameCount(): Promise<number> {
  try {
    const count = await AsyncStorage.getItem(KEYS.FRAME_COUNTER);
    return count ? parseInt(count, 10) : 18;
  } catch {
    return 18;
  }
}

export async function saveStoredFrameCount(count: number): Promise<void> {
  try {
    await AsyncStorage.setItem(KEYS.FRAME_COUNTER, String(count));
  } catch (err) {
    console.log('Error save frame count:', err);
  }
}

// 4. Arsip Rol Negatif (Contact Sheet History)
export async function getStoredRollPhotos(): Promise<RollPhoto[]> {
  try {
    const raw = await AsyncStorage.getItem(KEYS.ROLL_PHOTOS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function addPhotoToRoll(photo: RollPhoto): Promise<void> {
  try {
    const existing = await getStoredRollPhotos();
    // Simpan maksimal 36 foto terakhir per rol
    const updated = [photo, ...existing].slice(0, 36);
    await AsyncStorage.setItem(KEYS.ROLL_PHOTOS, JSON.stringify(updated));
  } catch (err) {
    console.log('Error add photo to roll:', err);
  }
}

