import AsyncStorage from '@react-native-async-storage/async-storage';
import { joinVocabColumns } from './victorJSONHandler';

// GET or INITIALIZE an empty array for an async field //
const getOrInitializeAsyncArray = async (async_name) => {
    const async_string = await AsyncStorage.getItem(async_name);
    // if fave vocab exists
    if (async_string) {
        const parsed_async = JSON.parse(async_string);
        return parsed_async;
    }
    // else return empty array
    else {
        return [];
    }
};
export const getOrInitializeAsyncBoolean = async (async_name, initial_value = false) => {
    const async_string = await AsyncStorage.getItem(async_name);
    // if initial_value --> first, set ASYNC
    if (async_string) {
        const parsed_async = JSON.parse(async_string);
        return parsed_async;
    }
    else {
        return initial_value;
    }
}

// CLEAR aysnc array field
export const clearAsyncArray = async (async_name) => {
    await AsyncStorage.setItem(async_name, '[]');
}

// VOCAB //

// GET current vocab //
export const getCompletedVocab = async () => getOrInitializeAsyncArray('COMPLETED_VOCAB');
export const getCompletedSlang = async () => getOrInitializeAsyncArray('COMPLETED_SLANG');
export const getCompletedFavoriteVocab = async () => getOrInitializeAsyncArray('COMPLETED_FAVE_VOCAB');
// GET entire vocab object for mapping //
// dictionary connecting section name to ASYNC name
export const sectionAsyncDict = {
    'all vocab': 'COMPLETED_VOCAB',
    'slang': 'COMPLETED_SLANG',
    'favorites': 'COMPLETED_FAVE_VOCAB'
}
export const fetchVocabObject = async () => {
    const favoritesPromise = await getCompletedFavoriteVocab();
    const slangPromise = await getCompletedSlang();
    const vocabPromise = await getCompletedVocab();

    const [favorites, slang, vocab] = await Promise.all([favoritesPromise, slangPromise, vocabPromise]);

    // console.log('fetch vocab object', favorites, slang, vocab);

    const vocabSections = {
        'favorites': favorites,
        'slang': slang,
        'all vocab': vocab,
    };

    // console.log('vocab sections', vocabSections);
    return vocabSections;
};
const addUniqueElementToArray = (array, element) => {
    // if element not in array, add element
    if (!array.includes(element)) {
        return array.concat(element);
    }
    else {
        return array;
    }
};
// ADD vocab/slang //
const addUniqueElementsToArray = (array, elements) => {
    let arrayCopy = [...array];
    elements.map(e => {
        if (!array.includes(e)) {
            arrayCopy.push(e);
        }
    })
    return arrayCopy;

};
const addUniqueElementsToAsyncArray = async (asyncArrayGetter, element, async_name) => {
    const currentArray = await asyncArrayGetter;
    let updatedArray;
    // console.log('element, type, isArray', element, typeof element,);
    // if (element.isArray) {
    if (Array.isArray(element)) {
        // console.log('array element');
        updatedArray = addUniqueElementsToArray(currentArray, element);
    }
    else if (typeof element === 'string') {
        // console.log('string element');
        updatedArray = addUniqueElementToArray(currentArray, element);
    }
    const updatedArrayJSON = JSON.stringify(updatedArray);
    await AsyncStorage.setItem(async_name, updatedArrayJSON);
}
export const addCompletedVocab = async (completedVocab) => {
    console.log('adding completed vocab', completedVocab);
    addUniqueElementsToAsyncArray(getCompletedVocab(), completedVocab, 'COMPLETED_VOCAB');
};

export const addSlang = async (favoritedSlang) => {
    console.log('adding slang', favoritedSlang);
    addUniqueElementsToAsyncArray(getCompletedSlang(), favoritedSlang, 'COMPLETED_SLANG');
};

export const addFavoritedVocab = async (favoritedVocab) => {
    console.log('adding fave vocab', favoritedVocab);
    addUniqueElementsToAsyncArray(getCompletedFavoriteVocab(), favoritedVocab, 'COMPLETED_FAVE_VOCAB');
};

// REMOVE vocab/slang //
const removeElementFromAsyncArray = async (asyncArrayGetter, element, async_name) => {
    const currentArray = await asyncArrayGetter;
    // find vocab by hanzi
    const updatedArray = currentArray.filter(item => item !== element);
    // update
    const updatedArrayJSON = JSON.stringify(updatedArray);
    await AsyncStorage.setItem(async_name, updatedArrayJSON);
}
export const removeCompletedVocab = async (vocab) => {
    removeElementFromAsyncArray(getCompletedVocab(), vocab, 'COMPLETED_VOCAB');
};
export const removeFavoritedVocab = async (vocab) => {
    removeElementFromAsyncArray(getCompletedFavoriteVocab(), vocab, 'COMPLETED_FAVE_VOCAB');
};
export const removeSlang = async (slang) => {
    removeElementFromAsyncArray(getCompletedSlang(), slang, 'COMPLETED_SLANG');
};

// SET vocab
const setAsyncArray = async (new_array, async_name) => {
    await AsyncStorage.setItem(async_name, new_array);
}

export const setCompleteVocab = async (new_array) => {
    await setAsyncArray(new_array, 'COMPLETED_VOCAB')
}

export const setFaveVocab = async (new_array) => {
    await setAsyncArray(new_array, 'COMPLETED_FAVE_VOCAB')
}

export const setSlang = async (new_array) => {
    await setAsyncArray(new_array, 'COMPLETED_SLANG')
}

// PROMPTS //

// GET existing recordings, then create and append the new recording //
// 2a) TO ADD: get transcription from recording
const todayDate = new Date().toLocaleDateString();
const transcription = '练习中文';
export const addPromptResponse = async (promptObject, recording) => {
    const existingRecordings = await getOrInitializeAsyncArray('PROMPT_RECORDINGS');
    // const existingRecordingsString = await AsyncStorage.getItem();
    // let existingRecordings = JSON.parse(existingRecordingsString);
    // existingRecordings = existingRecordings == null ? [] : existingRecordings; // initialize key as empty array if empty
    // console.log('BEFORE existing recordings', existingRecordings.map(r => r.id));

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

    // console.log('NEW recording', JSON.stringify(newRecording, null, 2));
    existingRecordings.push(newRecording);
    const updatedRecordingsJSON = JSON.stringify(existingRecordings);

    // 2c) Update array in AsyncStorage
    await AsyncStorage.setItem('PROMPT_RECORDINGS', updatedRecordingsJSON);
};

export const getPromptAudioByID = async (id) => {
    console.log('getting audio by id', id);
    const recordings_string = await AsyncStorage.getItem('PROMPT_RECORDINGS');
    const recordings = JSON.parse(recordings_string);
    const recording_match = recordings.find(obj => obj.id === id);
    console.log('matched recording', recording_match);
    const recording_URI = recording_match.uri;
    return recording_URI;
};

// SETTINGS //
export const setAsyncBoolean = async (value, async_name) => {
    await AsyncStorage.setItem(async_name, JSON.stringify(value));
    // const storageIsTraditional = await AsyncStorage.getItem('IS_TRAD');
    // console.log('storage IS_TRAD value:', JSON.parse(storageIsTraditional));
}