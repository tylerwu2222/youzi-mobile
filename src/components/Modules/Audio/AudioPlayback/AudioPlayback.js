import { View, Text, StyleSheet } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import React from 'react'

import PlayRecordingButton from '../../../ReviewPromptScreen/PlayRecordingButton'

const styles = StyleSheet.create({
  audioPlaybackContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20
  }
});


export default function AudioPlayback({ promptNumber }) {
  return (
    <View style={styles.audioPlaybackContainer}>
      <Text>AudioPlayback</Text>
      <View></View>
      <Slider />
      <PlayRecordingButton promptNumber={promptNumber} />
    </View>
  )
}