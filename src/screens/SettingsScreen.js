import React, { useContext, useEffect } from 'react'

// context
import { AppContext } from '../../App';

// scripts
import { setAsyncBoolean } from '../scripts/asyncStorageHandler';

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
            setAsyncBoolean(isTraditional, 'IS_TRAD');
        };
        updateisTraditional();
    }, [isTraditional]);

    useEffect(() => {
        const updateNSFW = async () => {
            setAsyncBoolean(allowNSFWPrompts, 'NSFW');
        };
        updateNSFW();
    }, [allowNSFWPrompts]);

    useEffect(() => {
        const updatePinyin = async () => {
            setAsyncBoolean(showPinyin, 'SHOW_PINYIN');
        };
        updatePinyin();
    }, [showPinyin]);

    return (
        <View style={youziStyles.centeredView}>
            {/* <Text>SettingsScreen</Text> */}
            <ExitButton />
            <ProfileImage editable={true} />
            <SafeTextInput />
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