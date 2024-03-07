import { useEffect } from 'react';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// context
import { AudioPlayerProvider } from './src/scripts/AudioPlayerContext.js';

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

import SettingsScreen from './src/screens/SettingsScreen.js';

// context
import { createContext, useState } from 'react';

// style
// import { StyleSheet, Text, View } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { useFonts } from 'expo-font';
import * as Font from 'expo-font';


// screen navigation
const Stack = createNativeStackNavigator();

// context
export const AppContext = createContext({});

export default function App() {

  // async storage initialization
  const initializeBooleanAsyncStorageItem = async (key, initial_value = null) => {
    // if initial_value --> first, set ASYNC
    const updateData = async () => {
      await AsyncStorage.setItem(key, JSON.stringify(initial_value));
    }
    if (initial_value !== null) {
      console.log('initial value provided', initial_value);
      updateData();
    }
    else {
      console.log('initial value not provided')
    }

    // else, just get ASYNC
    const string_value = await AsyncStorage.getItem(key);
    const value = JSON.parse(string_value);
    console.log('initial', key, 'value:', value);
    // if (typeof value == 'boolean') {
    // console.log(key, value, 'is boolean', value);
    return value;
  }


  // session variables
  const [onboarded, setOnboarded] = useState(null); // modify manually for now
  const [isTraditional, setIsTraditional] = useState(null);
  const [allowNSFWPrompts, setAllowNSFWPrompts] = useState(null);

  const [vibeID, setVibeID] = useState(1);
  const [promptID, setPromptID] = useState(0);
  const [promptObject, setPromptObject] = useState({});
  // const [audioResponse, setAudioResponse] = useState('');
  const [textResponse, setTextResponse] = useState('');

  const [isFontLoaded, setIsFontLoaded] = useState(false);

  // load fonts
  useEffect(() => {
    // const [fontsLoaded] = useFonts({});
    const loadFont = async () => {
      await Font.loadAsync({
        'Zilla Slab': require('./assets/fonts/ZillaSlab-Regular.ttf'),
        'Zilla Slab Bold': require('./assets/fonts/ZillaSlab-Bold.ttf'),
      });
    };
    loadFont();
    setIsFontLoaded(true);
  }, []);

  // initialize user values
  useEffect(() => {
    // ONBOARDED --> onboarded
    initializeBooleanAsyncStorageItem('ONBOARDED', initial_value = true).then(setOnboarded);
    // IS_TRAD --> isTraditional
    initializeBooleanAsyncStorageItem('IS_TRAD').then(setIsTraditional);
    // NSFW --> allowNSFWPrompts
    initializeBooleanAsyncStorageItem('NSFW').then(setAllowNSFWPrompts);
    // setIsLoaded(true);
  }, []);

  if (onboarded === null || !isFontLoaded) {
    console.log('onboarded null, loading...');
    return <LoadingScreen />;
  }

  return (
    <AppContext.Provider value={{
      vibeID,
      setVibeID,
      promptID,
      setPromptID,
      promptObject,
      setPromptObject,
      textResponse,
      setTextResponse,
      isTraditional,
      setIsTraditional,
      allowNSFWPrompts,
      setAllowNSFWPrompts
    }}>
      <AudioPlayerProvider>
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
            <Stack.Screen
              name='settings-page'
              component={SettingsScreen}
              options={{ title: 'Settings' }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </AudioPlayerProvider>
    </AppContext.Provider>
  );
}