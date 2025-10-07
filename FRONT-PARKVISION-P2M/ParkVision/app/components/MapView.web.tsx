import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface MapViewProps {
  style?: any;
  initialRegion?: any;
  children?: React.ReactNode;
  ref?: any;
  loadingEnabled?: boolean;
}

export default function MapView({ style, children, ...props }: MapViewProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.mapText}>🗺️ Interactive Map</Text>
      <Text style={styles.mapSubtext}>Map functionality available on mobile devices</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
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
});
