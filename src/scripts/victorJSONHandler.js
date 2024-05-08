import { promptDataColumnNames } from "../../assets/data/prompt_meta_data";

const splitVocabString = (vocab) => {
    const vocabObject = {};
    vocabObject['hanzi'] = vocab.split(' (')[0];
    vocabObject['pinin'] = vocab.split(' (')[1].split(')')[0];
    vocabObject['translation'] = vocab.split(' - ')[1];
    return vocabObject;
};

export const joinVocabColumns = (promptObject) => {
    console.log('joining vocab col PO', promptObject);
    const vocabFields = promptDataColumnNames.slice(11, 14);
    return vocabFields.map(col => {
        return splitVocabString(promptObject[col]);
    });
}

export const getSlangColumn = (promptObject) => {
    console.log('getting slang col PO', promptObject);
    console.log('getting slang col', splitVocabString(promptObject[promptDataColumnNames[14]]));
    return splitVocabString(promptObject[promptDataColumnNames[14]]);
};