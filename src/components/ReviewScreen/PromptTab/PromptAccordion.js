import { View, Text, StyleSheet, Animated } from 'react-native'
import React, { useRef } from 'react'

// components
import AudioPlayback from '../../Modules/Audio/AudioPlayback/AudioPlayback';
import HanziPinyinBlock from '../../Modules/Text/HanziPinyinBlock/HanziPinyinBlock';

// storage
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { dummyChinesePrompt } from '../../../../assets/data/dummy_data';

// scripts
// import { transcribeAudio } from '../../../scripts/openai';
// import { getFileSize } from '../../../scripts/getFileSize';

// styles
import { youziColors, youziStyles } from '../../../styles/youziStyles';
import ReadAloudButton from '../../Modules/Audio/ReadAloudButton/ReadAloudButton';
import HanziPinyinArray from '../../Modules/Text/HanziPinyinBlock/HanziPinyinArray';
// import { getPromptAudioByID } from '../../../scripts/audioGetter';


const styles = StyleSheet.create({
    accordianHeaderView: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        gap: 10
    },
    accordionView: {
        // backgroundColor: youziColors.cardBackgroundYellow,
        backgroundColor: youziColors.buttonBackground,
        flexDirection: 'column',
        alignItems: 'center',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    accordionTextView: {
        padding: 10,
        // flexDirection: 'column',
        // alignItems: 'flex-start',
        // justifyContent: 'flex-start'
    },
    accordionLabel: {
        fontSize: 20,
        // fontWeight: '700'
    }
});

export default function PromptAccordion({ prompt, recording }) {
    return (
        // <View>
        <View style={styles.accordionView}>
            <View
                style={styles.accordionTextView} >
                <View style={styles.accordianHeaderView}>
                    <Text style={[styles.accordionLabel, youziStyles.cardText]}>Prompt:</Text>
                    <ReadAloudButton text={dummyChinesePrompt} />
                </View>
                <HanziPinyinArray hanziArray={prompt} />
            </View >
            <View style={styles.accordionTextView}>
                <View style={styles.accordianHeaderView}>
                    <Text style={[styles.accordionLabel, youziStyles.cardText]}>Response:</Text>
                    <ReadAloudButton text={recording.transcription} />
                    <AudioPlayback promptNumber={recording.id} />
                </View>
                <HanziPinyinArray hanziArray={recording.transcription} />
                {/* <Text>{recording.transcription}</Text> */}
            </View>
        </View>
        // </View >
    )
}