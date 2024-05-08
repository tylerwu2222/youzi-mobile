import React from 'react'

// components
import { View, Text, Pressable, StyleSheet } from 'react-native'

// styles
import { youziColors, youziStyles } from '../../../styles/youziStyles';

export default function TextButton({
  text = 'text',
  onPressFn = () => { console.log('default fn') },
  backgroundColor = youziColors.buttonBackgroundPink,
  fontSize = youziStyles.subHeaderText.fontSize,
  marginV = 5,
  marginH = 3,
  paddingV = 5,
  paddingH = 10,
  borderRadius = 7,
  ...props
}) {
  const styles = StyleSheet.create({
    textButton: {
      backgroundColor: backgroundColor,
      paddingLeft: paddingH,
      paddingRight: paddingH,
      paddingTop: paddingV,
      paddingBottom: paddingV,
      marginLeft: marginH,
      marginRight: marginH,
      marginTop: marginV,
      marginBottom: marginV,
      borderRadius: borderRadius,
      alignItems: 'center'
    },
    textButtonText: {
      fontSize: fontSize
    }
  });

  return (
    <Pressable
      style={styles.textButton}
      onPress={() => { onPressFn() }}
      {...props}
    >
      <Text style={styles.textButtonText}>{text}</Text>
    </Pressable>
  )
}