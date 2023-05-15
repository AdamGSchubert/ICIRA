import { Typography } from "@mui/material"
import { red } from "@mui/material/colors"
import React from "react"
import { useState, useEffect } from "react"



export const ErrorReport=({dataCheck, username, loginPass})=>{
    const [errorText,setError]=useState("")
    
    useEffect(()=>{
        if(dataCheck?.BEAAPI?.Error){
            // console.log("error occured")
            setError("error occured please adjust query.") 
        }else{
            setError("")
        }
    },[dataCheck])


    useEffect(()=>{
        if(username==="blank"){
            setError("Please enter a Name in the field")


        }else{setError("")}


    },[username])



    useEffect(()=>{
        if(loginPass){
            setError("Your Password or Email is Incorrect.")


        }else{setError("")}


    },[loginPass])

    return <>
        
            <Typography color={"red"} className="errorDesc">{errorText}</Typography>
    
    
    </>
}