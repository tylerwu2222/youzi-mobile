import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect, createContext } from 'react';

// components
import VocabContentSection from './VocabContentSection';
import TextButton from '../../Modules/Buttons/TextButton';
import EditButton from '../../Modules/Buttons/EditButton';

// scripts
import { sectionAsyncDict, clearAsyncArray } from '../../../scripts/asyncStorageHandler';

// styles
import { youziColors, youziDimensions, youziStyles } from '../../../styles/youziStyles';

export const VocabSectionContext = createContext({});

export default function VocabSection({ section, content }) {

    const [deleteControlsVisible, setDeleteControlsVisible] = useState(false);
    const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
    const [editableVocabContent, setEditableVocabContent] = useState(content);
    const [deleteVocabArray, setdeleteVocabArray] = useState([]);

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

    // update async storage when editable vocab changes
    useEffect(() => {

    }, []);

    return <View style={styles.vocabSectionView}>
        <View style={styles.vocabSectionHeaderView}>
            <Text style={youziStyles.subHeaderText}>{section}</Text>

            <EditButton
                iconSize={30}
                onPress={() => {
                    // console.log('toggling DCV');
                    setDeleteControlsVisible(!deleteControlsVisible)
                }}
                style={styles.vocabSectionEditPressable}
            />
            {deleteControlsVisible ?
                <>
                    <TextButton
                        text='delete'
                        width='16%'
                        disabled={isDeleteDisabled}
                        backgroundColor={isDeleteDisabled ? youziColors.lightGrey : youziColors.buttonBackgroundPink}
                        onPressFn={() => {

                            deleteSelectedVocab(sectionAsyncDict[section]);
                        }}
                        fontSize={13}
                    />
                    <TextButton
                        text='clear all'
                        width='20%'
                        backgroundColor={youziColors.buttonBackgroundAccent}
                        onPressFn={() => {
                            console.log('clearing', sectionAsyncDict[section]);
                            setEditableVocabContent([]);
                            clearAsyncArray(sectionAsyncDict[section]);
                        }}
                        fontSize={13}
                    />
                    <TextButton
                        text='cancel'
                        width='16%'
                        onPressFn={() => { setDeleteControlsVisible(false) }}
                        fontSize={13}
                    />
                </> :
                <>
                </>}
        </View>
        <VocabSectionContext.Provider
            value={{
                editableVocabContent
            }}
        >
            <VocabContentSection vocab={editableVocabContent} />
        </VocabSectionContext.Provider>
    </View>
}