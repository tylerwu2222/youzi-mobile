import { View, Text } from 'react-native'
import React from 'react'

// styles
import { StyleSheet } from "react-native";
import { youziColors, youziStyles } from '../../styles/youziStyles'

// test data
import { dummyChineseVocab } from '../../../assets/data/dummy_data';
import VocabBlock from '../Modules/VocabBlock/VocabBlock';

const styles = StyleSheet.create({
  responseVocabCard: {
    marginTop: 10,
    height: '30%',
    backgroundColor: youziColors.cardBackgroundYellow
  }
})

export default function PromptVocabCard() {
  return (
    <View style={[youziStyles.promptCard, styles.responseVocabCard]}>
      <Text>PromptVocabCard</Text>
      {dummyChineseVocab.map((vocab, index) => {
        return <VocabBlock key={index} hanzi={vocab}/>
      })}
    </View>
  )
}