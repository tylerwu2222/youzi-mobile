import { View, Text } from 'react-native'
import React from 'react'

import PromptCarousel from '../components/PromptSelectScreen/PromptCarousel';

// styles
import { StyleSheet } from "react-native";
import { youziStyles } from '../styles/youziStyles';
import { youziColors } from '../styles/youziStyles';
import { youziDimensions } from '../styles/youziStyles';


export default function PromptSelectScreen() {
  return (
    <View style={youziStyles.centeredView}>
      <Text>Youzi.PromptSelectScreen</Text>
      <PromptCarousel/>
    </View>
  )
}