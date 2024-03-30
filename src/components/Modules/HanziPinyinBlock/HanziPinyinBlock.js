import { View, Text, Pressable } from 'react-native'
import React, { useState, useContext } from 'react';
import { AppContext } from '../../../../App';


import { getPinYinText } from '../../../scripts/promptGetter';

// styles
import { StyleSheet } from "react-native";
import ChineseText from '../ChineseText/ChineseText';



export default function HanziPinyinBlock({ hanziCharacter, customPinyinSize = null, customHanziSize = null }) {
  const { showPinyin } = useContext(AppContext);
  const [singlePinyin, setSinglePinyin] = useState(showPinyin);
  const pinyinSize = customPinyinSize ? customPinyinSize : 14;


  const styles = StyleSheet.create({
    HZPYBlock: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: 3
      // textAlign: "center"
    },
    pinyinText: {
      fontSize: pinyinSize,
      opacity: showPinyin || singlePinyin ? 1 : 0,
      pointerEvents: showPinyin || singlePinyin ? 'auto' : 'none',
      // display: showPinyin || singlePinyin ? 'default' : 'none'
    }
  });

  const readSinglePinyin = () => {
    console.log('long pressed');
  };

  const toggleSinglePinyin = () => {
    // console.log('toggle single PY', singlePinyin);
    setSinglePinyin(!singlePinyin);
  };

  return (
    <View style={styles.HZPYBlock}>
      <Text style={styles.pinyinText}>{getPinYinText(hanziCharacter)}</Text>
      <Pressable
        onPress={() => { toggleSinglePinyin() }}
        onLongPress={() => { readSinglePinyin() }}
      >
        <ChineseText chineseText={hanziCharacter} />
      </Pressable>
    </View>
  )
}