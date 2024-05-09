import React from 'react'

// components
import { View, Text } from 'react-native'
import RecordButton from './RecordButton'
import HighlightButton from './HighlightButton'

// styles
import { StyleSheet } from "react-native";
import { youziColors } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
  controlsBarView: {
    position: 'absolute',
    bottom: 5
  }
})

export default function ControlsBar() {
  return (
    <View style={styles.controlsBarView}>
      {/* 30 second timer */}
      <RecordButton maxRecordingLength={30} />
    </View>
  )
}