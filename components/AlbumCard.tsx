import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface AlbumCardProps {
  imageUrl: string;
  title: string;
  subtitle: string;
  onPress?: () => void;
  size?: number;
  circularImage?: boolean;
}

export default function AlbumCard({ 
  imageUrl, 
  title, 
  subtitle, 
  onPress, 
  size = 140,
  circularImage = false
}: AlbumCardProps) {
  return (
    <TouchableOpacity style={[styles.container, { width: size }]} onPress={onPress}>
      <Image 
        source={{ uri: imageUrl }} 
        style={[
          styles.image, 
          { width: size, height: size },
          circularImage && { borderRadius: size / 2 }
        ]} 
      />
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text style={styles.subtitle} numberOfLines={2}>{subtitle}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
  },
  image: {
    marginBottom: 8,
    backgroundColor: '#282828', // Placeholder color while loading
  },
  title: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    color: '#b3b3b3',
    fontSize: 13,
    fontWeight: '400',
  }
});
