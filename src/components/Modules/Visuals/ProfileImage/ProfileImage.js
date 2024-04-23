import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

import { youziColors, youziDimensions } from '../../../../styles/youziStyles';

const styles = StyleSheet.create({

    profileImageView: {
        width: youziDimensions.vw / 4,
        height: youziDimensions.vw / 4,
        margin: youziDimensions.vw / 15,
        overflow: 'hidden',
        borderRadius: youziDimensions.vw / 8,
        borderColor: youziColors.borderColor,
        borderWidth: 2
    },
    profileImage: {
        width: youziDimensions.vw / 4,
        height: youziDimensions.vw / 4
        // padding: youziDimensions.vw / 15,
        // width: youziDimensions.vw / 2
    }
});

export default function ProfileImage({ editable = false }) {
    // if editable true, add on press to edit image
    return (
        <View
            style={styles.profileImageView}>
            <Image
                style={styles.profileImage}
                source={require('../../../../../assets/icons/youzi_mascot.png')}
                alt='profile-image'
            ></Image>
        </View>
    )
}