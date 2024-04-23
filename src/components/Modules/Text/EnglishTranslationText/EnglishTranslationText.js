import { Text } from 'react-native';
import React, { useState } from 'react';

import translate from "translate";

export default function EnglishTranslationText({ hanzi }) {
    const [translatedText, setTranslatedText] = useState('');

    const translateChinese = async (hanzi) => {
        const text = await translate(hanzi, { from: "zh", to: "en" });
        setTranslatedText(text);
        // console.log('translated text', text);
        return text;
        // return hanzi;
    };

    translateChinese(hanzi);

    return (
        <Text>{translatedText}</Text>
    )
}