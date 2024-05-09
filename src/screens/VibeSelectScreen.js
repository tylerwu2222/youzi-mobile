import React, { useRef } from 'react'


// components
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import VibeSelectButton from '../components/VibeSelectScreen/VibeSelectButton';
import SubVibeSelectButton from '../components/VibeSelectScreen/SubVibeSelectButton';
import HomeButton from '../components/NavigationButtons/HomeButton/HomeButton';
import SettingsButton from '../components/NavigationButtons/SettingsButton/SettingsButton';

// data
import { vibes } from '../../assets/data/vibes';

// styles
import { youziStyles, youziDimensions } from '../styles/youziStyles';


const styles = StyleSheet.create({
  vibeView: {
    // width: '80%',
    // width: youziDimensions.vw / 2
  }
});

export default function VibeSelectScreen() {
  const scrollViewRef = useRef(null);

  const scrollToCenter = (yCoordinate) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        y: yCoordinate,
        animated: true,
      });
    }
  };

  return (
    <View style={youziStyles.centeredView}>
      {/* header */}
      <Text style={youziStyles.headerText}>
        Choose today's vibe
      </Text>

      {/* vibe container */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.vibeView}
      >
        {vibes.map((vibe, index) => {
          return (
            <VibeSelectButton
              key={vibe.id}
              vibeId={vibe.id}
              code={vibe.code}
              label={vibe.label}
              backgroundIcon={vibe.icon}
              subvibes={vibe.subVibes}
              // TODO: update scroll to work dynamically
              onPressFn={() => scrollToCenter(index * 100)}
            />)
        })}
      </ScrollView>

      {/* nav */}
      <SettingsButton />
      <HomeButton />
    </View>
  )
}