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

    const styles = StyleSheet.create({
        audioButton: {
            color: youziColors.whiteText,
            backgroundColor: isReading ? youziColors.midGrey : youziColors.buttonBackgroundPink,
            // width: youziDimensions.vw / 14,
            width: 40,
            padding: 5,
            borderRadius: 20,
            opacity: isReading ? 0.8 : 1
        }
    });



    const navigation = useNavigation();

    // pause text when exiting
    useEffect(() => {
        const beforeRemoveListener = navigation.addListener('beforeRemove', () => {
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
                        setIsReading(false);
                        pauseReadingText();
                    }
                    // if not reading, start
                    else {
                        setIsReading(true);
                        // on finish, reset button
                        readText(text = text, language = 'zh', onFinishFn = () => {
                            setIsReading(false);
                        });
                    }
                }}
                // onPressIn={setPressed(true)}
                // onPressOut={setPressed(false)}
                style={styles.audioButton} // can pass styles b/c ...props
            />

        </View>
    )
}