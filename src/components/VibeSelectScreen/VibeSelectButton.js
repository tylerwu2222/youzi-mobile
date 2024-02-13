import React, { useState } from 'react'

import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native'

// navigation
import { useNavigation } from '@react-navigation/native';

// styles
import { StyleSheet } from "react-native";
import { youziColors } from '../../styles/youziStyles';

export default function VibeSelectButton({ vibe = "vibe", backgroundImage = "image" }) {
  const [selected, setSelected] = useState(false);


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
  const navigateToVibe = (vibe) => {
    console.log('navigating to', vibe);
    navigation.navigate('Prompt Select', { vibe: vibe });
  }

  return (
    <Pressable
      style={styles.vibeButton}
      onPress={() => {
        setSelected(!selected);
        navigateToVibe(vibe);
      }}
    >
      {/* <TouchableOpacity
      style={styles.vibeButton}
      onPress={() => {
        navigateToVibe(vibe)
      }}
    > */}
      <Text
        style={styles.vibeButtonText}
      >{vibe}</Text>
      <Image
        // style={styles.tinyImage}
        src={backgroundImage}
        alt={'vibe image'}
      >
      </Image>
      {/* </TouchableOpacity > */}
    </Pressable >
  )
}