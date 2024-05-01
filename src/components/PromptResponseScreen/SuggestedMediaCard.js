import { View, Text, Linking, StyleSheet } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'

import { AppContext } from '../../../App';

import YoutubeVideoPlayer from './YoutubeVideoPlayer';
import { getFirstVideo } from '../../scripts/youtubeVideoFetch';
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
    const [firstVideoID, setfirstVideoID] = useState(null); // testing vertical vid --> works
    const [mediaQuery, setMediaQuery] = useState('rick roll'); // testing vertical vid --> works
    const [queryResults, setQueryResults] = useState('https://www.youtube.com/results?' + mediaQuery); // testing vertical vid --> works
    // const [firstVideoID, setfirstVideoID] = useState('KE0NEFKhEG8'); // horizontal vid
    const [firstPlaylistID, setfirstPlaylistID] = useState(null);

    const {
        promptObject
    } = useContext(AppContext);

    // get media query keyword from media_1 string
    useEffect(() => {
        const prepVideoFields = async () => {
            const regex = /"([^"]*)"/;
            const match = promptObject['media_1'].match(regex);
            const firstMatch = match ? match[1] : null;
            setMediaQuery(firstMatch)
            // console.log('mediaQuery', mediaQuery);
            setQueryResults('https://www.youtube.com/results?search_query=' + firstMatch)
            const firstVideoID = await getFirstVideo(searchQuery = firstMatch, videoDuration = 'short');
            // console.log('FIRST VID ID', firstVideoID)
            setfirstVideoID(firstVideoID);
            // console.log('first video', firstVideo);
        }
        prepVideoFields();

    }, []);

    return (
        <View style={styles.suggestedMediaView}>
            {firstVideoID ? <YoutubeVideoPlayer youtubeVideoID={firstVideoID} /> : <></>}
            <Text>
                Media Recommendation:
                <Text
                    style={styles.suggestedMediaViewText}
                    onPress={() => Linking.openURL(queryResults)}
                > {mediaQuery}</Text>
            </Text>
        </View>
    )
}