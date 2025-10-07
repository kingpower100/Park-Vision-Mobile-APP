import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MarkerProps {
  coordinate: {
    latitude: number;
    longitude: number;
  };
  title?: string;
  description?: string;
  pinColor?: string;
  onCalloutPress?: () => void;
}

export default function Marker({ coordinate, title, description, pinColor, onCalloutPress }: MarkerProps) {
  return (
    <View style={[styles.marker, { backgroundColor: pinColor === 'blue' ? '#2196F3' : pinColor === 'green' ? '#4CAF50' : '#F44336' }]}>
      <Text style={styles.markerText}>📍</Text>
      {title && <Text style={styles.markerTitle}>{title}</Text>}
      {description && <Text style={styles.markerDesc}>{description}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  marker: {
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 40,
    minHeight: 40,
    margin: 4,
  },
  markerText: {
    fontSize: 16,
  },
  markerTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginTop: 2,
  },
  markerDesc: {
    fontSize: 10,
    color: 'white',
    textAlign: 'center',
    marginTop: 1,
  },
});
