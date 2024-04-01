import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import { PromptTabContext } from './PromptTab';

// storage
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

// components
import PromptDeleteButton from './PromptDeleteButton';
import ChineseText from '../../Modules/ChineseText/ChineseText';
import PromptAccordion from './PromptAccordion';

import { Entypo } from '@expo/vector-icons';

// styles
import { youziColors, youziStyles } from '../../../styles/youziStyles';
import IconButton from '../../Modules/Buttons/IconButton';


export default function PromptReviewButton({ recording, onPressFn = () => { }, expanded = false }) {
    const {
        promptOptionVisibility,
        setPromptOptionVisibility
    } = useContext(PromptTabContext);

    const styles = StyleSheet.create({
        promptView: {
            width: '100%',
            marginTop: 10,
            marginBottom: 10
        },
        promptPressable: {
            flexDirection: 'row',
            alignItems: 'center', // align items vertically in the center
            justifyContent: 'space-between', // push caret to right
            backgroundColor: youziColors.buttonBackground,
            padding: 10,
            marginBottom: 0,
            borderRadius: 5,
        },
        promptPressableDelete: {
            backgroundColor: 'red',
            display: promptOptionVisibility ? 'block' : 'none'
        },
        promptToggleChevron: {
            padding: 5,
            paddingRight: 6
        }
    });

    // const [accordionVisible, setAccordionVisible] = useState(false);
    // const navigation = useNavigation();

    // short press: navigate to prompt screen
    // const navigateToPromptReview = (prompt, promptNumber) => {
    //     console.log('navigating to prompt review for', promptNumber, prompt);
    //     navigation.navigate('review-prompt-page', {
    //         reviewPrompt: prompt,
    //         reviewPromptNumber: promptNumber
    //     });
    // };
    // short press: toggle prompt accordion
    // const togglePromptAccordion = () => {
    //     setAccordionVisible(!accordionVisible);
    // };

    // long press: toggle prompt options ()

    // short press off outside of prompt button, set option visibility to false

    return (
        <View style={styles.promptView}>
            {/* prompt button */}
            <Pressable
                style={styles.promptPressable}
                onPress={() => {
                    console.log(recording.id, 'short pressed')
                    // navigateToPromptReview(prompt, promptNumber);
                    onPressFn();
                }}
                onLongPress={() => {
                    console.log(recording.id, 'long pressed');
                    setPromptOptionVisibility(!promptOptionVisibility);
                }}
            >
                {/* prompt title */}
                <Text>{recording.title}</Text>
                {/* <ChineseText chineseText={promptNumber + ':' + prompt} /> */}

                {/* response level + date */}

                {/* toggle icon */}
                <IconButton
                    onPress={() => {
                        // navigateToPromptReview(prompt, promptNumber);
                        onPressFn();
                    }}
                    iconComponent={
                        expanded ?
                            <Entypo name="chevron-down" size={24} color="black" style={styles.promptToggleChevron} /> :
                            <Entypo name="chevron-right" size={24} color="black" style={styles.promptToggleChevron} />
                    }
                    style={styles.promptToggleChevron}
                />
            </Pressable>
            {/* delete icon */}
            <PromptDeleteButton promptNumber={recording.id} />
        </View >
    )
}