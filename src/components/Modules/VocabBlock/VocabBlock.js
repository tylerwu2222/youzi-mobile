import { View, Text } from 'react-native';
import React from 'react';

// styles
import { StyleSheet } from "react-native";
import ChineseText from '../ChineseText/ChineseText';

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
      <Text style={styles.vocabText}><ChineseText chineseText={hanzi} /> → translation</Text>

    </View>
  )
}