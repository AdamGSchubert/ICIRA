import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

export const UserProfile =()=>{
    const iciraUser = localStorage.getItem("IciraUser")
    const currentUser =JSON.parse(iciraUser)
    const api ="http://localhost:8088"
    const navigate =useNavigate()

    const [name, setName]= useState()
    const [password, updatePassword]=useState()


    const logOut=()=>{
    navigate("/login")
        localStorage.removeItem("IciraUser")
    ;}




    
    return <><Box>
        <Grid container>

        <Typography variant="h1">Welcome to your Profile</Typography>

        <Button variant="contained" color="error"onClick={() => {logOut() }} endIcon={<LogoutIcon/>}>log Out</Button>
    </Grid>
    </Box>
    
</>

}