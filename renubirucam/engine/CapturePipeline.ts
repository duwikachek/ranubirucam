// CapturePipeline.ts - Eksekusi Jepretan & Penyimpanan Berkualitas Penuh (PRD F-31)
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

export interface CaptureResult {
  success: boolean;
  uri?: string;
  error?: string;
}

/**
 * Mengambil foto langsung dari sensor kamera native hardware
 * dan menyimpannya ke galeri perangkat
 */
export async function takeAndSaveCameraPhoto(
  cameraRef: React.RefObject<any>
): Promise<CaptureResult> {
  try {
    if (!cameraRef.current) {
      return { success: false, error: 'Kamera tidak siap' };
    }

    // 1. Ambil foto resolusi penuh dari sensor kamera
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.95,
      skipProcessing: false,
    });

    if (!photo?.uri) {
      return { success: false, error: 'Gagal mengambil gambar dari sensor' };
    }

    // 2. Minta izin akses galeri
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
      return {
        success: true, // foto tetap terambil dalam cache
        uri: photo.uri,
        error: 'Izin galeri belum diberikan',
      };
    }

    // 3. Simpan ke galeri menggunakan metode universal Android (saveToLibraryAsync / createAssetAsync)
    try {
      await MediaLibrary.saveToLibraryAsync(photo.uri);
    } catch {
      // Fallback createAsset jika saveToLibrary tidak didukung versi OS tertentu
      await MediaLibrary.createAssetAsync(photo.uri);
    }

    return {
      success: true,
      uri: photo.uri,
    };
  } catch (err: any) {
    console.log('Info take photo:', err?.message || err);
    return {
      success: false,
      error: err?.message || 'Gagal menyimpan foto',
    };
  }
}

/**
 * Snapshot render View untuk Lab Foto (cetak / darkroom)
 */
export async function captureAndSaveAnalogPhoto(
  viewRef: React.RefObject<any>
): Promise<CaptureResult> {
  try {
    if (!viewRef.current) {
      return { success: false, error: 'View reference tidak tersedia' };
    }

    // 1. Snapshot render komposit dengan filter dan bingkai
    const uri = await captureRef(viewRef, {
      format: 'jpg',
      quality: 0.95,
      result: 'tmpfile',
    });

    // 2. Cek izin penyimpanan galeri
    const permission = await MediaLibrary.requestPermissionsAsync();
    if (!permission.granted) {
      return {
        success: true,
        uri,
        error: 'Izin galeri belum diberikan',
      };
    }

    // 3. Simpan ke roll kamera galeri
    try {
      await MediaLibrary.saveToLibraryAsync(uri);
    } catch {
      await MediaLibrary.createAssetAsync(uri);
    }

    return {
      success: true,
      uri,
    };
  } catch (err: any) {
    console.log('Info capture view:', err?.message || err);
    return {
      success: false,
      error: err?.message || 'Gagal menyimpan foto',
    };
  }
}
