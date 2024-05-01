import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { PromptResponseContext } from '../../screens/PromptResponseScreen';
import { AppContext } from '../../../App';

// functions
// import { XiaoYouSpeaks } from '../Modules/Visuals/XiaoYou/XiaoYouMascot';
import { defineChinese } from '../../scripts/dictionary';

// components

// styles
import { StyleSheet } from "react-native";
import { youziColors, youziStyles } from '../../styles/youziStyles'

// test data
import { dummyChineseVocab } from '../../../assets/data/dummy_data';
import { promptDataColumnNames } from '../../../assets/data/prompt_meta_data';
import VocabBlock from '../Modules/VocabBlock/VocabBlock';
import { pauseReadingText, readText } from '../../scripts/textReader';


const styles = StyleSheet.create({
  responseVocabCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'space-between',
    marginTop: 10,
    height: '30%',
    backgroundColor: youziColors.cardBackgroundYellow
  },
  // responseColumn: {
  //   flexDirection: 'column',
  //   alignItems: 'flex-start',
  //   flex: 1,
  //   paddingBottom: 20
  // },
})

export default function PromptVocabCard() {
  const [vocabArrayOfObjects, setVocabArrayOfObjects] = useState(null);
  const [isReading, setIsReading] = useState(false);

  const {
    promptObject,
    xiaoYouTranscript,
    setXiaoYouTranscript
  } = useContext(AppContext);

  const {
    // longPressedVocab,
    focusedVocab,
    setFocusedVocab,
    // XYSpeechVisible,
    setXYSpeechVisible } = useContext(PromptResponseContext);

  const splitVocabString = (vocab) => {
    const vocabObject = {};
    vocabObject['hanzi'] = vocab.split(' (')[0];
    vocabObject['pinin'] = vocab.split(' (')[1].split(')')[0];
    vocabObject['translation'] = vocab.split(' - ')[1]
    // console.log('VO', vocabObject);
    return vocabObject;
  };

  useEffect(() => {
    const prepVocab = () => {
      const vocabFields = promptDataColumnNames.slice(11, 15);
      setVocabArrayOfObjects(vocabFields.map(col => {
        return splitVocabString(promptObject[col]);
      }));
    }
    prepVocab();
  }, []);


  useEffect(() => {
    // update transcript when focused vocab changes
    setXiaoYouTranscript('that means: ' + focusedVocab);
  }, [focusedVocab]);

  return (
    <View style={[youziStyles.promptCard, styles.responseVocabCard]}>
      {/* <Text>PromptVocabCard</Text> */}
      {/* <View style={styles.responseColumn}> */}
      {vocabArrayOfObjects ? vocabArrayOfObjects.map((vocabObject, index) => {
        // console.log('VO2', vocabObject);
        return (
          <VocabBlock
            key={'1.' + index}
            hanzi={vocabObject['hanzi']}
            draggable={true}
            onPressFn={() => {
              // set speech bubble visible
              setXYSpeechVisible(true);
              // set vocab
              setFocusedVocab(vocabObject['translation']);
              // read vocab
              if (!isReading) {
                pauseReadingText(); // first stop ongoing
                readText(xiaoYouTranscript + vocabObject['translation'], 'en');
                setIsReading(true);
              }
            }
            }
            onPressOutFn={() => {
              setXYSpeechVisible(false)
              setFocusedVocab('')
              setIsReading(false);
            }
            }
          // translation={vocabObject['translation']}
          />
        )
      }) :
        <></>}
    </View>
  )
}