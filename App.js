import { StatusBar } from 'expo-status-bar';

// navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import HomeScreen from './src/screens/HomeScreen.js';
import LoadingScreen from './src/screens/LoadingScreen.js';
import OnboardingScreen from './src/screens/OnboardingScreen.js';
import PromptResponseScreen from './src/screens/PromptResponseScreen.js';
import PromptSelectScreen from './src/screens/PromptSelectScreen.js';
import ReviewOverviewScreen from './src/screens/ReviewOverviewScreen.js';
import VibeSelectScreen from './src/screens/VibeSelectScreen.js';

import { StyleSheet, Text, View } from 'react-native';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen
          name='Home Page'
          component={HomeScreen}
          options={{ title: 'Home Page' }}
        />
        {/* <Stack.Screen
          name='Loading'
          component={LoadingScreen}
          options={{ title: 'Loading' }}
        /> */}
        <Stack.Screen
          name='Onboarding'
          component={OnboardingScreen}
          options={{ title: 'Onboarding' }}
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
          component={ReviewOverviewScreen}
          options={{ title: 'Review Mode' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
