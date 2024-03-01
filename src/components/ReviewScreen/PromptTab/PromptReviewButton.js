import { View, Text, Pressable, StyleSheet } from 'react-native'
import React from 'react'

import { youziColors, youziStyles } from '../../../styles/youziStyles';
import { useNavigation } from '@react-navigation/native';

const styles = StyleSheet.create({
    promptView: {
        width: '100%',
        margin: 10
    },
    promptPressable: {
        backgroundColor: youziColors.buttonBackground,
        padding: 10,
        borderRadius: 5
    }
});

export default function PromptReviewButton({ prompt }) {
    const navigation = useNavigation();

    const navigateToPromptReview = (prompt) => {
        console.log('navigating to prompt review for', prompt);
        navigation.navigate('Review Prompt', { reviewPrompt: prompt });
    };

    return (
        <View style={styles.promptView}>
            <Pressable
                style={styles.promptPressable}
                onPress={() => {
                    navigateToPromptReview(prompt);
                }}
            >
                <Text style={youziStyles.largeButtonText}>{prompt}</Text>
            </Pressable>
        </View>
    )
}