import React from 'react'

import IconButton from './IconButton';

import { AntDesign } from '@expo/vector-icons';
import { youziColors } from '../../../styles/youziStyles';

export default function FavoriteIndicator() {
    return (
        <IconButton
            iconComponent={<AntDesign name="star" size={30} color={youziColors.buttonBackgroundPink} />}
        />
    )
}