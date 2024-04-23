import { View, Text } from 'react-native';
import React from 'react';

// styles
import { StyleSheet } from "react-native";
import ChineseText from '../Text/ChineseText/ChineseText';
import EnglishTranslationText from '../Text/EnglishTranslationText/EnglishTranslationText';
import HanziPinyinArray from '../Text/HanziPinyinBlock/HanziPinyinArray';

const styles = StyleSheet.create({
  vocabBlock: {
    display: "flex",
    alignItems: "center",
    margin: 3
    // textAlign: "center"
  },
  vocabText: {
    fontSize: 14
  }
});

export default function VocabBlock({ hanzi }) {
  return (
    <View style={styles.vocabBlock}>
      <Text style={styles.vocabText}>
        <HanziPinyinArray hanziArray={hanzi}
          customHanziSize={14}
          customPinyinSize={14} /> → <EnglishTranslationText hanzi={hanzi} /></Text>
      {/* <Text style={styles.vocabText}><ChineseText chineseText={hanzi} /> → <EnglishTranslationText hanzi={hanzi} /></Text> */}
    </View>
  )
}