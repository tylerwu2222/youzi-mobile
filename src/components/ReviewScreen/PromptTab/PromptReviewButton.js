import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import { PromptTabContext } from './PromptTab';

// storage
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { youziColors, youziStyles } from '../../../styles/youziStyles';
import { useNavigation } from '@react-navigation/native';
import PromptDeleteButton from './PromptDeleteButton';
import ChineseText from '../../Modules/ChineseText/ChineseText';



export default function PromptReviewButton({ prompt, promptNumber }) {
    const {
        promptOptionVisibility,
        setPromptOptionVisibility
    } = useContext(PromptTabContext);

    const styles = StyleSheet.create({
        promptView: {
            width: '100%',
            margin: 10
        },
        promptPressable: {
            backgroundColor: youziColors.buttonBackground,
            padding: 10,
            borderRadius: 5
        },
        promptPressableDelete: {
            backgroundColor: 'red',
            display: promptOptionVisibility ? 'block' : 'none'
        }
    });

    const navigation = useNavigation();

    // short press: navigate to prompt screen
    const navigateToPromptReview = (prompt, promptNumber) => {
        console.log('navigating to prompt review for', promptNumber, prompt);
        navigation.navigate('review-prompt-page', {
            reviewPrompt: prompt,
            reviewPromptNumber: promptNumber
        });
    };
    // long press: toggle prompt options ()

    // short press off outside of prompt button, set option visibility to false

    return (
        <View style={styles.promptView}>
            {/* prompt button */}
            <Pressable
                style={styles.promptPressable}
                onPress={() => {
                    navigateToPromptReview(prompt, promptNumber);
                }}
                onLongPress={() => {
                    console.log(promptNumber, 'long pressed');
                    setPromptOptionVisibility(true);
                }}
            >
                {/* issue is with ChineseText component ? */}
                <ChineseText chineseText={promptNumber + ':' + prompt} />
            </Pressable>
            {/* delete icon */}
            <PromptDeleteButton promptNumber={promptNumber} />

        </View >
    )
}