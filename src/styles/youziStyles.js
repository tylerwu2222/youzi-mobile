'use strict'

import { StyleSheet, Dimensions } from "react-native";

export const youziDimensions = {
    "vw": Dimensions.get('window').width,
    "paddedWidth": Dimensions.get('window').width * 4 / 5,
    "vh": Dimensions.get('window').height
};

// standard dimensions:
// default padded width: youziDimensions.vw * 4 / 5

export const youziColors = {
    "backgroundPastelOrange": "#F9E7D3",

    "buttonBackground": "#FCCB91",
    "buttonBackgroundPress": "#FF6644",
    "buttonBackgroundAccent": "#F74141",
    "buttonBackgroundPink": "#FD7DA1",

    "toggleBackgroundOff": "#FCCB91",
    "toggleBackgroundOn": "#F74141",

    "cardBackgroundOrange": "#FCCB91",
    "cardBackgroundYellow": "#F1DC87",

    "blackText": "#000",
    "whiteText": "#fff",
    "hyperlinkText": "#2163de"
};

export const youziStyles = StyleSheet.create({
    centeredView: {
        backgroundColor: youziColors.backgroundPastelOrange,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 100,
        height: '100%'
    },
    headerText: {
        fontSize: 40,
        fontFamily: 'Zilla Slab Bold'
    },
    headerTextView: {
        width: youziDimensions.paddedWidth
    },
    subHeaderText: {
        fontSize: 30,
        fontWeight: '500',
        fontFamily: 'Zilla Slab'
    },
    largeButtonText: {
        fontSize: 25
    },
    largePinyinText: {
        fontSize: 22
    },
    largeHanziText: {
        fontSize: 35,
        fontWeight: '500',
    },
    promptCard: {
        alignItems: 'center',
        width: youziDimensions.paddedWidth,
        height: '70%',
        padding: youziDimensions.vw * 1 / 13,
        borderRadius: 7,
        backgroundColor: youziColors.cardBackgroundOrange,
    },
    hanziPinyinBlocksView: {
        maxWidth: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'left',
        alignItems: 'center'
    },
    englishPromptText: {
        fontSize: 20,
        textAlign: 'justify'
    },
    shortInput: {

    }
});