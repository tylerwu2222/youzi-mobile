import React, { useState, cloneElement } from 'react'

// components
import { View, Image, Text, Pressable } from 'react-native'

// assets
import SettingsIcon from '@mui/icons-material/Settings';

// styles
import { youziColors } from '../../../styles/youziStyles'
import { StyleSheet } from 'react-native';



export default function IconButton({
  iconComponent,
  onPress = () => { },
  onPressIn = () => { },
  onPressOut = () => { },
  ...props
}) {
  // const [pressed, setPressed] = useState(false);

  const styles = StyleSheet.create({
    iconButton: {
      // backgroundColor: iconColor
      // opacity: pressed ? 0.6 : 1,
    }
  });

  return (
    <Pressable
      style={styles.iconButton}
      onPress={() => {
        onPress();
      }}
      onPressIn={() => {
        onPressIn();
      }}
      onPressOut={() => {
        onPressOut();
      }}
      {...props}
    >
      {cloneElement(iconComponent)}
    </Pressable>
  )
}