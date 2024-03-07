import { Text, Pressable, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import { PromptTabContext } from './PromptTab';

// storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// import { youziColors, youziStyles } from '../../../styles/youziStyles';

export default function PromptDeleteButton({ promptNumber }) {
    const {
        promptOptionVisibility,
        existingRecordings,
        setExistingRecordings
    } = useContext(PromptTabContext);

    const styles = StyleSheet.create({
        promptPressableDelete: {
            backgroundColor: 'red',
            display: promptOptionVisibility ? 'block' : 'none'
        }
    });

    // delete prompt by id number
    const deletePrompt = async (promptNumber) => {
        // find matching prompt and filter out of existingRecordings
        const updatedRecordings = existingRecordings
            .filter(r => r['id'] != promptNumber)
            .map((r, index) => ({ ...r, id: index }));
        // relabel IDs for prompts after deleted ID
        setExistingRecordings(updatedRecordings);
    }

    return (
        <Pressable
            style={styles.promptPressableDelete}
            onPress={() => {
                deletePrompt(promptNumber);
            }}
        >
            <Text>Delete</Text>
        </Pressable>
    )
}