'use client';
import React, { useRef, useState } from 'react'

const AudioRcorder = () => {
    const [isRecording,setIsRecording] = useState(false)
    const [audioUrl,setAudioUrl] = useState("")
    const [audioBlob, setAudioBlob] = useState(null)

    const mediaRecorder = useRef(null)
    const audioRef = useRef();

    const handleRecord= async () => {
        try{
            setIsRecording(true)
            const stream = await navigator.mediaDevices.getUserMedia({audio:true})
            const recorder = new MediaRecorder(stream)
            
            const chunks = [];
            recorder.ondataavailable = (event)=>{
                chunks.push(event.data)
            };

            recorder.onstop=()=>{
              const blob = new Blob(chunks,{type: "audio/webm"});
              setAudioBlob(blob);
              const url =  URL.createObjectURL(blob);
              setAudioUrl(url)
              setIsRecording(false)
            };
            
            recorder.onerror = ( event ) => {
              console.log(event.error);
            }

            recorder.start()
            mediaRecorder.current = recorder
            
        } catch(error){
          alert(error+ "")
        }
    }

      const handleStopRecording = async()=>{
        try {
          const recorder = mediaRecorder.current;
          if (recorder && recorder.state !== "inactive") {
            recorder.stop()
            recorder.stream.getTracks().forEach((track) => {track.stop()});
            alert("mediaRecorder is stoped")
            setIsRecording(false)
          } else{
            alert("stream contains null ")
          }
            
        } catch (error) {
            alert(error+ "hi")
        }
      }
  return (
    <div>
        
     
      {!isRecording?(
        <div>
            <button onClick={()=>handleRecord()}>start Recording</button>
            <audio ref={audioRef} controls src={audioUrl} /> 
        </div>
      ):(
        <div>
            <div>Yess reording</div>
            <button onClick={()=>handleStopRecording()}>Stop Recording</button>
        </div>
      )}

      
    </div>
  )
}

export default AudioRcorder
