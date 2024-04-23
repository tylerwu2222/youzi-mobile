import { View, Text, StyleSheet } from 'react-native';
import React, { useContext } from 'react';
import { AppContext } from '../../App';

import PromptCarousel from '../components/PromptSelectScreen/PromptCarousel';


import { vibes } from '../../assets/data/vibes';

// styles
import { youziStyles } from '../styles/youziStyles';
import { youziColors } from '../styles/youziStyles';
import { youziDimensions } from '../styles/youziStyles';
import HomeButton from '../components/NavigationButtons/HomeButton/HomeButton';
import SettingsButton from '../components/NavigationButtons/SettingsButton/SettingsButton';

const styles = StyleSheet.create({
  homeLogo: {
    width: youziDimensions.vw / 2,
    height: youziDimensions.vw / 2
  }
});


export default function PromptSelectScreen() {
  const {
    vibeID,
    subVibeID
    // setVibeID
  } = useContext(AppContext);

  console.log('vibe at prompt select screen', vibeID);

  const vibeLabel = vibes.find(vibe => vibe['id'] === vibeID)['label']
  const subVibeLabel = vibes.find(vibe => vibe['id'] === vibeID)['subVibes'].find(subvibe => subvibe['id'] === subVibeID)['label']
  console.log('SVL',subVibeLabel);

  return (
    <View style={[youziStyles.centeredView, youziStyles.horizontallyCenteredView]}>
      <Text>Youzi.PromptSelectScreen</Text>
      {/* <Text>Selected vibe ID: {vibeID}</Text> */}
      <View style={youziStyles.headerTextView}>
        <Text style={youziStyles.headerText}>Today's prompts</Text>
      </View>
      <View style={youziStyles.headerTextView}>
        {/* <Text style={youziStyles.subHeaderText}>{vibeLabel}</Text> */}
        <Text style={youziStyles.subHeaderText}>{vibeLabel}: {subVibeLabel}</Text>
      </View>
      <PromptCarousel />
      {/* nav buttons */}
      <HomeButton />
      <SettingsButton />
    </View>
  )
}