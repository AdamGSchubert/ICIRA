import React, { useState } from "react"


import { useNavigate,Link } from "react-router-dom"
import { FailedLoginModal } from "../modals/loginModal"
import Button from '@mui/material/Button';
import { Box, Container, FormControl, FormGroup, Grid, Paper, TextField} from '@mui/material'
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import loginImage from "../imgs/login_img.jpg"
import LoginIcon from '@mui/icons-material/Login';
import '@fontsource/roboto/700.css';
import '@fontsource/roboto/700-italic.css'
import { ErrorReport } from "../ErrorHandle/errorHandles";

export const Login = () => {
    const [email, set] = useState("")
    const [password, setPass]=useState("")
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);
    const [failedLogin, setFailedLogin] =useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const onEnter =(e)=>{
        if(e.key ==='Enter'){
            handleLogin(e)
        }
    }

    const handleLogin = (e) => {
        e.preventDefault()

        

        return fetch(`http://localhost:8088/IciraUsers?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1 && foundUsers?.[0]?.cred === password) {
                    const user = foundUsers[0]
                    localStorage.setItem("IciraUser", JSON.stringify({
                        id: user.id,
                        admin: user.isAdmin
                    }))

                    navigate("/home")
                }
                else {
                    //window.alert("Invalid login")
                    console.log("invalid login")
                    setFailedLogin(true)
                    
                }
            })
    }

    return (<>

        <Box sx={{flexGrow:1}}>
        <Grid container  >
                <Grid item margin={"auto"} align="center">
                    <Typography variant="h2">I.C.I.R.A.</Typography>
                    </Grid>
                    </Grid>
        </Box>
        
        <Box className="Login_container" sx={{flexGrow:1}}>
        

            {/* <Grid container md={12} >
                <Grid item margin={"auto"} >
                    <Typography variant="h2">I.C.I.R.A.</Typography></Grid> */}
            <Grid container item md={12} >
            <Grid item md={8} align="center">
{/* md={8} */}
                <Grid item md={8} >
                    <Paper variant="outlined"  >
                        <Grid item align="center" paddingTop={2}>
                            <Typography  variant="h7">  ICIRA provides market research data based on US Government data.</Typography>
                        </Grid>

                        <Grid item margin={1} md={8} >
                            <img className="Login_Img" src={loginImage} style={{
                                height: "100%",
                                width: "100%"
                            }} />
                        </Grid>

                    </Paper>
                </Grid>
                </Grid>
                {/* lg={{ m: 1, width: "25ch" }}margin={"auto"} */}

                
{/* md={4} minHeight={"20%"} */}
                <Grid container item md={4} sx={{flexGrow:1}}>
                    <Paper variant="outlined" >
                            
                            <Grid item >
                                <Grid item align="center" paddingTop={2}>
                                <Typography  variant="h1" />Log In
                                </Grid>
                             
                             
                             <Grid item margin={2} > 
                                    {/* <FormControl variant="outlined" className="Login_form "sx={{width:4/4,height:2/4}} > */}
                                <FormGroup onSubmit={handleLogin} >
                                    <InputLabel htmlFor="outlined-email">
                                            Email Address
                                        </InputLabel>
                                    <OutlinedInput
                                        id="outlined-email"
                                        label="Email Address"
                                        name="email address"
                                        type="email"
                                        defaultValue={email}
                                        // helperText="example JohnDoe@email.com"
                                        onChange={evt => set(evt.target.value)}
                                        required
                                    />
                                    <br/>

                                    {/* <FormControl > */}
                                        <InputLabel htmlFor="outlined-adornment-password">
                                            Password
                                        </InputLabel>
                                        <OutlinedInput
                                            id="outlined-adornment-password"
                                            type={showPassword ? "text" : "password"}
                                            onChange={evt => setPass(evt.target.value)}
                                            onKeyUp={evt => onEnter(evt)}
                                            endAdornment={
                                                <InputAdornment position="end">
                                                    <IconButton
                                                        aria-label="toggle password visibility"
                                                        onClick={handleClickShowPassword}
                                                        onMouseDown={handleMouseDownPassword}
                                                        edge="end"
                                                    >
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment>
                                            }
                                            label="Password"
                                        />
                                        <ErrorReport loginPass={failedLogin}/>
                                    {/* </FormControl> */}
                                    <Grid item marginTop={3}  >
                                    <Button  variant="contained" fullWidth onClick={(e) => handleLogin(e)} endIcon={<LoginIcon />}>
                                        Sign in
                                    </Button>
                                    </Grid>
                                    <Grid align="center" className="forgotBox" >
                                        <Link className="forgot_password" to="/forgotPassword">Forgot password?</Link>
                                        </Grid>
                                    <Grid align="center"  >
                                        <Link to="/register">Not a member yet?</Link>
                                        </Grid>

                                </FormGroup>

                            {/* </FormControl> */}
                            </Grid> 
                            </Grid>
                             
                        </Paper>
                        
                    </Grid>
                



                <Grid item md={12} marginTop={"1rem"} align="center">
                    <Paper>
                    <Typography>Industry Analyitic Data is provided via US Government Bureau of Economic Analysis.</Typography>
                    <Typography>The Bureau of Economic Analysis (BEA) is a branch of the US Government Department of Commerce.</Typography>
                    </Paper>
                </Grid>
                </Grid>
        </Box>
        </>
    )
}

