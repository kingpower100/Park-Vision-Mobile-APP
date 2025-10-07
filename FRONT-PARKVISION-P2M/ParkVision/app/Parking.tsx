import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
  Platform,
  Alert,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import * as Location from 'expo-location';
import * as Linking from 'expo-linking';

// Get device width for responsive styling
const { width } = Dimensions.get('window');

export default function ParkingScreen() {
  // Using our auth hook inside the component
  const { user, token, logout } = useAuth();

  // Local state for vehicle type
  const [vehicleType, setVehicleType] = useState<'car' | 'bike'>('car');

  // Local state for user name – default to "Guest" if no user available.
  const [userName, setUserName] = useState<string>('Guest');

  // Debug: log the user object so you can inspect it in the console.
  useEffect(() => {
    console.log('User from AuthContext:', user);
    if (user) {
      const name = user.name
        ? user.name
        : user.email
        ? user.email.split('@')[0]
        : 'Guest';
      setUserName(name);
    }
  }, [user]);

  // Update userName when user changes
  useEffect(() => {
    if (user && user.name) {
      setUserName(user.name);
    } else {
      setUserName('Guest');
    }
  }, [user]);

  // Update vehicle type state
  const handleVehicleTypeChange = (type: 'car' | 'bike') => {
    setVehicleType(type);
  };

  // Handler for adding vehicle (demo implementation)
  const handleAddVehicle = () => {
    console.log('Start to add car pressed');
    // You can add additional logic here
  };

  // Handler for opening the location in map application
  const handleLocationPress = async () => {
    // Request location permission
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission denied', 'Permission to access location was denied');
      return;
    }

    // Get current location
    const location = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = location.coords;

    // Build URL based on the platform
    const url = Platform.select({
      ios: `maps:0,0?q=${latitude},${longitude}`,
      android: `geo:0,0?q=${latitude},${longitude}`,
    });

    if (url) {
      Linking.openURL(url);
    }
  };

  return (
    <View style={styles.container}>
      {/* Top Row: User Icon & Location Icon */}
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.userPlaceholder}>
          <MaterialCommunityIcons name="account-circle" size={40} color="#2563eb" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.locationButton} onPress={handleLocationPress}>
          <MaterialCommunityIcons name="map-marker" size={24} color="#2563eb" />
        </TouchableOpacity>
      </View>

      {/* Greeting and Heading */}
      <Text style={styles.greetingText}>Hello, {userName}</Text>
      <Text style={styles.mainHeading}>Made easily Parking</Text>

      {/* Vehicle Toggle */}
      <View style={styles.vehicleToggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            vehicleType === 'car' && styles.toggleButtonActive,
          ]}
          onPress={() => handleVehicleTypeChange('car')}
        >
          <Text
            style={[
              styles.toggleButtonText,
              vehicleType === 'car' && styles.toggleButtonTextActive,
            ]}
          >
            Car
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            vehicleType === 'bike' && styles.toggleButtonActive,
          ]}
          onPress={() => handleVehicleTypeChange('bike')}
        >
          <Text
            style={[
              styles.toggleButtonText,
              vehicleType === 'bike' && styles.toggleButtonTextActive,
            ]}
          >
            Motorcycle
          </Text>
        </TouchableOpacity>
      </View>

      {/* Car/Bike Image + Add Vehicle Button */}
      <View style={styles.carImageContainer}>
        <View style={styles.carPlaceholder} />
        <Image
          source={
            vehicleType === 'car'
              ? require('../assets/images/imagecar.png')
              : require('../assets/images/imagebike.png')
          }
          style={styles.carImage}
          resizeMode="contain"
        />
        <TouchableOpacity style={styles.addCarButton} onPress={handleAddVehicle}>
          <Link href="/ParkingMapScreen">
            <Text style={styles.addCarButtonText}>Start to add car</Text>
          </Link>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  locationButton: {
    padding: 8,
  },
  greetingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
  },
  mainHeading: {
    fontSize: 28,
    fontWeight: '700',
    marginTop: 6,
    color: '#000',
  },
  vehicleToggleContainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginBottom: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  toggleButtonActive: {
    backgroundColor: '#2563eb',
  },
  toggleButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  toggleButtonTextActive: {
    color: '#FFF',
  },
  carImageContainer: {
    flex: 1,
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  carPlaceholder: {
    width: width * 0.7,
    height: width * 0.7 * 1.4,
    borderRadius: 8,
    position: 'absolute',
  },
  carImage: {
    width: width * 0.7,
    height: width * 0.7 * 1.4,
    borderRadius: 8,
  },
  addCarButton: {
    position: 'absolute',
    bottom: 60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
  },
  addCarButtonText: {
    color: '#FFF',
    textAlign: 'center',
    fontWeight: '600',
    paddingHorizontal: 8,
  },
});
