// CapturePipeline.ts - Eksekusi Jepretan & Penyimpanan Berkualitas Penuh (PRD F-31)
import { captureRef } from 'react-native-view-shot';
import * as MediaLibrary from 'expo-media-library';

export interface CaptureResult {
  success: boolean;
  uri?: string;
  error?: string;
}

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
        success: false,
        uri,
        error: 'Izin akses penyimpanan galeri ditolak',
      };
    }

    // 3. Simpan ke roll kamera galeri
    const asset = await MediaLibrary.createAssetAsync(uri);

    // Buat album khusus "Renu Biru Cam" jika belum ada
    try {
      const album = await MediaLibrary.getAlbumAsync('Renu Biru Cam');
      if (album == null) {
        await MediaLibrary.createAlbumAsync('Renu Biru Cam', asset, false);
      } else {
        await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
      }
    } catch {
      // Jika album gagal, foto tetap aman tersimpan di Recent Camera Roll
    }

    return {
      success: true,
      uri: asset.uri,
    };
  } catch (err: any) {
    console.error('Error saat capture & save analog photo:', err);
    return {
      success: false,
      error: err.message || 'Gagal menyimpan foto',
    };
  }
}
