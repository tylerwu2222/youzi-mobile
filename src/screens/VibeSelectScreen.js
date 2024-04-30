
import React, { useContext } from 'react'


// components
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import VibeSelectButton from '../components/VibeSelectScreen/VibeSelectButton';
import SubVibeSelectButton from '../components/VibeSelectScreen/SubVibeSelectButton';

import HomeButton from '../components/NavigationButtons/HomeButton/HomeButton';
import SettingsButton from '../components/NavigationButtons/SettingsButton/SettingsButton';

// data
import { vibes } from '../../assets/data/vibes';

// styles
import { youziStyles } from '../styles/youziStyles';
import { youziColors } from '../styles/youziStyles';
import { youziDimensions } from '../styles/youziStyles';


const styles = StyleSheet.create({
  vibeView: {
    // width: '80%',
    // width: youziDimensions.vw / 2
  }
});

export default function VibeSelectScreen() {
  return (
    <View style={youziStyles.centeredView}>
      {/* <Text>Youzi.VibeSelectScreen</Text> */}
      <SettingsButton />
      <HomeButton />
      {/* <Text style={youziStyles.headerText}>
        What are the vibes today?
      </Text> */}
      <Text style={youziStyles.headerText}>
        Choose today's vibe
      </Text>
      {/* <Text style={youziStyles.subHeaderText}>
        Choose the vibe of your prompts
      </Text> */}
      <ScrollView
        style={styles.vibeView}
      >
        {vibes.map(vibe => {
          return (
            <>
              <VibeSelectButton 
              key={vibe.id} 
              id={vibe.id} 
              code={vibe.code} 
              label={vibe.label} 
              backgroundIcon={vibe.icon}
              subvibes = {vibe.subVibes} />
            </>)
        })}
      </ScrollView>
    </View>
  )
}