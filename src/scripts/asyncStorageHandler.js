import AsyncStorage from '@react-native-async-storage/async-storage';
import { joinVocabColumns } from './victorJSONHandler';

export const getPromptAudioByID = async (id) => {
    console.log('getting audio by id', id);
    const recordings_string = await AsyncStorage.getItem('PROMPT_RECORDINGS');
    const recordings = JSON.parse(recordings_string);
    const recording_match = recordings.find(obj => obj.id === id);
    console.log('matched recording', recording_match);
    const recording_URI = recording_match.uri;
    return recording_URI;
};

// get all completed vocab
export const getCompletedVocab = async () => {
    const vocab_string = await AsyncStorage.getItem('COMPLETED_VOCAB');
    const completed_vocab = JSON.parse(vocab_string);
    return completed_vocab;
}

// get all completed slang
export const getCompletedSlang = async () => {
    const vocab_string = await AsyncStorage.getItem('COMPLETED_SLANG');
    const completed_vocab = JSON.parse(vocab_string);
    return completed_vocab;
}
// get all completed slang
export const getCompletedFavoriteVocab = async () => {
    const vocab_string = await AsyncStorage.getItem('COMPLETED_FAVE_VOCAB');
    const completed_vocab = JSON.parse(vocab_string);
    return completed_vocab;
}

// add array of prompt vocab to completed vocab dict
export const addCompletedVocab = async (completedVocab) => {
    const updatedVocab = getCompletedVocab().concat(completedVocab)
    //  JSON.stringify(
    const updatedVocabJSON = JSON.stringify(updatedVocab);
    await AsyncStorage.setItem('COMPLETED_VOCAB', updatedVocabJSON);
};

// add slang to slang list
export const addSlang = async (completedSlang) => {
    // add vocab to vocab
    const updatedSlang = getCompletedVocab().push(completedSlang)
    //  JSON.stringify(
    const updatedSlangJSON = JSON.stringify(updatedSlang);
    await AsyncStorage.setItem('COMPLETED_SLANG', updatedSlangJSON);
};

// add favorited vocab to favorite vocab list
export const addFavoritedVocab = async (favoritedVocab) => {
    console.log('adding', favoritedVocab);
    // add vocab to vocab
    const updatedFaveVocab = getCompletedFavoriteVocab().push(favoritedVocab)
    //  JSON.stringify(
    const updatedFaveVocabJSON = JSON.stringify(updatedFaveVocab);
    await AsyncStorage.setItem('COMPLETED_FAVE_VOCAB', updatedFaveVocabJSON);
};

export const fetchVocabObject = async () => {
    const favoritesPromise = getCompletedFavoriteVocab();
    const vocabPromise = getCompletedVocab();
    const slangPromise = getCompletedSlang();

    const [favorites, vocab, slang] = await Promise.all([favoritesPromise, vocabPromise, slangPromise]);

    const vocabSections = {
        'favorites': favorites,
        'vocab': vocab,
        'slang': slang
    };

    return vocabSections;
};

// remove favorited vocab from favorite vocab list
export const removeFavoritedVocab = async (vocab) => {
    const favoritedVocab = getCompletedFavoriteVocab();
    // find vocab by hanzi
    const updatedFaveVocab = favoritedVocab.filter(item => item !== vocab);
    // update
    const updatedFaveVocabJSON = JSON.stringify(updatedFaveVocab);
    await AsyncStorage.setItem('COMPLETED_FAVE_VOCAB', updatedFaveVocabJSON);
};

export const removeSlang = async (slang) => {
    const favoritedSlang = getCompletedSlang();
    // find vocab by hanzi
    const updatedFaveSlang = favoritedSlang.filter(item => item !== slang);
    // update
    const updatedFaveSlangJSON = JSON.stringify(updatedFaveSlang);
    await AsyncStorage.setItem('COMPLETED_SLANG', updatedFaveSlangJSON);
};

const todayDate = new Date().toLocaleDateString();
const transcription = '练习中文';

// Get existing recordings, then create and append the new recording
// 2a) TO ADD: get transcription from recording
export const addPromptResponse = async (promptObject, recording) => {
    const existingRecordingsString = await AsyncStorage.getItem('PROMPT_RECORDINGS');
    let existingRecordings = JSON.parse(existingRecordingsString);
    existingRecordings = existingRecordings == null ? [] : existingRecordings; // initialize key as empty array if empty
    console.log('BEFORE existing recordings', existingRecordings.map(r => r.id));

    const newRecording = {
        id: promptObject['ID'],
        title: promptObject['TITLE_DESCRIPTION'], // use from json
        prompt: promptObject['convo_starter_1'],
        vocabList: joinVocabColumns(promptObject),
        // title: (existingRecordings == null ? 0 : existingRecordings.length).toString() + ': Prompt title', // replace from backend later
        uri: recording.getURI(), // store URI of the recording,
        vibe: promptObject['VIBE'],
        subVibe: promptObject['SUB_VIBE'],
        difficulty: promptObject['DIFFICULTY_RATING'],
        date: todayDate,
        transcription: promptObject['example_response_1']
        // transcription: transcription
    };

    console.log('NEW recording', JSON.stringify(newRecording, null, 2));
    existingRecordings.push(newRecording);
    const updatedRecordingsJSON = JSON.stringify(existingRecordings);

    // 2c) Update array in AsyncStorage
    await AsyncStorage.setItem('PROMPT_RECORDINGS', updatedRecordingsJSON);
};
