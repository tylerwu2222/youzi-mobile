import React, { useRef, useState } from 'react'

// data
// import { dummyChinesePrompt } from '../../../../assets/data/dummy_data';

// components
import { View, StyleSheet, Animated } from 'react-native';
import PromptReviewButton from './PromptReviewButton';
import PromptAccordion from './PromptAccordion';


const styles = StyleSheet.create({
    promptReviewItemView: {
        margin: 0
    },
    toggleableView: {
        height: 'fit-content',
        // margin: 0,
        // padding: 0,
        overflow: 'hidden'
    }
});

export default function PromptReviewItem({ recording }) {
    const [expanded, setExpanded] = useState(false);

    // initialize height for review item at 0
    const initialHeight = 0;
    const finalHeight = 400;
    const animSpeed = 0.6
    const heightAnim = useRef(new Animated.Value(initialHeight)).current;

    const togglePromptItem = () => {
        console.log('toggling prompt item');
        setExpanded(!expanded);
        Animated.timing(heightAnim, {
            toValue: expanded ? initialHeight : finalHeight, // toggle between 0 and 300
            duration: animSpeed * 1000, // 0.8 seconds
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.promptReviewItemView}>
            {/* prompt review card-button */}
            <PromptReviewButton
                recording={recording}
                onPressFn={() => {
                    togglePromptItem();
                }
                }
                expanded={expanded}
            />
            {/* expandable prompt review */}
            <Animated.View style={[styles.toggleableView, { height: heightAnim }]}>
                {/* {expanded ? */}
                <PromptAccordion
                    recording={recording}
                />
                {/* : null} */}
            </Animated.View>
        </View>
    )
}