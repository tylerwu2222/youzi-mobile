import { View, Text, Image } from 'react-native'
import React from 'react'

export default function PromptCarouselCard({ vibe }) {
  return (
    <View>
      <Text>Today's vibe{vibe}</Text>
      <Image
        src={vibe}
        alt="AI Generated Image"
      ></Image>
      <Text>Prompt</Text>
      <Text>Chinese Text with pinyin</Text>
    </View>
  )
}