import { View, Text } from 'react-native'
import React from 'react'

import PromptCarouselCard from './PromptCarouselCard'
import CarouselNavigationButton from './CarouselNavigationButton'
import StartPromptButton from './StartPromptButton'

// definitely move vibe from prop to context (current vibe)
export default function PromptCarousel({ vibe }) {
  return (
    <View>
      <PromptCarouselCard vibe={vibe} />
      <StartPromptButton vibe={vibe}/>
    </View>
  )
}