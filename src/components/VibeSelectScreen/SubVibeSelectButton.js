import React, { useState, useContext } from 'react'
import { AppContext } from '../../../App';

import { View, Text, Image, TouchableOpacity, Pressable, StyleSheet } from 'react-native'


// navigation
import { useNavigation } from '@react-navigation/native';

// styles
import { youziColors } from '../../styles/youziStyles';


const styles = StyleSheet.create({
  subVibeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '70%',
    height: 60,
    borderRadius: 5,
    margin: 10,
    marginTop: 30,
    marginBottom: 30,
    padding: 10,
    backgroundColor: youziColors.buttonBackground,
    color: youziColors.blackText
  },
  subVibeButtonText: {
    fontFamily: 'Zilla Slab',
    fontSize: 17,
  }
});



export default function SubVibeSelectButton({ vibeId = 0, subVibeId = 0, label = "label", backgroundImage = "image" }) {
  console.log('LABEL IN SVSB', label);

  const {
    setSubVibeID,
    setVibeID,
  } = useContext(AppContext);


  const navigation = useNavigation();
  const navigateToVibe = (label) => {
    console.log('navigating to', label);
    // setVibeID(vibeId);
    // setSubVibeID(subVibeId);
    // navigation.navigate('prompt-select-page', { vibe: label });
    navigation.navigate('prompt-select-page');
  }

  return (
    <Pressable
      style={styles.subVibeButton}
      onPress={() => {
        // setSelected(!selected);
        setVibeID(vibeId);
        setSubVibeID(subVibeId);
        navigateToVibe(label);
      }}
    >
      <Text
        style={styles.subVibeButtonText}
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