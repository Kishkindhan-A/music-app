import React, { createContext, useContext, useState, useEffect } from 'react';
import { Track, mockTracks } from '../constants/MockData';
import { Audio } from 'expo-av';

interface PlayerContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  volume: number;
  isShuffle: boolean;
  isRepeat: boolean;
  likedTracks: string[]; // array of track IDs
  playTrack: (track: Track) => void;
  pause: () => void;
  resume: () => void;
  playNext: () => void;
  playPrevious: () => void;
  seek: (positionMillis: number) => void;
  changeVolume: (val: number) => void;
  toggleShuffle: () => void;
  toggleRepeat: () => void;
  toggleLike: (trackId: string) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(70);
  const [isShuffle, setIsShuffle] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [likedTracks, setLikedTracks] = useState<string[]>([]);
  
  const [sound, setSound] = useState<Audio.Sound | null>(null);

  const playTrack = async (track: Track) => {
    try {
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }
      
      setCurrentTrack(track);
      setPosition(0);
      setDuration(0);
      
      if (track.audioUrl) {
        const { sound: newSound } = await Audio.Sound.createAsync(
          { uri: track.audioUrl },
          { shouldPlay: true, volume: volume / 100 },
          onPlaybackStatusUpdate
        );
        setSound(newSound);
        setIsPlaying(true);
      } else {
        // Fallback if no audioUrl
        setIsPlaying(true);
      }
    } catch (e) {
      console.log('Error playing track', e);
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis || 0);
      if (status.isPlaying !== isPlaying) {
        setIsPlaying(status.isPlaying);
      }
      if (status.didJustFinish) {
        if (isRepeat) {
          seek(0);
          resume();
        } else {
          playNext();
        }
      }
    } else {
      if (status.error) {
        console.log(`FATAL PLAYER ERROR: ${status.error}`);
      }
    }
  };

  const pause = async () => {
    if (sound) {
      await sound.pauseAsync();
    }
    setIsPlaying(false);
  };

  const resume = async () => {
    if (sound) {
      await sound.playAsync();
    }
    setIsPlaying(true);
  };

  const playNext = () => {
    if (!currentTrack) return;
    if (isShuffle) {
      const randomIndex = Math.floor(Math.random() * mockTracks.length);
      playTrack(mockTracks[randomIndex]);
      return;
    }
    const currentIndex = mockTracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % mockTracks.length;
    playTrack(mockTracks[nextIndex]);
  };

  const playPrevious = () => {
    if (!currentTrack) return;
    const currentIndex = mockTracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? mockTracks.length - 1 : currentIndex - 1;
    playTrack(mockTracks[prevIndex]);
  };

  const seek = async (positionMillis: number) => {
    if (sound) {
      await sound.setPositionAsync(positionMillis);
      setPosition(positionMillis);
    }
  };

  const changeVolume = async (val: number) => {
    setVolume(val);
    if (sound) {
      await sound.setVolumeAsync(val / 100);
    }
  };

  const toggleShuffle = () => setIsShuffle(!isShuffle);
  const toggleRepeat = () => setIsRepeat(!isRepeat);

  const toggleLike = (trackId: string) => {
    setLikedTracks(prev => 
      prev.includes(trackId) ? prev.filter(id => id !== trackId) : [...prev, trackId]
    );
  };

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        position,
        duration,
        volume,
        isShuffle,
        isRepeat,
        likedTracks,
        playTrack,
        pause,
        resume,
        playNext,
        playPrevious,
        seek,
        changeVolume,
        toggleShuffle,
        toggleRepeat,
        toggleLike,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
