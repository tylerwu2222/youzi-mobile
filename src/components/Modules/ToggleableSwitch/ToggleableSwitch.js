import React, { useState } from 'react'

// components
import { View, Text, Switch, StyleSheet } from 'react-native'

// styles
import { youziColors, youziDimensions } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
    toggleSwitchView: {
        paddingTop: youziDimensions.vh / 20,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    toggleSwitchLabel: {

    },
    toggleSwitch: {
        // backgroundColor: youziColors.buttonBackgroundPink,
        marginLeft: youziDimensions.vw / 15,
        transform: [{ scaleX: 2 }, { scaleY: 2 }]
    }
});

export default function ToggleableSwitch({ label = '', toggledValue, setToggledValue }) {

    return (
        <View style={styles.toggleSwitchView}>
            <Text style={styles.toggleSwitchLabel}>
                {label}
            </Text>
            <Switch
                style={styles.toggleSwitch}
                trackColor={{
                    false: youziColors.toggleBackgroundOff,
                    true: youziColors.toggleBackgroundOn
                }}
                thumbColor={
                    toggledValue ?
                        youziColors.buttonBackground :
                        youziColors.buttonBackgroundAccent}
                onValueChange={() => {
                    setToggledValue(!toggledValue);
                }}
                value={toggledValue}
            />
        </View>
    )
}