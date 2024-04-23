import { View, Text, Modal, StyleSheet, TouchableOpacity } from 'react-native'

import React, { useContext } from 'react'
import { VocabTabContext } from '../../ReviewScreen/VocabTab/VocabTab';

import HanziPinyinBlock from '../Text/HanziPinyinBlock/HanziPinyinBlock';

import { youziStyles, youziColors, youziDimensions } from '../../../styles/youziStyles';

const styles = StyleSheet.create({
    modalView: {
        height: youziDimensions.vh * 2 / 5,
        backgroundColor: youziColors.cardBackgroundYellow,
        borderRadius: 5,
        margin: 20,
        padding: 35,
        alignItems: 'center'
    },
});

export default function VocabModal() {
    const {
        selectedVocab,
        modalVisible,
        setModalVisible
    } = useContext(VocabTabContext);


    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={modalVisible}
            onBackdropPress={() => {
                console.log('clicked outside modal');
                this.setModalVisible(false);
            }}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <TouchableOpacity
                style={{ flex: 1 }}
                onPress={() => {
                    setModalVisible(false)
                }}>
                <View style={styles.modalView}>
                    <HanziPinyinBlock hanziCharacter={selectedVocab}
                        customPinyinSize={youziStyles.largePinyinText.fontSize}
                        customHanziSize={youziStyles.largeHanziText.fontSize}
                    />
                </View>
            </TouchableOpacity >
        </Modal>
    )
}