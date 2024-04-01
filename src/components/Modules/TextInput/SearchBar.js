import { View, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'

import { youziColors, youziDimensions } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
    searchBar: {
        borderWidth: 1,
        borderColor: youziColors.blackText,
        // backgroundColor: youziColors.cardBackgroundYellow,
        // color: youziColors.blackText,
        borderRadius: 5,
        padding: 10
    },
});

export default function SearchBar({ onChange = () => { }, placeholder = "Search prompts" }) {
    const [text, setText] = useState('');

    // when text changes, call search function
    useEffect(() => {
        // console.log('text changing', text)
        onChange(text);
    }, [text]);


    return (
        <View>
            <TextInput
                style={styles.searchBar}
                onChangeText={setText}
                placeholder={placeholder}
                value={text}
            />
        </View>
    )
}