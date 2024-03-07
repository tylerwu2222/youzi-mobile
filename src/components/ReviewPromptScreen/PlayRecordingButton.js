import { View, Text } from 'react-native'
import React, { useState, useRef, useContext } from 'react'

import IconButton from '../Modules/Buttons/IconButton'
import { AntDesign } from '@expo/vector-icons';

// context
import { AudioPlayerContext } from '../../scripts/AudioPlayerContext';

// storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// styles
import { youziColors } from '../../styles/youziStyles';


export default function PlayRecordingButton({ promptNumber }) {
    const { loadAudio, playAudio } = useContext(AudioPlayerContext);
    const [buttonIcon, setButtonIcon] = useState('play');
    // const buttonIconRef = useRef();

    // plays prompt response for ID
    async function playPromptResponse(responseID = 1) {
        // console.log('response id', responseID);
        // get matching recording
        const recordings_string = await AsyncStorage.getItem('PROMPT_RECORDINGS');
        const recordings = JSON.parse(recordings_string);
        const recording_match = recordings.find(obj => obj.id === responseID);
        console.log('matched recording', recording_match);
        const recording_URI = recording_match.uri;

        loadAudio(recording_URI);
        playAudio();
    }

    const toggleButton = () => {
        console.log('button Icon', buttonIcon);
        // if button is play, play response, then set icon to pause
        if (buttonIcon == 'play') {
            playPromptResponse(promptNumber);
            setButtonIcon('pausecircle');
        }
        // else, pause response, then set icon to play
        else if (buttonIcon == 'pausecircle') {

            setButtonIcon('play');
        }

    };

    return (
        <View>
            <IconButton
                iconComponent={<AntDesign name={buttonIcon} size={40} color={youziColors.buttonBackgroundAccent} />}
                onPress={() => {
                    // playPromptResponse(promptNumber);
                    toggleButton();
                }}
            />
        </View>
    )
}