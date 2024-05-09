import React from 'react'

// components
// import { View, Text } from 'react-native'
import IconButton from '../../Modules/Buttons/IconButton';

// navigation
import { useNavigation } from '@react-navigation/native';

// assets
import { Ionicons } from '@expo/vector-icons';

// styles
import { StyleSheet } from "react-native";
import { youziColors, youziStyles, youziDimensions } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
    settingsButton: {
        // backgroundColor: 'black',
        position: 'absolute',
        top: youziDimensions.vh / 16,
        left: 20
    }
});

export default function SettingsButton() {
    const navigation = useNavigation();
    const navigateToSettings = () => {
        navigation.navigate('settings-page');
    }

    return (
        <IconButton
            // iconComponent={<AntDesign name="setting" size={40} color={youziColors.blackText} />}
            iconComponent={<Ionicons name="settings-sharp" size={35} color={youziColors.blackText} />}
            // iconComponent={<AntDesign name="setting" size={40} color={youziColors.buttonBackgroundAccent} />}
            onPress={() => { navigateToSettings() }}
            style={styles.settingsButton} // can pass styles b/c ...props
        />
    )
}