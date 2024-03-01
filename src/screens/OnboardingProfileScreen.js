import { View, Text } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

import TextButton from '../components/Modules/Buttons/TextButton';

import { youziStyles } from '../styles/youziStyles'

export default function OnboardingProfileScreen() {

  const navigation = useNavigation();
  const navigateToHome = () => {
    navigation.navigate('Home')
  }

  return (
    <View style={youziStyles.centeredView}>
      <Text>OnboardingProfileScreen</Text>
      <Text>Create your profile:</Text>
      <TextButton text={'start!'} backgroundColor={'none'} onPress={() => { () => { navigateToHome() } }} />
    </View>
  )
}