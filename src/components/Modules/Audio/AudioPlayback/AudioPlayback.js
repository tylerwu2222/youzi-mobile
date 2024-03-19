import { View, Text, StyleSheet } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import React from 'react'

import PlayRecordingButton from '../../../ReviewPromptScreen/PlayRecordingButton'

const styles = StyleSheet.create({
  audioPlaybackContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  }
});


export default function AudioPlayback() {
  return (
    <View style={styles.audioPlaybackContainer}>
      <Text>AudioPlayback</Text>
      <View></View>
      <Slider />
      <PlayRecordingButton />
    </View>
  )
}