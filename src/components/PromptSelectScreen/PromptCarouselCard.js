import { View, Text, Image, ActivityIndicator } from 'react-native'
import React, { useContext, useState, useEffect } from 'react';

import { AppContext } from '../../../App';
import { getImage, getHanZiText, getPinYinText, getEnglishText } from '../../scripts/promptGetter';

// styles
import { StyleSheet } from "react-native";
import { youziColors } from '../../styles/youziStyles';
import { youziDimensions } from '../../styles/youziStyles';

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
      <View style={styles.promptText}>
        <View>
          <Text>{getPinYinText(promptID)}</Text>
          <Text>{getHanZiText(promptID)}</Text>
        </View>
        <View>
          <Text>{getEnglishText(promptID)}</Text>
        </View>
      </View>
    </View>
  )
}