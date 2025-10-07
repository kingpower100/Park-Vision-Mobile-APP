import React, { FC, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import { Link } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as Linking from "expo-linking";
const UserEntry: FC = () => {
  const [searchText, setSearchText] = useState(''); // 🔍 Track input
  const openInGoogleMaps = (query: string) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
    Linking.openURL(url);
  };
  return (
    <View style={styles.container}>
      {/* Car image at the top */}
      <Image
        source={require('../assets/images/imagecar.png')}
        style={styles.carImage}
        resizeMode="contain"
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#555" style={styles.searchIcon} />
        <TextInput
        placeholder="enter city , place or post code"
        placeholderTextColor="#222"
        style={styles.searchInput}
        value={searchText}
        onChangeText={setSearchText}
        onSubmitEditing={() => openInGoogleMaps(searchText)} // 👈 Add this
        returnKeyType="search"
      />
      </View>

      {/* Buttons */}
      <View style={styles.buttonsContainer}>
        <Link href="/login" asChild>
          <TouchableOpacity style={styles.loginButton}>
            <Text style={styles.buttonText}>Log In</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/signup" asChild>
          <TouchableOpacity style={styles.signUpButton}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
};

export default UserEntry;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 50,
  },
  carImage: {
    width: '100%',
    height: '40%',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#dbeafe',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 12,
    alignItems: 'center',
    width: '85%',
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  buttonsContainer: {
    width: '85%',
    marginTop: 20,
  },
  loginButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#0066FF',
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  signUpButton: {
    width: '100%',
    padding: 15,
    backgroundColor: '#79B2FA',
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
  },
});
