import { View, Image, Text, Pressable } from 'react-native'
import React, { cloneElement } from 'react'

import SettingsIcon from '@mui/icons-material/Settings';

import { youziColors } from '../../../styles/youziStyles'

import { StyleSheet } from 'react-native';



export default function IconButton({
  iconComponent,
  onPress = () => { },
  ...props
}) {
  const styles = StyleSheet.create({
    iconButton: {
      // backgroundColor: iconColor
    }
  });

  return (
    <Pressable
      style={styles.iconButton}
      onPress={() => { onPress() }}
      {...props}
    >
      {/* <Text>asd</Text> */}
      {cloneElement(iconComponent)}
    </Pressable>
  )
}