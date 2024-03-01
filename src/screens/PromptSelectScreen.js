import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import { AppContext } from '../../App';

import PromptCarousel from '../components/PromptSelectScreen/PromptCarousel';


import { vibes } from '../../assets/data/vibes';

// styles
import { StyleSheet } from "react-native";
import { youziStyles } from '../styles/youziStyles';
import { youziColors } from '../styles/youziStyles';
import { youziDimensions } from '../styles/youziStyles';

const styles = StyleSheet.create({
  homeLogo: {
    width: youziDimensions.vw / 2,
    height: youziDimensions.vw / 2
  }
});


export default function PromptSelectScreen() {
  const {
    vibeID
    // setVibeID
  } = useContext(AppContext);

  const vibeLabel = vibes.find(obj => obj['id'] === vibeID)['label']

  return (
    <View style={youziStyles.centeredView}>
      <Text>Youzi.PromptSelectScreen</Text>
      {/* <Text>Selected vibe ID: {vibeID}</Text> */}
      <View style={youziStyles.headerTextView}>
        <Text style={youziStyles.headerText}>Today's vibe: {vibeLabel}</Text>
      </View>
      <PromptCarousel />
    </View>
  )
}