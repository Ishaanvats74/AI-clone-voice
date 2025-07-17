'use client'
import { useAuth } from "@clerk/clerk-react";
import { SignedIn } from "@clerk/nextjs";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function Home() {
  const [firstTime,setFirstTime] = useState(true);
  const router = useRouter()
  const { isSignedIn } = useAuth() 
  if(isSignedIn === false){
    router.push("/sign-in")
  } 
  const handleYes = async () => {
    router.push('/recordvoice')
    
  }
  const handleNo = async () => {
    router.push('/')
  }
  return (
   <div>
      {firstTime&&(
        <div>
          <p>First Time Login</p>
          <form>
            <button onClick={handleYes()}>Yes</button>
            <button onClick={handleNo()}>No</button>
          </form>
        </div>
      )}
   </div>
  );
}
