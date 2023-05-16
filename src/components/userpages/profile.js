import { useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { Button, Typography,Box,Grid,TextField, Stack, Paper, Container} from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';
import { theme } from "../themes/theme";
import { ThemeProvider } from "@emotion/react";
import { ErrorReport } from "../ErrorHandle/errorHandles";

 
export const UserProfile =()=>{
    const iciraUser = localStorage.getItem("IciraUser")
    const currentUser =JSON.parse(iciraUser)
    const api ="http://localhost:8088"
    const navigate =useNavigate()

    const [name, setName]= useState({
        fullName:""
    })
    const [updatedName, setUpdatedName]=useState({})
    const [password, updatePassword]=useState()
    const [password2, updatePassword2]=useState()
    
    const [cred, updateCred]=useState()
    const [user, setUser]=useState({})
    
    const [error, setError]=useState("")


useEffect(()=>{
    fetch(`${api}/IciraUsers/${currentUser.id}`)
    .then(response =>response.json())
    .then((data) => {setUser(data)})
},[updatedName])



const LogOut=()=>{
const navigate =useNavigate()

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
       if(name.fullName!==""){return fetch(`${api}/IciraUsers/${currentUser.id}`,{
            method: "PATCH",
            headers: {
            "Content-Type":"application/json"
             },
              body: JSON.stringify(name)
                })
                   .then(res=>res.json())
                           .then((data)=>setUpdatedName(data)
                            
                           
                                   )}else{
                                    setError("blank")
                                   }
        
                                   
                                   
                                   
    }


    

    const passwordCheck =()=>{
        if(password === password2){
            updateCred(password2)
        }
        else{
            const mismatch = "passwords dont match"
            setError(mismatch)

        }

    }


    
    return <><ThemeProvider theme={{ theme }}><Box>
        <Grid container columns={2}>
            <Grid item xs={12} align="center">
                <Typography variant="h2">Welcome to your Profile</Typography>
            </Grid>
        </Grid>


        <Container>
        <Paper variant="outlined">
            <Grid container md={12}>

                <Grid item padding={5} md={6} align={"center"} margin={"auto"}>
                <Grid item padding={2} align="center">
                            <Typography variant="h4">Update Your Details</Typography>
                        </Grid>
                    <Stack>
                        <Grid item padding={2}>
                            <TextField fullWidth id="outlined-basic" label="Full Name" variant="outlined" onChange={(evt) => { updateName(evt.target.value) }} />
                        </Grid>
                        {/* <Grid item padding={2}>
                            <TextField fullWidth id="outlined-basic" label="Full Name" variant="outlined" onChange={(evt) => { updateName(evt.target.value) }} />
                        </Grid> */}
                        <Grid item padding={2}>
                            <Button fullWidth variant="contained" color="primary" onClick={() => { updateUserName() }} endIcon={<LogoutIcon />}>Update Name</Button>
                        </Grid>
                        <Grid item>
                            <ErrorReport username={error}/>
                        </Grid>
                        {/* <Grid item padding={2}>
                            <TextField fullWidth id="outlined-basic" label="Password" variant="outlined" onChange={(evt) => { updatePassword(evt.target.value) }} />
                        </Grid>
                        <Grid item padding={2}>
                            <TextField fullWidth id="outlined-basic" label="Confirm Password" variant="outlined" onChange={(evt) => { updatePassword2(evt.target.value) }} />
                        </Grid>
                        <Grid item padding={2}>
                            <Button fullWidth variant="contained" color="primary" onClick={() => { }} endIcon={<LogoutIcon />}>Update Password</Button>
                        </Grid> */}
                        {/* <Grid item padding={2}>
                            <Button fullWidth variant="contained" color="error" onClick={() => { LogOut() }} endIcon={<LogoutIcon />}>log Out</Button>
                        </Grid> */}
                    </Stack>
                </Grid>
                <Grid item padding={5} md={6} align={"center"} margin={"auto"}>
                <Grid item padding={2} align="center">
                            <Typography variant="h4">Your Current Details</Typography>
                        </Grid>
                        <Grid item padding={2}>
                        <Typography>{user?.fullName} </Typography>
                        </Grid>
                        
                </Grid>
            </Grid>
        </Paper>
        </Container>   




        {/* </Grid> */}

    </Box>
    </ThemeProvider>
</>

}