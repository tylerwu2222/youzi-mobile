import { View, Text, Pressable } from 'react-native'
import React, { useContext } from 'react'

import { StyleSheet } from 'react-native';
import { youziColors, youziDimensions, youziStyles } from '../../styles/youziStyles';
import { ReviewContext } from '../../screens/ReviewScreen';
import TabSelectorTab from './TabSelectorTab';

const styles = StyleSheet.create({
    tabSelector: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderBottomWidth: 2,
        borderBottomColor: youziColors.cardBackgroundOrange
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
                return <TabSelectorTab index={i} page={page} onPressFn={handleTabSwitch} />
            }
            )}
        </View>

    )
}