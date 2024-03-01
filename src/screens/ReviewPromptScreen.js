import { View, Text } from 'react-native'
import React from 'react'
import { youziStyles } from '../styles/youziStyles'

export default function ReviewPromptScreen({ reviewPrompt = 'default prompt' }) {
    return (
        <View style={youziStyles.centeredView}>
            <Text>ReviewPromptScreen</Text>
            <Text>Prompt: {reviewPrompt}</Text>
        </View>
    )
}