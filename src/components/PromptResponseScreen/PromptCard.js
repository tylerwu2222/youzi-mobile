import { View, Text } from 'react-native'
import React, { useContext } from 'react';

import { AppContext } from '../../../App';
import { getHanZiText, getPinYinText, getEnglishText } from '../../scripts/promptGetter';

// styles
import { StyleSheet } from "react-native";
import { youziColors } from '../../styles/youziStyles';

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

export default function PromptCard() {
  const {
    vibeID,
    promptID
  } = useContext(AppContext);

  return (
    <View>
      <Text>Prompt</Text>
      <View style={styles.promptCard}>
        <Text>{getHanZiText(promptID)}</Text>
        <Text>{getEnglishText(promptID)}</Text>
      </View>
    </View>
  )
}