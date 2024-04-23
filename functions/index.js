/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

// import { transcribeAudio } from '../../../scripts/openai';

const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// tutorial firebase function
exports.helloWorld = onRequest((request, response) => {
  response.set("Content-Type", "application/json");
  const data = {
    "message": "Hello from Firebase!",
    "timestamp": new Date().toISOString(),
  };
  response.status(200).json(data);
});

// speech to text API
exports.speechToTextMandarin = onRequest((request, response) => {
  // return JSON formatted text
});
