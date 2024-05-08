import React, { useState, useRef, useContext } from 'react';
import { AppContext } from '../../../../App';

// import { getImage, getHanZiText, getPinYinText, getEnglishText } from '../../../scripts/promptGetter';

// components
import { View, Text, Image, Animated } from 'react-native'
// import HanziPinyinBlock from '../Text/HanziPinyinBlock/HanziPinyinBlock';
import ReadAloudButton from '../Audio/ReadAloudButton/ReadAloudButton';
import HanziPinyinArray from '../Text/HanziPinyinBlock/HanziPinyinArray';
import AIGenImage from '../Visuals/AIGenImage/AIGenImage';

// styles
import { StyleSheet } from "react-native";
import { youziDimensions, youziStyles } from '../../../styles/youziStyles';

// data
import ExpandButton from '../Buttons/ExpandButton';

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
    // vibeID,
    // subVibeID,
    promptObject
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

  // console.log('promptObject', promptObject);

  return (
    <View style={[
      youziStyles.promptCard,
      styles.responsePromptCard
    ]}>

      {/* image */}
      {hasImage ? <View style={styles.promptImageView}>
        <AIGenImage />
      </View> : null}

      {/* chinese prompt */}
      <View style={youziStyles.hanziPinyinBlocksView}>
        {hasAudio ? <ReadAloudButton text={promptObject['convo_starter_1']} /> : null}
        {/* {Array.from(dummyChinesePrompt).map((hanzi, index) => {
          return <HanziPinyinBlock key={index} hanziCharacter={hanzi} />
        })} */}
        <HanziPinyinArray hanziArray={promptObject['convo_starter_1']} />
      </View>

      {/* english prompt */}
      <Animated.View style={[styles.toggleableView, { height: heightAnim }]}>
        {expanded ?
          <View
            style={[styles.englishTextView, youziStyles.englishTextView]}>
            <Text style={youziStyles.englishPromptText}>{promptObject['english_translate_1']}</Text>
          </View> : null
        }
      </Animated.View>
      <ExpandButton onPressFn={() => { toggleEnglish() }} expanded={expanded} />
    </View>
  )
}