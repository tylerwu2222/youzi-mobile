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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    height: '20%',
    backgroundColor: youziColors.cardBackgroundYellow
  },
  column: {
    flex: 1,
  },
})

export default function PromptVocabCard() {
  // display as 2 columns

  const halfLength = Math.ceil(dummyChineseVocab.length / 2);
  const column1 = dummyChineseVocab.slice(0, halfLength);
  const column2 = dummyChineseVocab.slice(halfLength);

  return (
    <View style={[youziStyles.promptCard, styles.responseVocabCard]}>
      {/* <Text>PromptVocabCard</Text> */}
      <View style={styles.column}>
        {column1.map((vocab, index) => (
          <VocabBlock key={index} hanzi={vocab} />
        ))}
      </View>
      <View style={styles.column}>
        {column2.map((vocab, index) => (
          <VocabBlock key={index} hanzi={vocab} />
        ))}
      </View>
    </View>
  )
}