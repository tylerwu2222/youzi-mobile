import { View, Text } from 'react-native'
import React from 'react'

import PausePlayButton from './PausePlayButton'
import HighlightButton from './HighlightButton'

export default function ControlsBar() {
  return (
    <View>
      <PausePlayButton/>
      <HighlightButton/>
    </View>
  )
}