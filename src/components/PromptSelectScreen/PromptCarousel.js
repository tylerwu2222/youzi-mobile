import { View, Text } from 'react-native'
import React from 'react'

import PromptCarouselCard from './PromptCarouselCard'
import CarouselNavigationButton from './CarouselNavigationButton'
import StartPromptButton from './StartPromptButton'

// styles
import { StyleSheet } from "react-native";
import { youziColors } from '../../styles/youziStyles';
import { youziDimensions } from '../../styles/youziStyles';

const styles = StyleSheet.create({
  carouselView: {
    // width: youziDimensions.vw * 4 / 5
  }
})

// definitely move vibe from prop to context (current vibe)
export default function PromptCarousel() {
  return (
    <View style={styles.carouselView}>
      <PromptCarouselCard />
      <StartPromptButton />
    </View>
  )
}