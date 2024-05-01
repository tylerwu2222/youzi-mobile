// import axios from 'axios';
import OpenAI from 'openai';

import { OPENAI_KEY } from './API_keys';

const openai = new OpenAI({ apiKey: OPENAI_KEY });

export const transcribeAudio = async (audioFile, language) => {
    // testing openAI completion --> works!
    // const completion = await openai.chat.completions.create({
    //     messages: [{ role: "system", content: "You are a helpful assistant." }],
    //     model: "gpt-3.5-turbo",
    // });

    // console.log('testing openAI', completion.choices[0]);

    // console.log('openai audiofile', audioFile)
    // const transcription = await openai.audio.transcriptions.create({
    //     // file: fs.createReadStream(audioFile),
    //     file: audioFile,
    //     model: "whisper-1",
    //     language: language
    // });

    // console.log('transcription', transcription);
    // console.log('transcription.text', transcription.text);

    // try {
    //     const response = await FileSystem.uploadAsync(
    //         this.openAIEndpoint,
    //         audioFile,
    //         {
    //             // Options specifying how to upload the file.
    //             httpMethod: 'POST',
    //             uploadType: FileSystem.FileSystemUploadType.MULTIPART,
    //             fieldName: 'file', // Name of the field for the uploaded file
    //             mimeType: 'audio/m4a', // MIME type of the uploading file
    //             parameters: {
    //                 model: 'whisper-1', // For example, if you're using OpenAI's model parameter
    //                 language: language
    //             },
    //         }
    //     );

    //     console.log(JSON.stringify(response, null, 4));
    // }
    // catch {
    //     console.log('errorrrrrr')
    // }

};