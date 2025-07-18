'use client'
import { useAuth } from "@clerk/clerk-react";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const [firstTime,setFirstTime] = useState(true);
  const router = useRouter()
  const { isSignedIn } = useAuth() 

  if(isSignedIn === false){
    router.push("/sign-in")
  } 
  const handleYes =  () => {
      console.log("hi")
      router.push('/recordvoice')
  }
  const handleNo = async () => {
    router.push('/ChatBot')
  }
  return (
   <div>
      {firstTime&&(
        <div>
          <p>First Time Login</p>
            <button onClick={()=>handleYes()}>Yes</button>
            <button onClick={()=>handleNo()}>No</button>
        </div>
      )}
   </div>
  );
}
