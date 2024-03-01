import { View, Text } from 'react-native';
import React from 'react';

import ToggleableTouchable from '../Modules/ToggleableTouchable/ToggleableTouchable';

import { dummyOnboardingInterests } from '../../../assets/data/dummy_data';

export default function InterestsContainer() {
    return (
        <View>
            {dummyOnboardingInterests.map((interest, i) => {
                return <ToggleableTouchable key={i} text={interest} />
            }
            )}
        </View>
    )
}