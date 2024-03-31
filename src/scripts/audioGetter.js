import AsyncStorage from '@react-native-async-storage/async-storage';

export const getPromptAudioByID = async (id) => {
    console.log('getting audio by id', id);
    const recordings_string = await AsyncStorage.getItem('PROMPT_RECORDINGS');
    const recordings = JSON.parse(recordings_string);
    const recording_match = recordings.find(obj => obj.id === id);
    console.log('matched recording', recording_match);
    const recording_URI = recording_match.uri;
    return recording_URI;
}