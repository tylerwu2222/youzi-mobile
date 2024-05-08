import React from 'react';

// components
import { View, Text } from 'react-native';
import PromptCard from '../Modules/PromptCard/PromptCard';
import CarouselNavigationButton from './CarouselNavigationButton';
import StartPromptButton from './StartPromptButton';

// styles
import { StyleSheet } from "react-native";
import { youziColors } from '../../styles/youziStyles';
import { youziDimensions } from '../../styles/youziStyles';

const styles = StyleSheet.create({
  carouselView: {
    height: youziDimensions.vh
    // width: youziDimensions.vw * 4 / 5
  }
})

// definitely move vibe from prop to context (current vibe)
export default function PromptCarousel() {
  return (
    <View style={styles.carouselView}>
      <PromptCard />
      <StartPromptButton />
    </View>
  )
}