import React, { useState, useContext, useEffect } from 'react';

// context
import { VocabTabContext } from './VocabTab';

import ToggleableTouchable from '../../Modules/ToggleableTouchable/ToggleableTouchable'

// components
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
// import { dummyChineseVocab } from '../../../../assets/data/dummy_data'
import ChineseText from '../../Modules/Text/ChineseText/ChineseText';

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

export default function VocabContentSection({ vocab }) {
    // console.log('vocab content section v array', vocab);
    const {
        // selectedVocab,
        setSelectedVocab,
        modalVisible,
        setModalVisible
    } = useContext(VocabTabContext);


    // delete this fn later
    function shuffleArray(array) {
        const newArray = [...array];

        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }

        return newArray;
    }

    // const fullListVocab = dummyChineseVocab.concat(shuffleArray(dummyChineseVocab), shuffleArray(dummyChineseVocab), shuffleArray(dummyChineseVocab))
    const [displayedVocab, setDisplayedVocab] = useState(vocab);
    const [vocabExpanded, setVocabExpanded] = useState(false);

    // update displayed if vocab list longer than 20, add fullListVocab...
    // OR MAKE SCROLLABLE
    useEffect(() => {
        setDisplayedVocab(vocab);
    }, []);

    // toggle vocab modal visibility
    const displayModal = (vocab) => {
        console.log(vocab, 'pressed');
        setModalVisible(true);
        setSelectedVocab(vocab);
    }

    // toggle amount of vocab shown
    const expandVocab = () => {
        setVocabExpanded(true);
        setDisplayedVocab(fullListVocab);
    }

    // map vocab from all existing recordings into two lists (vocab & slang)

    return (
        <View style={styles.vocabContentView}>
            {/* {vocabSections.map((section, index) => {
                return <Text>{section}</Text>
            })} */}
            {displayedVocab ? displayedVocab.map((v, i) => {
                return <ToggleableTouchable
                    key={i}
                    handlePress={() => { displayModal(v) }}
                    text={<ChineseText chineseText={v} />}
                // text={v} 
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