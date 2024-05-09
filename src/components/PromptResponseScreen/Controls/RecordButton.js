import React, { useState, useEffect, useContext } from 'react'
import { AppContext } from '../../../../App';

// scripts
import { addCompletedVocab, addPromptResponse, addSlang } from '../../../scripts/asyncStorageHandler';
import { getSlangColumn, getVocabColumnHanzi, joinVocabColumns } from '../../../scripts/victorJSONHandler';
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

export default function RecordButton({ maxRecordingLength = 60 }) {
  // expo-audio
  // const [transcription, setTranscription] = useState('练习中文');
  const [recording, setRecording] = useState(null);

  const [timer, setTimer] = useState(maxRecordingLength); // Initial timer value in seconds
  const [isRunning, setIsRunning] = useState(false);
  // const [disable, setDisable] = useState(false);

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

  // useEffect(() => {
  //   if (disable) {
  //     console.log('time limit reached, stopping recording')
  //     stopRecording();
  //   }
  // }, [disable]);

  const startTimer = () => {
    setIsRunning(true); // Set isRunning to true to indicate that the timer is running
  };

  const stopTimer = () => {
    setIsRunning(false); // Set isRunning to false to stop the timer
    setTimer(maxRecordingLength); // Reset the timer to its initial value
  };

  useEffect(() => {
    let interval;

    // Start the timer interval if isRunning is true
    if (isRunning) {
      interval = setInterval(() => {
        setTimer((prevTimer) => (prevTimer > 0 ? prevTimer - 1 : 0)); // Decrease timer by 1 second, but not below 0
      }, 1000);
    }

    // Clear the interval when the component unmounts or isRunning changes
    return () => clearInterval(interval);
  }, [isRunning]);

  useEffect(() => {
    if (timer === 0) {
      console.log('time limit reached, stopping recording');
      setIsRunning(false);
      stopRecording();
    }
  }, [timer]);

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
      // start timer
      startTimer();

      const { recording } = await Audio.Recording.createAsync(Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  }


  async function stopRecording() {
    // 1) stop recording and timer 
    console.log('Stopping recording..');
    stopTimer();
    setRecording(undefined); // reset to undefined

    // 2) unload (store) recording
    await recording.stopAndUnloadAsync();
    await Audio.setAudioModeAsync(
      {
        allowsRecordingIOS: false,
      }
    );
    const uri = await recording.getURI();
    console.log('Recording stopped and stored at', uri);

    // 2b) add new recording to existing
    addPromptResponse(promptObject, recording);

    // 2c) add all vocab
    console.log('RB vocab', getVocabColumnHanzi(promptObject));
    addCompletedVocab(getVocabColumnHanzi(promptObject));
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
      <Text>Time left: {timer}</Text>
      {/* <Text>PausePlayButton</Text> */}
    </View>
  )
}