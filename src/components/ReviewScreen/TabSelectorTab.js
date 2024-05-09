import React, { useState } from 'react'

// components
import { Pressable, Text, StyleSheet } from 'react-native'

// styles
import { youziStyles, youziDimensions } from '../../styles/youziStyles';


export default function TabSelectorTab({ page, onPressFn = () => { } }) {
    const [tabPressed, setTabPressed] = useState(false);

    const styles = StyleSheet.create({
        tab: {
            // width: '33.33%',
            width: '50%',
            height: youziDimensions.vh * 1 / 20
        },
        tabText: {
            textAlign: 'center',
            opacity: tabPressed ? 0.6 : 1
        }
    });

    return <Pressable
        style={styles.tab}
        // key={index}
        onPress={() => { onPressFn(page) }}
        onPressIn={() => {
            setTabPressed(true);
        }}
        onPressOut={() => {
            setTabPressed(false);
        }}
    >
        <Text style={[youziStyles.subHeaderText, styles.tabText]}>{page}</Text>
    </Pressable>
}