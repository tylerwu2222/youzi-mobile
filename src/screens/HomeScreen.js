import React, { useState, useEffect } from 'react';

// components
import { ActivityIndicator, FlatList, Text, View, Image } from 'react-native';
import HomeModeButton from '../components/HomeScreen/HomeModeButton';

// import { SettingsIcon } from '@mui/icons-material';


// styles
import { StyleSheet } from "react-native";
import { youziColors, youziStyles } from '../styles/youziStyles';
// import { youziColors } from '../styles/youziStyles';
import { youziDimensions } from '../styles/youziStyles';
import IconButton from '../components/Modules/Buttons/IconButton';
import SettingsButton from '../components/SettingsButton/SettingsButton';

const styles = StyleSheet.create({
  homeLogo: {
    width: youziDimensions.vw / 2,
    height: youziDimensions.vw / 2
  }
});

export default function HomeScreen() {
  return (
    <View style={youziStyles.centeredView}>
      <Text>
        Youzi.HomeScreen
      </Text>
      <Image
        style={styles.homeLogo}
        source={require('../../assets/icons/youzi_logo.png')}>
      </Image>
      <HomeModeButton
        text={'Prompt mode'}
        mode={'prompt'} />
      <HomeModeButton
        text={'Review mode (Premium)'}
        mode={'review'} />
      {/* <HomeModeButton text={'Review mode (Premium)'} mode={'review'} disabled={true} /> */}
      {/* create seperate icon button later */}
      <SettingsButton/>
      {/* <IconButton
        iconComponent={<AntDesign name="setting" size={40} color={youziColors.buttonBackgroundAccent} />}
        onPress={() => { navigateToSettings() }}
        style={styles.settingsButton} // can pass styles b/c ...props
      /> */}
    </View>
  )
}
