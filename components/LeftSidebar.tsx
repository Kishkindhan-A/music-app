import React from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { recentlyPlayed } from '@/constants/MockData';

export default function LeftSidebar() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="library" size={28} color="#b3b3b3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add" size={28} color="#b3b3b3" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {recentlyPlayed.map((playlist) => (
          <TouchableOpacity key={playlist.id} style={styles.playlistItem}>
            <Image source={{ uri: playlist.imageUrl }} style={styles.playlistImage} />
          </TouchableOpacity>
        ))}
        {/* Duplicate to fill out space */}
        {recentlyPlayed.map((playlist) => (
          <TouchableOpacity key={playlist.id + '_dup'} style={styles.playlistItem}>
            <Image source={{ uri: playlist.imageUrl }} style={styles.playlistImage} />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 72, // Very compact sidebar as in screenshot
    backgroundColor: '#121212',
    height: '100%',
    borderRadius: 8,
    marginRight: 8,
    display: Platform.OS === 'web' ? 'flex' : 'none',
  },
  header: {
    alignItems: 'center',
    paddingVertical: 16,
    gap: 16,
  },
  iconButton: {
    padding: 8,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 24,
  },
  playlistItem: {
    marginBottom: 12,
  },
  playlistImage: {
    width: 48,
    height: 48,
    borderRadius: 4,
  }
});
