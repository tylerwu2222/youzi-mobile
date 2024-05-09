import { View, Text, StyleSheet } from 'react-native';
import React, { useState, useEffect, createContext } from 'react';

// components
import VocabContentSection from './VocabContentSection';
import TextButton, { DynamicTextButton } from '../../Modules/Buttons/TextButton';
import EditButton from '../../Modules/Buttons/EditButton';

// scripts
import { sectionAsyncDict, clearAsyncArray } from '../../../scripts/asyncStorageHandler';

// styles
import { youziColors, youziDimensions, youziStyles } from '../../../styles/youziStyles';

export const VocabSectionContext = createContext({});

export default function VocabSection({ section, content }) {

    // console.log('VS section', section);
    // console.log('VS content', content);
    const [deleteControlsVisible, setDeleteControlsVisible] = useState(false);
    const [isDeleteModeOn, setIsDeleteModeOn] = useState(false);
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
                    <DynamicTextButton
                        initialText='delete off'
                        toggledText='delete on'
                        width='20%'
                        // disabled={isDeleteDisabled}
                        fontColor={isDeleteModeOn ? youziColors.whiteText : youziColors.blackText}
                        backgroundColor={isDeleteModeOn ? youziColors.buttonBackgroundPink : youziColors.lightGrey}
                        onPressFn={() => {
                            setIsDeleteModeOn(!isDeleteModeOn);
                        }}
                        fontSize={12}
                    />
                    {/* <TextButton
                        text='toggle delete'
                        width='25%'
                        // disabled={isDeleteDisabled}
                        fontColor={isDeleteModeOn ? youziColors.whiteText : youziColors.blackText}
                        backgroundColor={isDeleteModeOn ? youziColors.buttonBackgroundPink : youziColors.lightGrey}
                        onPressFn={() => {
                            setIsDeleteModeOn(!isDeleteModeOn);
                        }}
                        fontSize={12}
                    /> */}
                    <TextButton
                        text='clear all'
                        width='20%'
                        backgroundColor={youziColors.buttonBackgroundAccent}
                        onPressFn={() => {
                            console.log('clearing', sectionAsyncDict[section]);
                            setEditableVocabContent([]);
                            clearAsyncArray(sectionAsyncDict[section]);
                        }}
                        fontSize={12}
                    />
                    <TextButton
                        text='cancel'
                        width='16%'
                        fontColor={youziColors.blackText}
                        backgroundColor={youziColors.lightGrey}
                        onPressFn={() => { setDeleteControlsVisible(false) }}
                        fontSize={12}
                    />
                </> :
                <>
                </>}
        </View>
        <VocabSectionContext.Provider
            value={{
                editableVocabContent,
                setEditableVocabContent,
                isDeleteModeOn
            }}
        >
            <VocabContentSection section={section} />
        </VocabSectionContext.Provider>
    </View>
}