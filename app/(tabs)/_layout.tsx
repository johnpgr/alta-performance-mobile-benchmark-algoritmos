import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/constants/Colors';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors['dark'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
            backgroundColor: '#070a12',
          },
          default: {
            backgroundColor: '#070a12'
          },
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Benchmark',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="chart.bar" color={color} />,
        }}
      />
      <Tabs.Screen
        name="visualizations"
        options={{
          title: 'Visualizações',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="play.circle" color={color} />,
        }}
      />
    </Tabs>
  );
}
