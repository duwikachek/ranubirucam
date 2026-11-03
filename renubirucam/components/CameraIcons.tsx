// CameraIcons.tsx - Ikon Vektor Orisinal 14 Kamera Analog Precision
// Didesain presisi sesuai estetika mid-century industrial chassis (DESIGN.md)
import React from 'react';
import Svg, { Rect, Circle, Path, G, Line } from 'react-native-svg';
import { Colors } from '../constants/Colors';

interface CameraIconProps {
  id: string;
  size?: number;
  color?: string;
  secondaryColor?: string;
}

export function CameraIcon({
  id,
  size = 32,
  color,
  secondaryColor,
}: CameraIconProps) {
  const primary = color || Colors.cream;
  const accent = secondaryColor || Colors.shutterOrange;

  switch (id) {
    case 'grn':
      // GRN Kompak: Compact body dengan lensa lingkar ganda & sensor biru
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Rect x="4" y="10" width="32" height="22" rx="3" fill="#1b1b1f" stroke={primary} strokeWidth="1.5" />
          <Rect x="8" y="7" width="8" height="3" rx="1" fill={primary} />
          <Circle cx="23" cy="21" r="8" fill="#121316" stroke={primary} strokeWidth="1.5" />
          <Circle cx="23" cy="21" r="5" fill="#1b2a3a" stroke="#4a7fa5" strokeWidth="1.5" />
          <Circle cx="25" cy="19" r="1.5" fill="#88ccff" />
          <Circle cx="9" cy="14" r="1.5" fill={accent} />
          <Rect x="29" y="13" width="4" height="2" fill={primary} />
        </Svg>
      );

    case 'kfuns':
      // K Funs: Kamera sekali pakai dengan flash menonjol & roda jempol
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Rect x="4" y="11" width="32" height="20" rx="4" fill="#d4520a" stroke={primary} strokeWidth="1.5" />
          <Rect x="4" y="11" width="14" height="20" rx="2" fill="#e8b84b" />
          <Circle cx="23" cy="21" r="6" fill="#121316" stroke={primary} strokeWidth="1.5" />
          <Circle cx="23" cy="21" r="3" fill="#333333" />
          <Rect x="8" y="14" width="6" height="5" rx="1" fill="#FFFFFF" stroke={primary} strokeWidth="1" />
          <Rect x="30" y="8" width="5" height="3" fill="#333333" />
        </Svg>
      );

    case 'fc100':
      // FC 100: SLR 35mm klasik dengan prisma segitiga atas
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Rect x="4" y="13" width="32" height="19" rx="2" fill="#1b1b1f" stroke={primary} strokeWidth="1.5" />
          <Path d="M14 13 L20 6 L26 13 Z" fill="#292a2d" stroke={primary} strokeWidth="1.5" />
          <Circle cx="20" cy="22" r="7" fill="#121316" stroke={primary} strokeWidth="1.5" />
          <Circle cx="20" cy="22" r="4" fill="#224422" stroke="#6aab7c" strokeWidth="1" />
          <Rect x="6" y="9" width="5" height="4" rx="1" fill={accent} />
          <Rect x="29" y="10" width="4" height="3" fill={primary} />
        </Svg>
      );

    case 'instm':
      // Inst M: Kamera Instan dengan lekukan bodi bulat & lensa besar
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Rect x="6" y="8" width="28" height="26" rx="6" fill="#f4ede2" stroke="#cac6be" strokeWidth="1.5" />
          <Circle cx="20" cy="21" r="9" fill="#1b1b1f" stroke="#cac6be" strokeWidth="1.5" />
          <Circle cx="20" cy="21" r="5" fill="#333333" stroke={accent} strokeWidth="1" />
          <Circle cx="28" cy="13" r="2.5" fill="#555555" />
          <Rect x="10" y="12" width="4" height="3" rx="0.5" fill="#111111" />
          <Line x1="12" y1="31" x2="28" y2="31" stroke="#cac6be" strokeWidth="1.5" strokeLinecap="round" />
        </Svg>
      );

    case 'h500c':
      // H 500C: Format Medium 6x6 modular dengan tudung bidik atas
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Rect x="7" y="11" width="26" height="23" rx="1" fill="#1b1b1f" stroke={primary} strokeWidth="1.5" />
          <Rect x="10" y="6" width="20" height="5" fill="#292a2d" stroke={primary} strokeWidth="1.2" />
          <Circle cx="20" cy="23" r="8" fill="#121316" stroke={primary} strokeWidth="1.5" />
          <Circle cx="20" cy="23" r="5" fill="#222225" stroke="#c4b9a8" strokeWidth="1.5" />
          <Rect x="31" y="16" width="3" height="10" rx="1" fill="#c4b9a8" />
          <Circle cx="10" cy="14" r="1.5" fill={accent} />
        </Svg>
      );

    case 'fqs':
      // FQS 1986: Kamera sekali pakai vintage retro 1986
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Rect x="4" y="12" width="32" height="19" rx="3" fill="#c8a860" stroke={primary} strokeWidth="1.5" />
          <Rect x="4" y="12" width="10" height="19" rx="2" fill="#2a5a2a" />
          <Circle cx="22" cy="21" r="6" fill="#121316" stroke={primary} strokeWidth="1.5" />
          <Circle cx="22" cy="21" r="3" fill="#a08040" />
          <Rect x="28" y="14" width="5" height="4" rx="1" fill="#ffffff" stroke={primary} strokeWidth="0.8" />
          <Line x1="16" y1="16" x2="16" y2="26" stroke="#a08040" strokeWidth="1.5" />
        </Svg>
      );

    case 'ccd':
      // CCD 2000s: Kamera digital saku silver dengan lensa geser
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Rect x="5" y="11" width="30" height="20" rx="4" fill="#aab0ba" stroke={primary} strokeWidth="1.5" />
          <Circle cx="17" cy="21" r="7" fill="#222225" stroke="#ffffff" strokeWidth="1.5" />
          <Circle cx="17" cy="21" r="4" fill="#1a2a44" stroke="#5588cc" strokeWidth="1" />
          <Rect x="26" y="14" width="6" height="4" rx="1" fill="#ffffff" />
          <Circle cx="29" cy="23" r="1.5" fill={accent} />
        </Svg>
      );

    case 'hglow':
      // H Glow: Kamera mainan plastik lo-fi bermoncong panjang
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Rect x="6" y="12" width="28" height="20" rx="3" fill="#221b28" stroke="#9966cc" strokeWidth="1.5" />
          <Rect x="14" y="7" width="12" height="5" fill="#332540" stroke="#9966cc" strokeWidth="1" />
          <Circle cx="20" cy="22" r="8" fill="#121316" stroke="#cc99ff" strokeWidth="1.5" />
          <Circle cx="20" cy="22" r="4" fill="#552277" stroke="#ff44aa" strokeWidth="1" />
          <Circle cx="10" cy="16" r="2" fill="#ff44aa" />
        </Svg>
      );

    case 'polan':
      // Pola N: Kamera instan dengan garis spektrum warna
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Path d="M7 11 L12 7 L28 7 L33 11 L33 32 L7 32 Z" fill="#f0ede8" stroke="#333333" strokeWidth="1.5" />
          <Circle cx="20" cy="20" r="7" fill="#1b1b1f" stroke="#333333" strokeWidth="1.5" />
          <Circle cx="20" cy="20" r="4" fill="#333333" />
          {/* Rainbow stripes */}
          <Line x1="18" y1="28" x2="18" y2="32" stroke="#ff3333" strokeWidth="1" />
          <Line x1="19.5" y1="28" x2="19.5" y2="32" stroke="#ffaa00" strokeWidth="1" />
          <Line x1="21" y1="28" x2="21" y2="32" stroke="#33cc33" strokeWidth="1" />
          <Line x1="22.5" y1="28" x2="22.5" y2="32" stroke="#3366ff" strokeWidth="1" />
          <Rect x="26" y="11" width="4" height="4" rx="0.5" fill="#333333" />
        </Svg>
      );

    case 'dv':
      // DV Camcorder: Handycam genggam dengan layar lipat & lensa video
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Rect x="14" y="12" width="21" height="17" rx="3" fill="#1e221e" stroke="#44aa44" strokeWidth="1.5" />
          <Rect x="5" y="13" width="9" height="15" rx="1" fill="#0d110d" stroke="#44aa44" strokeWidth="1" />
          <Circle cx="25" cy="20" r="5" fill="#050805" stroke="#88cc88" strokeWidth="1.5" />
          <Circle cx="25" cy="20" r="2.5" fill="#228822" />
          <Rect x="18" y="7" width="8" height="5" rx="1" fill="#333833" stroke="#44aa44" strokeWidth="1" />
          <Circle cx="31" cy="15" r="1.5" fill="#ff2222" />
        </Svg>
      );

    case 'lm':
      // LM Rangefinder: Desain Leica legendaris dengan badge merah & knurled dial
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Rect x="5" y="11" width="30" height="20" rx="3" fill="#1b1b1f" stroke={primary} strokeWidth="1.5" />
          <Circle cx="22" cy="21" r="7" fill="#121316" stroke={primary} strokeWidth="1.5" />
          <Circle cx="22" cy="21" r="4" fill="#292a2d" stroke="#8E8D8A" strokeWidth="1" />
          {/* Iconic Red Dot */}
          <Circle cx="12" cy="16" r="2.5" fill="#cc1111" />
          <Rect x="27" y="13" width="5" height="3" fill="#111111" stroke={primary} strokeWidth="0.8" />
          <Rect x="8" y="8" width="5" height="3" rx="0.5" fill={primary} />
        </Svg>
      );

    case 'rz67':
      // RZ 67: Kamera format medium studio dengan bodi bergelombang
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Rect x="6" y="10" width="28" height="23" rx="2" fill="#22201d" stroke="#c8b090" strokeWidth="1.5" />
          <Line x1="12" y1="10" x2="12" y2="33" stroke="#a09070" strokeWidth="1" strokeDasharray="1,2" />
          <Circle cx="22" cy="21" r="8" fill="#121316" stroke="#c8b090" strokeWidth="1.5" />
          <Circle cx="22" cy="21" r="4.5" fill="#1a1815" stroke="#e8d8c0" strokeWidth="1" />
          <Rect x="29" y="13" width="3" height="7" rx="1" fill="#c8b090" />
        </Svg>
      );

    case 'slide':
      // Slide 35: Bingkai proyektor slide vintage dengan warna oranye hangat
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Rect x="5" y="7" width="30" height="26" rx="2" fill="#f4ede2" stroke="#cc4400" strokeWidth="1.5" />
          <Rect x="10" y="11" width="20" height="15" fill="#121316" stroke="#cc4400" strokeWidth="1.2" />
          <Circle cx="20" cy="18" r="4" fill="#ff8844" />
          <Line x1="12" y1="29" x2="28" y2="29" stroke="#cc4400" strokeWidth="1" />
        </Svg>
      );

    case 'fn1600':
      // FN 1600: Kamera film hitam doff dengan tulisan ISO 1600
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Rect x="5" y="11" width="30" height="20" rx="3" fill="#0d0e11" stroke="#aa6622" strokeWidth="1.5" />
          <Circle cx="21" cy="21" r="7" fill="#15161a" stroke="#cc8844" strokeWidth="1.5" />
          <Circle cx="21" cy="21" r="4" fill="#2a180a" stroke="#eeaa66" strokeWidth="1" />
          <Rect x="8" y="14" width="7" height="3" fill="#cc8844" rx="0.5" />
          <Circle cx="10" cy="9" r="2" fill={accent} />
          <Rect x="27" y="13" width="4" height="2.5" fill="#ffffff" />
        </Svg>
      );

    default:
      // Default analog camera icon
      return (
        <Svg width={size} height={size} viewBox="0 0 40 40" fill="none">
          <Rect x="5" y="11" width="30" height="20" rx="3" fill="#1b1b1f" stroke={primary} strokeWidth="1.5" />
          <Circle cx="20" cy="21" r="7" fill="#121316" stroke={primary} strokeWidth="1.5" />
          <Circle cx="20" cy="21" r="4" fill="#333333" stroke={accent} strokeWidth="1" />
          <Circle cx="10" cy="15" r="1.5" fill={accent} />
        </Svg>
      );
  }
}

