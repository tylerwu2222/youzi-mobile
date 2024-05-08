import { View, Text } from 'react-native'
import React from 'react'

import IconButton from './IconButton';

import { AntDesign } from '@expo/vector-icons';

export default function FavoriteIndicator() {
    return (
        <IconButton
        iconComponent={<AntDesign name="star" size={24} color="black" />}
        />
    )
}