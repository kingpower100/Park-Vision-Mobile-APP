import React, { useEffect, useRef, useState } from "react";
import MapView, { Marker, Circle } from "react-native-maps";
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

// Default region (shown immediately)
const DEFAULT_REGION = {
  latitude: 36.8065,
  longitude: 10.1815,
  latitudeDelta: 0.05,
  longitudeDelta: 0.05,
};

export default function ParkingMapScreen() {
  const mapRef = useRef<MapView>(null);

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
        // Center map on user
        mapRef.current?.animateToRegion(
          {
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000
        );
      }
    })();
  }, []);

  const openDirections = (dest: LatLng) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${dest.latitude},${dest.longitude}`;
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        loadingEnabled
        initialRegion={DEFAULT_REGION}
      >
        {userLoc && (
          <>
            <Marker coordinate={userLoc} title="You are here" pinColor="blue" />
            <Circle
              center={userLoc}
              radius={30}
              strokeColor="rgba(0,0,255,0.3)"
              fillColor="rgba(0,0,255,0.1)"
            />
          </>
        )}

        {markers.map((m) => (
          <Marker
            key={m.id}
            coordinate={m.coordinates}
            title={m.name}
            pinColor={m.isPrivate ? "green" : "red"}
            onCalloutPress={() => openDirections(m.coordinates)}
          />
        ))}
      </MapView>

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
                  mapRef.current?.animateToRegion(
                    { ...item.coordinates, latitudeDelta: 0.01, longitudeDelta: 0.01 },
                    500
                  );
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
  container:   { flex: 1 },
  map:         { flex: 1 },
  listContainer: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 10,
    alignItems: "center",
  },
  errorText:   { color: "red" },

  card:        {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginHorizontal: 5,
    padding: 8,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
    width: 220,
  },
  cardActive:  { backgroundColor: "#E7E3AC" },
  cardImg:     { width: 45, height: 45, borderRadius: 6, marginRight: 8 },
  cardInfo:    { flex: 1 },
  cardTitle:   { fontSize: 14, fontWeight: "bold" },
  cardDesc:    { fontSize: 12, color: "#666", marginTop: 4 },
});
