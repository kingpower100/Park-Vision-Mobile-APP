import React, { useEffect, useState } from 'react';
import { Slot, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function Layout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  // Example: preload something or run setup
  useEffect(() => {
    async function prepare() {
      // Do any async tasks here (e.g. load fonts, get tokens, etc.)
      // For demo, just wait 1s
      await new Promise(resolve => setTimeout(resolve, 1000));
      setAppIsReady(true);
    }
    prepare();
  }, []);

  // Once app is ready, hide splash screen
  useEffect(() => {
    if (appIsReady) {
      SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  // If you want to show/hide the header conditionally, you can:
  // - Use useNavigation or useRoute in each screen
  // - Or define it per-screen in <Stack.Screen options={{ headerShown: false }} />

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />

      <View style={styles.container}>
        {/* 
          If you want a global stack layout with custom screens,
          you can declare them here. 
        */}
        <Stack>
          {/* 
            By default, expo-router automatically picks up 
            screens in app/*.tsx. 
            
            But if you want an explicit screen entry, do:
          */}
          <Stack.Screen name="index" options={{ title: 'Splash', headerShown: false,  }}   />
          <Stack.Screen name="Home" options={{ title: 'Home', headerShown: false,  }}   />
          <Stack.Screen name="UserEntry" options={{ title: 'UserEntry', headerShown: true,  }}   />
          <Stack.Screen name="login" options={{ title: 'login ', headerShown: true,  }}   />
          <Stack.Screen name="signup" options={{ title: 'signup', headerShown: true,  }}   />
          <Stack.Screen name="Parking" options={{ title: 'Parking', headerShown: true,  }}   />
          <Stack.Screen name="ParkingMapScreen" options={{ title: 'ParkingMapScreen', headerShown: true,  }}   />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="+not-found" />

          {/* 
            If you have additional nested routes, you can define them too:
            <Stack.Screen name="profile" options={{ ... }} />
          */}
        </Stack>

        {/* 
          Alternatively, you can replace <Stack> with a simple <Slot />
          if you don’t need to override any screen options globally.
          
          e.g. <Slot /> 
        */}
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
