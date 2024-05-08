import React from 'react'

// components
import { View, Text, TouchableHighlight, TouchableOpacity, StyleSheet, Pressable } from 'react-native'

// styles
import { youziColors, youziDimensions, youziStyles } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
  touchable: {
    display: 'flex',
    textAlign: 'center',
    justifyContent: 'center',
    alignContent: 'center',

    width: 'fit-content',

    backgroundColor: youziColors.cardBackgroundOrange,
    borderRadius: 7,
    padding: 5,
    margin: 4,

  },
  touchableText: {
    fontSize: 20
  }
});


export default function ToggleableTouchable({ text, handlePress = () => { }, type = 'pressable' }) {
  if (type == 'highlight') {
    return (
      <TouchableHighlight
        style={styles.touchable}>
        <Text style={styles.touchableText}>
          {text}
        </Text>
      </TouchableHighlight>
    )
  }
  else if (type == 'opacity') {
    return (
      <TouchableOpacity
        style={styles.touchable}>
        <Text style={styles.touchableText}>
          {text}
        </Text>
      </TouchableOpacity>
    )
  }
  else {
    return (
      <Pressable
        style={styles.touchable}
        onPress={() => { handlePress(text) }}
      >
        <Text style={styles.touchableText}>
          {text}
        </Text>
      </Pressable>
    )
  }

}