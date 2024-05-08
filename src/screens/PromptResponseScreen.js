import React, { useState, useEffect, useContext, createContext } from 'react'

// context
import { AppContext } from '../../App';


// components
import { View } from 'react-native'
import PromptCard from '../components/Modules/PromptCard/PromptCard';
import ControlsBar from '../components/PromptResponseScreen/Controls/ControlsBar';
import HomeButton from '../components/NavigationButtons/HomeButton/HomeButton';
import SettingsButton from '../components/NavigationButtons/SettingsButton/SettingsButton';
import SuggestedMediaCard from '../components/PromptResponseScreen/SuggestedMediaCard';
import XiaoYouMascot, { XiaoYouSpeechBubble } from '../components/Modules/Visuals/XiaoYou/XiaoYouMascot';
import PromptVocabCard from '../components/PromptResponseScreen/PromptVocabCard';

// styles
import { youziStyles } from '../styles/youziStyles';
// import { youziColors } from '../styles/youziStyles';
// import { youziDimensions } from '../styles/youziStyles';
// import AsyncStorage from '@react-native-async-storage/async-storage';



// const styles = StyleSheet.create({
//   homeLogo: {
//     width: youziDimensions.vw / 2,
//     height: youziDimensions.vw / 2
//   }
// });


// AUDIO should be:
// 1) recorded & saved in cache
// 2) playable from cache, if user dislikes, can discard
// 3) else, save on device


export const PromptResponseContext = createContext({});

export default function PromptResponseScreen() {
  const {
    xiaoYouTranscript,
    // setXiaoYouTranscript
  } = useContext(AppContext);

  const [focusedVocab, setFocusedVocab] = useState({});
  const [XYSpeechVisible, setXYSpeechVisible] = useState(false);

  return (
    <PromptResponseContext.Provider value={{
      focusedVocab,
      setFocusedVocab,
      XYSpeechVisible,
      setXYSpeechVisible
    }}>
      <View style={youziStyles.centeredView}>
        {/* <Text>Youzi.PromptResponseScreen</Text> */}
        <PromptCard hasImage={false} />
        <SuggestedMediaCard />
        <PromptVocabCard />
        <ControlsBar />
        <HomeButton />
        <SettingsButton />
        {XYSpeechVisible && focusedVocab['hanzi'] ?
          <XiaoYouSpeechBubble
            textContent={
              focusedVocab['hanzi'] + ', ' + xiaoYouTranscript + focusedVocab['translation']
            }
            positionBottom={150}
          /> :
          <></>}
        <XiaoYouMascot />
      </View>
    </PromptResponseContext.Provider>
  )
}