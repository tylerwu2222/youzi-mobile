import { useEffect, useCallback, createContext, useState } from 'react';
import { Text, View, StyleSheet } from 'react-native';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// context
import { AudioPlayerProvider } from './src/scripts/AudioPlayerContext.js';

// storage
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import database from '@react-native-firebase/database'; // For Realtime Database

// press events
import { EventProvider } from 'react-native-outside-press';

// data
import { vibes } from './assets/data/vibes.js';

// screens
import LoadingScreen from './src/screens/LoadingScreen.js';
import HomeScreen from './src/screens/HomeScreen.js';
import OnboardingInterestsScreen from './src/screens/OnboardingInterestsScreen.js';
import OnboardingProfileScreen from './src/screens/OnboardingProfileScreen.js';
import VibeSelectScreen from './src/screens/VibeSelectScreen.js';
import PromptResponseScreen from './src/screens/PromptResponseScreen.js';
import PromptSelectScreen from './src/screens/PromptSelectScreen.js';
import ReviewScreen from './src/screens/ReviewScreen.js';
// import ReviewPromptScreen from './src/screens/ReviewPromptScreen.js';
import SettingsScreen from './src/screens/SettingsScreen.js';
import * as SplashScreen from 'expo-splash-screen';

// scripts
import { getOrInitializeAsyncBoolean } from './src/scripts/asyncStorageHandler.js';

// style
// import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { dummyChinesePrompt, dummyEnglishPrompt } from './assets/data/dummy_data.js';


// screen navigation
const Stack = createNativeStackNavigator();

// context
export const AppContext = createContext({});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: 'black'
  },
});

SplashScreen.preventAutoHideAsync();

export default function App() {
  // session variables
  // const [onboarded, setOnboarded] = useState(null); // modify manually for now
  const [onboarded, setOnboarded] = useState(true); // modify manually for now
  const [isTraditional, setIsTraditional] = useState(false);
  const [showPinyin, setShowPinyin] = useState(false);
  const [allowNSFWPrompts, setAllowNSFWPrompts] = useState(false);

  // prompt variables
  const [vibeID, setVibeID] = useState(null);
  const [subVibeID, setSubVibeID] = useState(null);
  // const [vibeObject, setVibeObject] = useState({});
  // const [subVibeObject, setSubVibeObject] = useState({});
  const [promptID, setPromptID] = useState(0);
  const [promptObject, setPromptObject] = useState({ 'convo_starter_1': dummyChinesePrompt, 'english_translation_1': dummyEnglishPrompt });

  // text/audio variables
  // const [audioResponse, setAudioResponse] = useState('');
  const [textResponse, setTextResponse] = useState('');
  const [xiaoYouTranscript, setXiaoYouTranscript] = useState('I don\'t know');

  // load fonts
  const [fontsLoaded, fontError] = useFonts({
    'Itim': require('./assets/fonts/Itim-Regular.ttf'),
    'Zilla Slab': require('./assets/fonts/ZillaSlab-Regular.ttf'),
    'Zilla Slab Semibold': require('./assets/fonts/ZillaSlab-SemiBold.ttf'),
    'Zilla Slab Bold': require('./assets/fonts/ZillaSlab-Bold.ttf'),
    'Roboto': require('./assets/fonts/Roboto-Regular.ttf')
  });


  // initialize user values
  useEffect(() => {
    // ONBOARDED --> onboarded
    getOrInitializeAsyncBoolean('ONBOARDED', initial_value = true).then(setOnboarded);
    // IS_TRAD --> isTraditional
    getOrInitializeAsyncBoolean('IS_TRAD').then(setIsTraditional);
    // NSFW --> allowNSFWPrompts
    getOrInitializeAsyncBoolean('NSFW').then(setAllowNSFWPrompts);
    // SHOW_PINYIN --> allowNSFWPrompts
    getOrInitializeAsyncBoolean('SHOW_PINYIN').then(setShowPinyin);
    // setIsLoaded(true);
  }, []);

  const onLayoutRootView = useCallback(async () => {
    // hide splash screen once layout loaded
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    console.log('fonts not loaded yet');
    return null;
  }

  return (
    <View
      style={styles.container}
      onLayout={onLayoutRootView} // fires once layout calculated
    >
      <EventProvider>
        <AppContext.Provider value={{
          // vibe
          vibeID,
          setVibeID,
          subVibeID,
          setSubVibeID,
          // prompt
          promptID,
          setPromptID,
          promptObject,
          setPromptObject,
          textResponse,
          setTextResponse,
          xiaoYouTranscript,
          setXiaoYouTranscript,
          // settings
          isTraditional,
          setIsTraditional,
          showPinyin,
          setShowPinyin,
          allowNSFWPrompts,
          setAllowNSFWPrompts
        }}>
          <AudioPlayerProvider>
            <NavigationContainer>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right'
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
                  options={{
                    title: 'Home',
                    presentation: 'modal',
                    animation: 'slide_from_right'
                  }}
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
                {/* <Stack.Screen
                name='review-prompt-page'
                component={ReviewPromptScreen}
                options={{ title: 'Review Prompt' }}
              /> */}
                <Stack.Screen
                  name='settings-page'
                  component={SettingsScreen}
                  options={{
                    title: 'Settings',
                    presentation: 'modal',
                    animation: 'slide_from_left'
                  }}
                />
              </Stack.Navigator>
            </NavigationContainer>
          </AudioPlayerProvider>
        </AppContext.Provider>
      </EventProvider>
    </View >
  );
}