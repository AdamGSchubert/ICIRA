import React, { useState } from "react"


import { useNavigate,Link } from "react-router-dom"
import { FailedLoginModal } from "../modals/loginModal"
import TextField from '@mui/material/TextField';
import { Button, Box, Container, FormControl } from "@mui/material";


export const Login = () => {
    const [email, set] = useState("")
    const [password, setPass]=useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        

        return fetch(`http://localhost:8088/IciraUsers?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1 && foundUsers?.[0]?.cred === password) {
                    const user = foundUsers[0]
                    localStorage.setItem("IciraUser", JSON.stringify({
                        id: user.id,
                        admin: user.isAdmin
                    }))

                    navigate("/")
                }
                else {
                    //window.alert("Invalid login")
                    console.log("invalid login")
                    return <><FailedLoginModal/></>
                    
                }
            })
    }
//<label htmlFor="inputEmail" className="o-form-element c-label"> Email address </label> <label htmlFor="inputPassword" className="o-form-element c-label">Password</label>
    return (
        
        <Container >
                <FormControl className="o-container o-container--xsmall c-card u-high" >
                    <h1>I.C.I.R.A.</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        
                        <TextField type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className=" c-field c-field--label"
                            label="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        
                        <TextField type="password"
                            value={password}
                            onChange={evt=>setPass(evt.target.value)}
                            
                            label="password"
                            required autoFocus></TextField>
                    </fieldset>
                    <fieldset>
                        <Button sx={{backgroundColor:"gray",
                        color:"black"}} 
                        onClick={(e)=>{handleLogin(e)}} className="c-button c-button--brand">
                            Sign in
                        </Button>
                        <div className="forgotBox"><Link className="forgot_password" to="/forgotPassword">Forgot password?</Link></div>
                        <div><Link to="/register">Not a member yet?</Link></div>
                    </fieldset>
                   
                </FormControl>
        </Container>
    )
}

