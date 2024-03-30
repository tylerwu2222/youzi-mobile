import { View, Text, Linking, StyleSheet } from 'react-native'
import React from 'react'
import { dummyMedia } from '../../../assets/data/dummy_data'
import { youziDimensions, youziColors } from '../../styles/youziStyles';

const styles = StyleSheet.create({
    suggestedMediaView: {
        width: youziDimensions.paddedWidth,
        padding: 10,
        backgroundColor: youziColors.buttonBackground,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    suggestedMediaViewText: {
        color: youziColors.hyperlinkText
    }
});

export default function SuggestedMediaCard() {
    return (
        <View style={styles.suggestedMediaView}>
            <Text>
                Media Recommendation: 
                <Text
                    style={styles.suggestedMediaViewText}
                    onPress={() => Linking.openURL('https://www.youtube.com/results?search_query=' + dummyMedia)}
                > {dummyMedia}</Text>
            </Text>
        </View>
    )
}