import { useNavigate } from "react-router-dom";

export const UserProfile =()=>{
    const navigate =useNavigate()
    function nav(){
    navigate("/login")
        localStorage.removeItem("IciraUser")
    ;}




    
    return <>
    <h1>this is the user profile page</h1>
 <button onClick={() => {nav() }}>log Out</button></>



}