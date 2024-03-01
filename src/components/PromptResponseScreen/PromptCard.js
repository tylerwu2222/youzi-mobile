import { View, Text } from 'react-native'
import React, { useContext } from 'react';

import { AppContext } from '../../../App';
import { getHanZiText, getPinYinText, getEnglishText } from '../../scripts/promptGetter';
import HanziPinyinBlock from '../Modules/HanziPinyinBlock/HanziPinyinBlock';

// styles
import { StyleSheet } from "react-native";
import { youziColors, youziStyles } from '../../styles/youziStyles';

// test data
import { dummyChinesePrompt } from '../../../assets/data/dummy_data';

const styles = StyleSheet.create({
  responsePromptCard: {
    height: '50%'
  },
  promptTextView: {
    height: '70%'
  }
})

export default function PromptCard() {
  const {
    vibeID,
    promptID
  } = useContext(AppContext);

  return (
    <View style={[youziStyles.promptCard, styles.responsePromptCard]}>
      <View style={youziStyles.hanziPinyinBlocksView}>
          {Array.from(dummyChinesePrompt).map((hanzi, index) => {
            return <HanziPinyinBlock key={index} hanziCharacter={hanzi}/>
          })}
        </View>
        <View style={youziStyles.englishTextView}>
          <Text style={youziStyles.englishPromptText}>{getEnglishText(promptID)}</Text>
        </View>
    </View>
  )
}