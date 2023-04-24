import {useLocation, useNavigate, Link, Route, Routes} from "react-router-dom"
import { Authorized } from "./authorized"
import {useEffect,useState} from "react"
import { UserProfile } from "../userpages/profile"
import '@blaze/atoms'


const iciraUser = localStorage.getItem("IciraUser")
const currentUser =JSON.parse(iciraUser)

const api= "http://localhost:8088"

export const AppView =()=>{

    const [user, setUser] = useState([])
    const navigate = useNavigate()
    //navigate("/login")
    useEffect(()=>{
        fetch(`${api}/IciraUsers/${currentUser.id}`)
        .then(response =>response.json())
        .then((data) => {
            setUser(data)
        })
    },[]
    )
    
    
    return <>
    
    
    <Routes>
        {/* <Route path="/myprofile" element={<UserProfile/>}/> */}
    </Routes>
    </>
}