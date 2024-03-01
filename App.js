// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
  const [firstLogin, setFirstLogin] = useState(false); // CHANGE THIS TO TOGGLE ONBOARDING OR NOT
  const [vibeID, setVibeID] = useState(1);
  const [promptID, setPromptID] = useState(0);
  const [promptObject, setPromptObject] = useState({});
  // const [audioResponse, setAudioResponse] = useState('');
  const [textResponse, setTextResponse] = useState('');

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
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false
          }}>
          {firstLogin ?
            // show onboarding page if first login
            <Stack.Screen
              name='Onboarding Interests Page'
              component={OnboardingInterestsScreen}
              options={{ title: 'Onboarding Interests' }}
            /> :
            // else show home page
            <Stack.Screen
              name='Home Page'
              component={HomeScreen}
              options={{ title: 'Home' }}
            />}
          {/* <Stack.Screen
            name='Loading'
            component={LoadingScreen}
            options={{ title: 'Loading' }}
          /> */}
          <Stack.Screen
            name='Onboarding Profile'
            component={OnboardingProfileScreen}
            options={{ title: 'Onboarding Profile' }}
          />
          <Stack.Screen
            name='Vibe Select'
            component={VibeSelectScreen}
            options={{ title: 'Vibe Select' }}
          />
          <Stack.Screen
            name='Prompt Select'
            component={PromptSelectScreen}
            options={{ title: 'Prompt Select' }}
          />
          <Stack.Screen
            name='Prompt Response'
            component={PromptResponseScreen}
            options={{ title: 'Prompt Response' }}
          />
          <Stack.Screen
            name='Review Mode'
            component={ReviewScreen}
            options={{ title: 'Review Mode' }}
          />
          <Stack.Screen
            name='Review Prompt'
            component={ReviewPromptScreen}
            options={{ title: 'Review Prompt' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AppContext.Provider>
  );
}