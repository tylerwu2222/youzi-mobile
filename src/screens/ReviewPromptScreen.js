import { View, Text } from 'react-native'
import React from 'react'

import { youziStyles } from '../styles/youziStyles'
import PlayRecordingButton from '../components/ReviewPromptScreen/PlayRecordingButton'
import ChineseText from '../components/Modules/Text/ChineseText/ChineseText';

// export default function ReviewPromptScreen({ reviewPrompt = 'default prompt', reviewPromptNumber = 1 }) {
export default function ReviewPromptScreen({ route }) {
    const { reviewPrompt, reviewPromptNumber } = route.params;
    return (
        <View style={youziStyles.centeredView}>
            <Text>ReviewPromptScreen</Text>
            {/* <Text>Prompt: {reviewPrompt}</Text> */}
            <ChineseText chineseText={'Prompt: ' + reviewPrompt} />
            <Text>Prompt #: {reviewPromptNumber + 1}</Text>
            <PlayRecordingButton promptNumber={reviewPromptNumber} />
        </View>
    )
}