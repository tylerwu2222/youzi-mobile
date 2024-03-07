import { View, Text } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native';

// icons
import { AntDesign } from '@expo/vector-icons';

// styles
import { StyleSheet } from "react-native";
import { youziColors, youziStyles, youziDimensions } from '../../styles/youziStyles';
import IconButton from '../Modules/Buttons/IconButton';

const styles = StyleSheet.create({
    settingsButton: {
        // backgroundColor: 'black',
        position: 'absolute',
        top: youziDimensions.vh / 18,
        right: 20
    }
});

export default function SettingsButton() {
    const navigation = useNavigation();
    const navigateToSettings = () => {
        navigation.navigate('settings-page');
    }

    return (
        <IconButton
            iconComponent={<AntDesign name="setting" size={40} color={youziColors.buttonBackgroundAccent} />}
            onPress={() => { navigateToSettings() }}
            style={styles.settingsButton} // can pass styles b/c ...props
        />
    )
}