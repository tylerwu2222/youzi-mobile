import { View, Text } from 'react-native'
import React from 'react';

// styles
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    HZPYBlock: {
      alignContent: "center",
      textAlign: "center"
    }
  });

export default function HanziPinyinBlock() {
  return (
    <View style={styles.HZPYBlock}>
      <Text>PinYinText</Text>
      <Text>HanZiText</Text>
    </View>
  )
}