import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/use-color-scheme';

export const unstable_settings = {
  anchor: '(tabs)',
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: true, headerBackVisible: false, headerTitle: 'Welcome' }} />
        <Stack.Screen name="prescreen" options={{ headerShown: true, headerBackVisible: true, headerTitle: 'Prescreen' }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false, headerBackVisible: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal', headerTitle: 'Daily Survey', headerBackTitle: 'Home', title: 'Daily Survey' }} />
      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
