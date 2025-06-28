import React, { createContext, useState } from 'react'
import run from '../gemini';
export const datacontext = createContext()

function UserContext({children}) {

    let[speaking, setSpeaking] = useState(false)
    let[prompt, setPrompt] = useState("listening...")
    let[response,setResponse] = useState(false)


    function speak(text){
        let text_speak = new SpeechSynthesisUtterance(text)
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "en-US"
        window.speechSynthesis.speak(text_speak)
    }

    function getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('hi-IN', { hour: '2-digit', minute: '2-digit' });
    }

    function getCurrentDate() {
        const now = new Date();
        return now.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    }

    async function aiResponse(prompt){
        let text = await run(prompt)
        let newText = text.split("**")&&text.split("*")&&text.
        replace("google","Priyanshu singh urf Sonal Babu")&&text.replace("Google","Priyanshu singh urf Sonal Babu")
        setPrompt(newText)
        speak(newText)
        setResponse(true)
        setTimeout(() => {
            setSpeaking(false)
        },5000)
        
    }

    let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    let recognition = new speechRecognition()
    recognition.onresult = (e) => {
        let currentIndex = e.resultIndex
        let transcript=e.results[currentIndex][0].transcript
        setPrompt(transcript)
        takeCommand(transcript.toLowerCase())
    }

    function takeCommand(command){
        if(command.includes("open") && command.includes("youtube")){
            window.open("https://www.youtube.com/","-blank")
            speak("opening Youtube")
            setPrompt("opening Youtube...")
            setTimeout(() => {
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("open") && command.includes("google")){
            window.open("https://www.google.com/","-blank")
            speak("opening google")
            setPrompt("opening Google...")
            setTimeout(() => {
                setSpeaking(false)
            },5000)
        }
        else if(command.includes("open") && command.includes("instagram")){
            window.open("https://www.instagram.com/","-blank")
            speak("opening instagram")
            setPrompt("opening Instagram...")
            setTimeout(() => {
                setSpeaking(false)
            },5000)
        }
        // Added date and time commands
        else if(command.includes("time") || command.includes("what time is it")) {
            const time = getCurrentTime();
            speak(`The current time is ${time}`);
            setPrompt(`Current time: ${time}`);
            setTimeout(() => setSpeaking(false), 5000);
        }
        else if(command.includes("date") || command.includes("today's date")) {
            const date = getCurrentDate();
            speak(`Today's date is ${date}`);
            setPrompt(`Today's date: ${date}`);
            setTimeout(() => setSpeaking(false), 5000);
        }
        else if(command.includes("date and time") || command.includes("time and date")) {
            const time = getCurrentTime();
            const date = getCurrentDate();
            speak(`Today is ${date} and the time is ${time}`);
            setPrompt(`Date: ${date}, Time: ${time}`);
            setTimeout(() => setSpeaking(false), 5000);
        }
        else{
            aiResponse(command)
        }
    }
    
    let value = {
        recognition,
        speaking, 
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse
    }
    
    return (
        <datacontext.Provider value={value}> 
            {children}
        </datacontext.Provider>
    )
}

export default UserContext