import React, { useState } from 'react';
import { StyleSheet, ScrollView, TextInput, TouchableOpacity, Dimensions, Image, Platform } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const CATEGORIES = [
  { id: '1', title: 'Music', color: '#dc148c', image: 'https://picsum.photos/200?random=20' },
  { id: '2', title: 'Podcasts', color: '#006450', image: 'https://picsum.photos/200?random=21' },
  { id: '3', title: 'Live Events', color: '#8400e7', image: 'https://picsum.photos/200?random=22' },
  { id: '4', title: 'Made For You', color: '#1e3264', image: 'https://picsum.photos/200?random=23' },
  { id: '5', title: 'New Releases', color: '#e8115b', image: 'https://picsum.photos/200?random=24' },
  { id: '6', title: 'Hindi', color: '#e1118c', image: 'https://picsum.photos/200?random=25' },
];

export default function SearchScreen() {
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 150 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Search</Text>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={24} color="#121212" />
            <TextInput
              placeholder="What do you want to listen to?"
              placeholderTextColor="#535353"
              style={styles.input}
            />
          </View>
        </View>

        <Text style={styles.sectionTitle}>Browse all</Text>
        <View style={styles.grid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity key={cat.id} style={[styles.card, { backgroundColor: cat.color }]}>
              <Text style={styles.cardText}>{cat.title}</Text>
              <Image source={{ uri: cat.image }} style={styles.cardImage} />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#121212' },
  header: { paddingTop: Platform.OS === 'ios' ? 60 : 50, paddingHorizontal: 16 },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 20 },
  searchBar: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', height: 48, borderRadius: 4, paddingHorizontal: 12 },
  input: { flex: 1, marginLeft: 10, fontSize: 16, fontWeight: '600', color: 'black' },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: 'white', marginHorizontal: 16, marginTop: 30, marginBottom: 15 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, justifyContent: 'space-between' },
  card: { width: (width - 48) / 2, height: 95, borderRadius: 4, padding: 12, marginBottom: 16, overflow: 'hidden' },
  cardText: { color: 'white', fontSize: 16, fontWeight: 'bold', width: '70%' },
  cardImage: { width: 60, height: 60, position: 'absolute', bottom: -5, right: -15, transform: [{ rotate: '25deg' }], borderRadius: 4 },
});
