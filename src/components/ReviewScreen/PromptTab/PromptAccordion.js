import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { useRef } from 'react'

// components
import AudioPlayback from '../../Modules/Audio/AudioPlayback/AudioPlayback';
import HanziPinyinBlock from '../../Modules/HanziPinyinBlock/HanziPinyinBlock';

// storage
// import AsyncStorage from '@react-native-async-storage/async-storage';

// scripts
// import { transcribeAudio } from '../../../scripts/openai';
// import { getFileSize } from '../../../scripts/getFileSize';

// styles
import { youziColors } from '../../../styles/youziStyles';
// import { getPromptAudioByID } from '../../../scripts/audioGetter';


const styles = StyleSheet.create({
    accordionView: {
        backgroundColor: youziColors.cardBackgroundYellow,
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
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

export default function PromptAccordion({ prompt, recording }) {
    return (
        <View>
            <View style={styles.accordionView}>
                <View
                    style={[
                        styles.accordionTextView,
                        // { display: visible ? "block" : "none" }
                    ]} >
                    <Text style={styles.accordionLabel}>Prompt:</Text>
                    <Text>
                        {Array.from(prompt).map((hanzi, index) => {
                            return <HanziPinyinBlock key={index} hanziCharacter={hanzi} />
                        })}
                    </Text>

                </View >
                <View style={[
                    styles.accordionTextView,
                    // { display: visible ? "block" : "none" }
                ]}>
                    <Text style={styles.accordionLabel}>Response:</Text>
                    {/* transcribe text using openAI */}

                    <Text>{recording.transcription}</Text>
                </View>
                <AudioPlayback promptNumber={recording.id} />
            </View>
        </View >
    )
}