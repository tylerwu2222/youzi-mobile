import React from 'react';

// components
import { View, Text, Pressable } from 'react-native';

// navigation
import { useNavigation } from '@react-navigation/native';

// styles
import { StyleSheet } from "react-native";
import { youziColors } from '../../styles/youziStyles';

const styles = StyleSheet.create({
    startPromptButtonView: {
        position: 'absolute',
        bottom: 200,
        width: '80%',
        alignItems: 'center',
    },
    startPromptButton: {
        alignItems: 'center',
        width: '100%',
        // borderRadius: 5,
        margin: 10,
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 10,
        backgroundColor: youziColors.buttonBackgroundPink,

    },
    startPromptButtonText: {
        color: youziColors.whiteText,
        // fontFamily: 'Zilla Slab',
        // fontSize: 20,
    }
})

export default function StartPromptButton({ vibe }) {
    const navigation = useNavigation();
    const navigateToResponse = (vibe) => {
        console.log('navigating to response', vibe);
        navigation.navigate('prompt-response-page', { vibe: vibe });
    }

    return (
        <View style={styles.startPromptButtonView}>
            <Pressable
                style={styles.startPromptButton}
                onPress={() => {
                    navigateToResponse(vibe);
                }}
            >
                <Text style={styles.startPromptButtonText}>
                    Start Response
                </Text>
            </Pressable>
        </View>
    )
}