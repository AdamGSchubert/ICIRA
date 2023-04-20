import { Navigate, useLocation, useNavigate} from "react-router-dom"
import { Authorized } from "./authorized"
import {useEffect,useState} from "react"

const iciraUser = localStorage.getItem("IciraUser")
const currentUser =JSON.parse(iciraUser)

const api= "http://localhost:8088"

export const AppView =()=>{

    const [users, setUsers] = useState([])
    const navigate= useNavigate()
    
    useEffect(()=>{
        fetch(`${api}/IciraUsers`)
        .then(response =>response.json())
        .then((data) => {
            setUsers(data)
        })
    },[]
    )

    useEffect(
        ()=>{
            

        },
        [users]
    )


    return <>
    <h1>Welcome {
            users.map(
            (user)=>{
                if(user.id === currentUser.id){
                    return user.fullName
                }
            }
            )
    
    }</h1>
            
    <button onClick={navigate("/login")}>log Out</button>
    </>
}