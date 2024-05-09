import { View, Text } from 'react-native'
import React from 'react'

export default function SafeTextInput() {
  const editableUsername = 'demo-user';
  return (
    <View>
      <Text>Username: {editableUsername}</Text>
    </View>
  )
}