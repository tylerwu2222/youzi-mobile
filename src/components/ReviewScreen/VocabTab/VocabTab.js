import React, { useState, useEffect, createContext } from 'react'

// components
import { View, Text, ScrollView, StyleSheet, Pressable } from 'react-native'
import VocabContentSection from './VocabContentSection';
import VocabModal from '../../Modules/VocabModal/VocabModal';
import { fetchVocabObject } from '../../../scripts/asyncStorageHandler';
import TextButton from '../../Modules/Buttons/TextButton';

// scripts
import { getCompletedVocab, getCompletedSlang, getCompletedFavoriteVocab } from '../../../scripts/asyncStorageHandler';

// styles
import { youziDimensions, youziStyles, youziColors } from '../../../styles/youziStyles';
import EditButton from '../../Modules/Buttons/EditButton';
import VocabSection from './VocabSection';

const styles = StyleSheet.create({
    vocabView: {
        // width: '80%',
        padding: youziDimensions.vw / 15,
        // width: youziDimensions.vw / 2
    },
    vocabSectionHeaderView: {
        flexDirection: 'row'
    },
    vocabSectionEditPressable: {
        paddingHorizontal: 5
    },
    vocabSectionView: {
        paddingLeft: 20,
        paddingRight: 20
    }
});

export const VocabTabContext = createContext({});

export default function VocabTab() {
    // const VocabSections = ['difficult', 'medium', 'easy'];

    const [vocabSections, setVocabSections] = useState(null);
    const [selectedVocab, setSelectedVocab] = useState('vocab');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        // console.log('setting vocab sections');
        const fetchVocabData = async () => {
            try {
                const result = await fetchVocabObject();
                setVocabSections(result);
            } catch (error) {
                console.error('Error fetching vocab object:', error);
            }
        };
        fetchVocabData();
    }, []);

    return (
        <VocabTabContext.Provider
            value={{
                selectedVocab,
                setSelectedVocab,
                modalVisible,
                setModalVisible
            }}>
            <ScrollView style={styles.vocabView}>
                {/* {modalVisible ? <VocabModal /> : <></>} */}
                {vocabSections && Object.keys(vocabSections).map((section, i) => {
                    return <VocabSection key={i} section={section} content={vocabSections[section]} />
                })
                }
            </ScrollView>
        </VocabTabContext.Provider>
    )
}