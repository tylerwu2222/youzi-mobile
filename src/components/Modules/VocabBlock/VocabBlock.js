import React, { useState, useRef } from 'react';

// components
import { View, Pressable, Text, Animated, PanResponder } from 'react-native';
// import ChineseText from '../Text/ChineseText/ChineseText';
import EnglishTranslationText from '../Text/EnglishTranslationText/EnglishTranslationText';
import HanziPinyinArray from '../Text/HanziPinyinBlock/HanziPinyinArray';
import OutsidePressHandler from 'react-native-outside-press';

import FavoriteIndicator from '../Buttons/FavoriteIndicator';

// styles
import { StyleSheet } from "react-native";
import { youziColors } from '../../../styles/youziStyles';

export default function VocabBlock({
  hanzi,
  pressable = false,
  translation = null,
  onPressFn = () => { },
  onLongPressFn = () => { },
  onPressOutFn = () => { },
  // ...props
}) {

  const [isHeld, setIsHeld] = useState(false);

  const [favorited, setFavorited] = useState(false);

  // animated values
  const translateValue = useRef(new Animated.Value(0)).current;
  const shadowOpacityValue = useRef(new Animated.Value(0)).current;


  // console.log('additional VB props', props);

  // pressable logic (for dragging to XiaoYou)
  // const pan = useRef(new Animated.ValueXY()).current;
  // const panResponder = useRef(
  //   PanResponder.create({
  //     onMoveShouldSetPanResponder: () => true,
  //     onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], { useNativeDriver: true }),
  //     onPanResponderRelease: () => {
  //       pan.extractOffset();
  //     },
  //   }),
  // ).current;

  const textSize = 18;
  const styles = StyleSheet.create({
    vocabBlock: {
      margin: 0,
      minWidth: 100,
      backgroundColor: youziColors.cardBackgroundYellow,
      // backgroundColor: youziColors.cardBackgroundOrange,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: "center",
      borderWidth: isHeld ? 1 : 0,
      borderRadius: 5
    },
    vocabText: {
      fontSize: 18
    }
  });

  const handlePress = () => {
    setIsHeld(true);
    console.log('vocab card pressed', hanzi);
    // Animate hover to move up vertically
    Animated.spring(translateValue, {
      toValue: -15,
      friction: 3,
      useNativeDriver: true,
    }).start();

    // Animate shadow opacity
    Animated.timing(shadowOpacityValue, {
      toValue: 0.3,
      duration: 300,
      useNativeDriver: true,
    }).start();

    onPressFn();
  };

  const handleLongPress = () => {
    setIsHeld(true);
    console.log('vocab card long pressed', hanzi);
    // Animate hover to move up vertically
    Animated.spring(translateValue, {
      toValue: -15,
      friction: 3,
      useNativeDriver: true,
    }).start();

    // Animate shadow opacity
    Animated.timing(shadowOpacityValue, {
      toValue: 0.3,
      duration: 300,
      useNativeDriver: true,
    }).start();

    onLongPressFn();
  };


  const handlePressOut = () => {
    setIsHeld(false);

    // Animate hover back to 0
    Animated.spring(translateValue, {
      toValue: 0,
      friction: 3,
      useNativeDriver: true,
    }).start();

    // Animate shadow opacity back to 0
    Animated.timing(shadowOpacityValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();

    onPressOutFn();
  };


  return (
    <Animated.View
      style={
        [
          // { transform: [{ translateX: pan.x }, { translateY: pan.y }] }, // pan pressable logic --> not working
          { transform: [{ translateY: translateValue }] }, // hold --> working
          { shadowOpacity: shadowOpacityValue }]
      }
    // {...props}
    // {...panResponder.panHandlers}
    >
      <OutsidePressHandler
        onOutsidePress={() => {
          // console.log('Pressed outside the box!');
          handlePressOut();
        }}>
        <Pressable
          style={styles.vocabBlock}
          // onPressOut={pressable ? handlePressOut : null}
          onPress={pressable ? handlePress : null}
          onLongPress={pressable ? handleLongPress : null}
          activeOpacity={0.8}

        >
          <Text >
            <HanziPinyinArray
              hanziArray={hanzi}
              customHanziSize={textSize}
              customPinyinSize={textSize}
              pinyinOn={true}
              pressable={false}
              enableLongPress={false} // disable long press (read aloud) to allow XiaoYou drag
            />
          </Text>
          {/* english translation */}
          {/* {translation ?
            <Text style={styles.vocabText}>
              <EnglishTranslationText hanzi={hanzi} />
            </Text> : */}
          <Text style={styles.vocabText}>
            <EnglishTranslationText hanzi={hanzi} />
          </Text>
          {/* } */}
          {/* <Text style={styles.vocabText}><ChineseText chineseText={hanzi} /> → <EnglishTranslationText hanzi={hanzi} /></Text> */}
        </Pressable>
        {favorited ? <FavoriteIndicator /> : <></>}
      </OutsidePressHandler>
    </Animated.View >
  )
}