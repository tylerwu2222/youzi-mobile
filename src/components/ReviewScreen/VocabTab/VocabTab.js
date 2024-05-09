import React, { useState, useEffect, createContext } from 'react'

// components
import { View, Text, ScrollView, StyleSheet } from 'react-native'
import VocabContentSection from './VocabContentSection';
import VocabModal from '../../Modules/VocabModal/VocabModal';
import { fetchVocabObject } from '../../../scripts/asyncStorageHandler';

// scripts
import { getCompletedVocab, getCompletedSlang, getCompletedFavoriteVocab } from '../../../scripts/asyncStorageHandler';

// styles
import { youziDimensions, youziStyles } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
    vocabView: {
        // width: '80%',
        padding: youziDimensions.vw / 15,
        // width: youziDimensions.vw / 2
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
        console.log('setting vocab sections');
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
                    // console.log('VS', vocabSections);
                    // console.log('mapped VS title', section, i);
                    // console.log('mapped VS content', vocabSections[section]);
                    return <View key={i} style={styles.vocabSectionView}>
                        <Text style={youziStyles.subHeaderText}>{section}</Text>
                        <VocabContentSection vocab={vocabSections[section]} />
                    </View>
                })
                }
            </ScrollView>
        </VocabTabContext.Provider>
    )
}