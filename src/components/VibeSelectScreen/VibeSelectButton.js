import React, { useState, useContext, useRef } from 'react'
import { AppContext } from '../../../App';

import { View, Text, Image, TouchableOpacity, Pressable, StyleSheet, Animated } from 'react-native'
import SubVibeSelectButton from './SubVibeSelectButton';

// navigation
// import { useNavigation } from '@react-navigation/native';

// styles
import { youziColors } from '../../styles/youziStyles';

export default function VibeSelectButton({ id = 0, code = "code", label = "label", backgroundImage = "image", subvibes = [] }) {

  // console.log('SUBVIBES', subvibes);
  // const [selected, setSelected] = useState(false);
  const [subVibesVisible, setSubVibesVisible] = useState(false);



  // const navigation = useNavigation();
  // const navigateToVibe = (label) => {
  //   console.log('navigating to', label);
  //   // setVibeID()
  //   // navigation.navigate('prompt-select-page', { vibe: label });
  //   navigation.navigate('prompt-select-page');
  // }

  // initalize relative position of slide out animation as 0
  const slideAnim = useRef(new Animated.Value(0)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const heightAnim = useRef(new Animated.Value(0)).current;
  const toggleSubVibes = () => {
    console.log('toggling sub vibes');
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
      width: '100%',
      height: 100,
      borderRadius: 5,
      margin: 10,
      marginTop: 30,
      marginBottom: 30,
      padding: 10,
      backgroundColor: youziColors.buttonBackground,
      // backgroundColor: selected ? youziColors.buttonBackgroundPress : youziColors.buttonBackground,
      // color: selected ? youziColors.blackText : youziColors.whiteText
      color: youziColors.blackText
    },
    vibeButtonText: {
      fontFamily: 'Zilla Slab',
      fontSize: 20,
    },
    toggleableView: {
      // position: 'absolute',
      // top: slideAnim,
      opacity: opacityAnim,
      width: '100%',
      flexDirection:'column',
      alignItems: 'flex-end'
      // overflow: 'hidden'
    }
  });

  return (
    <>
      <Pressable
        style={styles.vibeButton}
        onPress={() => {
          toggleSubVibes();
          // setSelected(!selected);
          // setVibeID(id);
          // navigateToVibe(label);
        }}
      >
        <Text
          style={styles.vibeButtonText}
        >{label}</Text>
        <Image
          // style={styles.tinyImage}
          src={backgroundImage}
          alt={'vibe image'}
        >
        </Image>
      </Pressable >
      {subVibesVisible ?
        <Animated.View style={styles.subVibeView}>
          {subvibes.map((subvibe, index) => {
            return (
              <Animated.View style={styles.toggleableView}>
                <SubVibeSelectButton key={index} vibeId={id} subVibeId={index} label={subvibe.label} />
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