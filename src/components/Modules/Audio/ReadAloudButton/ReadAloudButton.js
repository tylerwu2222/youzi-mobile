import React, { useState, useEffect } from 'react';

// components
import { View, StyleSheet } from 'react-native';
import IconButton from '../../Buttons/IconButton';

// navigation
import { useNavigation } from '@react-navigation/native';

// scripts
import { readText, pauseReadingText } from '../../../../scripts/textReader';

// assets
import { MaterialIcons } from '@expo/vector-icons';

// styles
import { youziColors, youziDimensions } from '../../../../styles/youziStyles';



export default function ReadAloudButton({ text = 'read this aloud' }) {
    const [isReading, setIsReading] = useState(false);
    const [pressed, setPressed] = useState(false);


    const styles = StyleSheet.create({
        audioButton: {
            color: youziColors.whiteText,
            backgroundColor: youziColors.buttonBackgroundPink,
            // width: youziDimensions.vw / 14,
            width: 40,
            padding: 5,
            borderRadius: 20,
            opacity: pressed ? 0.6 : 1
        }
    });



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
                iconComponent={<MaterialIcons name="volume-up" size={30} color="black" />}
                // iconComponent={<MaterialIcons name="volume-up" size={24} color="black" />}
                onPress={() => {
                    // if already reading, pause/stop
                    if (isReading) {
                        pauseReadingText();
                        setIsReading(false);
                    }
                    // if not reading, start
                    else {
                        readText(text);
                        setIsReading(true);
                    }
                }}
                // onPressIn={setPressed(true)}
                // onPressOut={setPressed(false)}
                style={styles.audioButton} // can pass styles b/c ...props
            />

        </View>
    )
}