import React from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

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
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 36.8065, // Tunis
          longitude: 10.1815,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {parkings.map((parking) => (
          <Marker
            key={parking.id}
            coordinate={{
              latitude: parking.latitude,
              longitude: parking.longitude,
            }}
            title={parking.name}
            description={`Places libres : ${parking.slots}`}
          />
        ))}
      </MapView>
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
  },
});
