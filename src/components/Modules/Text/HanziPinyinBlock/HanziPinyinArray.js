import { View, Text } from 'react-native'
import React from 'react'

import HanziPinyinBlock from './HanziPinyinBlock';

export default function HanziPinyinArray({
    hanziArray,
    customPinyinSize = null,
    customHanziSize = null,
    pressable = true,
    pinyinOn = false,
    enableLongPress = true }) {
    const applyLetterSpacing = (string, count = 1) => {
        // console.log('HZPY string', string);
        return string.split('').join('\u200A'.repeat(count));
    }

    return (
        <Text>
            {Array.from(applyLetterSpacing(hanziArray)).map((hanzi, index) => {
                return <HanziPinyinBlock
                    key={index}
                    hanziCharacter={hanzi}
                    customPinyinSize={customPinyinSize}
                    customHanziSize={customHanziSize}
                    pressable={pressable}
                    pinyinOn={pinyinOn}
                    enableLongPress={enableLongPress} />
            })}
        </Text>
    )
}