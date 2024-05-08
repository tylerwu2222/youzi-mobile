import React from 'react';

// components
import { View, StyleSheet } from 'react-native';
import { Slider } from '@miblanchard/react-native-slider';
import PlayRecordingButton from '../../../ReviewScreen/PromptTab/PlayRecordingButton'

const styles = StyleSheet.create({
  audioPlaybackContainer: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    // marginBottom: 20
  }
});


export default function AudioPlayback({ promptID }) {
  return (
    <View style={styles.audioPlaybackContainer}>
      {/* <Text>AudioPlayback</Text> */}
      {/* <View></View> */}
      <PlayRecordingButton promptID={promptID} />
      <Slider />
    </View>
  )
}