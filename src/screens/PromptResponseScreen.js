import { View, Text } from 'react-native'
import React from 'react'

// components
import PromptCard from '../components/PromptResponseScreen/PromptCard';
import ControlsBar from '../components/PromptResponseScreen/Controls/ControlsBar';

// styles
import { StyleSheet } from "react-native";
import { youziStyles } from '../styles/youziStyles';
import { youziColors } from '../styles/youziStyles';
import { youziDimensions } from '../styles/youziStyles';


export default function PromptResponseScreen() {
  return (
    <View style={youziStyles.centeredView}>
      <Text>Youzi.PromptResponseScreen</Text>
      <PromptCard/>
      <ControlsBar/>
    </View>
  )
}