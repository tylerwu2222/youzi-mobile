import { View, Text, Image } from 'react-native'
import React, { createContext, useState } from 'react'

import TabSelector from '../components/ReviewScreen/TabSelector';
import VocabTab from '../components/ReviewScreen/VocabTab/VocabTab';
import PromptTab from '../components/ReviewScreen/PromptTab/PromptTab';
import JourneyTab from '../components/ReviewScreen/JourneyTab/JourneyTab';


// styles
import { StyleSheet } from "react-native";
import { youziStyles } from '../styles/youziStyles';
import { youziColors } from '../styles/youziStyles';
import { youziDimensions } from '../styles/youziStyles';
import SettingsButton from '../components/SettingsButton/SettingsButton';

const styles = StyleSheet.create({
  reviewView: {
    width: youziDimensions.vw,
    height: youziDimensions.vh,
    backgroundColor: youziColors.backgroundPastelOrange
  },
  tabView: {
    width: youziDimensions.vw,
    height: '80%'
  }
});


// context
export const ReviewContext = createContext({});

export default function ReviewScreen() {
  const review_tabs = ['vocab', 'prompt', 'journey'];

  const [activeTab, setActiveTab] = useState(review_tabs[0]);

  return (
    <ReviewContext.Provider value={{
      review_tabs,
      activeTab,
      setActiveTab
    }}>
      <View style={[youziStyles.centeredView, styles.reviewView]}>
        <Text style={youziStyles.headerText}>Review board</Text>
        <Image alt='profile-pic'></Image>
        {/* on tab click, switch current tab */}
        <TabSelector />
        <View style={styles.tabView}>
          {activeTab == review_tabs[0] && <VocabTab />}
          {activeTab == review_tabs[1] && <PromptTab />}
          {activeTab == review_tabs[2] && <JourneyTab />}
        </View>
        <SettingsButton/>
      </View >
    </ReviewContext.Provider>
  )
}