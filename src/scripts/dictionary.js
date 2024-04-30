import cedict from '../../assets/data/cedict.json';

// import AsyncStorage from '@react-native-async-storage/async-storage';

export const defineChinese = (vocab, isTrad = true) => {
    // console.log('vocab', vocab);
    // get definition from cedict

    // match based on trad or simplified
    let definition;
    let match = cedict.filter((entry) => {
        return entry['simplified'] == vocab;
    })[0];
    if (match) {
        definition = match['english'];
    }
    else{
        definition = null
    }
    return definition;
}