import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export const UserProfile =()=>{
    const navigate =useNavigate()
    function nav(){
    navigate("/login")
        localStorage.removeItem("IciraUser")
    ;}




    
    return <>
    <h1>this is the user profile page</h1>
 <Button variant="contained" color="error"onClick={() => {nav() }} endIcon={<LogoutIcon/>}>log Out</Button></>



}