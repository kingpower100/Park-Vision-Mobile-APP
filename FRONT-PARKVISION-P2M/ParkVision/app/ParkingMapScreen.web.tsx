import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import * as Linking from "expo-linking";

import rawPublic from "../assets/publicMarkers";
import { fetchParkingAreas, ParkingAreaDTO } from "./services/api";

type LatLng = { latitude: number; longitude: number };
type MarkerItem = {
  id: string;
  name: string;
  description: string;
  coordinates: LatLng;
  isPrivate: boolean;
  image?: string;
};

// Prepare public markers
const publicMarkers: MarkerItem[] = rawPublic.map((m) => ({
  id: m.name,
  name: m.name,
  description: m.description,
  coordinates: { latitude: m.coordinates.latitude, longitude: m.coordinates.longitude },
  isPrivate: false,
  image: m.image,
}));

export default function ParkingMapScreen() {
  const [userLoc, setUserLoc] = useState<Location.LocationObjectCoords | null>(null);
  const [markers, setMarkers] = useState<MarkerItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string>("");

  // Fetch parking areas and merge with public markers
  useEffect(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const areas: ParkingAreaDTO[] = await fetchParkingAreas();
        const areaMarkers: MarkerItem[] = areas.map((a) => ({
          id: `area-${a.id}`,
          name: a.name,
          description: `Total slots: ${a.total_spots}`,
          coordinates: { latitude: a.lat, longitude: a.lon },
          isPrivate: true,
        }));
        setMarkers([...publicMarkers, ...areaMarkers]);
      } catch (e: any) {
        console.error("Fetch error:", e);
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // Get user location once
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const loc = await Location.getCurrentPositionAsync({});
        setUserLoc(loc.coords);
      }
    })();
  }, []);

  const openDirections = (dest: LatLng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${dest.latitude},${dest.longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <View style={styles.map}>
        <Text style={styles.mapText}>Parking Map (Web)</Text>
        <Text style={styles.mapSubtext}>Interactive map with parking locations</Text>
        
        {userLoc && (
          <View style={styles.userLocation}>
            <Text style={styles.userLocationText}>📍 Your Location</Text>
            <Text style={styles.userLocationCoords}>
              {userLoc.latitude.toFixed(4)}, {userLoc.longitude.toFixed(4)}
            </Text>
          </View>
        )}

        <View style={styles.markersContainer}>
          {markers.map((m) => (
            <View key={m.id} style={styles.marker}>
              <Text style={styles.markerTitle}>{m.name}</Text>
              <Text style={styles.markerDesc}>{m.description}</Text>
              <Text style={styles.markerType}>
                {m.isPrivate ? "🔒 Private" : "🌍 Public"}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.listContainer}>
        {loading ? (
          <ActivityIndicator size="small" />
        ) : error ? (
          <Text style={styles.errorText}>Error: {error}</Text>
        ) : (
          <FlatList
            horizontal
            data={markers}
            keyExtractor={(item) => item.id}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  setSelectedId(item.id);
                }}
                onLongPress={() => openDirections(item.coordinates)}
                style={[
                  styles.card,
                  item.id === selectedId && styles.cardActive,
                ]}
              >
                {item.image && (
                  <Image source={{ uri: item.image }} style={styles.cardImg} />
                )}
                <View style={styles.cardInfo}>
                  <Text style={styles.cardTitle}>{item.name}</Text>
                  <Text style={styles.cardDesc}>{item.description}</Text>
                </View>
              </Pressable>
            )}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { 
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  mapText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  mapSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  userLocation: {
    backgroundColor: '#e3f2fd',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  userLocationText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
  },
  userLocationCoords: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  markersContainer: {
    flex: 1,
  },
  marker: {
    backgroundColor: 'white',
    padding: 12,
    marginVertical: 5,
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
  markerType: {
    fontSize: 12,
    color: '#888',
    marginTop: 4,
  },
  listContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  errorText: { color: "red" },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 5,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    width: 220,
  },
  cardActive: { backgroundColor: "#E7E3AC" },
  cardImg: { width: 45, height: 45, borderRadius: 6, marginRight: 8 },
  cardInfo: { flex: 1 },
  cardTitle: { fontSize: 14, fontWeight: "bold" },
  cardDesc: { fontSize: 12, color: "#666", marginTop: 4 },
});
