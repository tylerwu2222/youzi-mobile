
import * as Speech from 'expo-speech';

// read text aloud
export const readText = (text, language = 'zh') => {
    console.log('audio text', text);
    // try resuming existing speech
    // Speech.resume();
    if (text) {
        Speech.speak(text, { language: language });
    }
    else {
        console.log('audio text undefined');
    }
};

export const pauseReadingText = () => {
    console.log('audio stopped');
    Speech.stop();
    // Speech.pause();
};