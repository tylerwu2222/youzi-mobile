import { View, Text, Button } from 'react-native'
import React, { useState, useEffect } from 'react'

// audio
import { Audio } from 'expo-av';
import Voice from '@react-native-voice/voice';
// import Voice from '@react-native-voice/voice/dist/voice';
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
  // expo-audio
  const [recording, setRecording] = useState();
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  // RN voice
  // const [recognized, setRecognized] = useState('');
  // const [pitch, setPitch] = useState('');
  // const [error, setError] = useState('');
  // const [end, setEnd] = useState('');
  // const [started, setStarted] = useState('');
  // const [results, setResults] = useState([]);
  // const [partialResults, setPartialResults] = useState([]);

  // useEffect(() => {
  //   Voice.onSpeechStart = onSpeechStart;
  //   Voice.onSpeechRecognized = onSpeechRecognized;
  //   Voice.onSpeechEnd = onSpeechEnd;
  //   Voice.onSpeechError = onSpeechError;
  //   Voice.onSpeechResults = onSpeechResults;
  //   Voice.onSpeechPartialResults = onSpeechPartialResults;
  //   Voice.onSpeechVolumeChanged = onSpeechVolumeChanged;

  //   return () => {
  //     Voice.destroy().then(Voice.removeAllListeners);
  //   };
  // }, []);

  // const onSpeechStart = (e) => {
  //   console.log('onSpeechStart: ', e);
  //   setStarted('√');
  // };

  // const onSpeechRecognized = (e) => {
  //   console.log('onSpeechRecognized: ', e);
  //   setRecognized('√');
  // };

  // const onSpeechEnd = (e) => {
  //   console.log('onSpeechEnd: ', e);
  //   setEnd('√');
  // };

  // const onSpeechError = (e) => {
  //   console.log('onSpeechError: ', e);
  //   setError(JSON.stringify(e.error));
  // };

  // const onSpeechResults = (e) => {
  //   console.log('onSpeechResults: ', e);
  //   setResults(e.value);
  // };

  // const onSpeechPartialResults = (e) => {
  //   console.log('onSpeechPartialResults: ', e);
  //   setPartialResults(e.value);
  // };

  // const onSpeechVolumeChanged = (e) => {
  //   console.log('onSpeechVolumeChanged: ', e);
  //   setPitch(e.value);
  // };

  // const startRecognizing = async () => {
  //   setRecognized('');
  //   setPitch('');
  //   setError('');
  //   setStarted('');
  //   setResults([]);
  //   setPartialResults([]);
  //   setEnd('');

  //   try {
  //     console.log('starting Voice');
  //     await Voice.start('en-US');
  //   } catch (e) {
  //     console.error('voice start error', e);
  //   }
  // };

  // const stopRecognizing = async () => {
  //   try {
  //     await Voice.stop();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const cancelRecognizing = async () => {
  //   try {
  //     await Voice.cancel();
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };

  // const destroyRecognizer = async () => {
  //   try {
  //     await Voice.destroy();
  //   } catch (e) {
  //     console.error(e);
  //   }
  //   setRecognized('');
  //   setPitch('');
  //   setError('');
  //   setStarted('');
  //   setResults([]);
  //   setPartialResults([]);
  //   setEnd('');
  // };

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

  // async function startRecording() {
  //   Voice.start('en-US');
  // };


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
      {/* <Button
        title={'Start Recording'}
        onPress={startRecognizing}
      />
      <Button
        title={'Stop Recording'}
        onPress={stopRecognizing}
      />
      <Text style={styles.stat}>{`Started: ${started}`}</Text>
      <Text style={styles.stat}>{`Recognized: ${recognized}`}</Text>
      <Text style={styles.stat}>{`Pitch: ${pitch}`}</Text>
      <Text style={styles.stat}>{`Error: ${error}`}</Text>
      <Text style={styles.stat}>Results</Text>
      {results.map((result, index) => (
        <Text key={`result-${index}`} style={styles.stat}>
          {result}
        </Text>
      ))}
      <Text style={styles.stat}>Partial Results</Text>
      {partialResults.map((result, index) => (
        <Text key={`partial-result-${index}`} style={styles.stat}>
          {result}
        </Text>
      ))}
      <Text style={styles.stat}>{`End: ${end}`}</Text> */}
      <SettingsButton />
    </View>
  )
}