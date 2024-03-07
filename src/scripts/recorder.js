// import React, { useState, useEffect } from 'react';
// import { View, TouchableOpacity, Text } from 'react-native';
// import { Audio } from 'expo-av';

// const YourComponent = () => {
//   const [recording, setRecording] = useState();

//   const startRecording = async () => {
//     try {
//       const { recording } = await Audio.Recording.createAsync({
//         android: {
//           extension: '.mp3',
//           outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
//           audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
//           sampleRate: 44100,
//           numberOfChannels: 2,
//           bitRate: 128000,
//         },
//         ios: {
//           extension: '.caf',
//           audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
//           sampleRate: 44100,
//           numberOfChannels: 2,
//           bitRate: 128000,
//           linearPCMBitDepth: 16,
//           linearPCMIsBigEndian: false,
//           linearPCMIsFloat: false,
//         },
//       });
//       setRecording(recording);
//     } catch (error) {
//       console.error('Failed to start recording', error);
//     }
//   };

//   const stopRecording = async () => {
//     await recording.stopAndUnloadAsync();
//     setRecording(undefined);
//   };

//   useEffect(() => {
//     return () => {
//       if (recording) {
//         stopRecording();
//       }
//     };
//   }, []);

//   return (
//     <View>
//       <TouchableOpacity onPress={startRecording}>
//         <Text>Start Recording</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={stopRecording}>
//         <Text>Stop Recording</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default YourComponent;
