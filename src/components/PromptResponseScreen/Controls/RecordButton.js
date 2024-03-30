import { View, Text } from 'react-native'
import React, { useState } from 'react'

import { Audio } from 'expo-av';

import IconButton from '../../Modules/Buttons/IconButton';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// styles
import { StyleSheet } from "react-native";
import { youziColors } from '../../../styles/youziStyles';


const styles = StyleSheet.create({
  recordingButtonView: {
  },
  recordButton: {
  }
})

export default function RecordButton() {
  // expo-audio
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
    <View style={styles.recordingButtonView}>
      <IconButton
        iconComponent={recording ?
          <MaterialIcons name="pause-circle-outline" size={80} color="red" /> :
          <MaterialCommunityIcons name="record-circle-outline" size={80} color="red" />}
        onPress={recording ? stopRecording : startRecording}
        style={styles.audioButton} // can pass styles b/c ...props
      // title={recording ? 'Stop Recording' : 'Start Recording'}
      />
      {/* <Text>PausePlayButton</Text> */}
    </View>
  )
}