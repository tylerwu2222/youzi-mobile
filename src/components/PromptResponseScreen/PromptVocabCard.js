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

  const {
    promptObject
  } = useContext(AppContext);

  const {
    // longPressedVocab,
    setLongPressedVocab,
    // XYSpeechVisible,
    setXYSpeechVisible } = useContext(PromptResponseContext);

  const splitVocabString = (vocab) => {
    const vocabObject = {};
    vocabObject['hanzi'] = vocab.split(' (')[0];
    vocabObject['pinin'] = vocab.split(' (')[1].split(')')[0];
    vocabObject['translation'] = vocab.split(' - ')[1]
    console.log('VO', vocabObject);
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

  // // display as 2 columns
  // const halfLength = Math.ceil(dummyChineseVocab.length / 2);
  // const column1 = dummyChineseVocab.slice(0, halfLength);
  // const column2 = dummyChineseVocab.slice(halfLength);

  return (
    <View style={[youziStyles.promptCard, styles.responseVocabCard]}>
      {/* <Text>PromptVocabCard</Text> */}
      {/* <View style={styles.responseColumn}> */}
      {vocabArrayOfObjects ? vocabArrayOfObjects.map((vocabObject, index) => {
        console.log('VO2', vocabObject);
        return (
          <VocabBlock
            key={'1.' + index}
            hanzi={vocabObject['hanzi']}
            draggable={true}
            onlongPressFn={() => {
              // set speechbubble visible
              setXYSpeechVisible(true);
              // set vocab
              setLongPressedVocab(vocabObject['translation']);
              // setLongPressedVocab(defineChinese(vocab));
            }
            }
            onLongPressOutFn={() => {
              setXYSpeechVisible(false)
              setLongPressedVocab('')
            }
            }
          />
        )
      }) :
        <></>}
      {/* </View> */}
      {/* <View style={styles.responseColumn}>
        {column2.map((vocab, index) => (
          <VocabBlock
            key={'2.' + index}
            hanzi={vocab}
            draggable={true}
            onlongPressFn={
              () => {
                // set speechbubble visible
                setXYSpeechVisible(true);
                // set vocab
                setLongPressedVocab(defineChinese(vocab));
              }
            }
            onLongPressOutFn={() => {
              setXYSpeechVisible(false)
              setLongPressedVocab('')
            }
            }
          />
        ))}
      </View> */}
    </View>
  )
}