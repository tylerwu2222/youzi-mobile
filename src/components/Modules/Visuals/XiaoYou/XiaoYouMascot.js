import React from 'react';

// components
import { View, Text, Image, StyleSheet } from 'react-native';

// styles
import { youziColors, youziDimensions } from '../../../../styles/youziStyles';

// 
export default function XiaoYouMascot({
  size = youziDimensions.vw * 1 / 5,
  position = [youziDimensions.vw - size, 0],
  shortPressFn = () => { },
  longPressFn = () => { }
}) {
  const styles = StyleSheet.create({
    xiaoYouMascot: {
      position: 'absolute',
      left: position[0],
      bottom: position[1],
      width: size
    }
  })

  return (
    <Image
      source={require('../../../../../assets/icons/youzi_mascot.png')} // Specify the image path
      // source={require('../../../assets/' + backgroundImage + '.png')} // Specify the image path
      style={styles.xiaoYouMascot}
      resizeMode="contain" // Adjust the resizeMode as needed
      alt='xiao-you'
    />
  )
}

export function XiaoYouSpeechBubble({
  textContent = 'default text',
  size = youziDimensions.vw * 4 / 5,
  positionRight = youziDimensions.vw - size,
  positionBottom = 200,
  visible = true
}) {

  // console.log('XYSB', textContent);

  const styles = StyleSheet.create({
    xiaoYouSpeechBubbleView: {
      position: 'absolute',
      right: positionRight,
      bottom: positionBottom,
      width: 'fit-content',
      maxWidth: size,
      flexDirection: 'row',
      // flexWrap: 'wrap',
      padding: 20,
      borderRadius: 10,
      backgroundColor: youziColors.cardBackgroundOrange
    },
    xiaoYouSpeechBubbleText: {
      flexWrap: 'wrap',
    },
  })
  return (
    visible ?
      <View style={styles.xiaoYouSpeechBubbleView} >
        <Text style={styles.xiaoYouSpeechBubbleText}>{textContent}</Text>
      </View > : <></>
  )
}