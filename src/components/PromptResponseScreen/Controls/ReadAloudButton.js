import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import * as Speech from 'expo-speech';

import { MaterialIcons } from '@expo/vector-icons';
import IconButton from '../../Modules/Buttons/IconButton';
import { youziColors, youziDimensions } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
    audioButton: {
        color: youziColors.whiteText,
        backgroundColor: youziColors.buttonBackgroundPink,
        width: youziDimensions.vw / 14,
        padding: 5,
        borderRadius: 5
    }
});

export default function ReadAloudButton({ text = 'read this aloud' }) {
    const [isReading, setIsReading] = useState(false);

    // play audio text
    const readText = () => {
        console.log('audio text', text);
        setIsReading(true);
        // try resuming existing speech
        // Speech.resume();
        // or starting new
        Speech.speak(text, { language: "zh" });
    };

    const pauseReadingText = () => {
        console.log('audio stopped');
        Speech.stop();
        // Speech.pause();
        setIsReading(false);
    };

    const navigation = useNavigation();

    useEffect(() => {
        const beforeRemoveListener = navigation.addListener('beforeRemove', () => {
            // Call your function here
            pauseReadingText();
        });

        return beforeRemoveListener;
    }, [navigation]);

    return (
        <View>
            <IconButton
                iconComponent={<MaterialIcons name="volume-up" size={24} color="black" />}
                onPress={() => {
                    if (isReading) {
                        pauseReadingText();
                    }
                    else {
                        readText();
                    }
                }}
                style={styles.audioButton} // can pass styles b/c ...props
            />

        </View>
    )
}