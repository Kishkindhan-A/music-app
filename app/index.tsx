import React, { useRef } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity, TextInput, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AlbumCard from '@/components/AlbumCard';
import CompactCard from '@/components/CompactCard';
import { recentlyPlayed, madeForYou, popularAlbums, mockTracks, Track } from '@/constants/MockData';
import { usePlayer } from '@/context/PlayerContext';
import { useAppContext } from '@/context/AppContext';

export default function CenterView() {
  const { playTrack } = usePlayer();
  const { activeFilter, setActiveFilter, searchQuery, setSearchQuery } = useAppContext();
  const scrollViewRef = useRef<ScrollView>(null);

  const handlePlayMockTrack = () => {
    const randomTrack = mockTracks[Math.floor(Math.random() * mockTracks.length)];
    playTrack(randomTrack);
  };

  const handleHomeClick = () => {
    setSearchQuery('');
    setActiveFilter('All');
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const filteredRecent = recentlyPlayed.filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Top Navigation Bar */}
      <View style={styles.topNav}>
        <View style={styles.topNavLeft}>
          <TouchableOpacity style={styles.navIcon}><Ionicons name="chevron-back" size={24} color="#b3b3b3" /></TouchableOpacity>
          <TouchableOpacity style={styles.navIcon}><Ionicons name="chevron-forward" size={24} color="#535353" /></TouchableOpacity>
        </View>

        <View style={styles.searchSection}>
          <TouchableOpacity style={styles.homeBtn} onPress={handleHomeClick}>
            <Ionicons name="home" size={20} color="#fff" />
          </TouchableOpacity>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#b3b3b3" style={{ marginHorizontal: 12 }} />
            <TextInput 
              style={styles.searchInput}
              placeholder="What do you want to play?"
              placeholderTextColor="#b3b3b3"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close" size={20} color="#b3b3b3" style={{ marginHorizontal: 12 }} />
              </TouchableOpacity>
            )}
            <Ionicons name="albums-outline" size={20} color="#b3b3b3" style={{ marginHorizontal: 12 }} />
          </View>
        </View>

        <View style={styles.topNavRight}>
          <TouchableOpacity style={styles.rightIcon}><Ionicons name="notifications-outline" size={20} color="#b3b3b3" /></TouchableOpacity>
          <TouchableOpacity style={styles.rightIcon}><Ionicons name="people-outline" size={20} color="#b3b3b3" /></TouchableOpacity>
          <View style={styles.profileBadge}>
            <Text style={styles.profileText}>K</Text>
          </View>
        </View>
      </View>

      <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={['rgba(32,32,32,0.8)', 'rgba(18,18,18,1)']}
          style={styles.headerGradient}
        >
          {/* Filter Chips */}
          <View style={styles.filterChips}>
            {['All', 'Music', 'Podcasts'].map(filter => (
              <TouchableOpacity 
                key={filter}
                style={[styles.chip, activeFilter === filter && styles.chipActive]}
                onPress={() => setActiveFilter(filter)}
              >
                <Text style={activeFilter === filter ? styles.chipTextActive : styles.chipText}>{filter}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Compact Grid */}
          <View style={styles.gridContainer}>
            {filteredRecent.length > 0 ? filteredRecent.map((item) => (
              <View key={item.id} style={{ width: '33.33%' }}>
                <CompactCard 
                  imageUrl={item.imageUrl} 
                  title={item.name} 
                  onPress={handlePlayMockTrack}
                />
              </View>
            )) : (
              <Text style={{color: '#b3b3b3', padding: 16}}>No recent plays matching "{searchQuery}"</Text>
            )}
          </View>
        </LinearGradient>

        {/* Section: Made For User */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.sectionSubtitle}>Made For</Text>
              <Text style={styles.sectionTitle}>KISHKINDHAN A</Text>
            </View>
            <Text style={styles.showAllText}>Show all</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {madeForYou.map((playlist) => (
              <AlbumCard 
                key={playlist.id}
                imageUrl={playlist.imageUrl}
                title={playlist.name}
                subtitle="Non-stop music based on your favorite songs."
                onPress={handlePlayMockTrack}
                size={160}
              />
            ))}
          </ScrollView>
        </View>

        {/* Section: Recommended Stations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recommended Stations</Text>
            <Text style={styles.showAllText}>Show all</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {popularAlbums.map((album) => (
              <AlbumCard 
                key={album.id}
                imageUrl={album.imageUrl}
                title={`${album.creator} Radio`}
                subtitle="By Spotify"
                onPress={handlePlayMockTrack}
                size={160}
                circularImage={true}
              />
            ))}
          </ScrollView>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  topNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#121212',
    zIndex: 10,
  },
  topNavLeft: {
    flexDirection: 'row',
    gap: 8,
  },
  navIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 600,
    gap: 8,
  },
  homeBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#282828',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBar: {
    flex: 1,
    height: 48,
    backgroundColor: '#282828',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    height: '100%',
  },
  topNavRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  rightIcon: {
    padding: 4,
  },
  profileBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#a3a3a3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    color: '#000',
    fontWeight: '700',
  },
  scrollContent: {
    flexGrow: 1,
  },
  headerGradient: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  filterChips: {
    flexDirection: 'row',
    marginBottom: 24,
    gap: 8,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  chipActive: {
    backgroundColor: '#fff',
  },
  chipText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  chipTextActive: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -4,
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  sectionSubtitle: {
    color: '#b3b3b3',
    fontSize: 12,
    marginBottom: 4,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
  },
  showAllText: {
    color: '#b3b3b3',
    fontSize: 14,
    fontWeight: '700',
  }
});
