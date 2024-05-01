
import * as Speech from 'expo-speech';

// read text aloud
export const readText = (text, language = 'zh') => {
    console.log('audio text', text);
    // try resuming existing speech
    // Speech.resume();
    Speech.speak(text, { language: language });
};

export const pauseReadingText = () => {
    console.log('audio stopped');
    Speech.stop();
    // Speech.pause();
};