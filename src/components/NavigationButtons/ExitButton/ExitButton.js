import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native';

import IconButton from '../../Modules/Buttons/IconButton';
import { AntDesign } from '@expo/vector-icons';

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