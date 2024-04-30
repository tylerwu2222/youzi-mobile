import { View, ScrollView, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect, createContext } from 'react'

// components
import AudioPlayback from '../../Modules/Audio/AudioPlayback/AudioPlayback';
import HanziPinyinBlock from '../../Modules/Text/HanziPinyinBlock/HanziPinyinBlock';

// storage
import AsyncStorage from '@react-native-async-storage/async-storage';
import { dummyChinesePrompt } from '../../../../assets/data/dummy_data';

// scripts
// import { transcribeAudio } from '../../../scripts/openai';
// import { getFileSize } from '../../../scripts/getFileSize';

// styles
import { youziColors, youziStyles } from '../../../styles/youziStyles';
import ReadAloudButton from '../../Modules/Audio/ReadAloudButton/ReadAloudButton';
import HanziPinyinArray from '../../Modules/Text/HanziPinyinBlock/HanziPinyinArray';
import EditableChineseText from './EditableChineseText';
import TextButton from '../../Modules/Buttons/TextButton';
// import { getPromptAudioByID } from '../../../scripts/audioGetter';

export const PromptAccordionContext = createContext({});

export default function PromptAccordion({ prompt, recording }) {
    const [currentRecordingTranscript, setCurrentRecordingTranscript] = useState(recording.transcription);
    const [editButtonsVisibile, setEditButtonsVisibile] = useState(false);

    const styles = StyleSheet.create({
        accordionHeaderView: {
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
        editableTranscript: {
            borderWidth: 1,
            borderColor: youziColors.blackText,
            borderRadius: 5,
            padding: 10,
            fontSize: 20
        },
        editButtonsView: {
            opacity: editButtonsVisibile ? 1 : 0.1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            height: 'fit-content'
        },
        accordionLabel: {
            fontSize: 20,
            // fontWeight: '700'
        }
    });

    const updateRecordingTranscript = async () => {
        // update in backend
        const existingRecordingsString = await AsyncStorage.getItem('PROMPT_RECORDINGS');
        let existingRecordings = JSON.parse(existingRecordingsString);
        const updatedRecords = existingRecordings.map(r => {
            if (r.id === recording.id) {
                // Update the record with updatedData
                return { ...r, transcription: currentRecordingTranscript };
            }
            return r; // Keep other records unchanged
        });
        await AsyncStorage.setItem('PROMPT_RECORDINGS', JSON.stringify(updatedRecords));
    };

    // update recording transcript when local transcript saved
    useEffect(() => {
        updateRecordingTranscript();
    }, [currentRecordingTranscript]);

    return (
        // <View>
        <View style={styles.accordionView}>
            <View
                style={styles.accordionTextView}
            >
                <View style={styles.accordionHeaderView}>
                    <Text style={[styles.accordionLabel, youziStyles.cardHeaderText]}>Prompt:</Text>
                    <ReadAloudButton text={dummyChinesePrompt} />
                </View>
                <HanziPinyinArray hanziArray={prompt} />
                {/* </View >
            <View style={styles.accordionTextView}> */}
                <View style={styles.accordionHeaderView}>
                    <Text style={[styles.accordionLabel, youziStyles.cardHeaderText]}>Response:</Text>
                    <ReadAloudButton text={recording.transcription} />
                    <AudioPlayback promptNumber={recording.id} />
                </View>
                <PromptAccordionContext.Provider value={{
                    currentRecordingTranscript,
                    setCurrentRecordingTranscript
                }}>
                    <ScrollView nestedScrollEnabled={true}>
                        <EditableChineseText />
                        {/* save button? */}
                        {/* <View style={styles.editButtonsView}>
                            <TextButton
                                text='cancel'
                                onPressFn={() => {
                                    console.log('cancelling transcript edit, resetting to', recording.transcription);
                                    setCurrentRecordingTranscript(recording.transcription);
                                }}
                                width='20%'
                                backgroundColor={youziColors.lightGrey}
                                fontSize={15}
                            />
                            <TextButton
                                text='save'
                                width='15%'
                                fontSize={15}
                            />
                        </View> */}
                    </ScrollView>
                </PromptAccordionContext.Provider>
                {/* <HanziPinyinArray hanziArray={recording.transcription} /> */}
                {/* <Text>{recording.transcription}</Text> */}
            </View>
        </View>
        // </View >
    )
}