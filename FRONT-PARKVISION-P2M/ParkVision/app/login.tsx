import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Link } from 'expo-router';
export default function LoginScreen() {
  const router = useRouter();
  const [emailOrMobile, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (!emailOrMobile || !password) {
      Alert.alert('Erreur', 'Veuillez entrer votre email et votre mot de passe');
      return;
    }
    // Simulate successful login
    router.push('/Parking');
  };

  const handleForgotPassword = () => {
    // TODO: Implement your forgot password logic here
    console.log('Forgot Password pressed');
  };

  const handleSignUp = () => {
    router.push('/signup');
  };

  return (
    <View style={styles.container}>
      {/* Top Header Text (e.g., "Log In") */}
      <Text style={styles.title}>Log In</Text>

      {/* Logo or Icon (replace source with your own asset if needed) */}
      <View style={styles.logoContainer}>
        <MaterialCommunityIcons name="car-connected" size={80} color="#2563eb" />
      </View>

      {/* Welcome Message */}
      <Text style={styles.heading}>Welcome</Text>
      <Text style={styles.subHeading}>
        Find your spot effortlessly — park smarter, not harder.
      </Text>

      {/* Email or Mobile Number Field */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Email or Mobile Number</Text>
        <TextInput
          style={styles.input}
          placeholder="example@example.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={setEmail}
          value={emailOrMobile}
        />
      </View>

      {/* Password Field */}
      <View style={styles.inputGroup}>
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordRow}>
        
          <TextInput
            style={[styles.input, { flex: 1 }]}
            placeholder="********"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            autoCapitalize="none"
            onChangeText={setPassword}
            value={password}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIconContainer}
          >
            <MaterialCommunityIcons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#999"
            />
          </TouchableOpacity>
          
        </View>
        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={handleForgotPassword}
        >
          <Text style={styles.forgotPasswordText}>Forget Password</Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Link href="/ParkingMapScreen" asChild></Link>
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      {/* Footer - Sign Up Link */}
      <View style={styles.footerContainer}>
        <Text style={styles.footerText}>Don’t have an account?</Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Link href="/signup">
            <Text style={styles.signUpText}> Sign Up</Text>
          </Link>
        </TouchableOpacity>
      </View>
      <Link href="/Parking" asChild>
  <TouchableOpacity style={styles.loginButton}>
    <Text style={styles.loginButtonText}>Test</Text>
  </TouchableOpacity>
</Link>
    </View>
  );
}

/** Styles */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    textAlign: 'center',
    marginBottom: 16,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#000',
    marginBottom: 4,
  },
  subHeading: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: '#000',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: '#000',
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',

  },
  eyeIconContainer: {
    paddingHorizontal: 8,
    paddingVertical: 6,
  
  },
  forgotPasswordButton: {
    marginTop: 6,
    alignSelf: 'flex-end',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#1B73E8',
  },
  loginButton: {
    backgroundColor: '#1B73E8',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  loginButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  footerText: {
    fontSize: 14,
    color: '#000',
  },
  signUpText: {
    fontSize: 14,
    color: '#1B73E8',
    fontWeight: '600',
  },
});
