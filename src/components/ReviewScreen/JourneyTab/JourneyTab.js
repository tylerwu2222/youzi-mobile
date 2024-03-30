import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';

// sections
import PromptBreakdownSection from './PromptBreakdownSection';
import BadgesSection from './BadgesSection';

import { youziDimensions } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
  journeyView: {
    display: 'flex',
    flexDirection: 'column',
    // alignItems: "center",
    padding: youziDimensions.vw / 15
    // width: youziDimensions.vw / 2
  }
});


export default function JourneyTab() {
  return (
    <ScrollView style={styles.journeyView}>
      <Text>JourneyTab</Text>
      <PromptBreakdownSection />
      <BadgesSection />
    </ScrollView>
  )
}