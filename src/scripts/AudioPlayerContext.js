// AudioPlayerContext.js
import React, { createContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';

const AudioPlayerContext = createContext();

const AudioPlayerProvider = ({ children }) => {
    const [sound, setSound] = useState();

    // loads audio from uri
    const loadAudio = async (audioSource) => {
        try {
            const { sound } = await Audio.Sound.createAsync(
                { uri: audioSource },
                { shouldPlay: false }
            );
            setSound(sound);
        } catch (error) {
            console.error('Error loading audio:', error);
        }
    };

    // plays audio from sound state variable
    const playAudio = async () => {
        try {
            if (sound) {
                await sound.playAsync();
            }
        } catch (error) {
            console.error('Error playing audio:', error);
        }
    };

    // pauses audio of sound state variable
    const pauseAudio = async () => {

    };

    // unload audio after done using
    const unloadAudio = () => {
        if (sound) {
            sound.unloadAsync();
        }
    };

    // checks if there is audio to be unloaded   
    useEffect(() => {
        return () => {
            unloadAudio();
        };
    }, []);

    // provide option to load and play audio
    // TO ADD: PAUSE, RESTART...
    const value = {
        loadAudio,
        playAudio,
    };

    return (
        <AudioPlayerContext.Provider value={value}>
            {children}
        </AudioPlayerContext.Provider>
    );
};

export { AudioPlayerProvider, AudioPlayerContext };
