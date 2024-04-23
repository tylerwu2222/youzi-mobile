import { Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'

// 
import { AppContext } from '../../../../../App';
import { tify, sify } from 'chinese-conv';


// nested within HZPY block (so that hanzi character can switch ST)
export default function ChineseText({ chineseText, customHanziSize = null, ...props }) {
    const { isTraditional
    } = useContext(AppContext);

    const hanziSize = customHanziSize ? customHanziSize : 20;

    const styles = StyleSheet.create({
        hanziText: {
            fontSize: hanziSize
        }
    });

    // converts all ChineseText based on Settings
    const convertText = (text) => {
        // console.log('converting text', text);
        if (isTraditional) {
            // console.log('is Traditional', tify(text));
            return tify(text);
        }
        return sify(text);
    }

    // convertText to S/T, then map to HP block
    return (
        <Text
            style={styles.hanziText}
            {...props}
        >
            {convertText(chineseText)}
        </Text>
    )
}