import React from 'react'

// components
import { View, Text } from 'react-native'
import HanziPinyinBlock from './HanziPinyinBlock';

export default function HanziPinyinArray({
    hanziArray,
    customPinyinSize = null,
    customHanziSize = null,
    pressable = true,
    textColor = null,
    pinyinOn = false,
    enableLongPress = true }) {

    const applyLetterSpacing = (string, count = 1) => {
        try {
            if (string) {
                // console.log('HAZ')
                // console.log('HZPY string', string);
                return string.split('').join('\u200A'.repeat(count));
            }
        } catch {
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
                    textColor={textColor}
                    pinyinOn={pinyinOn}
                    enableLongPress={enableLongPress} />
            })}
        </Text>
    )
}