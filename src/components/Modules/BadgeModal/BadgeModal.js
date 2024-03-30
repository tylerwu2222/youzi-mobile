import { View, Text, StyleSheet, Modal } from 'react-native'
import React from 'react'
import BadgeIcon from '../Badges/BadgeIcon';

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
    // const {
    //     // selectedVocab,
    //     modalVisible,
    //     setModalVisible
    // } = useContext(VocabTabContext);


    return (
        <Modal
            animationType='fade'
            transparent={true}
            // visible={modalVisible}
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
                    <BadgeIcon/>
                </View>
            </TouchableOpacity >
        </Modal>
    )
}

export default function BadgeModal() {
    return (
        <View>
            <Text>BadgeModal</Text>
        </View>
    )
}