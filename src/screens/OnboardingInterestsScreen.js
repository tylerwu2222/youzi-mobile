import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

import TextButton from '../components/Modules/Buttons/TextButton';
import InterestsContainer from '../components/OnboardingInterestsScreen/InterestsContainer';

import { youziStyles } from '../styles/youziStyles';

export default function OnboardingInterestsScreen() {
  const [remainingInterests, setRemainingInterests] = useState(3);
  const navigation = useNavigation();
  const navigateToProfile = () => {
    navigation.navigate('Onboarding Profile')
  }

  return (
    <View style={youziStyles.centeredView} >
      <Text>What are you in to?</Text>
      <Text>Choose {remainingInterests} more:</Text>
      <InterestsContainer />
      <TextButton text={'continue'} backgroundColor={'none'} onPress={() => {navigateToProfile()}} />
    </View>
  )
}