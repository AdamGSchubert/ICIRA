import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import '@blaze/atoms'

export const Register = (props) => {
    const [user, setUser] = useState({
        email: "",
        fullName: "",
        cred:"",
        isAdmin: false
    })
    let navigate = useNavigate()

    const registerNewUser = () => {
        return fetch("http://localhost:8088/IciraUsers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(res => res.json())
            .then(createdUser => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem("iciraUser", JSON.stringify({
                        id: createdUser.id,
                        admin: createdUser.isAdmin
                    }))
                    navigate("/login")
                    
                }
            })
    }

    const handleRegister = (e) => {
        e.preventDefault()
        return fetch(`http://localhost:8088/IciraUsers?email=${user.email}`)
            .then(res => res.json())
            .then(response => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists")
                }
                else {
                    // Good email, create user.
                    registerNewUser()
                }
            })
    }

    const updateUser = (evt) => {
        const copy = {...user}
        copy[evt.target.id] = evt.target.value
        setUser(copy)
    }

    // const pwValidate =(evt, exy)=>{
    //     const pwOne = evt.target.value
    //     const pwTwo =exy.target.value

    //     if(pwOne ===pwTwo){

    //         updateUser(pwOne)
    //     }
    //     else{
    //         console.log("passwords dont match")
    //     }
        
    // }

    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={(e)=>{handleRegister(e)}} >                <h1 className="h3 mb-3 font-weight-normal">Register for I.C.I.R.A to begin building reports</h1>
                <fieldset>
                    <label htmlFor="fullName"> Full Name </label>
                    <input 
                    onChange={updateUser}
                    value={user.fullName}      
                    type="text" 
                    id="fullName" 
                    className="form-control"
                    placeholder="Enter your name" 
                    required 
                    autoFocus />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input 
                    onChange={updateUser}
                    value={user.email}
                    type="email" 
                    id="email" 
                    className="form-control"
                    placeholder="Email address" 
                    required />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">Create a Password</label>
                    <input onChange={updateUser}
                    value={user.cred}
                    type={"password"} id="cred" className="form-control"
                    placeholder="password" required/>

                </fieldset>
                <fieldset>
                    <input onChange={(evt) => {
                        const copy = {...user}
                        copy.isAdmin = evt.target.checked
                        setUser(copy)
                    }}
                        type="checkbox" 
                        id="isAdmin" 
                        value={user.isAdmin}/>
                    <label htmlFor="isAdmin"> Request to be an Admin </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    )
}

