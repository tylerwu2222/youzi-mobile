import { View, Text } from 'react-native'
import React from 'react';

import { getPinYinText } from '../../../scripts/promptGetter';

// styles
import { StyleSheet } from "react-native";



export default function HanziPinyinBlock({ hanziCharacter, customPinyinSize = null, customHanziSize = null }) {
  const pinyinSize = customPinyinSize ? customPinyinSize : 14;
  const hanziSize = customHanziSize ? customHanziSize : 20;

  const styles = StyleSheet.create({
    HZPYBlock: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: 3
      // textAlign: "center"
    },
    pinyinText: {
      fontSize: pinyinSize
    },
    hanziText: {
      fontSize: hanziSize
    }
  });
  return (
    <View style={styles.HZPYBlock}>
      <Text style={styles.pinyinText}>{getPinYinText(hanziCharacter)}</Text>
      <Text style={styles.hanziText}>{hanziCharacter}</Text>
    </View>
  )
}