import React from 'react'

// components
import { View, Text } from 'react-native'
import HanziPinyinBlock from './HanziPinyinBlock';

export default function HanziPinyinArray({
    hanziArray,
    customPinyinSize = null,
    customHanziSize = null,
    pressable = true,
    pinyinOn = false,
    enableLongPress = true }) {
    const applyLetterSpacing = (string, count = 1) => {
        if (string) {
            // console.log('HZPY string', string);
            return string.split('').join('\u200A'.repeat(count));
        }
        else {
            return [''];
        }
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