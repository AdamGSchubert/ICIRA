import React from "react"
import { useState, useEffect } from "react"



export const ErrorReport=({dataCheck})=>{
    const [errorText,setError]=useState("")
    
    useEffect(()=>{
        if(dataCheck?.BEAAPI?.Error){
            console.log("error occured")
            setError("error occured please adjust query.") 
        }else{
            setError("")
        }
    },[dataCheck])

    return <>
        <div className="error">
            <p className="errorDesc">{errorText}</p></div>
    
    
    </>
}