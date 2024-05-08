
import React, { useState } from 'react'

// components
import { View, StyleSheet } from 'react-native'
import IconButton from './IconButton';

// assets
import { MaterialIcons } from '@expo/vector-icons';

// styles
import { youziColors, youziDimensions } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
    ExpandButtonView: {
        backgroundColor: youziColors.blackText,
        width: 40,
        height: 30,
        borderRadius: 15,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        top: 20,
        // marginBottom: 20
    },
    ExpandButton: {

    }
});

export default function ExpandButton({
    onPressFn = () => { },
    expanded = false }) {
    return (
        <View style={styles.ExpandButtonView}>
            <IconButton
                iconComponent={
                    <MaterialIcons name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} size={24} color={youziColors.whiteText} />}
                onPress={() => { onPressFn() }}
            />
        </View>
    )
}