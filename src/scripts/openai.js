import axios from 'axios';
import { OPENAI_KEY } from './API_keys';

const MAX_RETRIES = 2; // Maximum number of retries
const INITIAL_DELAY = 1000; // Initial delay in milliseconds

export const transcribeAudio = async (audioFile, language) => {
    const formData = new FormData();
    formData.append('file', audioFile);
    formData.append('model', 'whisper-1');
    formData.append('language', language);

    console.log('TA formData', formData);

    const config = {
        headers: {
            'Content-Type': 'multipart/form-data',
            'Authorization': `Bearer ${OPENAI_KEY}`,
        },
    };

    let retries = 0;
    let delay = INITIAL_DELAY;
    const makeRequest = async () => {
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/audio/transcriptions',
                formData,
                config
            );
            console.log('OPENAI response', response.data);
            return response.data.text;
        } catch (error) {
            if (error.response && error.response.status === 429 && retries < MAX_RETRIES) {
                retries++;
                delay *= 2; // Exponential backoff
                console.log(`Rate limit exceeded. Retrying in ${delay} ms...`);
                await new Promise(resolve => setTimeout(resolve, delay));
                return makeRequest();
            } else {
                console.error('Error transcribing audio:', error);
                throw error;
            }
        }
    };

    return makeRequest();
};