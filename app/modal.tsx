import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, Image, Dimensions, ScrollView, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Slider from '@react-native-community/slider';
import { usePlayer } from '@/context/PlayerContext';

const { width } = Dimensions.get('window');

export default function PlayerModal() {
  const { currentTrack, isPlaying, togglePlay, progress, duration, seek } = usePlayer();
  const [isSaved, setIsSaved] = useState(false);

  if (!currentTrack) return null;

  const formatTime = (millis: number) => {
    const s = Math.floor(millis / 1000);
    return `${Math.floor(s / 60)}:${(s % 60).toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#505050', '#121212']} style={StyleSheet.absoluteFill} />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}><Feather name="chevron-down" size={32} color="white" /></TouchableOpacity>
        <Text style={styles.headerText}>PLAYING FROM SEARCH</Text>
        <TouchableOpacity><Ionicons name="ellipsis-horizontal" size={24} color="white" /></TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Image source={{ uri: currentTrack.image }} style={styles.albumArt} />

        <View style={styles.meta}>
          <View style={styles.titleWrap}>
            <Text style={styles.title}>{currentTrack.name}</Text>
            <Text style={styles.artist}>{currentTrack.artist}</Text>
          </View>
          <TouchableOpacity onPress={() => setIsSaved(!isSaved)}>
            <Ionicons name={isSaved ? "checkmark-circle" : "add-circle-outline"} size={32} color={isSaved ? "#1DB954" : "white"} />
          </TouchableOpacity>
        </View>

        <View style={styles.progress}>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration || 100}
            value={progress}
            onSlidingComplete={seek}
            minimumTrackTintColor="#FFFFFF"
            maximumTrackTintColor="rgba(255,255,255,0.2)"
            thumbTintColor="#FFFFFF"
          />
          <View style={styles.time}>
            <Text style={styles.timeText}>{formatTime(progress)}</Text>
            <Text style={styles.timeText}>{formatTime(duration || 0)}</Text>
          </View>
        </View>

        <View style={styles.controls}>
          <TouchableOpacity><MaterialCommunityIcons name="shuffle" size={24} color="white" /></TouchableOpacity>
          <TouchableOpacity><Ionicons name="play-skip-back-sharp" size={36} color="white" /></TouchableOpacity>
          <TouchableOpacity onPress={togglePlay}><Ionicons name={isPlaying ? "pause-circle" : "play-circle"} size={84} color="white" /></TouchableOpacity>
          <TouchableOpacity><Ionicons name="play-skip-forward-sharp" size={36} color="white" /></TouchableOpacity>
          <TouchableOpacity><MaterialCommunityIcons name="repeat" size={24} color="white" /></TouchableOpacity>
        </View>

        <View style={styles.lyricsCard}>
          <View style={styles.lyricsHeader}><Text style={styles.lyricsTitle}>Lyrics</Text></View>
          <Text style={styles.lyricsText} numberOfLines={5}>
            {`Looking at the stars\nI see you walking by\nMidnight city lights\nAre dancing in your eyes...`}
          </Text>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 50 },
  headerText: { color: 'white', fontSize: 10, fontWeight: '700', letterSpacing: 1 },
  content: { paddingHorizontal: 25, alignItems: 'center' },
  albumArt: { width: width - 50, height: width - 50, borderRadius: 8, marginVertical: 40 },
  meta: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 30 },
  titleWrap: { flex: 1 },
  title: { color: 'white', fontSize: 24, fontWeight: '700' },
  artist: { color: '#B3B3B3', fontSize: 18, marginTop: 4 },
  progress: { width: '100%', marginBottom: 20 },
  slider: { width: '108%', height: 40, marginLeft: -15 },
  time: { flexDirection: 'row', justifyContent: 'space-between', marginTop: -10 },
  timeText: { color: '#B3B3B3', fontSize: 12 },
  controls: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginBottom: 40 },
  lyricsCard: { width: '100%', backgroundColor: '#7e2d09', borderRadius: 12, padding: 20 },
  lyricsHeader: { marginBottom: 15 },
  lyricsTitle: { color: 'white', fontSize: 16, fontWeight: '700' },
  lyricsText: { color: 'white', fontSize: 20, fontWeight: '700', lineHeight: 28 },
});
