import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { dummyBadges } from '../../../../assets/data/dummy_data';
import BadgeIcon from '../../Modules/Badges/BadgeIcon'


// styles
import { youziColors, youziDimensions } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
    badgeSectionView: {
        width: '100%',
        backgroundColor: youziColors.cardBackgroundYellow,
        margin: youziDimensions.vw / 15,
        padding: youziDimensions.vw / 15,
        // width: youziDimensions.vw / 2
    },
    badgeFlexView: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
    }
});

export default function BadgesSection() {
    // console.log('dB', dummyBadges)
    return (
        <View style={styles.badgeSectionView}>
            <Text>Badges</Text>
            <View style={styles.badgeFlexView}>
                {
                    dummyBadges.map((badgeName, index) =>
                        <BadgeIcon key={index} badgeName={badgeName} />
                    )
                }
            </View>
        </View>
    )
}