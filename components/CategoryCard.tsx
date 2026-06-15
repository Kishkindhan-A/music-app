import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

interface CategoryCardProps {
  title: string;
  color: string;
  imageUrl: string;
}

export default function CategoryCard({ title, color, imageUrl }: CategoryCardProps) {
  // 2 columns with some padding
  const windowWidth = Dimensions.get('window').width;
  const cardWidth = (windowWidth - 48) / 2;

  return (
    <TouchableOpacity 
      style={[styles.container, { backgroundColor: color, width: cardWidth }]}
      activeOpacity={0.8}
    >
      <Text style={styles.title}>{title}</Text>
      <Image source={{ uri: imageUrl }} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    maxWidth: '70%',
  },
  image: {
    width: 65,
    height: 65,
    position: 'absolute',
    bottom: -5,
    right: -15,
    transform: [{ rotate: '25deg' }],
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  }
});
