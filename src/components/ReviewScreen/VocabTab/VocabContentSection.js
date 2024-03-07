import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useContext } from 'react';
import { VocabTabContext } from './VocabTab';

import ToggleableTouchable from '../../Modules/ToggleableTouchable/ToggleableTouchable'

import { dummyChineseVocab } from '../../../../assets/data/dummy_data'
import ChineseText from '../../Modules/ChineseText/ChineseText';

const styles = StyleSheet.create({
    vocabContentView: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingBottom: 35
        // backgroundColor: 'black'
    }
});



export default function VocabContentSection({ sectionTitle }) {
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

    // get vocab data from user (backend) based on sectionTitle
    const shortListVocab = dummyChineseVocab;
    const fullListVocab = dummyChineseVocab.concat(shuffleArray(dummyChineseVocab), shuffleArray(dummyChineseVocab), shuffleArray(dummyChineseVocab))
    const [displayedVocab, setDisplayedVocab] = useState(shortListVocab);
    const [vocabExpanded, setVocabExpanded] = useState(false);


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

    return (
        <View style={styles.vocabContentView}>
            {displayedVocab.map((v, i) => {
                return <ToggleableTouchable
                    key={i}
                    handlePress={() => { displayModal(v) }}
                    text={<ChineseText chineseText={v} />}
                // text={v} 
                />
            })}
            {!vocabExpanded &&
                <ToggleableTouchable
                    text={'...'}
                    handlePress={() => { expandVocab() }}
                />}
        </View>
    )
}