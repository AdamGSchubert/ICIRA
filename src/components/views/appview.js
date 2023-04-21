import {useLocation, useNavigate, Link} from "react-router-dom"
import { Authorized } from "./authorized"
import {useEffect,useState} from "react"
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

    // useEffect(
    //     ()=>{
            

    //     },
    //     [users]
    // )
    function nav(){
        navigate("/login");
    }

    return <>
    <h1>Welcome {user.fullName
            
    
    }</h1>
    {
                /*localStorage.getItem("IciraUser")
                    ? <li className="navbar__item navbar__logout">
                        <Link className="navbar__link" to="" onClick={() => {
                            localStorage.removeItem("IciraUser")
                            navigate("/", {replace: true})
                        }}>Logout</Link>
                    </li>
                    : ""*/
            }
            
    <button onClick={() => {nav()}}>log Out</button>
    </>
}