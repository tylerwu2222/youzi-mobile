import { View, Text } from 'react-native'
import React from 'react';

import { getPinYinText } from '../../../scripts/promptGetter';

// styles
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    HZPYBlock: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: 3
      // textAlign: "center"
    },
    PinyinText: {
      fontSize: 14
    },
    HanziText: {
      fontSize: 20
    }
  });

export default function HanziPinyinBlock({hanziCharacter}) {
  return (
    <View style={styles.HZPYBlock}>
      <Text style={styles.PinyinText}>{getPinYinText(hanziCharacter)}</Text>
      <Text style={styles.HanziText}>{hanziCharacter}</Text>
    </View>
  )
}