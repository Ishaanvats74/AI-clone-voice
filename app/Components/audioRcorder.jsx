'use client';
import React, { useRef, useState } from 'react'
import { toast } from 'sonner';

const AudioRcorder = () => {
    const [isRecording,setIsRecording] = useState(false)
    const [audioUrl,setAudioUrl] = useState("")
    const [audioBlob, setAudioBlob] = useState(null)
    const [pause,setPause] = useState(false)

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
              console.log(url)
              setAudioUrl(url)
              setIsRecording(false)
            };
            
            recorder.onerror = ( event ) => {
              console.log(event.error);
            }

            recorder.start()
            mediaRecorder.current = recorder

        } catch(error){
          toast.error(error+ "")
        }
    }

      const handleStopRecording = async()=>{
        try {
          const recorder = mediaRecorder.current;
          if (recorder && recorder.state !== "inactive") {
            recorder.stop()
            recorder.stream.getTracks().forEach((track) => {track.stop()});
            toast("mediaRecorder is stoped")
            setIsRecording(false)
          } else{
            toast.error("stream contains null ")
          }
            
        } catch (error) {
            toast.error(error+ "stopRecording")
        }
      }

      const handlePause = async()=>{
        try {
          const recorder = mediaRecorder.current;
          recorder.pause()
          setPause(true)
          toast("mediaRecorder is paused")
        } catch (error) {
          toast.error(error+ "paused")
        }
      }

      const handleResume = async () => {
        try {
          const recorder = mediaRecorder.current;
          recorder.resume()
          setPause(false)
          toast("mediaRecorder is resumed")
        } catch (error) {
          toast.error(error+ "resume")
        }
      }

      const handleUpload = async () => {
        try {
          const recorder = mediaRecorder.current;;
          const res = await fetch("/api/audioUpload",{
            method:"POST",
            headers: {"Content-Type": "application/json"},
            body:JSON.stringify(recorder,audioUrl),
          })
          const data = await res.json()
          console.log(data)
          
        } catch (error) {
          alert(error + "uploading error")
        }
      }

  return (
    <div>
        
     
      {!isRecording?(
        <div>
            <button onClick={()=>handleRecord()}>start Recording</button>
            <audio ref={audioRef} controls src={audioUrl} /> 
            <button onClick={()=>handleUpload()}>Upload</button>
        </div>
      ):(
        <div>
          {pause?(
            <button onClick={()=>handleResume()}>Resume reording</button>

          ): (
            <button onClick={()=>handlePause()}>Pause reording</button>

          )}
            <button onClick={()=>handleStopRecording()}>Stop Recording</button>
        </div>
      )}

      
    </div>
  )
}

export default AudioRcorder
