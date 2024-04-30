import { View, Text, Image, Animated } from 'react-native'
import React, { useState, useRef, useContext } from 'react';

import { AppContext } from '../../../../App';
import { getImage, getHanZiText, getPinYinText, getEnglishText } from '../../../scripts/promptGetter';
import HanziPinyinBlock from '../Text/HanziPinyinBlock/HanziPinyinBlock';
import ReadAloudButton from '../Audio/ReadAloudButton/ReadAloudButton';

// styles
import { StyleSheet } from "react-native";
import { youziDimensions, youziStyles } from '../../../styles/youziStyles';

// test data
import { dummyChinesePrompt } from '../../../../assets/data/dummy_data';
// import promptData from '../../../../assets/data/test_set_829.json';
import ExpandButton from '../Buttons/ExpandButton';
import HanziPinyinArray from '../Text/HanziPinyinBlock/HanziPinyinArray';
import AIGenImage from '../Visuals/AIGenImage/AIGenImage';

const styles = StyleSheet.create({
  responsePromptCard: {
    height: 'fit-content',
    padding: 0,
    // paddingBottom: 0,
    marginBottom: 30
    // height: '50%'
  },
  promptImageView: {
    borderTopLeftRadius: 7,
    borderTopRightRadius: 7,
    width: '100%',
    height: youziDimensions.vh / 7,
    overflow: 'hidden'
  },
  promptTextView: {
    // height: '70%'
    height: 'fit-content'
  },
  englishTextView: {
    paddingTop: youziDimensions.vh / 25
  },
  toggleableView: {
    overflow: 'hidden'
  }
})

export default function PromptCard({
  hasAudio = true,
  hasImage = true,
  hasEnglish = true }) {
  const {
    vibeID,
    promptID
  } = useContext(AppContext);

  const [expanded, setExpanded] = useState(false);
  // const [contentHeight, setContentHeight] = useState(0);
  const heightAnim = useRef(new Animated.Value(0)).current;

  const toggleEnglish = () => {
    // console.log('toggling english')
    setExpanded(!expanded);
    Animated.timing(heightAnim, {
      toValue: expanded ? 0 : 125, // Adjust the height value as needed
      duration: 300, // Adjust the duration as needed
      useNativeDriver: false,
    }).start();
  };

  // const handleContentSizeChange = (contentWidth, height) => {
  //   setContentHeight(height);
  // };


  return (
    <View style={[
      youziStyles.promptCard,
      styles.responsePromptCard
    ]}>
      {hasImage ? <View style={styles.promptImageView}>
        {/* <Text>AI Image here</Text> */}
        <AIGenImage />
        {/* <Image
          style={styles.promptImage}
          src={getImage(promptID)}
          alt="AI Generated Image"
        ></Image> */}
      </View> : null}
      <View style={youziStyles.hanziPinyinBlocksView}>
        {hasAudio ? <ReadAloudButton text={dummyChinesePrompt} /> : null}
        {/* {Array.from(dummyChinesePrompt).map((hanzi, index) => {
          return <HanziPinyinBlock key={index} hanziCharacter={hanzi} />
        })} */}
        <HanziPinyinArray hanziArray={dummyChinesePrompt} />
      </View>
      <Animated.View style={[styles.toggleableView, { height: heightAnim }]}>
        {expanded ?
          <View
            style={[styles.englishTextView, youziStyles.englishTextView]}>
            <Text style={youziStyles.englishPromptText}>{getEnglishText(promptID)}</Text>
          </View> : null
        }
      </Animated.View>
      <ExpandButton onPressFn={() => { toggleEnglish() }} expanded={expanded} />
    </View>
  )
}