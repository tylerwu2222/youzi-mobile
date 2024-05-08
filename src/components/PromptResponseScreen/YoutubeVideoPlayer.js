import React, { useState, useCallback } from 'react'

// components
import { View, Button, StyleSheet } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";

// import { youziColors } from '../../styles/youziStyles';

const YT_player_dimension = 1.72;
const styles = StyleSheet.create({
    youtubePlayerView: {
        overflow: 'hidden',
        padding: 0,
        height: 300 / YT_player_dimension,
        width: 300,
        borderRadius: 10
    }
});

export default function YoutubeVideoPlayer({ youtubeVideoID = "" }) {
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    // const togglePlaying = useCallback(() => {
    //     setPlaying((prev) => !prev);
    // }, []);

    return (
        // <View style={styles.youtubePlayerView}>
        <YoutubePlayer
            height={300 / YT_player_dimension}
            width={300}
            play={playing}
            videoId={youtubeVideoID}
            onChangeState={onStateChange}
        />
        // </View>
    )
}