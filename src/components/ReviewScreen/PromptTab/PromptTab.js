import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { dummyChinesePrompts } from '../../../../assets/data/dummy_data';

import PromptReviewButton from './PromptReviewButton';

import { youziDimensions } from '../../../styles/youziStyles';


const styles = StyleSheet.create({
  promptView: {
    width: '100%',
    padding: youziDimensions.vw / 15,
    // width: youziDimensions.vw / 2
  }
});


export default function PromptTab() {
  return (
    <View style={styles.promptView}>
      {dummyChinesePrompts.map((p, i) => {
        return <PromptReviewButton key={i} prompt={p} />
      })}
    </View>
  )
}