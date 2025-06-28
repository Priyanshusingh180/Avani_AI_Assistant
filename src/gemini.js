let apikey = "AIzaSyAfsRTjwwJYWP2M3S_SuSuY7fcvboRJM0A"

import {
    GoogleGenerativeAI, 
    HarmCategory, 
    HarmBlockThreshold,
    } from "@google/generative-ai";

    const genAI = new GoogleGenerativeAI(apikey);

    const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    }) ;

    const generationconfig = {
        temperature: 0.7,  // More focused than 1.0
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 50,  // Limits to about 1-2 sentences
        responseMimeType: "text/plain",
        stopSequences: ["\n"]  // Stop at first newline
    }

    async function run (prompt) {
        const chatSession = model.startChat({
        generationconfig, history: [
        ],
        }) ;
    const result = await chatSession. sendMessage(prompt);
    return result.response.text();
    }
    export default run;

