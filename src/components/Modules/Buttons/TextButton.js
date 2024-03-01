import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

import { youziColors, youziStyles } from '../../../styles/youziStyles'



export default function TextButton({
  text = 'text',
  onPress = () => {},
  backgroundColor = youziColors.buttonBackground,
  fontSize = youziStyles.subHeaderText.fontSize,
  paddingV = 5,
  paddingH = 10,
  borderRadius = 7,
}) {
  const styles = StyleSheet.create({
    textButton: {
      backgroundColor: backgroundColor,
      paddingLeft: paddingH,
      paddingRight: paddingH,
      paddingTop: paddingV,
      paddingBottom: paddingV,
      borderRadius: borderRadius,
    },
    textButtonText: {
      fontSize: fontSize
    }
  });

  return (
    <Pressable style={styles.textButton} onPress={() => {onPress()}}>
      <Text style={styles.textButtonText}>{text}</Text>
    </Pressable>
  )
}