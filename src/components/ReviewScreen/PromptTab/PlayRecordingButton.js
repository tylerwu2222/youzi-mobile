import React, { useState, useRef, useContext } from 'react'

// context
import { AudioPlayerContext } from '../../../scripts/AudioPlayerContext';

// components
import { View, Text } from 'react-native';
import IconButton from '../../Modules/Buttons/IconButton'

// assets
import { AntDesign } from '@expo/vector-icons';

// storage
// import AsyncStorage from '@react-native-async-storage/async-storage';

// scripts
import { getPromptAudioByID } from '../../../scripts/asyncStorageHandler';

// styles
import { youziColors } from '../../../styles/youziStyles';


export default function PlayRecordingButton({ promptID }) {
    const { loadAudio, playAudio } = useContext(AudioPlayerContext);
    const [buttonIcon, setButtonIcon] = useState('play');
    // const [recordingURI, setRecordingURI] = useState('');

    // const buttonIconRef = useRef();

    // plays prompt response for ID
    async function playPromptResponse(responseID = 1) {
        // responseID = responseID - 1;
        console.log('response id', responseID, typeof responseID);
        // get matching recording
        // setRecordingURI(getPromptAudioByID(responseID));
        const recordingURI = await getPromptAudioByID(responseID);

        loadAudio(recordingURI);
        playAudio();
    }

    const toggleButton = () => {
        console.log('button Icon', buttonIcon);
        // if button is play, play response, then set icon to pause
        if (buttonIcon == 'play') {
            playPromptResponse(promptID);
            setButtonIcon('pausecircle');
        }
        // else, pause response, then set icon to play
        else if (buttonIcon == 'pausecircle') {
            // pausePromptResponse
            setButtonIcon('play');
        }

    };

    return (
        <View>
            <IconButton
                // iconComponent={<AntDesign name={buttonIcon} size={40} color={youziColors.buttonBackgroundAccent} />}
                iconComponent={<AntDesign name={buttonIcon} size={40} color={youziColors.blackText} />}
                onPress={() => {
                    // playPromptResponse(promptNumber);
                    toggleButton();
                }}
            />
        </View>
    )
}