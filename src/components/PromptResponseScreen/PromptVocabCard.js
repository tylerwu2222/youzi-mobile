
import React, { useContext, useEffect, useState } from 'react';

import { PromptResponseContext } from '../../screens/PromptResponseScreen';
import { AppContext } from '../../../App';

// components
import { View, Text } from 'react-native';
import VocabBlock from '../Modules/VocabBlock/VocabBlock';

// scripts
// import { XiaoYouSpeaks } from '../Modules/Visuals/XiaoYou/XiaoYouMascot';
// import { defineChinese } from '../../scripts/dictionary';
import { pauseReadingText, readText } from '../../scripts/textReader';
import { joinVocabColumns, getSlangColumn } from '../../scripts/victorJSONHandler';
import { addFavoritedVocab, removeFavoritedVocab, addSlang, removeSlang, getCompletedFavoriteVocab } from '../../scripts/asyncStorageHandler';

// assets
import FavoriteIndicator from '../Modules/Buttons/FavoriteIndicator';

// styles
import { StyleSheet } from "react-native";
import { youziColors, youziStyles } from '../../styles/youziStyles'


// test data
// import { dummyChineseVocab } from '../../../assets/data/dummy_data';
// import { promptDataColumnNames } from '../../../assets/data/prompt_meta_data';


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
  slangVocabCard: {
    backgroundColor: youziColors.cardBackgroundOrange
  }
})

export default function PromptVocabCard() {
  const [vocabArrayOfObjects, setVocabArrayOfObjects] = useState(null);
  const [slangObject, setSlangObject] = useState(null);
  const [isReading, setIsReading] = useState(false);

  const {
    promptObject,
    xiaoYouTranscript,
    setXiaoYouTranscript
  } = useContext(AppContext);

  // console.log('PO', promptObject);

  const {
    // longPressedVocab,
    // focusedVocab,
    setFocusedVocab,
    // XYSpeechVisible,
    setXYSpeechVisible } = useContext(PromptResponseContext);

  // console.log('PO in PVC', promptObject);
  // join vocab from columns to list
  useEffect(() => {
    // console.log('PO in effect', promptObject);
    setVocabArrayOfObjects(joinVocabColumns(promptObject));
    setSlangObject(getSlangColumn(promptObject));
  }, [promptObject]);


  // set XYM to read vocab
  useEffect(() => {
    setXiaoYouTranscript('that means: ');
  }, []);

  return (
    <View style={[youziStyles.promptCard, styles.responseVocabCard]}>
      {/* normal vocab */}
      {vocabArrayOfObjects && promptObject ?
        vocabArrayOfObjects.map((vocabObject, index) => {
          // console.log('VO2', vocabObject);
          return (
            <VocabBlock
              key={'1.' + index
              }
              hanzi={vocabObject['hanzi']}
              pressable={true}
              longPressable={true}
              pressOutable={true}
              favoritable={true}
              // XY dialogue visible + reading
              onPressFn={() => {
                // set speech bubble visible
                setXYSpeechVisible(true);
                // set vocab
                setFocusedVocab(vocabObject);
                // read vocab
                if (!isReading) {
                  pauseReadingText(); // first stop ongoing speech
                  readText(vocabObject['hanzi'], 'zh'); // 1) read chinese
                  readText(xiaoYouTranscript + vocabObject['translation'], 'en'); // 2) read translation
                  setIsReading(true);
                }
              }
              }
              // toggle whether vocab is favorited
              onLongPressFn={
                async (favorited = false) => {
                  // when favorited changes, add/remove from AS
                  if (!favorited) {
                    await addFavoritedVocab(vocabObject['hanzi']);
                  }
                  else {
                    await removeFavoritedVocab(vocabObject['hanzi']);
                  }
                }
              }
              // hide XY dialogue & pause reading
              onPressOutFn={() => {
                setXYSpeechVisible(false)
                setFocusedVocab('')
                setIsReading(false);
              }
              }
            />
          )
        }) :
        <></>}
      {/* slang vocab */}
      {vocabArrayOfObjects && slangObject ? <VocabBlock
        key={'1.3'}
        hanzi={slangObject['hanzi']}
        pressable={true}
        longPressable={true}
        pressOutable={true}
        textColor={youziColors.buttonBackgroundAccent}
        translation={''}
        favoritable={true}
        onPressFn={() => {
          console.log('slangObject on press', slangObject);
          // set speech bubble visible
          setXYSpeechVisible(true);
          // set vocab
          setFocusedVocab(slangObject);
          // read vocab
          if (!isReading) {
            pauseReadingText(); // first stop ongoing speech
            readText(slangObject['hanzi'], 'zh'); // 1) read chinese
            readText(xiaoYouTranscript + slangObject['translation'], 'en'); // 2) read translation
            setIsReading(true);
          }
        }
        }
        onLongPressFn={
          async (favorited = false) => {
            // console.log('slangO long press', slangObject);
            // when favorited changes, add/remove from AS
            if (!favorited) {
              // console.log('PVC adding slang');
              await addSlang(slangObject['hanzi']);
            }
            else {
              // console.log('PVC removing slang');
              await removeSlang(slangObject['hanzi']);
            }
          }
        }
        onPressOutFn={() => {
          setXYSpeechVisible(false)
          setFocusedVocab('')
          setIsReading(false);
        }
        }

      /> : <></>}
    </View>
  )
}