import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Colors } from '../constants/Colors';
import { Typography } from '../constants/Typography';
import { CameraProfile } from '../constants/CameraProfiles';
import { ShutterButton } from '../components/ShutterButton';

interface VideoScreenProps {
  selectedCamera: CameraProfile;
}

export function VideoScreen({ selectedCamera }: VideoScreenProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [recordSeconds, setRecordSeconds] = useState(0);
  const [tapeMode, setTapeMode] = useState<'SP' | 'LP'>('SP');
  const [recBlink, setRecBlink] = useState(true);

  // Blinking REC effect and timer
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordSeconds(prev => prev + 1);
        setRecBlink(prev => !prev);
      }, 500);
    } else {
      setRecordSeconds(0);
      setRecBlink(true);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRecording]);

  const formatTime = (totalHalfSecs: number) => {
    const totalSecs = Math.floor(totalHalfSecs / 2);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleRecordToggle = () => {
    if (isRecording) {
      setIsRecording(false);
      Alert.alert('Video Tersimpan', `Klip video DV analog berhasil disimpan ke rol kamera.`);
    } else {
      setIsRecording(true);
    }
  };

  return (
    <View style={styles.container}>
      {/* Video Viewfinder / CRT simulation */}
      <View style={styles.viewfinder}>
        {/* CRT Scanline overlay simulation */}
        <View style={styles.scanlineOverlay}>
          {Array.from({ length: 24 }).map((_, i) => (
            <View key={i} style={styles.scanline} />
          ))}
        </View>

        {/* Video HUD Top */}
        <View style={styles.hudTop}>
          <View style={styles.recContainer}>
            <View
              style={[
                styles.recDot,
                isRecording && recBlink ? styles.recDotActive : styles.recDotDim,
              ]}
            />
            <Text
              style={[
                styles.recText,
                isRecording && recBlink ? styles.recTextActive : styles.recTextDim,
              ]}
            >
              {isRecording ? '● REC' : 'STBY'}
            </Text>
            {isRecording && (
              <Text style={styles.recTimer}>{formatTime(recordSeconds)}</Text>
            )}
          </View>

          <View style={styles.tapeStatus}>
            <Text style={styles.tapeText}>TAPE [01:24:18]</Text>
            <Text style={styles.spText}>{tapeMode}</Text>
          </View>
        </View>

        {/* Center Viewfinder Guide */}
        <View style={styles.centerTarget}>
          <View style={styles.crosshairH} />
          <View style={styles.crosshairV} />
          <Text style={styles.cameraWatermark}>DV CAMCORDER · 4:3 NTSC</Text>
        </View>

        {/* Video HUD Bottom */}
        <View style={styles.hudBottom}>
          <View>
            <Text style={styles.hudBottomText}>AUTO FOCUS [LOCK]</Text>
            <Text style={styles.hudBottomText}>F1.8 · 0dB · 1/60s</Text>
          </View>
          <View style={styles.audioMeter}>
            <Text style={styles.audioLabel}>CH1/CH2</Text>
            <View style={styles.audioBars}>
              <View style={[styles.audioBar, { height: 12, backgroundColor: '#00FF66' }]} />
              <View style={[styles.audioBar, { height: 16, backgroundColor: '#00FF66' }]} />
              <View style={[styles.audioBar, { height: 14, backgroundColor: '#00FF66' }]} />
              <View style={[styles.audioBar, { height: 10, backgroundColor: '#FF6B35' }]} />
            </View>
          </View>
        </View>

        {/* CRT Frame borders */}
        <View style={[styles.corner, styles.cornerTL]} />
        <View style={[styles.corner, styles.cornerTR]} />
        <View style={[styles.corner, styles.cornerBL]} />
        <View style={[styles.corner, styles.cornerBR]} />
      </View>

      {/* Control Strip */}
      <View style={styles.controlStrip}>
        <TouchableOpacity
          style={styles.modeToggle}
          onPress={() => setTapeMode(tapeMode === 'SP' ? 'LP' : 'SP')}
        >
          <Text style={styles.modeToggleLabel}>TAPE SPEED</Text>
          <Text style={styles.modeToggleValue}>{tapeMode} (Standard)</Text>
        </TouchableOpacity>

        <View style={styles.zoomControls}>
          <TouchableOpacity style={styles.zoomBtn}>
            <Text style={styles.zoomText}>W</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.zoomBtn}>
            <Text style={styles.zoomText}>T</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Bottom Shutter Deck */}
      <View style={styles.deck}>
        <View style={styles.sideIndicator}>
          <Text style={styles.sideLabel}>FORMAT</Text>
          <Text style={styles.sideValue}>DV 480i</Text>
        </View>

        <ShutterButton
          onPress={handleRecordToggle}
          isRecording={isRecording}
        />

        <View style={styles.sideIndicator}>
          <Text style={styles.sideLabel}>BATTERAI</Text>
          <Text style={styles.sideValue}>88% [||||]</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  viewfinder: {
    flex: 1,
    backgroundColor: '#050705',
    position: 'relative',
    overflow: 'hidden',
    justifyContent: 'space-between',
    padding: 16,
  },
  scanlineOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'space-between',
    opacity: 0.15,
  },
  scanline: {
    height: 1,
    backgroundColor: '#00FF66',
  },
  hudTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  recContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
  },
  recDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  recDotActive: {
    backgroundColor: '#FF2222',
  },
  recDotDim: {
    backgroundColor: '#551111',
  },
  recText: {
    ...Typography.lcdSm,
    fontSize: 12,
    fontWeight: '700',
  },
  recTextActive: {
    color: '#FF2222',
  },
  recTextDim: {
    color: '#888888',
  },
  recTimer: {
    ...Typography.lcdSm,
    color: Colors.cream,
    fontSize: 12,
  },
  tapeStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 2,
  },
  tapeText: {
    ...Typography.lcdSm,
    color: '#00FF66',
    fontSize: 10,
  },
  spText: {
    ...Typography.labelMeta,
    color: Colors.shutterOrange,
    fontWeight: '700',
  },
  centerTarget: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    height: 100,
  },
  crosshairH: {
    width: 40,
    height: 1,
    backgroundColor: 'rgba(0,255,102,0.4)',
    position: 'absolute',
  },
  crosshairV: {
    height: 40,
    width: 1,
    backgroundColor: 'rgba(0,255,102,0.4)',
    position: 'absolute',
  },
  cameraWatermark: {
    ...Typography.labelMeta,
    color: 'rgba(0,255,102,0.3)',
    letterSpacing: 2,
    position: 'absolute',
    bottom: -30,
  },
  hudBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    zIndex: 10,
  },
  hudBottomText: {
    ...Typography.lcdSm,
    color: '#00FF66',
    fontSize: 10,
  },
  audioMeter: {
    alignItems: 'flex-end',
    gap: 4,
  },
  audioLabel: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
    fontSize: 8,
  },
  audioBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 3,
  },
  audioBar: {
    width: 4,
    borderRadius: 1,
  },
  corner: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderColor: 'rgba(0,255,102,0.6)',
    borderWidth: 1.5,
  },
  cornerTL: { top: 12, left: 12, borderRightWidth: 0, borderBottomWidth: 0 },
  cornerTR: { top: 12, right: 12, borderLeftWidth: 0, borderBottomWidth: 0 },
  cornerBL: { bottom: 12, left: 12, borderRightWidth: 0, borderTopWidth: 0 },
  cornerBR: { bottom: 12, right: 12, borderLeftWidth: 0, borderTopWidth: 0 },
  controlStrip: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.surfaceContainerLow,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant,
  },
  modeToggle: {
    gap: 2,
  },
  modeToggleLabel: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
  },
  modeToggleValue: {
    ...Typography.lcdSm,
    color: Colors.shutterOrange,
    fontSize: 10,
  },
  zoomControls: {
    flexDirection: 'row',
    gap: 8,
  },
  zoomBtn: {
    width: 36,
    height: 36,
    borderRadius: 4,
    backgroundColor: Colors.surfaceContainer,
    borderWidth: 1,
    borderColor: Colors.outlineVariant,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomText: {
    ...Typography.lcdSm,
    color: Colors.cream,
    fontWeight: '700',
  },
  deck: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 16,
    backgroundColor: Colors.surfaceContainerLowest,
    borderTopWidth: 1,
    borderTopColor: Colors.outlineVariant,
  },
  sideIndicator: {
    alignItems: 'center',
    gap: 4,
    minWidth: 64,
  },
  sideLabel: {
    ...Typography.labelMeta,
    color: Colors.warmSteel,
    fontSize: 9,
  },
  sideValue: {
    ...Typography.lcdSm,
    color: Colors.cream,
    fontSize: 10,
  },
});
