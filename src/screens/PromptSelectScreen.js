import React, { useContext, useEffect } from 'react';

// context
import { AppContext } from '../../App';

// components
import { View, Text, StyleSheet } from 'react-native';
import PromptCarousel from '../components/PromptSelectScreen/PromptCarousel';
import HomeButton from '../components/NavigationButtons/HomeButton/HomeButton';
import SettingsButton from '../components/NavigationButtons/SettingsButton/SettingsButton';

// data
import { vibes } from '../../assets/data/vibes';
import { getRandomPrompt } from '../scripts/promptGetter';

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

  // console.log('vibe at prompt select screen', vibeID);

  // when vibe/subvibe id changes, update objects
  // useEffect(() => {
  //   if (vibeID) {
  //     setSubVibeObject(vibeObject['subVibes'].find(subvibe => subvibe['id'] === subVibeID));
  //   }
  // }, [vibeID, subVibeID]);

  // useEffect(() => {
  //   if (vibeID) {
  //     setVibeObject(vibes.find(vibe => vibe['id'] === vibeID));
  //   }
  // }, [vibeID]);

  // get label and code for vibe and subvibe
  const vibeObject = vibes.find(vibe => vibe['id'] === vibeID);
  const vibeLabel = vibeObject['label'];
  const vibeCode = vibeObject['code']

  let subVibeObject = null, subVibeLabel = null, subVibeCode = null;
  if (subVibeID) {
    subVibeObject = vibeObject['subVibes'].find(subvibe => subvibe['id'] === subVibeID)
    subVibeLabel = subVibeObject['label'];
    subVibeCode = subVibeObject['code'];
  }

  useEffect(() => {
    // get random prompt for carousel card and set in context

    const randomPrompt = getRandomPrompt(vibeCode, subVibeCode);
    setPromptObject(randomPrompt);
    // console.log('PSS RANDOM PROMPT', randomPrompt);
    // }, [vibeID, subVibeID]);
  }, []);


  return (
    <View style={[youziStyles.centeredView, youziStyles.horizontallyCenteredView]}>
      <Text>Youzi.PromptSelectScreen</Text>
      {/* <Text>Selected vibe ID: {vibeID}</Text> */}
      <View style={youziStyles.headerTextView}>
        <Text style={youziStyles.headerText}>Today's prompts</Text>
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