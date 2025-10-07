import React, { FC } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter,router } from 'expo-router'

const Home: FC = () => {
  return (
    <View style={styles.container}>
      {/* Car image at the top */}
      <Image
        source={require('../assets/images/imagecar.png')} // Make sure this path is correct relative to Home.tsx
        style={styles.carImage}
        resizeMode="contain"
      />

      {/* Center Text */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>ParkVision</Text>
        <Text style={styles.subtitle}>Park Smarter, Drive Easier</Text>
      </View>

      {/* Next Button at the bottom */}
      <TouchableOpacity
      style={styles.button}
      onPress={() => router.push('/UserEntry')}
    >
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
    </View>
  );
};

export default Home;

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
    height: '40%', // Adjust this as needed
  },
  textContainer: {
    alignItems: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#444',
  },
  button: {
    backgroundColor: '#2563eb',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#8f59fc',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
  },
});
