import * as FileSystem from 'expo-file-system';

export const getFileSize = async (uri) => {
    try {
        // returns file size in bytes 
        const fileInfo = await FileSystem.getInfoAsync(uri);
        //   convert to MB
        const fileSize = fileInfo.size / (1024 * 1024);
        return fileSize;
    } catch (error) {
        console.error('Error getting file size:', error);
        throw error;
    }
};