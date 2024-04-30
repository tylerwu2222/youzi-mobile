import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { PromptResponseContext } from '../../screens/PromptResponseScreen';
// import { AppContext } from '../../../App';

// functions
// import { XiaoYouSpeaks } from '../Modules/Visuals/XiaoYou/XiaoYouMascot';
import { defineChinese } from '../../scripts/dictionary';

// components

// styles
import { StyleSheet } from "react-native";
import { youziColors, youziStyles } from '../../styles/youziStyles'

// test data
import { dummyChineseVocab } from '../../../assets/data/dummy_data';
import VocabBlock from '../Modules/VocabBlock/VocabBlock';

const styles = StyleSheet.create({
  responseVocabCard: {
    flexDirection: 'row',
    gap: 10,
    justifyContent: 'space-between',
    marginTop: 10,
    height: '30%',
    backgroundColor: youziColors.cardBackgroundYellow
  },
  responseColumn: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    flex: 1,
    paddingBottom: 20
  },
})

export default function PromptVocabCard() {
  // const { isTraditional
  // } = useContext(AppContext);

  const {
    // longPressedVocab,
    setLongPressedVocab,
    // XYSpeechVisible,
    setXYSpeechVisible } = useContext(PromptResponseContext);

  // display as 2 columns
  const halfLength = Math.ceil(dummyChineseVocab.length / 2);
  const column1 = dummyChineseVocab.slice(0, halfLength);
  const column2 = dummyChineseVocab.slice(halfLength);

  return (
    <View style={[youziStyles.promptCard, styles.responseVocabCard]}>
      {/* <Text>PromptVocabCard</Text> */}
      <View style={styles.responseColumn}>
        {column1.map((vocab, index) => (
          <VocabBlock
            key={'1.' + index}
            hanzi={vocab}
            draggable={true}
            onlongPressFn={() => {
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
      </View>
      <View style={styles.responseColumn}>
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
      </View>
    </View>
  )
}