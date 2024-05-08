import React, { useState, useEffect } from 'react';

// components
import { TouchableOpacity, StyleSheet } from 'react-native';
import { ActivityIndicator, FlatList, Text, View, Image } from 'react-native';
import HomeModeButton from '../components/HomeScreen/HomeModeButton';
import SettingsButton from '../components/NavigationButtons/SettingsButton/SettingsButton';

// import { addUser } from '../scripts/users/addUser';

// styles
import { youziColors, youziStyles } from '../styles/youziStyles';


const styles = StyleSheet.create({
});

export default function HomeScreen() {
  return (
    <View style={youziStyles.centeredView}>
      {/* <Text>Youzi.HomeScreen</Text> */}
      {/* <TouchableOpacity
        onPress={() => {
          addUser();
        }}
      >
        <Text>addUser</Text>
      </TouchableOpacity > */}
      <HomeModeButton
        text={'Conversation'}
        mode={'prompt'}
        backgroundImage={'mascot'}
      />
      <HomeModeButton
        text={'Review '}
        mode={'review'}
        backgroundImage={'mascotGlasses'}
      />
      <SettingsButton />
    </View>
  )
}
