import React, { useState, useEffect, useContext } from 'react';

import { PromptAccordionContext } from './PromptAccordion';

// components
import { TextInput, StyleSheet } from 'react-native'

// styles
import { youziColors } from '../../../styles/youziStyles';

export default function EditableChineseText() {
    const [isPressed, setIsPressed] = useState(false);

    const {
        currentRecordingTranscript,
        setCurrentRecordingTranscript
    } = useContext(PromptAccordionContext);

    const styles = StyleSheet.create({
        editableTranscript: {
            // borderWidth: isPressed ? 1 : 0.5,
            borderWidth: 1,
            borderStyle: isPressed ? 'solid' : 'dashed',
            borderColor: isPressed ? youziColors.blackText : youziColors.midGrey,
            borderRadius: 3,
            padding: 10,
            fontSize: 20
        }
    });

    return (
        <TextInput
            multiline={true}
            scrollEnabled={false}
            style={styles.editableTranscript}
            onChangeText={
                setCurrentRecordingTranscript
            }
            onFocus={() => {
                setIsPressed(true);
                // onFocusFn();
            }
            }
            onBlur={() => {
                setIsPressed(false);
                // onBlurFn();
            }
            }
            value={currentRecordingTranscript}
        >
        </TextInput >
    )
}