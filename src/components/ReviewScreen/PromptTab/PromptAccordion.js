import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import AudioPlayback from '../../Modules/Audio/AudioPlayback/AudioPlayback';
import HanziPinyinBlock from '../../Modules/HanziPinyinBlock/HanziPinyinBlock';
import { youziColors } from '../../../styles/youziStyles';


const styles = StyleSheet.create({
    accordionView: {
        backgroundColor: youziColors.cardBackgroundYellow,
        flexDirection: 'column',
        alignItems: 'center'
    },
    accordionTextView: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    accordionLabel: {
        fontSize: 20,
        fontWeight: '700'
    }
});

export default function PromptAccordion({ visible, prompt, promptNumber, response }) {
    return (
        <View>
            {visible ?
                <View style={styles.accordionView}>
                    <View style={[styles.accordionTextView, { display: visible ? "block" : "none" }]} >
                        <Text style={styles.accordionLabel}>Prompt:</Text>
                        <Text>
                            {Array.from(prompt).map((hanzi, index) => {
                                return <HanziPinyinBlock key={index} hanziCharacter={hanzi} />
                            })}
                        </Text>

                    </View >
                    <View style={[styles.accordionTextView, { display: visible ? "block" : "none" }]}>
                        <Text style={styles.accordionLabel}>Response:</Text>
                        <Text>{response}</Text>
                    </View>
                    <AudioPlayback promptNumber={promptNumber} />
                </View> : null
            }
        </View >
    )
}