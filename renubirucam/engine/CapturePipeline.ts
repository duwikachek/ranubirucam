// CapturePipeline.ts - Eksekusi Jepretan & Penyimpanan Berkualitas Penuh (PRD F-31)
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';
import * as Sharing from 'expo-sharing';

export interface CaptureResult {
  success: boolean;
  uri?: string;
  error?: string;
}

/**
 * Simpan berkas foto analog hasil pemrosesan ke Galeri HP (MediaStore DCIM).
 * - Pada APK/Production Build: Langsung tersimpan otomatis ke Galeri album "Renu Biru Cam".
 * - Pada Expo Go: Membuka dialog Android native (Simpan ke Perangkat / Galeri / Foto).
 */
export async function saveProcessedPhotoToGallery(
  uri: string
): Promise<CaptureResult> {
  try {
    let savedDirectly = false;
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      savedDirectly = true;
      try {
        const album = await MediaLibrary.getAlbumAsync('Renu Biru Cam');
        if (album == null) {
          await MediaLibrary.createAlbumAsync('Renu Biru Cam', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
      } catch {
        // Scoped storage fallback
      }
    } catch {
      // Di Expo Go, MediaLibrary dibatasi oleh Google Play Policy
      savedDirectly = false;
    }

    // Fallback untuk Expo Go
    if (!savedDirectly) {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(uri, {
          dialogTitle: 'Simpan Foto Analog ke Galeri HP',
          mimeType: 'image/jpeg',
          UTI: 'public.jpeg',
        });
      }
    }

    return {
      success: true,
      uri,
    };
  } catch (err: any) {
    console.log('Save photo exception:', err?.message || err);
    return {
      success: false,
      error: err?.message || 'Terjadi kesalahan saat menyimpan foto.',
    };
  }
}

/**
 * Mengambil foto langsung dari sensor kamera native hardware.
 * - Pada APK/Production Build: Langsung tersimpan otomatis ke Galeri (MediaStore DCIM).
 * - Pada Expo Go: Membuka dialog Android native (Simpan ke Perangkat / Galeri / Foto).
 */
export async function takeAndSaveCameraPhoto(
  cameraRef: React.RefObject<any>
): Promise<CaptureResult> {
  try {
    if (!cameraRef.current) {
      return { success: false, error: 'Sensor kamera belum siap. Coba lagi dalam 1 detik.' };
    }

    // 1. Ambil foto resolusi penuh dari sensor kamera hardware
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.95,
      skipProcessing: false,
    });

    if (!photo?.uri) {
      return { success: false, error: 'Sensor kamera tidak menghasilkan berkas gambar.' };
    }

    // 2. Coba simpan otomatis ke Galeri via MediaLibrary (untuk Standalone APK / Dev Build)
    let savedDirectly = false;
    try {
      const asset = await MediaLibrary.createAssetAsync(photo.uri);
      savedDirectly = true;
      try {
        const album = await MediaLibrary.getAlbumAsync('Renu Biru Cam');
        if (album == null) {
          await MediaLibrary.createAlbumAsync('Renu Biru Cam', asset, false);
        } else {
          await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
        }
      } catch {
        // Scoped storage fallback
      }
    } catch {
      // Di Expo Go, MediaLibrary dibatasi oleh Google Play Policy
      savedDirectly = false;
    }

    // 3. Fallback cerdas untuk Expo Go:
    // Buka Sheet Android Native agar user bisa langsung ketuk "Simpan Gambar / Galeri"
    if (!savedDirectly) {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(photo.uri, {
          dialogTitle: 'Simpan Foto ke Galeri HP',
          mimeType: 'image/jpeg',
          UTI: 'public.jpeg',
        });
      }
    }

    return {
      success: true,
      uri: photo.uri,
    };
  } catch (err: any) {
    console.log('Capture exception:', err?.message || err);
    return {
      success: false,
      error: err?.message || 'Terjadi kesalahan saat memproses foto.',
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

    const uri = await captureRef(viewRef, {
      format: 'jpg',
      quality: 0.95,
      result: 'tmpfile',
    });

    let savedDirectly = false;
    try {
      const asset = await MediaLibrary.createAssetAsync(uri);
      savedDirectly = true;
    } catch {
      savedDirectly = false;
    }

    if (!savedDirectly) {
      const isAvailable = await Sharing.isAvailableAsync();
      if (isAvailable) {
        await Sharing.shareAsync(uri, {
          dialogTitle: 'Simpan Hasil Cetak ke Galeri',
          mimeType: 'image/jpeg',
          UTI: 'public.jpeg',
        });
      }
    }

    return {
      success: true,
      uri,
    };
  } catch (err: any) {
    console.log('Capture view exception:', err?.message || err);
    return {
      success: false,
      error: err?.message || 'Gagal menyimpan hasil cetak',
    };
  }
}
