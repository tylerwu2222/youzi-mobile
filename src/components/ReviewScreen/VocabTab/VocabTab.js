import { View, Text, ScrollView, StyleSheet } from 'react-native'
import React, { useState, createContext } from 'react'

import VocabContentSection from './VocabContentSection';
import VocabModal from '../../Modules/VocabModal/VocabModal';

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
    const VocabSections = ['difficult', 'medium', 'easy'];
    const [selectedVocab, setSelectedVocab] = useState('vocab');
    const [modalVisible, setModalVisible] = useState(false);


    return (
        <VocabTabContext.Provider
            value={{
                selectedVocab,
                setSelectedVocab,
                modalVisible,
                setModalVisible
            }}>
            <ScrollView style={styles.vocabView}>
                {modalVisible ? <VocabModal /> : <></>}
                {VocabSections.map((section, i) => {
                    return <View key={i} style={styles.vocabSectionView}>
                        <Text style={youziStyles.subHeaderText}>{section}</Text>
                        <VocabContentSection sectionTitle={section} />
                    </View>
                })
                }
            </ScrollView>
        </VocabTabContext.Provider>
    )
}