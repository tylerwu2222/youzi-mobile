import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useContext, useState, useEffect } from 'react';

import { AppContext } from '../../../App';
import { getImage, getHanZiText, getPinYinText, getEnglishText } from '../../scripts/promptGetter';

// styles
import { StyleSheet } from "react-native";
import { youziColors, youziStyles } from '../../styles/youziStyles';
import { youziDimensions } from '../../styles/youziStyles';
import HanziPinyinBlock from '../Modules/HanziPinyinBlock/HanziPinyinBlock';

// test data
import { dummyChinesePrompt } from '../../../assets/data/dummy_data';

const styles = StyleSheet.create({
  promptImageView: {
    height: '30%'
  },
  promptTextView: {
    width: '90%',
    height: '70%'
  }
})

export default function PromptCarouselCard() {
  const {
    vibeID,
    promptID
  } = useContext(AppContext);

  const [isLoading, setLoading] = useState(true);
  const [hanzi, setHanzi] = useState('');
  const [pinyin, setPinyin] = useState('');
  const [english, setEnglish] = useState('');

  const [pinyinVisible, setPinyinVisbile] = useState(true);

  useEffect(() => {
    getPinYinText(hanzi);
  }, []);
  return (
    // <View style={styles.promptCard} >
    <View style={youziStyles.promptCard} >
      <View style={styles.promptImageView}>
        <Text>AI Image here</Text>
        <Image
          src={getImage(promptID)}
          alt="AI Generated Image"
        ></Image>
      </View>
      <View style={styles.promptTextView}>
        <View style={youziStyles.hanziPinyinBlocksView}>
          {Array.from(dummyChinesePrompt).map((hanzi, index) => {
            return <HanziPinyinBlock key={index} hanziCharacter={hanzi}/>
          })}
        </View>
        <View style={youziStyles.englishTextView}>
          <Text style={youziStyles.englishPromptText}>{getEnglishText(promptID)}</Text>
        </View>
      </View>
    </View>
  )
}