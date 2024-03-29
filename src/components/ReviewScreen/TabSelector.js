import { View, Text, TouchableHighlight } from 'react-native'
import React, { useContext } from 'react'

import { StyleSheet } from 'react-native';
import { youziColors, youziDimensions, youziStyles } from '../../styles/youziStyles';
import { ReviewContext } from '../../screens/ReviewScreen';

const styles = StyleSheet.create({
    tabSelector: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: youziColors.cardBackgroundOrange
    },
    tab: {
        width: '33.33%',
        height: youziDimensions.vh * 1 / 20
    },
    tabText: {
        textAlign: 'center'
    }
});

export default function TabSelector() {
    const {
        review_tabs,
        activeTab,
        setActiveTab
    } = useContext(ReviewContext);

    const handleTabSwitch = (page) => {
        setActiveTab(page);
    };

    return (
        <View style={styles.tabSelector}>
            {review_tabs.map((page, i) => {
                // console.log('page', page, 'i',i)
                return <TouchableHighlight
                    style={styles.tab}
                    key={i}
                    onPress={() => { handleTabSwitch(page) }}
                >
                    <Text style={[youziStyles.subHeaderText, styles.tabText]}>{page}</Text>
                </TouchableHighlight>
            }
            )}
        </View>

    )
}