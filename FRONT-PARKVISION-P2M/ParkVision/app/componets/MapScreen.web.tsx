import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';

const parkings = [
  {
    id: 1,
    name: 'Parking Habib Bourguiba',
    latitude: 36.8008,
    longitude: 10.1817,
    slots: 8,
  },
  {
    id: 2,
    name: 'Parking Bardo',
    latitude: 36.8131,
    longitude: 10.1586,
    slots: 3,
  },
];

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <Text style={styles.mapText}>Map View (Web)</Text>
        <Text style={styles.mapSubtext}>Interactive map would be displayed here</Text>
        {parkings.map((parking) => (
          <View key={parking.id} style={styles.marker}>
            <Text style={styles.markerTitle}>{parking.name}</Text>
            <Text style={styles.markerDesc}>Places libres : {parking.slots}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  mapSubtext: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
  marker: {
    backgroundColor: 'white',
    padding: 10,
    margin: 5,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  markerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  markerDesc: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
});
