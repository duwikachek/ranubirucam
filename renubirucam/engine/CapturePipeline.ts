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
 * dan menyimpannya secara permanen ke Galeri HP Android
 */
export async function takeAndSaveCameraPhoto(
  cameraRef: React.RefObject<any>
): Promise<CaptureResult> {
  try {
    if (!cameraRef.current) {
      return { success: false, error: 'Sensor kamera belum siap. Coba lagi dalam 1 detik.' };
    }

    // 1. Minta atau verifikasi izin akses foto (khusus foto, tanpa meminta audio)
    let perm = await MediaLibrary.getPermissionsAsync(false, ['photo']);
    if (!perm.granted) {
      perm = await MediaLibrary.requestPermissionsAsync(false, ['photo']);
    }

    if (!perm.granted) {
      return {
        success: false,
        error: 'Izin akses galeri belum diizinkan. Harap izinkan akses media pada pop-up HP Anda.',
      };
    }

    // 2. Ambil foto resolusi penuh dari sensor kamera hardware
    const photo = await cameraRef.current.takePictureAsync({
      quality: 0.95,
      skipProcessing: false,
    });

    if (!photo?.uri) {
      return { success: false, error: 'Sensor kamera tidak menghasilkan berkas gambar.' };
    }

    // 3. Simpan langsung ke MediaStore Galeri Android menggunakan createAssetAsync
    const asset = await MediaLibrary.createAssetAsync(photo.uri);

    // 4. Masukkan ke album khusus "Renu Biru Cam" agar rapi dan mudah ditemukan
    try {
      const album = await MediaLibrary.getAlbumAsync('Renu Biru Cam');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('Renu Biru Cam', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch {
      // Pada Android 10+ Scoped Storage, asset sudah otomatis tampil di tab Foto/DCIM
    }

    return {
      success: true,
      uri: asset.uri,
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

    let perm = await MediaLibrary.getPermissionsAsync(false, ['photo']);
    if (!perm.granted) {
      perm = await MediaLibrary.requestPermissionsAsync(false, ['photo']);
    }

    if (!perm.granted) {
      return {
        success: false,
        error: 'Izin galeri belum diberikan',
      };
    }

    const uri = await captureRef(viewRef, {
      format: 'jpg',
      quality: 0.95,
      result: 'tmpfile',
    });

    const asset = await MediaLibrary.createAssetAsync(uri);

    try {
      const album = await MediaLibrary.getAlbumAsync('Renu Biru Cam');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('Renu Biru Cam', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch {
      // Fallback
    }

    return {
      success: true,
      uri: asset.uri,
    };
  } catch (err: any) {
    console.log('Capture view exception:', err?.message || err);
    return {
      success: false,
      error: err?.message || 'Gagal menyimpan hasil cetak',
    };
  }
}
