import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../../App';

// scripts
import { addCompletedVocab, addPromptResponse, addSlang } from '../../../scripts/asyncStorageHandler';
import { getSlangColumn, joinVocabColumns } from '../../../scripts/victorJSONHandler';
// import { getPromptAudioByID } from '../../../scripts/audioGetter';
// import { transcribeAudio } from '../../../scripts/openai';
// import { readFileAsBase64 } from '../../../scripts/archived/audioFileManipulation';

// components
import { View, Text, Animated, Easing } from 'react-native';
// import Svg, { Circle } from 'react-native-svg';
import IconButton from '../../Modules/Buttons/IconButton';

// assets
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// modules
import { Audio } from 'expo-av';

// storage
// import AsyncStorage from '@react-native-async-storage/async-storage';

// styles
import { StyleSheet } from "react-native";
// import { youziColors } from '../../../styles/youziStyles';


const styles = StyleSheet.create({
  recordingButtonView: {
  },
  recordButton: {
  }
})

const TIME_LIMIT = 30;

export default function RecordButton() {
  // expo-audio
  // const [transcription, setTranscription] = useState('练习中文');
  const [recording, setRecording] = useState(null);
  const [permissionResponse, requestPermission] = Audio.usePermissions();

  const {
    promptObject
  } = useContext(AppContext);

  // testing setting and getting recording from firebase
  // test fn works!
  // useEffect(() => {
  //   // Replace with custom cloudFunctionURL
  //   const cloudFunctionUrl = 'https://helloworld-ubksznr5oq-uc.a.run.app';
  //   // const cloudFunctionUrl = 'https://your-project-id.cloudfunctions.net/myFunction';

  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(cloudFunctionUrl);
  //       const data = await response.json();
  //       // console.log('Response:', response);
  //       console.log('Response:', data);
  //     } catch (error) {
  //       console.error('Error:', error);
  //     }
  //   };

  //   // fetchData();
  // }, []);

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
    // 1) stop and unload (store) recording
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

    // 2) add new recording to existing
    addPromptResponse(promptObject, recording);

    // 2b) add vocab + slang
    // addCompletedVocab(joinVocabColumns(promptObject));

    // test getting async
    // const postRecordingsJSON = await AsyncStorage.getItem('PROMPT_RECORDINGS');
    // console.log('AFTER existing recordings', JSON.parse(postRecordingsJSON.map(r => r.id)));
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