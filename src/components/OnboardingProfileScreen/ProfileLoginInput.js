import { View, Text, TextInput } from 'react-native'
import React, { useState } from 'react'

import { youziStyles } from '../../styles/youziStyles';

export default function ProfileLoginInput() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <View>
            <TextInput
                style={youziStyles.shortInput}
                onChangeText={setUsername(username)}
                value={username}
                placeholder="username"
            />
            <TextInput
                style={youziStyles.shortInput}
                onChangeText={setPassword(password)}
                value={password}
                placeholder="password"
            />
        </View>
    )
}