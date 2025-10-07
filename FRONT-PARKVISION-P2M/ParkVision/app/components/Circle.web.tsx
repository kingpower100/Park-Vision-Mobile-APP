import React from 'react';
import { View, StyleSheet } from 'react-native';

interface CircleProps {
  center: {
    latitude: number;
    longitude: number;
  };
  radius: number;
  strokeColor?: string;
  fillColor?: string;
}

export default function Circle({ center, radius, strokeColor, fillColor }: CircleProps) {
  return (
    <View style={[
      styles.circle,
      {
        width: radius * 2,
        height: radius * 2,
        borderRadius: radius,
        borderColor: strokeColor || '#000',
        backgroundColor: fillColor || 'transparent',
      }
    ]} />
  );
}

const styles = StyleSheet.create({
  circle: {
    borderWidth: 2,
    position: 'absolute',
  },
});
