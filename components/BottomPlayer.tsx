import React from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, Platform } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { usePlayer } from '@/context/PlayerContext';
import { useAppContext } from '@/context/AppContext';

const formatTime = (millis: number) => {
  if (!millis) return '0:00';
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default function BottomPlayer() {
  const { 
    currentTrack, 
    isPlaying, 
    pause, 
    resume, 
    playNext, 
    playPrevious, 
    position, 
    duration, 
    seek,
    volume,
    changeVolume,
    isShuffle,
    toggleShuffle,
    isRepeat,
    toggleRepeat,
    likedTracks,
    toggleLike
  } = usePlayer();

  const { isRightSidebarOpen, toggleRightSidebar } = useAppContext();

  if (!currentTrack) {
    return <View style={styles.container} />;
  }

  const isLiked = likedTracks.includes(currentTrack.id);

  return (
    <View style={styles.container}>
      {/* Left: Track Info */}
      <View style={styles.leftSection}>
        <Image source={{ uri: currentTrack.albumUrl }} style={styles.albumArt} />
        <View style={styles.trackInfo}>
          <Text style={styles.trackTitle} numberOfLines={1}>{currentTrack.title}</Text>
          <Text style={styles.trackArtist} numberOfLines={1}>{currentTrack.artist}</Text>
        </View>
        <TouchableOpacity style={styles.likeBtn} onPress={() => toggleLike(currentTrack.id)}>
          <Ionicons 
            name={isLiked ? "checkmark-circle" : "add-circle-outline"} 
            size={20} 
            color={isLiked ? "#1DB954" : "#b3b3b3"} 
          />
        </TouchableOpacity>
      </View>

      {/* Center: Playback Controls */}
      <View style={styles.centerSection}>
        <View style={styles.controlsRow}>
          <TouchableOpacity style={styles.controlBtn} onPress={toggleShuffle}>
            <Ionicons name="shuffle" size={20} color={isShuffle ? "#1DB954" : "#b3b3b3"} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} onPress={playPrevious}>
            <Ionicons name="play-skip-back" size={20} color="#b3b3b3" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.playBtn}
            onPress={() => isPlaying ? pause() : resume()}
          >
            <Ionicons name={isPlaying ? "pause" : "play"} size={20} color="#000" style={{ marginLeft: isPlaying ? 0 : 2 }} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} onPress={playNext}>
            <Ionicons name="play-skip-forward" size={20} color="#b3b3b3" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.controlBtn} onPress={toggleRepeat}>
            <Ionicons name="repeat" size={20} color={isRepeat ? "#1DB954" : "#b3b3b3"} />
          </TouchableOpacity>
        </View>
        <View style={styles.progressRow}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Slider
            style={styles.slider}
            minimumValue={0}
            maximumValue={duration || 100}
            value={position || 0}
            onSlidingComplete={seek}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#535353"
            thumbTintColor="#fff"
          />
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>

      {/* Right: Extra Controls */}
      <View style={styles.rightSection}>
        <TouchableOpacity style={styles.extraBtn} onPress={toggleRightSidebar}>
          <MaterialCommunityIcons 
            name="play-box-outline" 
            size={20} 
            color={isRightSidebarOpen ? "#1DB954" : "#b3b3b3"} 
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.extraBtn}>
          <MaterialCommunityIcons name="microphone-variant" size={18} color="#b3b3b3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.extraBtn}>
          <Ionicons name="menu" size={20} color="#b3b3b3" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.extraBtn}>
          <MaterialCommunityIcons name="devices" size={18} color="#b3b3b3" />
        </TouchableOpacity>
        <View style={styles.volumeContainer}>
          <TouchableOpacity style={styles.extraBtn} onPress={() => changeVolume(volume === 0 ? 70 : 0)}>
            <Ionicons 
              name={volume === 0 ? "volume-mute" : volume < 50 ? "volume-low" : "volume-medium"} 
              size={20} 
              color="#b3b3b3" 
            />
          </TouchableOpacity>
          <Slider
            style={styles.volumeSlider}
            minimumValue={0}
            maximumValue={100}
            value={volume}
            onValueChange={changeVolume}
            minimumTrackTintColor="#fff"
            maximumTrackTintColor="#535353"
            thumbTintColor="#fff"
          />
        </View>
        <TouchableOpacity style={styles.extraBtn}>
          <Ionicons name="expand" size={18} color="#b3b3b3" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 90,
    backgroundColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    borderTopWidth: Platform.OS === 'web' ? 0 : 1,
    borderTopColor: '#282828',
  },
  leftSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: 180,
  },
  albumArt: {
    width: 56,
    height: 56,
    borderRadius: 4,
    marginRight: 12,
  },
  trackInfo: {
    justifyContent: 'center',
    marginRight: 12,
  },
  trackTitle: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  trackArtist: {
    color: '#b3b3b3',
    fontSize: 12,
  },
  likeBtn: {
    padding: 4,
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
    maxWidth: 722,
  },
  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 16,
  },
  controlBtn: {
    padding: 8,
  },
  playBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  timeText: {
    color: '#b3b3b3',
    fontSize: 11,
    fontVariant: ['tabular-nums'],
    width: 40,
    textAlign: 'center',
  },
  slider: {
    flex: 1,
    height: 12,
    marginHorizontal: 8,
  },
  rightSection: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    minWidth: 180,
    gap: 4,
  },
  extraBtn: {
    padding: 8,
  },
  volumeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 120,
  },
  volumeSlider: {
    flex: 1,
    height: 12,
  }
});
