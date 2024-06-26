import React, { useState, useContext } from 'react';
import { AppContext } from '../../../../../App';

// components
import { View, Text, Pressable } from 'react-native'
import ChineseText from '../ChineseText/ChineseText';

// scripts
import { getPinYinText } from '../../../../scripts/textScripts';

// modules
import * as Speech from 'expo-speech';

// styles
import { StyleSheet } from "react-native";

export default function HanziPinyinBlock({
  hanziCharacter,
  customPinyinSize = null,
  customHanziSize = null,
  pressable = true,
  textColor = null,
  pinyinOn = false,
  enableLongPress = true }) {
  const { showPinyin } = useContext(AppContext);
  const [singlePinyin, setSinglePinyin] = useState(showPinyin);
  const pinyinSize = customPinyinSize ? customPinyinSize : 14;


  const styles = StyleSheet.create({
    HZPYBlock: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      // margin: 3,
      // paddingLeft: 20,
      // paddingRight: 20
      // textAlign: "center"
    },
    pinyinText: {
      fontSize: pinyinSize,
      color: textColor ? textColor : 'black',
      opacity: showPinyin || singlePinyin || pinyinOn ? 1 : 0,
      pointerEvents: showPinyin || singlePinyin ? 'auto' : 'none',
      // display: showPinyin || singlePinyin ? 'default' : 'none'
    }
  });

  const readSinglePinyin = () => {
    console.log('long pressed');
    Speech.speak(hanziCharacter, { language: "zh" });
  };

  const toggleSinglePinyin = () => {
    // console.log('toggle single PY', singlePinyin);
    setSinglePinyin(!singlePinyin);
  };

  return (
    <View style={styles.HZPYBlock}>
      <Text style={styles.pinyinText}>{getPinYinText(hanziCharacter)}</Text>
      {pressable ? <Pressable
        onPress={() => { toggleSinglePinyin() }}
        // onPress={() => { readSinglePinyin() }}
        onLongPress={enableLongPress ?
          () => { readSinglePinyin() } :
          () => { }
        }
      // delayLongPress={250}
      // onLongPress={() => { toggleSinglePinyin() }}
      >
        <ChineseText chineseText={hanziCharacter} textColor={textColor} />
      </Pressable> :
        <View
        >
          <ChineseText chineseText={hanziCharacter} textColor={textColor} />
        </View>}
    </View>
  )
}