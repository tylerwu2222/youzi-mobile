import { Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'

// 
import { AppContext } from '../../../../App';
import { tify, sify } from 'chinese-conv';



export default function ChineseText({ chineseText, customHanziSize = null, ...props }) {
    const { isTraditional
    } = useContext(AppContext);

    const hanziSize = customHanziSize ? customHanziSize : 20;

    const styles = StyleSheet.create({
        hanziText: {
            fontSize: hanziSize
        }
    });

    const convertText = (text) => {
        // console.log('converting text', text);
        if (isTraditional) {
            // console.log('is Traditional', tify(text));
            return tify(text);
        }
        return sify(text);
    }

    return (
        <Text
            style={styles.hanziText}
            {...props}
        >
            {convertText(chineseText)}
        </Text>
    )
}