import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import MiniPlayer from '@/components/MiniPlayer';
import { BlurView } from 'expo-blur';

function TabIcon({ name, focused, color }: any) {
  return <MaterialCommunityIcons name={name} size={28} color={color} style={{ marginBottom: -3 }} />;
}

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#b3b3b3',
          tabBarStyle: {
            backgroundColor: '#000',
            borderTopWidth: 0,
            height: Platform.OS === 'ios' ? 90 : 70,
            paddingBottom: Platform.OS === 'ios' ? 30 : 12,
            elevation: 0,
            position: 'absolute',
          },
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 11,
            fontWeight: '500',
            marginTop: 4,
          }
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color, focused }) => <TabIcon name={focused ? "home-variant" : "home-variant-outline"} color={color} />,
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ color, focused }) => <TabIcon name={focused ? "magnify" : "magnify"} color={color} />,
          }}
        />
        <Tabs.Screen
          name="library"
          options={{
            title: 'Your Library',
            tabBarIcon: ({ color, focused }) => <TabIcon name={focused ? "library-shelves" : "library-outline"} color={color} />,
          }}
        />
        <Tabs.Screen name="two" options={{ href: null }} />
      </Tabs>

      {/* MiniPlayer floats exactly above the Tab Bar */}
      <MiniPlayer />
    </View>
  );
}
