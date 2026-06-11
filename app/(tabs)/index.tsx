import React, { useEffect, useState } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, ActivityIndicator, Dimensions, Platform, StatusBar } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { spotifyService } from '@/services/SpotifyService';
import { usePlayer } from '@/context/PlayerContext';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { playTrack } = usePlayer();
  const [data, setData] = useState({ releases: [], featured: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      const homeData = await spotifyService.fetchHomeData();
      setData(homeData);
      setLoading(false);
    }
    load();
  }, []);

  if (loading) return <View style={[styles.container, { justifyContent: 'center' }]}><ActivityIndicator size="small" color="#1DB954" /></View>;

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />
      <LinearGradient colors={['#1e3a8a', '#121212']} style={StyleSheet.absoluteFill} start={{ x: 0, y: 0 }} end={{ x: 0, y: 0.4 }} />

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        {/* Header with Spotify Chips */}
        <View style={styles.header}>
          <View style={styles.topRow}>
            <View style={styles.profileCircle}><Text style={styles.profileText}>K</Text></View>
            <TouchableOpacity style={[styles.chip, styles.chipActive]}><Text style={styles.chipTextActive}>All</Text></TouchableOpacity>
            <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>Music</Text></TouchableOpacity>
            <TouchableOpacity style={styles.chip}><Text style={styles.chipText}>Podcasts</Text></TouchableOpacity>
          </View>
        </View>

        {/* 2-Column Recently Played Grid */}
        <View style={styles.grid}>
          {data.featured.slice(0, 8).map((item) => (
            <TouchableOpacity key={item.id} style={styles.gridItem}>
              <Image source={{ uri: item.images[0]?.url }} style={styles.gridImage} />
              <Text style={styles.gridLabel} numberOfLines={2}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Section title="Jump back in" data={data.releases} playTrack={playTrack} />
        <Section title="Your favorite artists" data={data.releases.slice().reverse()} playTrack={playTrack} circular={true} />
        <Section title="Made For You" data={data.featured} playTrack={playTrack} />
        <Section title="Recommended for today" data={data.releases} playTrack={playTrack} />
      </ScrollView>
    </View>
  );
}

const Section = ({ title, data, playTrack, circular = false }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <FlatList
      data={data}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => 's-' + item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.card}
          onPress={() => playTrack({
            id: item.id,
            name: item.name,
            artist: item.artists?.[0]?.name || 'Spotify',
            image: item.images?.[0]?.url,
            url: item.preview_url || '',
          })}
        >
          <Image source={{ uri: item.images?.[0]?.url }} style={[styles.cardImage, circular && styles.circularArt]} />
          <Text style={[styles.cardTitle, circular && { textAlign: 'center' }]} numberOfLines={1}>{item.name}</Text>
          <Text style={[styles.cardSubtitle, circular && { textAlign: 'center' }]} numberOfLines={2}>
            {item.artists?.[0]?.name || item.description}
          </Text>
        </TouchableOpacity>
      )}
    />
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  scrollView: { flex: 1 },
  header: { paddingTop: Platform.OS === 'ios' ? 60 : 50, paddingHorizontal: 16, marginBottom: 20 },
  topRow: { flexDirection: 'row', alignItems: 'center' },
  profileCircle: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f59e0b', justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  profileText: { color: 'black', fontWeight: 'bold', fontSize: 14 },
  chip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#282828', marginRight: 8 },
  chipActive: { backgroundColor: '#1DB954' },
  chipText: { color: 'white', fontSize: 13, fontWeight: '500' },
  chipTextActive: { color: 'black', fontSize: 13, fontWeight: '500' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, justifyContent: 'space-between', marginTop: 10 },
  gridItem: { width: '48.5%', height: 56, backgroundColor: 'rgba(255,255,255,0.08)', marginBottom: 8, flexDirection: 'row', alignItems: 'center', borderRadius: 4, overflow: 'hidden' },
  gridImage: { width: 56, height: 56 },
  gridLabel: { color: 'white', fontSize: 11, fontWeight: 'bold', marginLeft: 8, flex: 1 },
  section: { marginTop: 30, paddingLeft: 16 },
  sectionTitle: { fontSize: 22, fontWeight: 'bold', color: 'white', marginBottom: 15 },
  card: { width: 155, marginRight: 16 },
  cardImage: { width: 155, height: 155, borderRadius: 4 },
  circularArt: { borderRadius: 77.5 },
  cardTitle: { color: 'white', fontSize: 13, fontWeight: 'bold', marginTop: 10 },
  cardSubtitle: { color: '#B3B3B3', fontSize: 12, marginTop: 4, lineHeight: 16 },
});
