import React, { useState } from "react"


import { useNavigate,Link } from "react-router-dom"
import { FailedLoginModal } from "../modals/loginModal"


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

    return (
        
        <main className="container--login">
            <head><link rel="stylesheet" href="https://unpkg.com/@blaze/css@x.x.x/dist/blaze/blaze.css"></link></head>
            <section>
                <form className="o-container o-container--xsmall c-card u-high" onSubmit={handleLogin}>
                    <h1>I.C.I.R.A.</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail" className="o-form-element c-label"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control c-field c-field--label"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <label htmlFor="inputPassword" className="o-form-element c-label">Password</label>
                        <input type="password"
                            value={password}
                            onChange={evt=>setPass(evt.target.value)}
                            className="form-control c-field c-field--label"
                            placeholder="password"
                            required autoFocus></input>
                    </fieldset>
                    <fieldset>
                        <button type="submit" className="c-button c-button--block c-button--brand">
                            Sign in
                        </button>
                        <div className="forgotBox"><Link className="forgot_password" to="/forgotPassword">Forgot password?</Link></div>
                        <div><Link to="/register">Not a member yet?</Link></div>
                    </fieldset>
                   
                </form>
            </section>
            
        </main>
    )
}

