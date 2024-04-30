import { View, Text, Linking, StyleSheet } from 'react-native'
import React, { useState } from 'react'

import YoutubeVideoPlayer from './YoutubeVideoPlayer';

import { dummyMedia } from '../../../assets/data/dummy_data'

import { youziDimensions, youziColors } from '../../styles/youziStyles';



const styles = StyleSheet.create({
    suggestedMediaView: {
        width: youziDimensions.paddedWidth,
        padding: 10,
        backgroundColor: youziColors.buttonBackground,
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    suggestedMediaViewText: {
        color: youziColors.hyperlinkText
    }
});

export default function SuggestedMediaCard() {
    // maybe filtering for short vid would also work
    const [firstVideoID, setfirstVideoID] = useState('TDqhmhfnOvI'); // testing vertical vid --> works
    // const [firstVideoID, setfirstVideoID] = useState('KE0NEFKhEG8'); // horizontal vid
    const [firstPlaylistID, setfirstPlaylistID] = useState(null);

    // get first video using YouTube API
    const getFirstVideo = () => {
        // search using keyword --> get first video 

        // if playlist, get first video of playlist (then link playlist)
    };

    return (
        <View style={styles.suggestedMediaView}>
            <YoutubeVideoPlayer youtubeVideoID={firstVideoID} />
            <Text>
                Media Recommendation:
                <Text
                    style={styles.suggestedMediaViewText}
                    onPress={() => Linking.openURL('https://www.youtube.com/results?search_query=' + dummyMedia)}
                > {dummyMedia}</Text>
            </Text>
        </View>
    )
}