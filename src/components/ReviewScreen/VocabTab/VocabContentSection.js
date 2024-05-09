import React, { useState, useContext, useEffect } from 'react';

// context
import { VocabTabContext } from './VocabTab';
import { VocabSectionContext } from './VocabSection';

import ToggleableTouchable from '../../Modules/ToggleableTouchable/ToggleableTouchable'

// components
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { dummyChineseVocab } from '../../../../assets/data/dummy_data'
import ChineseText from '../../Modules/Text/ChineseText/ChineseText';
import VocabBlock from '../../Modules/VocabBlock/VocabBlock';
import { youziColors } from '../../../styles/youziStyles';

// scripts
// import { getCompletedVocab } from '../../../scripts/asyncStorageHandler';

const styles = StyleSheet.create({
    vocabContentView: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 35
        // backgroundColor: 'black'
    }
});

// const vocabSections = ['favorites', 'vocab', 'slang'];

export default function VocabContentSection() {
    // console.log('vocab content section v array', vocab);
    const {
        // selectedVocab,
        setSelectedVocab,
        modalVisible,
        setModalVisible
    } = useContext(VocabTabContext);

    const { editableVocabContent } = useContext(VocabSectionContext);

    // const fullListVocab = dummyChineseVocab.concat(shuffleArray(dummyChineseVocab), shuffleArray(dummyChineseVocab), shuffleArray(dummyChineseVocab))
    // const [displayedVocab, setDisplayedVocab] = useState(editableVocabContent);
    // const [vocabExpanded, setVocabExpanded] = useState(false);

    // update displayed if vocab list longer than 20, add fullListVocab...
    // OR MAKE SCROLLABLE
    // useEffect(() => {
    //     setDisplayedVocab(vocab);
    // }, []);

    // toggle vocab modal visibility
    const displayModal = (vocab) => {
        console.log(vocab, 'pressed');
        setModalVisible(true);
        setSelectedVocab(vocab);
    }

    // toggle amount of vocab shown
    // const expandVocab = () => {
    //     setVocabExpanded(true);
    //     setDisplayedVocab(fullListVocab);
    // }

    // map vocab from all existing recordings into two lists (vocab & slang)

    return (
        <View style={styles.vocabContentView}>
            {/* {vocabSections.map((section, index) => {
                return <Text>{section}</Text>
            })} */}
            {editableVocabContent ? editableVocabContent.map((v, i) => {
                return <VocabBlock
                    key={i}
                    hanzi={v}
                    pressable={true}
                    favoritable={false}
                    backgroundColor={youziColors.buttonBackground}
                    translation={false}
                    textSize={12}
                    // XY dialogue visible + reading
                    onPressFn={() => {
                        // displayModal(v);
                    }
                    }
                    marginHorizontal={10}
                    marginVertical={5}
                    padding={0}
                />
            }) : <></>}
            {/* {!vocabExpanded &&
                <ToggleableTouchable
                    text={'...'}
                    handlePress={() => { expandVocab() }}
                />} */}
        </View>
    )
}