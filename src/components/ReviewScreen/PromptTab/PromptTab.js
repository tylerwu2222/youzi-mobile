import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState, createContext } from 'react'

// data
// import { dummyChinesePrompts } from '../../../../assets/data/dummy_data';
import { dummyChinesePrompt } from '../../../../assets/data/dummy_data';

// components
import PromptReviewItem from './PromptReviewItem.js';
import SearchBar from '../../Modules/TextInput/SearchBar.js';

// storage
import AsyncStorage from '@react-native-async-storage/async-storage';

// styles
import { youziDimensions } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
  promptView: {
    width: '100%',
    padding: youziDimensions.vw / 15,
    paddingTop: 0
    // width: youziDimensions.vw / 2
  },
  searchBarView: {
    width: '100%',
    padding: youziDimensions.vw / 15,
    paddingBottom: 0
  },
  recordingsView: {
    width: '100%',
    paddingBottom: youziDimensions.vh / 10
  }
});

export const PromptTabContext = createContext({});


export default function PromptTab() {
  const [existingRecordings, setExistingRecordings] = useState(null);
  const [promptOptionVisibility, setPromptOptionVisibility] = useState(false);

  // filter prompts based on search keyword

  const searchPrompts = (text) => {
    console.log('searching:', text);
  };

  // --> get recordings from AS on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const existingRecordingsJSON = await AsyncStorage.getItem('PROMPT_RECORDINGS');
        setExistingRecordings(existingRecordingsJSON ? JSON.parse(existingRecordingsJSON) : []); // initialize key as empty array if empty
        console.log('prompt records', existingRecordings);
      } catch (error) {
        console.error('Error fetching data from AsyncStorage:', error);
      }
    };
    fetchData();
  }, []);

  // <-- update recordings in AS when existingRecordings changes
  useEffect(() => {
    const updateData = async () => {
      await AsyncStorage.setItem('PROMPT_RECORDINGS', JSON.stringify(existingRecordings));
    }
    updateData();
    console.log('updating records', existingRecordings);
  }, [existingRecordings]);


  useEffect(() => {
    // if promptOptions toggled to true, 
    if (promptOptionVisibility) {
      // start vibrating all prompts
    }
  }, [promptOptionVisibility]);

  return (
    <PromptTabContext.Provider
      value={{
        existingRecordings,
        setExistingRecordings,
        promptOptionVisibility,
        setPromptOptionVisibility
      }}
    >
      <View style={styles.searchBarView}>
        <SearchBar onChange={searchPrompts()} />
      </View>
      <ScrollView style={styles.promptView}>
        <View style={styles.recordingsView}>
          {existingRecordings && existingRecordings.map((recording, index) => {
            // ideally show audio transcript (start of recording) with prompt
            return <PromptReviewItem recording={recording} />
          })}
        </View>
      </ScrollView>
    </PromptTabContext.Provider>
  )
}