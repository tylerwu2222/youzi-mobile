import React from 'react'

// navigation
import { useNavigation } from '@react-navigation/native';

// components
import { View, Text, StyleSheet } from 'react-native';
import IconButton from '../../Modules/Buttons/IconButton';

// assets
import { AntDesign } from '@expo/vector-icons';

// styles
import { youziColors, youziDimensions } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
    exitButton: {
        // backgroundColor: 'black',
        position: 'absolute',
        top: youziDimensions.vh / 18,
        right: 20
    }
});

export default function ExitButton() {
    const navigation = useNavigation();
    const navigateToPrevious = () => {
        navigation.goBack();
    }

    return (
        <IconButton
            iconComponent={<AntDesign name="close" size={40} color={youziColors.buttonBackgroundAccent} />}
            onPress={() => { navigateToPrevious() }}
            style={styles.exitButton} // can pass styles b/c ...props
        />
    )
}