import { useEffect } from 'react';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// screens
import LoadingScreen from './src/screens/LoadingScreen.js';

import HomeScreen from './src/screens/HomeScreen.js';

import OnboardingInterestsScreen from './src/screens/OnboardingInterestsScreen.js';
import OnboardingProfileScreen from './src/screens/OnboardingProfileScreen.js';

import VibeSelectScreen from './src/screens/VibeSelectScreen.js';
import PromptResponseScreen from './src/screens/PromptResponseScreen.js';
import PromptSelectScreen from './src/screens/PromptSelectScreen.js';

import ReviewScreen from './src/screens/ReviewScreen.js';
import ReviewPromptScreen from './src/screens/ReviewPromptScreen.js';


// context
import { createContext, useState } from 'react';

// style
// import { StyleSheet, Text, View } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';

// screen navigation
const Stack = createNativeStackNavigator();

// context
export const AppContext = createContext({});

export default function App() {
  // fonts
  const [fontsLoaded] = useFonts({
    'Zilla Slab': require('./assets/fonts/ZillaSlab-Regular.ttf'),
    'Zilla Slab Bold': require('./assets/fonts/ZillaSlab-Bold.ttf'),
  });

  // session variables
  // const [onboarded, setOnboarded] = useState(true);
  const [onboarded, setOnboarded] = useState(false);

  const [vibeID, setVibeID] = useState(1);
  const [promptID, setPromptID] = useState(0);
  const [promptObject, setPromptObject] = useState({});
  // const [audioResponse, setAudioResponse] = useState('');
  const [textResponse, setTextResponse] = useState('');

  useEffect(() => {
    getStorage();
  }, []);
  const getStorage = async () => {
    const onboarded = await AsyncStorage.getItem('ONBOARDED');
    setOnboarded(JSON.parse(onboarded));
  };

  return (
    <AppContext.Provider value={{
      vibeID,
      setVibeID,
      promptID,
      setPromptID,
      promptObject,
      setPromptObject,
      textResponse,
      setTextResponse
    }}>
      {/* RENAME name to dash-notation, keep title the same */}
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}
          initialRouteName={onboarded ? 'home-page' : 'onboarding-interests-page'}
        >
          <Stack.Screen
            name='onboarding-interests-page'
            component={OnboardingInterestsScreen}
            options={{ title: 'Onboarding Interests' }}
          />
          <Stack.Screen
            name='home-page'
            component={HomeScreen}
            options={{ title: 'Home' }}
          />
          <Stack.Screen
            name='onboarding-profile-page'
            component={OnboardingProfileScreen}
            options={{ title: 'Onboarding Profile' }}
          />
          <Stack.Screen
            name='vibe-select-page'
            component={VibeSelectScreen}
            options={{ title: 'Vibe Select' }}
          />
          <Stack.Screen
            name='prompt-select-page'
            component={PromptSelectScreen}
            options={{ title: 'Prompt Select' }}
          />
          <Stack.Screen
            name='prompt-response-page'
            component={PromptResponseScreen}
            options={{ title: 'Prompt Response' }}
          />
          <Stack.Screen
            name='review-mode-page'
            component={ReviewScreen}
            options={{ title: 'Review Mode' }}
          />
          <Stack.Screen
            name='review-prompt-page'
            component={ReviewPromptScreen}
            options={{ title: 'Review Prompt' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}