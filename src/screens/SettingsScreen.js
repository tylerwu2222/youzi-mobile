import React, { useContext, useEffect } from 'react'

// context
import { AppContext } from '../../App';

// storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// components
import { View, Text } from 'react-native'
import ToggleableSwitch from '../components/Modules/ToggleableSwitch/ToggleableSwitch';
import ExitButton from '../components/NavigationButtons/ExitButton/ExitButton';
import ProfileImage from '../components/Modules/Visuals/ProfileImage/ProfileImage';
import SafeTextInput from '../components/Modules/TextInput/SafeTextInput/SafeTextInput';

// styles
import { youziStyles } from '../styles/youziStyles'


export default function SettingsScreen() {
    const {
        isTraditional,
        setIsTraditional,
        showPinyin,
        setShowPinyin,
        allowNSFWPrompts,
        setAllowNSFWPrompts
    } = useContext(AppContext);

    // --> update async storage when states change
    useEffect(() => {
        const updateisTraditional = async () => {
            await AsyncStorage.setItem('IS_TRAD', JSON.stringify(isTraditional));
            const storageIsTraditional = await AsyncStorage.getItem('IS_TRAD');
            // console.log('storage IS_TRAD value:', JSON.parse(storageIsTraditional));
        };
        updateisTraditional();
    }, [isTraditional]);

    useEffect(() => {
        const updateNSFW = async () => {
            await AsyncStorage.setItem('NSFW', JSON.stringify(allowNSFWPrompts));
            const storageNSFW = await AsyncStorage.getItem('NSFW');
            // console.log('storage NSFW value:', JSON.parse(storageNSFW));
        };
        updateNSFW();
    }, [allowNSFWPrompts]);

    useEffect(() => {
        const updatePinyin = async () => {
            await AsyncStorage.setItem('SHOW_PINYIN', JSON.stringify(showPinyin));
            const storageShowPinyin = await AsyncStorage.getItem('SHOW_PINYIN');
            // console.log('storage NSFW value:', JSON.parse(storageNSFW));
        };
        updatePinyin();
    }, [showPinyin]);

    return (
        <View style={youziStyles.centeredView}>
            <Text>SettingsScreen</Text>

            <ExitButton />
            <ProfileImage editable={true} />
            <SafeTextInput/>
            <ToggleableSwitch
                label={'Simplified/Traditional'}
                toggledValue={isTraditional}
                setToggledValue={setIsTraditional} />
            <ToggleableSwitch
                label={'Show pinyin by default'}
                toggledValue={showPinyin}
                setToggledValue={setShowPinyin} />
            <ToggleableSwitch
                label={'Allow NSFW prompts'}
                toggledValue={allowNSFWPrompts}
                setToggledValue={setAllowNSFWPrompts} />
        </View>
    )
}