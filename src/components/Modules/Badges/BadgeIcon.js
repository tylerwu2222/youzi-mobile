import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

import { youziColors, youziDimensions } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
    badgeIconView: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    badgeImage: {
        width: youziDimensions.vw / 5,
        height: youziDimensions.vw / 5,
        // margin: youziDimensions.vw / 15,
        // padding: youziDimensions.vw / 15,
        // width: youziDimensions.vw / 2
    }
});


export default function BadgeIcon({ badgeName = 'badge', image = '../../assets/icons/youzi_logo.png' }) {
    return (
        <View style={styles.badgeIconView}>
            {/* to replace source with dynamic images... */}
            <Image
                style={styles.badgeImage}
                source={require('../../../../assets/icons/youzi_logo.png')}
                alt={image}
            />
            <Text>{badgeName}</Text>
        </View>
    )
}