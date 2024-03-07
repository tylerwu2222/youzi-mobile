import { View, Text } from 'react-native'
import React, { useContext, useEffect } from 'react'

import { AppContext } from '../../App';

// storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import ToggleableSwitch from '../components/Modules/ToggleableSwitch/ToggleableSwitch';

// styles
import { youziStyles } from '../styles/youziStyles'


export default function SettingsScreen() {
    const {
        isTraditional,
        setIsTraditional,
        allowNSFWPrompts,
        setAllowNSFWPrompts
    } = useContext(AppContext);

    // --> update async storage when states change
    useEffect(() => {
        const updateisTraditional = async () => {
            await AsyncStorage.setItem('IS_TRAD', JSON.stringify(isTraditional));
            const storageIsTraditional = await AsyncStorage.getItem('IS_TRAD');
            console.log('storage IS_TRAD value:', JSON.parse(storageIsTraditional));
        };
        updateisTraditional();
    }, [isTraditional]);
    
    useEffect(() => {
        const updateNSFW = async () => {
            await AsyncStorage.setItem('NSFW', JSON.stringify(allowNSFWPrompts));
            const storageNSFW = await AsyncStorage.getItem('NSFW');
            console.log('storage NSFW value:', JSON.parse(storageNSFW));
        };
        updateNSFW();
    }, [allowNSFWPrompts]);

    return (
        <View style={youziStyles.centeredView}>
            <Text>SettingsScreen</Text>
            <ToggleableSwitch
                label={'Allow NSFW prompts'}
                toggledValue={allowNSFWPrompts}
                setToggledValue={setAllowNSFWPrompts} />
            <ToggleableSwitch
                label={'Simplified/Traditional'}
                toggledValue={isTraditional}
                setToggledValue={setIsTraditional} />
        </View>
    )
}