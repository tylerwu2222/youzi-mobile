import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

// styles
import { youziColors, youziDimensions } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
    breakdownView: {
        width: '100%',
        backgroundColor: youziColors.cardBackgroundYellow,
        height: youziDimensions.vh / 3,
        margin: youziDimensions.vw / 15,
        padding: youziDimensions.vw / 15,
        // width: youziDimensions.vw / 2
    }
});

export default function PromptBreakdownSection() {
    return (
        <View style={styles.breakdownView}>
            <Text>PromptBreakdownSection</Text>
        </View>
    )
}