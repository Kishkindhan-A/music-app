import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface CompactCardProps {
  imageUrl: string;
  title: string;
  onPress?: () => void;
}

export default function CompactCard({ imageUrl, title, onPress }: CompactCardProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: imageUrl }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    overflow: 'hidden',
    height: 48,
    flex: 1, // To fill the grid item
    marginHorizontal: 4,
  },
  image: {
    width: 48,
    height: 48,
    backgroundColor: '#282828',
  },
  title: {
    flex: 1,
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    paddingHorizontal: 12,
  }
});
