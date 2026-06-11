import React from 'react';
import { StyleSheet, TouchableOpacity, Image, Dimensions, Platform } from 'react-native';
import { Text, View } from './Themed';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { usePlayer } from '@/context/PlayerContext';

const { width } = Dimensions.get('window');

export default function MiniPlayer() {
  const { currentTrack, isPlaying, togglePlay, progress, duration } = usePlayer();

  if (!currentTrack) return null;

  const progressPercent = duration > 0 ? (progress / duration) * 100 : 0;

  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={1}
      onPress={() => router.push('/modal')}
    >
      <View style={styles.content}>
        <Image source={{ uri: currentTrack.image }} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.title} numberOfLines={1}>{currentTrack.name}</Text>
          <Text style={styles.artist} numberOfLines={1}>{currentTrack.artist}</Text>
        </View>

        <View style={styles.rightIcons}>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="devices" size={22} color="#1DB954" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={(e) => {
            e.stopPropagation();
            togglePlay();
          }}>
            <Ionicons name={isPlaying ? "pause" : "play"} size={28} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Ultra-thin Spotify line progress */}
      <View style={styles.progressBarBg}>
        <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 90 : 70, // Matches exactly the bottom bar height
    left: 8,
    right: 8,
    height: 56,
    backgroundColor: '#3f3f3f', // Dark gray Spotify style
    borderRadius: 8,
    overflow: 'hidden',
    zIndex: 999,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    backgroundColor: 'transparent',
  },
  image: {
    width: 38,
    height: 38,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
    marginLeft: 10,
    backgroundColor: 'transparent',
  },
  title: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
  },
  artist: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconButton: {
    padding: 10,
    backgroundColor: 'transparent',
  },
  progressBarBg: {
    height: 2,
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  progressFill: {
    height: 2,
    backgroundColor: 'white',
  }
});
