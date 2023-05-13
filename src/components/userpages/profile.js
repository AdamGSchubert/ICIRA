import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { Button, Typography,Box,Grid,TextField } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { theme } from "../themes/theme";
import { ThemeProvider } from "@emotion/react";


export const UserProfile =()=>{
    const iciraUser = localStorage.getItem("IciraUser")
    const currentUser =JSON.parse(iciraUser)
    const api ="http://localhost:8088"
    const navigate =useNavigate()

    const [name, setName]= useState({
        fullName:""
    })
    const [password, updatePassword]=useState()
    const [password2, updatePassword2]=useState()
    const [cred, updateCred]=useState()


    const logOut=()=>{
    navigate("/login")
        localStorage.removeItem("IciraUser")
    ;}
const updateName =(name)=>{
        const xyz={
            fullName: name
        }
        setName(xyz)
    }
    const updateUserName =()=>{
        return fetch('${api}/IciraUsers/${currentUser.id}',{
            method: "PATCH",
            headers: {
            "Content-Type":"application/json"
             },
              body: JSON.stringify(name)
                })
                   .then(res=>res.json())
                           .then(()=>{
                            console.log("user Updated")
                           }
                                   )
    }


    

    const passwordCheck =()=>{
        if(password === password2){
            updateCred(password2)
        }
        else{

        }

    }


    
    return <><ThemeProvider theme={{theme}}><Box>
        <Grid container columns={2}>
            <Grid item xs={12}>
                <Typography variant="h2">Welcome to your Profile</Typography>
                </Grid>

        
            <Grid item>
                <Button variant="contained" color="error"onClick={() => {logOut() }} endIcon={<LogoutIcon/>}>log Out</Button>
                </Grid>
        
        <Grid item>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(evt)=>{updateName(evt.target.value)}}/>
            <Button variant="contained" color="primary" onClick={() => {updateUserName()}} endIcon={<LogoutIcon/>}>Update Name</Button>
            <TextField id="outlined-basic" label="Password" variant="outlined" onChange={(evt)=>{updatePassword(evt.target.value)}}/>
            <TextField id="outlined-basic" label="Confirm Password" variant="outlined" onChange={(evt)=>{updatePassword2(evt.target.value)}}/>
            <Button variant="contained" color="primary" onClick={() => {}} endIcon={<LogoutIcon/>}>Update Password</Button>
            




        </Grid>
    </Grid>
    </Box>
    </ThemeProvider>
</>

}