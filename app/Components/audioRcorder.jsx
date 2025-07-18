'use client';
import React, { useState } from 'react'

const AudioRcorder = () => {
    const [isRecording,setIsRecording] = useState(false)
    const [mediaRecorder,setMediaRecorder] = useState(null)
     const handleRecord= async () => {
        try{
            setIsRecording(true)
            const stream = await navigator.mediaDevices.getUserMedia({audio:true})
            const recorder = new MediaRecorder(stream)
            
            chunks = []

            recorder.ondataavailable = (event)=>{
                chunks.push(event.data)
            }
            recorder.start()
            setMediaRecorder(recorder)
        } catch(error){
          alert(error+ "")
        }
      }

      const handlepause = ()=>{
        
      }

      const handleStopRecording = ()=>{
        try {
            setIsRecording(false)
            
        } catch (error) {
            alert(error+ "")
        }
      }
  return (
    <div>
        
     
      {!isRecording?(
        <div>
            <button onClick={()=>handleRecord()}>start Recording</button>
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
