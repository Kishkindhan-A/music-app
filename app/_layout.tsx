import { DarkTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { View, StyleSheet, Platform, SafeAreaView } from 'react-native';
import 'react-native-reanimated';

import { PlayerProvider } from '@/context/PlayerContext';
import { AppProvider, useAppContext } from '@/context/AppContext';
import LeftSidebar from '@/components/LeftSidebar';
import RightSidebar from '@/components/RightSidebar';
import BottomPlayer from '@/components/BottomPlayer';

export {
  ErrorBoundary,
} from 'expo-router';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <AppProvider>
      <PlayerProvider>
        <RootLayoutNav />
      </PlayerProvider>
    </AppProvider>
  );
}

function RootLayoutNav() {
  const isDesktop = Platform.OS === 'web' || Platform.OS === 'windows' || Platform.OS === 'macos';
  const { isRightSidebarOpen } = useAppContext();

  return (
    <ThemeProvider value={DarkTheme}>
      <SafeAreaView style={styles.safeArea}>
        {isDesktop ? (
          <View style={styles.desktopContainer}>
            {/* Top Section: Panes */}
            <View style={styles.panesContainer}>
              <LeftSidebar />
              <View style={styles.mainContent}>
                <Slot />
              </View>
              {isRightSidebarOpen && <RightSidebar />}
            </View>
            {/* Bottom Section: Player */}
            <BottomPlayer />
          </View>
        ) : (
          <Slot />
        )}
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#000',
  },
  desktopContainer: {
    flex: 1,
    backgroundColor: '#000',
    padding: 8,
    display: 'flex',
    flexDirection: 'column',
  },
  panesContainer: {
    flex: 1,
    flexDirection: 'row',
    marginBottom: 8,
  },
  mainContent: {
    flex: 1,
    backgroundColor: '#121212',
    borderRadius: 8,
    overflow: 'hidden',
  }
});
