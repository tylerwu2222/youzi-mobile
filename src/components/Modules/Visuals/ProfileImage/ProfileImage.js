import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const styles = StyleSheet.create({
    // badgeIconView: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center'
    // },
    profileImage: {
        width: youziDimensions.vw / 5,
        height: youziDimensions.vw / 5,
        margin: youziDimensions.vw / 15,
        // padding: youziDimensions.vw / 15,
        // width: youziDimensions.vw / 2
    }
});

export default function ProfileImage({ editable = false }) {
    // if editable true, add on press to edit image
    return (
        <View>
            <Image
                style={styles.profileImage}
                source={require('../../../../../assets/icons/youzi_logo.png')}
                alt='profile-image'
            ></Image>
        </View>
    )
}