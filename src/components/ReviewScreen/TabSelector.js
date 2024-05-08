import React, { useContext } from 'react';

// context
import { ReviewContext } from '../../screens/ReviewScreen';

// components
import { View, Text, Pressable } from 'react-native';
import TabSelectorTab from './TabSelectorTab';

// styles
import { StyleSheet } from 'react-native';
import { youziColors, youziDimensions, youziStyles } from '../../styles/youziStyles';


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
            {review_tabs.slice(0, 2).map((page, i) => {
                // {review_tabs.map((page, i) => {
                return <TabSelectorTab index={i} page={page} onPressFn={handleTabSwitch} />
            }
            )}
        </View>

    )
}