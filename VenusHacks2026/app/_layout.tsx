import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';


// This file controls the navigation bar

export default function TabLayout() {
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
