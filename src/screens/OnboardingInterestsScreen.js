import { View, Text } from 'react-native'
import React, { useState, createContext } from 'react'
import { useNavigation } from '@react-navigation/native';

import TextButton from '../components/Modules/Buttons/TextButton';
import InterestsContainer from '../components/OnboardingInterestsScreen/InterestsContainer';

import { youziStyles } from '../styles/youziStyles';

export const InterestsContext = createContext({});

export default function OnboardingInterestsScreen() {
  const [remainingInterests, setRemainingInterests] = useState(3);

  const navigation = useNavigation();
  const navigateToProfile = () => {
    navigation.navigate('onboarding-profile-page')
  }

  return (
    <InterestsContext.Provider
      value={{
        setRemainingInterests
      }}
    >
      <View style={youziStyles.centeredView} >
        <Text>What are you in to?</Text>
        <Text>Choose {remainingInterests} more:</Text>
        <InterestsContainer />
        <TextButton text={'skip'} backgroundColor={'none'} onPress={() => { navigateToProfile() }} />
        <TextButton text={'continue'} backgroundColor={'none'} onPress={() => { navigateToProfile() }} />
      </View>
    </InterestsContext.Provider>
  )
}