import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Audio } from 'expo-av';

// scripts
import { getPromptAudioByID } from '../../../scripts/audioGetter';
import { transcribeAudio } from '../../../scripts/openai';

// components
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

const TIME_LIMIT = 30;
const todayDate = new Date().toLocaleDateString();

export default function RecordButton() {
  // expo-audio
  const [transcription, setTranscription] = useState('练习中文');
  const [recording, setRecording] = useState(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  // update transcript when recording made
  // useEffect(() => {
  //   const handleTranscribe = async () => {
  //     try {
  //       // const audioFile = await getPromptAudioByID(promptNumber);
  //       // const audioFile = await DocumentPicker.getDocumentAsync({
  //       //     type: 'audio/*',
  //       // });
  //       // console.log('PA audio file', audioFile);
  //       // const fileSize = await getFileSize(audioFile);
  //       // console.log('file size', fileSize);
  //       const transcribedText = await transcribeAudio(audioFile, 'zh');
  //       console.log('PA transcribed text', transcribedText)
  //       setTranscription(transcribedText);
  //     } catch (error) {
  //       console.error('Error transcribing audio:', error);
  //     }
  //   };
  //   if (recording) {
  //     handleTranscribe();
  //   }
  // }, [recording]);

  // testing setting and getting recording from firebase
  // test fn works!
  useEffect(() => {
    // Replace with custom cloudFunctionURL
    const cloudFunctionUrl = 'https://helloworld-ubksznr5oq-uc.a.run.app';
    // const cloudFunctionUrl = 'https://your-project-id.cloudfunctions.net/myFunction';

    const fetchData = async () => {
      try {
        const response = await fetch(cloudFunctionUrl);
        const data = await response.json();
        // console.log('Response:', response);
        console.log('Response:', data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    // fetchData();
  }, []);

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
    setRecording(undefined); // reset to undefined
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = await recording.getURI();
    console.log('Recording stopped and stored at', uri);

    // 2) save cache URI in asyncStorage
    // 2a) get transcription from recording
    const handleTranscribe = async (uri) => {
      try {
        // const audioFile = await getPromptAudioByID(promptNumber);
        // const audioFile = await DocumentPicker.getDocumentAsync({
        //     type: 'audio/*',
        // });
        // console.log('PA audio file', audioFile);
        console.log('uri', uri);
        // const fileSize = await getFileSize(audioFile);
        // console.log('file size', fileSize);
        const transcribedText = await transcribeAudio(uri, 'zh');
        console.log('PA transcribed text', transcribedText)
        setTranscription(transcribedText);
      } catch (error) {
        console.error('Error transcribing audio:', error);
        // setTranscription('Transcription failed');
      }
    };
    if (uri) {
      handleTranscribe(uri);
    }

    // 2b) Get existing recordings, then create and append the new recording
    const existingRecordingsString = await AsyncStorage.getItem('PROMPT_RECORDINGS');
    let existingRecordings = JSON.parse(existingRecordingsString);
    existingRecordings = existingRecordings == null ? [] : existingRecordings; // initialize key as empty array if empty
    console.log('BEFORE existing recordings', existingRecordings.map(r => r.id));

    const newRecording = {
      id: existingRecordings == null ? 0 : existingRecordings.length, // Incremented id (length = current largest index + 1)
      title: (existingRecordings == null ? 0 : existingRecordings.length).toString() + ': Prompt title', // replace from backend later
      uri: recording.getURI(), // store URI of the recording
      difficulty: 'Beginner',
      date: todayDate,
      transcription: transcription
    };
    existingRecordings.push(newRecording);
    const updatedRecordingsJSON = JSON.stringify(existingRecordings);

    // 2c) Update array in AsyncStorage
    await AsyncStorage.setItem('PROMPT_RECORDINGS', updatedRecordingsJSON);

    // test getting async
    const postRecordingsJSON = await AsyncStorage.getItem('PROMPT_RECORDINGS');
    console.log('AFTER existing recordings', JSON.parse(postRecordingsJSON.map(r => r.id)));
    // if user confirms recording save --> send to firebase

  }

  // timer that stops recording after N seconds

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