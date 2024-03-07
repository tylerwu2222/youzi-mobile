import React, { useState, useContext } from 'react'
import { AppContext } from '../../../App';

import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'

// navigation
import { useNavigation } from '@react-navigation/native';

// styles
import { StyleSheet } from "react-native";
import { youziColors } from '../../styles/youziStyles';

export default function VibeSelectButton({ id = 0, code = "code", label = "label", backgroundImage = "image" }) {
  const [selected, setSelected] = useState(false);
  const {
    // vibeID,
    setVibeID
  } = useContext(AppContext);

  const styles = StyleSheet.create({
    vibeButton: {
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
      height: 100,
      borderRadius: 5,
      margin: 10,
      padding: 10,
      // backgroundColor: youziColors.buttonBackground,
      backgroundColor: selected ? youziColors.buttonBackgroundPress : youziColors.buttonBackground,
      color: selected ? youziColors.blackText : youziColors.whiteText
    },
    vibeButtonText: {
      fontFamily: 'Zilla Slab',
      fontSize: 20,
    }
  });

  const navigation = useNavigation();
  const navigateToVibe = (label) => {
    console.log('navigating to', label);
    // setVibeID()
    // navigation.navigate('prompt-select-page', { vibe: label });
    navigation.navigate('prompt-select-page');
  }

  return (
    <Pressable
      style={styles.vibeButton}
      onPress={() => {
        setSelected(!selected);
        setVibeID(id);
        navigateToVibe(label);
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
  )
}