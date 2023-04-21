import { Navigate } from "react-router-dom"
import { useEffect, useState } from "react"


export const RecoverPassword =()=>{

    const [userEmail, setUserEmail]= useState({})
    



    const recover =(e)=>{
        e.preventDefault()
        console.log("test button")


    }


     return<>
     <fieldset>
                    <label htmlFor="email"> Enter your Email address </label>
                    <input onChange={(evt)=>{setUserEmail(evt.target.value)}}
                        type="email" id="email" className="form-control"
                        placeholder="Email address" required />
                </fieldset>
                <button type="submit" onClick={(e)=>{recover(e)}}>
                            recover password
                        </button>
     
     </>
}