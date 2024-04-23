import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import { youziDimensions } from '../../../../styles/youziStyles';


export default function AIGenImage({ src = "", width = '100%', height = '100%' }) {

    // add on type, show image as modal
    const showImageModal = () => {

    };

    const styles = StyleSheet.create({
        aiGenImage: {
            width: width,
            height: height,
            // height: youziDimensions.vh / 10,
            // margin: youziDimensions.vw / 15
        }
    });

    return (
        <Image
            style={styles.aiGenImage}
            source={require('../../../../../assets/images/russ_sumo.png')}
            alt='ai-gen-image'
        ></Image>
    )
}