import { View, Text, Pressable, StyleSheet } from 'react-native'
import React, { useState, useEffect, useContext } from 'react'

import { PromptTabContext } from './PromptTab';

// storage
// import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

// components
import PromptDeleteButton from './PromptDeleteButton';
import ChineseText from '../../Modules/Text/ChineseText/ChineseText';
import PromptAccordion from './PromptAccordion';

import { Entypo } from '@expo/vector-icons';

// styles
import { youziColors, youziDimensions, youziStyles } from '../../../styles/youziStyles';
import IconButton from '../../Modules/Buttons/IconButton';
import AIGenImage from '../../Modules/Visuals/AIGenImage/AIGenImage';


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
        promptImageView: {
            flex: 2,
            width: youziDimensions.vw / 5,
            height: youziDimensions.vw / 5,
            overflow: 'hidden'
        },
        promptTextView: {
            flex: 5,
            flexDirection: 'column',
            paddingLeft: 15,
            // justifyContent: 'flex-start',
            alignItems: 'flex-start'
        },
        promptTextSubTitle: {
            fontSize: 15,
            fontWeight: '100',
            color: youziColors.greyBrownText
        },
        promptToggleView: {
            flex: 1
        },
        promptPressable: {
            flexDirection: 'row',
            alignItems: 'center', // align items vertically in the center
            // justifyContent: 'space-between', // push caret to right
            backgroundColor: youziColors.buttonBackground,
            // padding: 10,
            overflow: 'hidden',
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

    console.log('recording', recording);
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
                {/* flex-item 1: prompt image */}
                <View style={styles.promptImageView}>
                    <AIGenImage />
                </View>
                {/* flex-item 2: prompt title */}
                <View style={styles.promptTextView}>
                    <Text style={youziStyles.cardHeaderText}>{recording.title}</Text>
                    <Text style={[youziStyles.cardHeaderText, styles.promptTextSubTitle]}>{recording.difficulty} &#x2022; {recording.date}</Text>
                </View>
                {/* flex-item 3: toggle icon */}
                <View style={styles.promptToggleView}>
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
                </View>
            </Pressable>
            {/* delete icon */}
            <PromptDeleteButton promptNumber={recording.id} />
        </View >
    )
}