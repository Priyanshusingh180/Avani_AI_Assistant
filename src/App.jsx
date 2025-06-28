import React, { useContext } from 'react'
import "./App.css"
import va from "./assets/ai.png"
import { CiMicrophoneOn } from "react-icons/ci";
import { datacontext } from './context/usercontext';
import speakimg from "./assets/speak.gif"
import aigif from "./assets/aiVoice.gif"

function App() {
  let {recognition, speaking, setSpeaking, prompt, response,setPrompt,setResponse} = useContext(datacontext);
    
  

  return (
    <div className='main'>
      <img src={va} alt="" id='shifra'/>
      <span>I'm Avani, your Advanced virtual assistant</span>
      {!speaking ? <button onClick={() => {
        setPrompt("Listening...")
        setSpeaking(true)
        setResponse(false)
        recognition.start()}}>Click Me <CiMicrophoneOn />
      </button> 
      :
      <div className='response'>
        {!response ? 
         <img src={speakimg} alt="" id='speak' />
         :
          <img src={aigif} alt="" id='aigif' />
         }
       
        <p>{prompt}</p>
      </div>
      }
      
    </div>
  )
}

export default App