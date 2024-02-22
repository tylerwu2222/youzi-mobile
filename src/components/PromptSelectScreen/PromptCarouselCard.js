import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useContext, useState, useEffect } from 'react';

import { AppContext } from '../../../App';
import { getImage, getHanZiText, getPinYinText, getEnglishText } from '../../scripts/promptGetter';

// styles
import { StyleSheet } from "react-native";
import { youziColors } from '../../styles/youziStyles';
import { youziDimensions } from '../../styles/youziStyles';
import HanziPinyinBlock from '../Modules/HanziPinyinBlock/HanziPinyinBlock';

const styles = StyleSheet.create({
  promptCard: {
    alignItems: 'center',
    width: '100%',
    height: '70%',
    borderRadius: 7,
    backgroundColor: youziColors.cardBackgroundOrange,
  },
  promptImageView: {
    height: '30%'
  },
  promptTextView: {
    width: '90%',
    height: '70%'
  },
  HanziPinyinBlocksView: {
    maxWidth: '100%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'left',
    alignItems: 'center'
  },
  EnglishText: {
    fontSize: 20
  }
})

const dummyChinesePrompt = "我们练习一点中文吧。先讲一讲你学中文的背景！";

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
    <View style={styles.promptCard} >
      <View style={styles.promptImageView}>
        <Text>AI Image here</Text>
        <Image
          src={getImage(promptID)}
          alt="AI Generated Image"
        ></Image>
      </View>
      <View style={styles.promptTextView}>
        <View style={styles.HanziPinyinBlocksView}>
          {Array.from(dummyChinesePrompt).map((hanzi, index) => {
            return <HanziPinyinBlock key={index} hanziCharacter={hanzi}/>
          })}
        </View>
        <View style={styles.EnglishTextView}>
          <Text style={styles.EnglishText}>{getEnglishText(promptID)}</Text>
        </View>
      </View>
    </View>
  )
}