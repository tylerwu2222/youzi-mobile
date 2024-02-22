import { View, Text } from 'react-native'
import React from 'react'

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
export default function OnboardingScreen() {
  return (
    <View style={youziStyles.centeredView}>
      <Text>OnboardingScreen</Text>
    </View>
  )
}