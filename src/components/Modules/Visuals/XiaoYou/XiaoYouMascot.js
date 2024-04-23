import { Image, StyleSheet } from 'react-native'

import React from 'react'
import { youziDimensions } from '../../../../styles/youziStyles'

const styles = StyleSheet.create({
  xiaoYouMascot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: youziDimensions.vw * 1 / 5
  }
})

// 
export default function XiaoYouMascot({shortPressFn = () => {}, longPressFn = () => {}}) {
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
