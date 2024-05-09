import React, { useState, useContext, useEffect } from 'react';

// context
import { AppContext } from '../../App';

// components
import { View, Text, StyleSheet } from 'react-native';
import PromptCarousel from '../components/PromptSelectScreen/PromptCarousel';
import HomeButton from '../components/NavigationButtons/HomeButton/HomeButton';
import SettingsButton from '../components/NavigationButtons/SettingsButton/SettingsButton';

// data
import { vibes } from '../../assets/data/vibes';
import { getPromptByID, getRandomPrompt } from '../scripts/promptGetter';

// styles
import { youziStyles, youziDimensions } from '../styles/youziStyles';


const styles = StyleSheet.create({
  homeLogo: {
    width: youziDimensions.vw / 2,
    height: youziDimensions.vw / 2
  }
});


export default function PromptSelectScreen() {
  const {
    vibeID,
    subVibeID,
    setPromptObject,
    // vibeObject,
    // setVibeObject,
    // subVibeObject,
    // setSubVibeObject
    // setVibeID
  } = useContext(AppContext);

  const [subVibeLabel, setSubVibeLabel] = useState('Spill the Tea');
  const [subVibeCode, setSubVibeCode] = useState(0);

  // get label and code for vibe and subvibe
  const vibeObject = vibes.find(vibe => vibe['id'] === vibeID);
  const vibeLabel = vibeObject['label'];
  const vibeCode = vibeObject['code']

  let subVibeObject = null;
  useEffect(() => {
    // if (subVibeID) {
    subVibeObject = vibeObject['subVibes'].find(subvibe => subvibe['id'] === subVibeID)
    setSubVibeLabel(subVibeObject['label']);
    setSubVibeCode(subVibeObject['code']);
    // }
  }, [vibeID, subVibeID]);

  useEffect(() => {
    // get random prompt for carousel card and set in context
    const promptID = 97460;

    const randomPrompt = getRandomPrompt(vibeCode, subVibeCode);

    // const randomPrompt = getPromptByID(promptID);

    setPromptObject(randomPrompt);
    // console.log('PSS RANDOM PROMPT', randomPrompt);
    // }, [vibeID, subVibeID]);
  }, []);


  return (
    <View style={[youziStyles.centeredView, youziStyles.horizontallyCenteredView]}>
      {/* <Text>Youzi.PromptSelectScreen</Text> */}
      {/* <Text>Selected vibe ID: {vibeID}</Text> */}
      <View style={youziStyles.headerTextView}>
        <Text style={youziStyles.headerText}>Today's prompt</Text>
        {/* <Text style={youziStyles.headerText}>Today's prompts</Text> */}
      </View>
      <View style={youziStyles.headerTextView}>
        {/* <Text style={youziStyles.subHeaderText}>{vibeLabel}</Text> */}
        <Text style={youziStyles.subHeaderText}>{vibeLabel}: {subVibeLabel}</Text>
      </View>
      <PromptCarousel />
      {/* nav buttons */}
      <HomeButton />
      <SettingsButton />
    </View>
  )
}