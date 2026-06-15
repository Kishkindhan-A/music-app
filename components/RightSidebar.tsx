import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayer } from '@/context/PlayerContext';
import { useAppContext } from '@/context/AppContext';

export default function RightSidebar() {
  const { currentTrack, likedTracks, toggleLike } = usePlayer();
  const { toggleRightSidebar } = useAppContext();
  const [isFollowing, setIsFollowing] = useState(false);

  if (!currentTrack) {
    return (
      <View style={[styles.container, styles.emptyContainer]}>
        <Text style={styles.emptyText}>No track playing</Text>
      </View>
    );
  }

  const isLiked = likedTracks.includes(currentTrack.id);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {currentTrack.title}
        </Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.iconBtn}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#b3b3b3" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconBtn} onPress={toggleRightSidebar}>
            <Ionicons name="close" size={20} color="#b3b3b3" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={{ uri: currentTrack.albumUrl }} style={styles.albumArt} />
        
        <View style={styles.songInfo}>
          <View style={styles.songTextContainer}>
            <Text style={styles.songTitle} numberOfLines={2}>{currentTrack.title}</Text>
            <Text style={styles.artistName} numberOfLines={1}>{currentTrack.artist}</Text>
          </View>
          <View style={styles.actionIcons}>
            <TouchableOpacity style={styles.iconBtn} onPress={() => toggleLike(currentTrack.id)}>
              <Ionicons 
                name={isLiked ? "checkmark-circle" : "add-circle-outline"} 
                size={24} 
                color={isLiked ? "#1DB954" : "#b3b3b3"} 
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.creditsSection}>
          <View style={styles.creditsHeader}>
            <Text style={styles.creditsTitle}>Credits</Text>
            <Text style={styles.showAllText}>Show all</Text>
          </View>
          <View style={styles.creditItem}>
            <View>
              <Text style={styles.creditName}>{currentTrack.artist}</Text>
              <Text style={styles.creditRole}>Main Artist • Composer • Producer</Text>
            </View>
            <TouchableOpacity 
              style={[styles.followBtn, isFollowing && styles.followingBtn]}
              onPress={() => setIsFollowing(!isFollowing)}
            >
              <Text style={styles.followBtnText}>{isFollowing ? 'Following' : 'Follow'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    backgroundColor: '#121212',
    height: '100%',
    borderRadius: 8,
    marginLeft: 8,
    padding: 16,
    display: Platform.OS === 'web' ? 'flex' : 'none',
  },
  emptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#b3b3b3',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    flex: 1,
    marginRight: 8,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconBtn: {
    marginLeft: 12,
  },
  albumArt: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 16,
  },
  songInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  songTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  songTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  artistName: {
    color: '#b3b3b3',
    fontSize: 16,
  },
  actionIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  creditsSection: {
    backgroundColor: '#242424',
    borderRadius: 8,
    padding: 16,
  },
  creditsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  creditsTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  showAllText: {
    color: '#b3b3b3',
    fontSize: 12,
    fontWeight: '700',
  },
  creditItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  creditName: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  creditRole: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  followBtn: {
    borderWidth: 1,
    borderColor: '#b3b3b3',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  followingBtn: {
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  followBtnText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  }
});
