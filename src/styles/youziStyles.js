'use strict'

import { StyleSheet, Dimensions } from "react-native";
// import youziColors from "./youziColors";

export const youziDimensions = {
    "vw": Dimensions.get('window').width,
    "vh": Dimensions.get('window').height
};


export const youziColors = {
    "backgroundPastelOrange": "#F9E7D3",
    "buttonBackground": "#FCCB91",
    "buttonBackgroundPress": "#FF6644",
    "buttonBackgroundAccent": "#F74141",

    "blackText": "#000",
    "whiteText": "#fff",
};

export const youziStyles = StyleSheet.create({
    centeredView: {
        backgroundColor: youziColors.backgroundPastelOrange,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
        height: '100%'
    },
});