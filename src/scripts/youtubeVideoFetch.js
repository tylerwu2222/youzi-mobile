import { YT_DATA_KEY } from "./API_keys";

export const getFirstVideo = async (
    searchQuery,
    videoDuration = 'short'
) => {
    // Construct API URL
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?key=${YT_DATA_KEY}&q=${searchQuery}&part=snippet&type=video&videoDuration=${videoDuration}`;

    // Make API request
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const firstVideo = data.items[0];
        // const videoTitle = firstVideo.snippet.title;
        // const videoDescription = firstVideo.snippet.description;
        const videoId = firstVideo.id.videoId;
        return videoId;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};