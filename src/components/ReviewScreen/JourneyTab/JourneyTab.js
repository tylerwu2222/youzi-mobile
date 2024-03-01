import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { youziDimensions } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
  journeyView: {
    width: '80%',
    padding: youziDimensions.vw / 15,
    // width: youziDimensions.vw / 2
  }
});


export default function JourneyTab() {
  return (
    <View style={styles.journeyView}>
      <Text>JourneyTab</Text>
    </View>
  )
}