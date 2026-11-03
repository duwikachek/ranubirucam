import React, { useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Vibration,
} from 'react-native';
import { Colors } from '../constants/Colors';

interface ShutterButtonProps {
  onPress: () => void;
  onLongPress?: () => void;
  isRecording?: boolean;
  disabled?: boolean;
}

export function ShutterButton({
  onPress,
  onLongPress,
  isRecording = false,
  disabled = false,
}: ShutterButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shadowAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    // Animasi tekan — turun 1.5px, shadow hilang
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.94,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(shadowAnim, {
        toValue: 0,
        duration: 80,
        useNativeDriver: false,
      }),
    ]).start();
    Vibration.vibrate(30); // Haptic feedback
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 300,
        friction: 10,
      }),
      Animated.timing(shadowAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: false,
      }),
    ]).start();
  };

  return (
    <View style={styles.outerRing}>
      <Animated.View
        style={[
          styles.middleRing,
          {
            transform: [{ scale: scaleAnim }],
          },
        ]}
      >
        <TouchableOpacity
          onPress={onPress}
          onLongPress={onLongPress}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          disabled={disabled}
          style={[styles.button, isRecording && styles.buttonRecording]}
          activeOpacity={1}
        >
          {isRecording ? (
            <View style={styles.stopIcon} />
          ) : (
            <View style={styles.innerCircle} />
          )}
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerRing: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.surfaceContainerHigh,
    borderWidth: 2,
    borderColor: Colors.warmSteel,
    alignItems: 'center',
    justifyContent: 'center',
    // Knurled outer bezel simulation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.8,
    shadowRadius: 14,
    elevation: 12,
  },
  middleRing: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: Colors.surfaceContainerHighest,
    alignItems: 'center',
    justifyContent: 'center',
    // Hard-lit top highlight
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.2)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.5)',
  },
  button: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.shutterOrange,
    alignItems: 'center',
    justifyContent: 'center',
    // Brushed steel center highlight
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.3)',
    shadowColor: Colors.shutterOrange,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.6,
    shadowRadius: 8,
    elevation: 8,
  },
  buttonRecording: {
    backgroundColor: '#cc2200',
  },
  innerCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.5)',
  },
  stopIcon: {
    width: 18,
    height: 18,
    backgroundColor: 'white',
    borderRadius: 2,
  },
});
