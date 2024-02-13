import { View, Text, Pressable } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native';


import { StyleSheet } from "react-native";
import { youziColors } from '../../styles/youziStyles';

const styles = StyleSheet.create({
    StartPromptButton: {
        alignItems: 'center',
        width: '80%',
        borderRadius: 5,
        margin: 10,
        padding: 10,
        backgroundColor: youziColors.buttonBackground,
        color: youziColors.blackText
    },
    homeButtonText: {
        fontFamily: 'Zilla Slab',
        fontSize: 20,
    }
})

export default function StartPromptButton({vibe}) {
    const navigation = useNavigation();
    const navigateToResponse = (vibe) => {
        console.log('navigating to response', vibe);
        navigation.navigate('Prompt Response', {vibe: vibe});
    }

    return (
        <Pressable
            style={styles.StartPromptButton}
            onPress={() => {
                navigateToResponse(vibe);
            }}
        >
            <Text>
                Start Response
            </Text>
        </Pressable>
    )
}