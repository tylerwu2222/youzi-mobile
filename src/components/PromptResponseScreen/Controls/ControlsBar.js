import { View, Text } from 'react-native'
import React from 'react'

import RecordButton from './RecordButton'
import HighlightButton from './HighlightButton'

// styles
import { StyleSheet } from "react-native";
import { youziColors } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
    className: {
        alignItems: 'center'
    }
})

export default function ControlsBar() {
  return (
    <View>
      <RecordButton/>
      <HighlightButton/>
    </View>
  )
}