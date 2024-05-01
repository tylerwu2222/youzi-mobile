import React, { useState, useContext, useRef } from 'react'
import { AppContext } from '../../../App';

import { View, Text, Image, TouchableOpacity, Pressable, StyleSheet, Animated } from 'react-native'
import SubVibeSelectButton from './SubVibeSelectButton';

// navigation
import { useNavigation } from '@react-navigation/native';

// styles
import { youziDimensions, youziColors } from '../../styles/youziStyles';

export default function VibeSelectButton({
  vibeId = 0,
  code = "code",
  label = "label",
  backgroundIcon = "image",
  subvibes = [] }) {

  // console.log('SUBVIBES', subvibes);
  const [selected, setSelected] = useState(false);
  const [subVibesVisible, setSubVibesVisible] = useState(false);

  const {
    setVibeID,
    setSubVibeID
  } = useContext(AppContext);

  const navigation = useNavigation();
  const navigateToVibe = (label) => {
    console.log('navigating to', label);
    navigation.navigate('prompt-select-page');
  }

  // initalize relative position of slide out animation as 0
  // const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;

  const toggleSubVibes = () => {
    // console.log('toggling sub vibes');
    setSubVibesVisible(!subVibesVisible);
    Animated.timing(
      heightAnim,
      {
        toValue: subVibesVisible ? 0 : 500,
        duration: 600,
        useNativeDriver: false,
      }
    ).start();
    Animated.timing(
      opacityAnim,
      {
        toValue: subVibesVisible ? 0 : 1,
        duration: 700,
        useNativeDriver: false,
      }
    ).start();
    // Animated.timing(
    //   slideAnim,
    //   {
    //     toValue: subVibesVisible ? 0 : 300,
    //     duration: 800,
    //     useNativeDriver: false,
    //   }
    // ).start();
  };

  const styles = StyleSheet.create({
    subVibeView: {
      flexDirection: 'column',
      alignItems: 'flex-end',
      height: heightAnim
    },
    vibeButton: {
      alignItems: 'center',
      justifyContent: 'center',
      // height: 100,
      height: youziDimensions.vh / 8,
      width: youziDimensions.paddedWidth,
      borderRadius: 5,
      margin: 10,
      marginTop: 30,
      marginBottom: 30,
      padding: 10,
      backgroundColor: youziColors.buttonBackground,
      color: youziColors.blackText,
      overflow: 'hidden'
    },
    vibeButtonText: {
      fontFamily: 'Itim',
      fontSize: 20,
      opacity: selected ? 0.6 : 1
    },
    vibeButtonBackgroundImage: {
      position: 'relative',
      right: youziDimensions.vw * -2 / 7,
      bottom: youziDimensions.vw * 0,
      // flex: 1,
      opacity: 0.85,
      width: selected ? youziDimensions.vw * 5 / 16 : youziDimensions.vw / 4, // Ensure the image covers the entire TouchableOpacity
      height: youziDimensions.vw / 4,
    },
    overlay: {
      ...StyleSheet.absoluteFillObject, // invokes position absolute and top, bottom, left,..: 0 (centering item)
      alignItems: 'left',
      paddingLeft: youziDimensions.vw / 7,
      justifyContent: 'center',
    },
    toggleableView: {
      // position: 'absolute',
      // top: slideAnim,
      opacity: opacityAnim,
      width: '100%',
      flexDirection: 'column',
      alignItems: 'flex-end'
      // overflow: 'hidden'
    }
  });

  return (
    <>
      {/* vibe button */}
      <Pressable
        style={styles.vibeButton}
        // toggle subvibes if short press
        onPress={() => {
          toggleSubVibes();
        }}
        // generate random subvibe if longPress
        onLongPress={() => {
          setVibeID(vibeId);
          // setSubVibeID(null);
          setSubVibeID(Math.floor(Math.random() * subvibes.length));
          navigateToVibe(label);
          // console.log('v', vibeId);
          
        }}
        onPressIn={() => {
          setSelected(true);
        }}
        onPressOut={() => {
          setSelected(false);
        }}
      >
        <Image
          style={styles.vibeButtonBackgroundImage}
          source={backgroundIcon}
          alt={'vibe-image'}
        >
        </Image>
        <View style={styles.overlay}>
          <Text
            style={styles.vibeButtonText}
          >{label}</Text>
        </View>
      </Pressable >

      {/* subvibe buttons */}
      {subVibesVisible ?
        <Animated.View style={styles.subVibeView}>
          {subvibes.map((subvibe, index) => {
            return (
              <Animated.View style={styles.toggleableView}>
                <SubVibeSelectButton
                  key={index}
                  vibeId={vibeId}
                  subVibeId={index}
                  label={subvibe.label}
                />
              </Animated.View>
            )
            // return <SubVibeSelectButton key={index} vibeId={id} subVibeId={index} label={label} />
          }
          )}
        </Animated.View> :
        <></>}
    </>
  )
}