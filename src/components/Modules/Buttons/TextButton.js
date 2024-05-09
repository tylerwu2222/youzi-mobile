import React, { useState } from 'react'

// components
import { View, Text, Pressable, StyleSheet } from 'react-native'

// styles
import { youziColors, youziStyles } from '../../../styles/youziStyles';

export default function TextButton({
  text = 'text',
  onPressFn = () => { console.log('default fn') },
  backgroundColor = youziColors.buttonBackgroundPink,
  fontSize = youziStyles.subHeaderText.fontSize,
  fontColor = youziColors.whiteText,
  marginV = 5,
  marginH = 3,
  paddingV = 5,
  paddingH = 10,
  borderRadius = 7,
  disabled = false,
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
      alignItems: 'center',
      justifyContent: 'center'
    },
    textButtonText: {
      fontSize: fontSize,
      color: fontColor
    }
  });

  return (
    <Pressable
      style={styles.textButton}
      onPress={() => { onPressFn() }}
      disabled={disabled}
      {...props}
    >
      <Text style={styles.textButtonText}>{text}</Text>
    </Pressable>
  )
}

export const DynamicTextButton = ({
  initialText = 'on',
  toggledText = 'off',
  onPressFn = () => { },
  ...props
}) => {
  const [buttonText, setButtonText] = useState(initialText);

  const handlePress = () => {
    // Toggle the button text between 'On' and 'Off'
    const newText = buttonText === initialText ? toggledText : initialText;
    setButtonText(newText);
    // Call the onPress function with the updated text
    onPressFn();
  };

  return <TextButton
    text={buttonText}
    onPressFn={handlePress}
    {...props}
  />;
};