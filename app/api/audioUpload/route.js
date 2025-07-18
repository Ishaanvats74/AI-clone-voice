import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";


export async function POST(req) {
    const {userId} = await auth()
    const {audioUrl} = await req.json()
    const raw = {
        "key":process.env.MODELS_LAB_KEY,
        "name":userId,
        "init_audio": audioUrl,
        "language":"english",
    }
    try {
        console.log(audioUrl)
        const body = await req.json();
        console.log(body)

        const upload = await fetch("https://modelslab.com/api/v6/voice/voice_upload",raw).then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
        return NextResponse.json({message:"done"},{status:200})
    } catch (error) {
        return NextResponse.json({error:error},{status:500})
    }
    // var myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    
    // var raw = JSON.stringify({
    //     "key":process.env.MODELS_LAB_KEY,
    //     "name":"Jacob",
    //     "init_audio":"https://pub-f3505056e06f40d6990886c8e14102b2.r2.dev/audio/jacob.wav",
    //     "language":"english"
    // });
    
    // var requestOptions = {
    //     method: 'POST',
    //     headers: myHeaders,
    //     body: raw,
    //     redirect: 'follow'
    // };
    
    // fetch("https://modelslab.com/api/v6/voice/voice_upload", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
}