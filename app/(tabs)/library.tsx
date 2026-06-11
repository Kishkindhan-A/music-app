import React, { useState } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, Dimensions, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const FILTERS = ['Playlists', 'Artists', 'Albums', 'Podcasts & Shows'];

export default function LibraryScreen() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      {/* Fixed Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <TouchableOpacity style={styles.profileCircle}>
            <Text style={styles.profileInitial}>K</Text>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Your Library</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="search" size={26} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="add" size={30} color="white" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
          {FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterChip, selectedFilter === filter && styles.filterChipActive]}
              onPress={() => setSelectedFilter(selectedFilter === filter ? null : filter)}
            >
              <Text style={[styles.filterText, selectedFilter === filter && styles.filterTextActive]}>{filter}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} stickyHeaderIndices={[0]}>
        {/* Sort and View Toggle Row */}
        <View style={styles.sortingRow}>
          <TouchableOpacity style={styles.sortButton}>
            <MaterialCommunityIcons name="swap-vertical" size={18} color="white" />
            <Text style={styles.sortText}>Recents</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialCommunityIcons name="view-grid-outline" size={20} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <TouchableOpacity style={styles.libraryItem}>
            <View style={[styles.itemImage, styles.likedSongsBg]}>
              <Ionicons name="heart" size={28} color="white" />
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>Liked Songs</Text>
              <Text style={styles.itemSubtitle}>
                <Ionicons name="pin" size={12} color="#1DB954" /> Playlist • 142 songs
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.libraryItem}>
            <Image source={{ uri: 'https://picsum.photos/200?random=50' }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>New Episodes</Text>
              <Text style={styles.itemSubtitle}>Updated 2 days ago</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.libraryItem}>
            <Image source={{ uri: 'https://picsum.photos/200?random=51' }} style={[styles.itemImage, styles.artistImage]} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>The Weeknd</Text>
              <Text style={styles.itemSubtitle}>Artist</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.libraryItem}>
            <Image source={{ uri: 'https://picsum.photos/200?random=52' }} style={styles.itemImage} />
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>Hurry Up, We're Dreaming</Text>
              <Text style={styles.itemSubtitle}>Album • M83</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ height: 160 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    paddingTop: Platform.OS === 'ios' ? 60 : 50,
    backgroundColor: '#121212',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
    elevation: 4,
    zIndex: 10,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
  profileCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  profileInitial: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 14,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  iconButton: {
    marginLeft: 15,
  },
  filterScroll: {
    marginBottom: 10,
    backgroundColor: 'transparent',
  },
  filterChip: {
    backgroundColor: '#282828',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
  },
  filterChipActive: {
    backgroundColor: '#1DB954',
  },
  filterText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '500',
  },
  filterTextActive: {
    color: 'black',
  },
  sortingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#121212',
  },
  sortButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    color: 'white',
    marginLeft: 8,
    fontSize: 13,
    fontWeight: '500',
  },
  content: {
    paddingHorizontal: 16,
    backgroundColor: 'transparent',
  },
  libraryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: 'transparent',
  },
  itemImage: {
    width: 64,
    height: 64,
    borderRadius: 4,
  },
  artistImage: {
    borderRadius: 32,
  },
  likedSongsBg: {
    backgroundColor: '#450af5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
    backgroundColor: 'transparent',
  },
  itemTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  itemSubtitle: {
    color: '#b3b3b3',
    fontSize: 13,
    marginTop: 4,
  },
});
