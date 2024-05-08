import React from 'react'

import { useNavigation } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, Text } from 'react-native'
import TextButton from '../components/Modules/Buttons/TextButton';

import { youziStyles } from '../styles/youziStyles'

export default function OnboardingProfileScreen() {

  const navigation = useNavigation();

  const navigateToHome = async () => {
    await AsyncStorage.setItem('ONBOARDED', 'true'); // set onboarding true
    console.log('navigating home?');
    navigation.navigate('home-page');
  }

  return (
    <View style={youziStyles.centeredView}>
      <Text>OnboardingProfileScreen</Text>
      <Text>Create your profile:</Text>
      <TextButton text={'skip'} backgroundColor={'none'} onPress={() => { navigateToHome() }} />
      <TextButton text={'start!'} backgroundColor={'none'} onPress={() => { navigateToHome() }} />
    </View>
  )
}