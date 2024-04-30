import React from 'react'

// components
import { View, Text, Image, TouchableOpacity } from 'react-native'

// navigating to pages from home
import { useNavigation } from '@react-navigation/native';

import { IMAGE_URIS } from '../../../assets/data/image_data';

// styles
import { StyleSheet } from "react-native";
import { youziColors, youziDimensions } from '../../styles/youziStyles';

const styles = StyleSheet.create({
    homeButton: {
        alignItems: 'center',
        justifyContent: 'center',
        height: youziDimensions.vh / 4,
        width: youziDimensions.paddedWidth,
        borderRadius: 10,
        margin: 10,
        padding: 10,
        backgroundColor: youziColors.buttonBackground,
        color: youziColors.blackText,
        overflow: 'hidden'
    },
    homeButtonText: {
        fontFamily: 'Zilla Slab',
        fontSize: 40,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // invokes position absolute and top, bottom, left,..: 0 (centering item)
        alignItems: 'center',
        justifyContent: 'center',
    },
    homeButtonBackgroundImage: {
        position: 'relative',
        right: -youziDimensions.vw * 2 / 7,
        bottom: -youziDimensions.vw * 1 / 8,
        // flex: 1,
        opacity: 0.35,
        width: youziDimensions.vw / 2, // Ensure the image covers the entire TouchableOpacity
        height: youziDimensions.vw / 2,
        // Other styles for the image
    },
})

export default function HomeModeButton({ text = 'button', mode = 'mode', backgroundImage, ...props }) {
    const navigation = useNavigation();
    const navigateToMode = (mode) => {
        if (mode == 'prompt') {
            navigation.navigate('vibe-select-page');
        }
        else if (mode == 'review') {
            navigation.navigate('review-mode-page');
        }
    }
    let imgSource = IMAGE_URIS[backgroundImage].uri;

    // console.log('backgroudn image', imgSource);

    return (
        <TouchableOpacity
            style={styles.homeButton}
            onPress={() => {
                navigateToMode(mode)
            }}
            {...props}
        >
            <Image
                source={imgSource} // Specify the image path
                // source={require('../../../assets/' + backgroundImage + '.png')} // Specify the image path
                style={styles.homeButtonBackgroundImage}
                resizeMode="contain" // Adjust the resizeMode as needed
                alt='background image'
            />
            <View style={styles.overlay}>
                <Text
                    style={styles.homeButtonText}
                >{text}</Text>
            </View>
        </TouchableOpacity >
        // <Button 
        // style={styles.homeButton}
        // title={text} 
        // onPress={() => { navigateToMode(mode) }} />
    )
}