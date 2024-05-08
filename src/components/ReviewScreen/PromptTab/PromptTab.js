import React, { useEffect, useState, createContext } from 'react'

// navigation
import { useNavigation } from '@react-navigation/native';

// components
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native'
import PromptReviewItem from './PromptReviewItem.js';
import SearchBar from '../../Modules/TextInput/SearchBar.js';
import TextButton from '../../Modules/Buttons/TextButton.js';

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
  const [filteredRecordings, setFilteredRecordings] = useState([]);
  const [promptOptionVisibility, setPromptOptionVisibility] = useState(false);

  // filter prompts based on search keyword
  const searchPrompts = (text) => {
    // console.log('searching:', text);
    if (existingRecordings) {
      const matchedRecordings = existingRecordings.filter((r, i) => {
        // console.log(r);
        // check if prompt title includes search keyword
        if (r.hasOwnProperty('title') && r.hasOwnProperty('date')) {
          // console.log('title', r.title);
          return r.title.includes(text) || r.date.includes(text);
        }
        else {
          // console.log('no property');
          return false;
        }
      })
      // console.log('matched recordings', matchedRecordings);
      setFilteredRecordings(matchedRecordings);
    }
  };

  // navigate to vibe select (when no prompts)
  const navigation = useNavigation();
  const navigateToVibeSelect = () => {
    navigation.navigate('vibe-select-page')
  };

  // --> get recordings from AS on load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const existingRecordingsJSON = await AsyncStorage.getItem('PROMPT_RECORDINGS');
        setExistingRecordings(existingRecordingsJSON ? JSON.parse(existingRecordingsJSON) : []); // initialize key as empty array if empty
        // setFilteredRecordings(existingRecordings);
        // searchPrompts('');
        // console.log('prompt records', existingRecordings);
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
    setFilteredRecordings(existingRecordings); // also update filtered recordings
    // console.log('updating records', existingRecordings);
    // console.log('filt records', filteredRecordings);
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
        <SearchBar onChange={searchPrompts} />
      </View>
      <ScrollView style={styles.promptView}>
        {/* recordings */}
        <View style={styles.recordingsView}>
          {filteredRecordings ? filteredRecordings.map((recording, index) => {
            // ideally show audio transcript (start of recording) with prompt
            return <PromptReviewItem key={index} recording={recording} />
          }) :
            <></>
            // <ActivityIndicator size="large" color="#0000ff" />
          }
        </View>
        {/* do a prompt if 0 recordings */}
        {existingRecordings && existingRecordings.length == 0 ?
          <View style={styles.recordingsView}>
            <TextButton
              text={'record a prompt!'}
              onPressFn={navigateToVibeSelect}
            />
          </View> :
          <></>}
      </ScrollView>
    </PromptTabContext.Provider >
  )
}