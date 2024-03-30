import { View, Text } from 'react-native'
import React from 'react'

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
      <RecordButton />
    </View>
  )
}