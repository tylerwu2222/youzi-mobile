import React from 'react'

import IconButton from './IconButton';
import { Feather } from '@expo/vector-icons';

export default function EditButton({ iconSize = 30, ...props }) {
    return (
        <IconButton
            iconComponent={<Feather name="edit" size={iconSize} color="black" />}
            {...props}
        />
    )
}