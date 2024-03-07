import { View, Text, Button } from 'react-native'
import React, { useState } from 'react'

// audio
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';

// components
import PromptCard from '../components/PromptResponseScreen/PromptCard';
import ControlsBar from '../components/PromptResponseScreen/Controls/ControlsBar';

// styles
import { StyleSheet } from "react-native";
import { youziStyles } from '../styles/youziStyles';
import { youziColors } from '../styles/youziStyles';
import { youziDimensions } from '../styles/youziStyles';
import PromptVocabCard from '../components/PromptResponseScreen/PromptVocabCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SettingsButton from '../components/SettingsButton/SettingsButton';

const styles = StyleSheet.create({
  homeLogo: {
    width: youziDimensions.vw / 2,
    height: youziDimensions.vw / 2
  }
});


// AUDIO should be:
// 1) recorded & saved in cache
// 2) playable from cache, if user dislikes, discard
// 3) else, save on device

export default function PromptResponseScreen() {
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  async function startRecording() {
    try {
      if (permissionResponse.status !== 'granted') {
        console.log('Requesting permission..');
        await requestPermission();
      }
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }


  async function stopRecording() {
    // 1) stop recording
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = await recording.getURI();
    console.log('Recording stopped and stored at', uri);

    // 2) save cache URI in asyncStorage
    // 2a) get existing recordings
    const existingRecordingsString = await AsyncStorage.getItem('PROMPT_RECORDINGS');
    let existingRecordings = JSON.parse(existingRecordingsString);
    existingRecordings = existingRecordings == null ? [] : existingRecordings; // initialize key as empty array if empty

    console.log('current existing recordings', existingRecordings);
    // 2b) Create and append the new recording
    const newRecording = {
      id: existingRecordings == null ? 0 : existingRecordings.length, // Incremented id (length = current largest index + 1)
      uri: recording.getURI(), // store URI of the recording
    };
    existingRecordings.push(newRecording);
    const updatedRecordingsJSON = JSON.stringify(existingRecordings);

    // 2c) Update array in AsyncStorage
    await AsyncStorage.setItem('PROMPT_RECORDINGS', updatedRecordingsJSON);

    // test getting async
    const postRecordingsJSON = await AsyncStorage.getItem('PROMPT_RECORDINGS');
    console.log('post existing recordings', JSON.parse(postRecordingsJSON));
    // if user confirms recording save --> send to firebase

  }

  return (
    <View style={youziStyles.centeredView}>
      <Text>Youzi.PromptResponseScreen</Text>
      <PromptCard />
      <PromptVocabCard />
      <ControlsBar />
      <Button
        title={recording ? 'Stop Recording' : 'Start Recording'}
        onPress={recording ? stopRecording : startRecording}
      />
      <SettingsButton/>
    </View>
  )
}