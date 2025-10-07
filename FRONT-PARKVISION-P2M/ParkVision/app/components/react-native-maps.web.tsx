import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Web-compatible MapView component
interface MapViewProps {
  style?: any;
  initialRegion?: {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  };
  children?: React.ReactNode;
  ref?: any;
  loadingEnabled?: boolean;
}

export function MapView({ style, children, ...props }: MapViewProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.mapText}>🗺️ Interactive Map</Text>
      <Text style={styles.mapSubtext}>Map functionality available on mobile devices</Text>
      {children}
    </View>
  );
}

// Web-compatible Marker component
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

export function Marker({ coordinate, title, description, pinColor, onCalloutPress }: MarkerProps) {
  return (
    <View style={[styles.marker, { backgroundColor: pinColor === 'blue' ? '#2196F3' : pinColor === 'green' ? '#4CAF50' : '#F44336' }]}>
      <Text style={styles.markerText}>📍</Text>
      {title && <Text style={styles.markerTitle}>{title}</Text>}
      {description && <Text style={styles.markerDesc}>{description}</Text>}
    </View>
  );
}

// Web-compatible Circle component
interface CircleProps {
  center: {
    latitude: number;
    longitude: number;
  };
  radius: number;
  strokeColor?: string;
  fillColor?: string;
}

export function Circle({ center, radius, strokeColor, fillColor }: CircleProps) {
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

// Default export for MapView
export default MapView;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    minHeight: 200,
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
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
  circle: {
    borderWidth: 2,
    position: 'absolute',
  },
});
