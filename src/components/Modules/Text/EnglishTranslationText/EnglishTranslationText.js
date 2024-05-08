import React, { useState } from 'react';

// components
import { Text } from 'react-native';

// modules
import translate from "translate";

export default function EnglishTranslationText({ hanzi }) {
    const [translatedText, setTranslatedText] = useState('');

    const translateChinese = async (hanzi) => {
        const text = await translate(hanzi, { from: "zh", to: "en" });
        setTranslatedText(text);
        return text;
    };
    translateChinese(hanzi);

    return (
        <Text>{translatedText}</Text>
    )
}