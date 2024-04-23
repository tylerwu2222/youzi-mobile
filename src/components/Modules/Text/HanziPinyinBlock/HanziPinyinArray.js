import { View, Text } from 'react-native'
import React from 'react'

import HanziPinyinBlock from './HanziPinyinBlock';

export default function HanziPinyinArray({ hanziArray, customPinyinSize = null, customHanziSize = null }) {
    const applyLetterSpacing = (string, count = 1) => {
        return string.split('').join('\u200A'.repeat(count));
    }

    return (
        <Text>
            {Array.from(applyLetterSpacing(hanziArray)).map((hanzi, index) => {
                return <HanziPinyinBlock key={index} hanziCharacter={hanzi} customPinyinSize={customPinyinSize} customHanziSize={customHanziSize} />
            })}
        </Text>
    )
}