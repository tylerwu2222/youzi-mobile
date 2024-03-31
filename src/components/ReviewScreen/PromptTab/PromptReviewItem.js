import { View, StyleSheet, Animated } from 'react-native'
import React, { useRef, useState } from 'react'

// data
import { dummyChinesePrompt } from '../../../../assets/data/dummy_data';

// modules
import PromptReviewButton from './PromptReviewButton';
import PromptAccordion from './PromptAccordion';

const styles = StyleSheet.create({
    promptReviewItemView: {
        margin: 0
    },
    toggleableView: {
        overflow: 'hidden'
    }
});

export default function PromptReviewItem({ recording }) {
    const [expanded, setExpanded] = useState(false);
    const heightAnim = useRef(new Animated.Value(0)).current;

    const togglePromptItem = () => {
        console.log('toggling prompt item');
        setExpanded(!expanded);
        Animated.timing(heightAnim, {
            toValue: expanded ? 0 : 300, // Adjust the height value as needed
            duration: 800, // Adjust the duration as needed
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.promptReviewItemView}>
            <PromptReviewButton
                recording={recording}
                onPressFn={() => {
                    togglePromptItem();
                }
                }
                expanded={expanded}
            />
            <Animated.View style={[styles.toggleableView, { height: heightAnim }]}>
                {expanded ?
                    // <Text>animated prompt response</Text>
                    <PromptAccordion
                        prompt={dummyChinesePrompt}
                        recording={recording}
                    />
                    : null}
            </Animated.View>
        </View>
    )
}