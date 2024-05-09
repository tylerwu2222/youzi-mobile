import React, { useState, useEffect, useRef } from 'react';

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
import { getCompletedFavoriteVocab, getCompletedSlang } from '../../../scripts/asyncStorageHandler';

export default function VocabBlock({
  hanzi,
  textColor = null,
  translation = true,
  favoritable = false,
  backgroundColor = null,
  textSize = 18,
  pressable = false,
  onPressFn = () => { },
  longPressable = false,
  onLongPressFn = () => { },
  pressOutable = false,
  onPressOutFn = () => { },
  ...props
}) {

  const [isTapped, setIsTapped] = useState(false);
  const [isHeld, setIsHeld] = useState(false);

  const [favorited, setFavorited] = useState(false);

  // animated values
  const translateValue = useRef(new Animated.Value(0)).current;
  const shadowOpacityValue = useRef(new Animated.Value(0)).current;

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

  // render already favorited vocab as favorited
  useEffect(() => {
    const checkVocab = async () => {
      // get favorited vocab
      const vocabList = await getCompletedFavoriteVocab();
      const slangList = await getCompletedSlang();
      if (vocabList.includes(hanzi) || slangList.includes(hanzi)) {
        // console.log(hanzi, 'in list');
        setFavorited(true);
      }
      // else {
      //   console.log(hanzi, 'not in list');
      // }
    };
    if (favoritable) {
      checkVocab();
    }
  }, []);

  // const textSize = 18;
  const styles = StyleSheet.create({
    vocabBlock: {
      margin: 0,
      paddingVertical: 5,
      paddingHorizontal: 10,
      minWidth: 100,
      maxWidth: 300,
      overflow: 'visible',
      backgroundColor: backgroundColor ? backgroundColor : youziColors.cardBackgroundYellow,
      // backgroundColor: youziColors.cardBackgroundOrange,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: "center",
      borderColor: favorited ? youziColors.buttonBackgroundPink : isTapped ? youziColors.blackText : 'transparent',
      // borderWidth: isHeld ? 1 : isTapped ? 1 : 0,
      borderWidth: 1,
      borderRadius: 5
    },
    vocabText: {
      fontSize: textSize,
      color: textColor ? textColor : 'black'
    },
    FavoritedIndicatorView: {
      position: 'absolute',
      left: -15,
      top: -15
    }
  });



  // press handlers
  const handlePress = () => {
    setIsTapped(true);
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
    setIsHeld(!isHeld);
    if (favoritable) {
      setFavorited(!favorited);
    }
    // console.log('VocabBlock long pressed', hanzi);

    onLongPressFn(favorited);
  };

  const handlePressOut = () => {
    setIsTapped(false);
    // setIsHeld(false);

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
      {...props}
    // {...panResponder.panHandlers}
    >
      <OutsidePressHandler
        onOutsidePress={pressOutable ? handlePressOut : () => { }}
      >
        <Pressable
          style={styles.vocabBlock}
          // onPressOut={pressable ? handlePressOut : null}
          onPress={pressable ? handlePress : null}
          onLongPress={longPressable ? handleLongPress : null}
          activeOpacity={0.8}

        >
          <Text >
            <HanziPinyinArray
              hanziArray={hanzi}
              customHanziSize={textSize}
              customPinyinSize={textSize}
              textColor={textColor}
              pinyinOn={true}
              pressable={false}
              enableLongPress={false} // disable long press (read aloud) to allow XiaoYou drag
            />
          </Text>
          {/* english translation */}
          {translation === '' ?
            <Text ></Text> :
            translation ?
              <Text style={styles.vocabText}>
                <EnglishTranslationText hanzi={hanzi} />
              </Text> : <></>
          }
          {favorited ?
            <View style={styles.FavoritedIndicatorView}>
              <FavoriteIndicator />
            </View>
            : <></>}
        </Pressable>
      </OutsidePressHandler>
    </Animated.View >
  )
}