import React, { useState } from 'react';
import { StyleSheet, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function TabTwoScreen() {
  const eqBands = ['31', '62', '125', '250', '500', '1k', '2k', '4k', '8k', '16k'];
  const [activeTab, setActiveTab] = useState('EQ');
  const [isOn, setIsOn] = useState(true);
  const [preset, setPreset] = useState('ROCK');
  
  // Mock equalizer heights
  const [eqLevels, setEqLevels] = useState(eqBands.map(() => Math.random() * 80 + 10));

  const toggleTab = (tab: string) => setActiveTab(tab);
  
  const handleEqTouch = (index: number) => {
    // Randomize just to show interactivity
    const newLevels = [...eqLevels];
    newLevels[index] = Math.random() * 80 + 10;
    setEqLevels(newLevels);
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#1a1a1a', '#000000']}
        style={StyleSheet.absoluteFill}
      />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Ionicons name="arrow-back" size={24} color="#ccc" />
        <Text style={styles.headerText}>EQUALIZER</Text>
        <TouchableOpacity onPress={() => setIsOn(!isOn)}>
          <Ionicons name="power" size={24} color={isOn ? "#ff9100" : "#555"} />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Presets and Main Knobs Area */}
        <View style={styles.presetContainer}>
          <TouchableOpacity style={styles.presetBox} onPress={() => setPreset(preset === 'ROCK' ? 'FLAT' : 'ROCK')}>
            <Text style={styles.presetText}>{preset}</Text>
            <Ionicons name="chevron-down" size={16} color="#aaa" />
          </TouchableOpacity>
        </View>

        <View style={styles.knobContainer}>
          {/* Bass Knob */}
          <View style={styles.knobWrapper}>
            <TouchableOpacity style={styles.knob} activeOpacity={0.8}>
              <View style={[styles.knobIndicator, { transform: [{ rotate: '-45deg' }] }]} />
            </TouchableOpacity>
            <Text style={styles.knobLabel}>BASS</Text>
          </View>

          {/* Treble Knob */}
          <View style={styles.knobWrapper}>
            <TouchableOpacity style={styles.knob} activeOpacity={0.8}>
              <View style={[styles.knobIndicator, { transform: [{ rotate: '45deg' }] }]} />
            </TouchableOpacity>
            <Text style={styles.knobLabel}>TREBLE</Text>
          </View>
        </View>

        {/* EQ Bands */}
        <View style={[styles.eqContainer, { opacity: isOn ? 1 : 0.4 }]}>
          {eqBands.map((band, index) => (
            <View key={band} style={styles.eqBandWrapper}>
              <Text style={styles.eqBandDb}>0</Text>
              
              {/* Slider Track */}
              <TouchableOpacity 
                style={styles.eqSliderTrack}
                activeOpacity={0.9}
                onPress={() => isOn && handleEqTouch(index)}
              >
                <View style={[styles.eqSliderFill, { height: `${eqLevels[index]}%` }]} />
                <View style={[styles.eqSliderThumb, { bottom: `${eqLevels[index]}%` }]} />
              </TouchableOpacity>
              
              <Text style={styles.eqBandHz}>{band}</Text>
            </View>
          ))}
        </View>

        {/* Bottom Toggles */}
        <View style={styles.togglesContainer}>
          {['EQ', 'TONE', 'LIMIT'].map((tab) => (
            <TouchableOpacity 
              key={tab}
              style={activeTab === tab ? styles.toggleButtonActive : styles.toggleButton}
              onPress={() => toggleTab(tab)}
            >
              <Text style={activeTab === tab ? styles.toggleTextActive : styles.toggleText}>{tab}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 20 : 50,
    paddingBottom: 20,
    backgroundColor: 'transparent',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.05)',
  },
  headerText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 2,
  },
  presetContainer: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: 'transparent',
  },
  presetBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  presetText: {
    color: '#fff',
    fontWeight: 'bold',
    marginRight: 10,
    letterSpacing: 1,
  },
  knobContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 40,
    backgroundColor: 'transparent',
    paddingHorizontal: 40,
  },
  knobWrapper: {
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  knob: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#1a1a1a',
    borderWidth: 2,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
    ...Platform.select({
      web: { boxShadow: '0px 5px 15px rgba(0,0,0,1)' },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
        shadowRadius: 10,
        elevation: 10,
      }
    })
  },
  knobIndicator: {
    width: 4,
    height: 20,
    backgroundColor: '#ff9100',
    position: 'absolute',
    top: 5,
    borderRadius: 2,
  },
  knobLabel: {
    color: '#aaa',
    marginTop: 15,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  eqContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 50,
    height: 250,
    backgroundColor: 'transparent',
  },
  eqBandWrapper: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: 'transparent',
  },
  eqBandDb: {
    color: '#777',
    fontSize: 10,
    marginBottom: 10,
  },
  eqSliderTrack: {
    flex: 1,
    width: 20, // wider for touch
    backgroundColor: 'transparent',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  eqSliderFill: {
    width: 6,
    backgroundColor: '#ff9100',
    borderRadius: 3,
    opacity: 0.8,
    position: 'absolute',
    bottom: 0,
  },
  eqSliderThumb: {
    width: 20,
    height: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    position: 'absolute',
    borderWidth: 2,
    borderColor: '#ff9100',
  },
  eqBandHz: {
    color: '#aaa',
    fontSize: 10,
    marginTop: 10,
    fontWeight: 'bold',
  },
  togglesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 40,
    backgroundColor: 'transparent',
  },
  toggleButton: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#333',
    marginHorizontal: 5,
    borderRadius: 20,
  },
  toggleButtonActive: {
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#ff9100',
    backgroundColor: 'rgba(255, 145, 0, 0.1)',
    marginHorizontal: 5,
    borderRadius: 20,
  },
  toggleText: {
    color: '#777',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  },
  toggleTextActive: {
    color: '#ff9100',
    fontWeight: 'bold',
    fontSize: 12,
    letterSpacing: 1,
  }
});
