import React from 'react'

// components
import { View, Text, Button, TouchableOpacity } from 'react-native'

// navigating to pages from home
import { useNavigation } from '@react-navigation/native';

// styles
import { StyleSheet } from "react-native";
import { youziColors } from '../../styles/youziStyles';

const styles = StyleSheet.create({
    homeButton: {
        alignItems: 'center',
        width: '80%',
        borderRadius: 5,
        margin: 10,
        padding: 10,
        backgroundColor: youziColors.buttonBackground,
        color: youziColors.blackText
    },
    homeButtonText: {
        fontFamily: 'Zilla Slab',
        fontSize: 20,
    }
})

export default function HomeModeButton({ text = 'button', mode = 'mode', ...props }) {
    const navigation = useNavigation();
    const navigateToMode = (mode) => {
        // console.log('navigating to', mode);
        if (mode == 'prompt') {
            navigation.navigate('vibe-select-page');
        }
        else if (mode == 'review') {
            navigation.navigate('review-mode-page');
            // disable review button for now
            // console.log('review mode not yet implemented')
        }
    }
    return (
        <TouchableOpacity
            style={styles.homeButton}
            onPress={() => {
                navigateToMode(mode)
            }}
            {...props}
        >
            <Text
                style={styles.homeButtonText}
            >{text}</Text>
        </TouchableOpacity >
        // <Button 
        // style={styles.homeButton}
        // title={text} 
        // onPress={() => { navigateToMode(mode) }} />
    )
}