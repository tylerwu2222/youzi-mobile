import { View, Text } from 'react-native';
import React from 'react';

// styles
import { StyleSheet } from "react-native";
import { youziColors } from '../../styles/youziStyles';

const styles = StyleSheet.create({
    className: {
        alignItems: 'center'
    }
})

// potentially move vibe from prop to context
export default function CarouselNavigationButton() {
  return (
    <View>
      <Text>
        Carousel Navigation
      </Text>
    </View>
  )
}