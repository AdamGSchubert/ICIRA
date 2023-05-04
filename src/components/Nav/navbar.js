import { Link, useNavigate} from "react-router-dom"
import { useState,useEffect } from "react"



export const NavBar=()=>{
    const iciraUser = localStorage.getItem("IciraUser")
const currentUser =JSON.parse(iciraUser)
const api ="http://localhost:8088"
 
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
        <ul className="c-list c-list--inline c-list--unstyled navbar">
            
            <li className="c-list__item">
                <Link className="builder" to="/builder"> Report Builder</Link>
            </li><li className="c-list__item">
                <Link className="userReports" to="myreports"> My Reports</Link>
            </li>
            <li className="c-list__item"><h2>Welcome {user.fullName}</h2></li>
            <li className="c-list__item">
                <Link className="Profile" to="/myprofile"> My Profile</Link>
            </li>
        </ul></>
    
    




}