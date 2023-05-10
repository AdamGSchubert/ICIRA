import React, { useState } from "react"


import { useNavigate,Link } from "react-router-dom"
import { FailedLoginModal } from "../modals/loginModal"
import Button from '@mui/material/Button';
import { Box, Container, FormControl, FormGroup, Grid, TextField} from '@mui/material'
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

export const Login = () => {
    const [email, set] = useState("")
    const [password, setPass]=useState("")
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

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

                    navigate("/")
                }
                else {
                    //window.alert("Invalid login")
                    console.log("invalid login")
                    return <><FailedLoginModal/></>
                    
                }
            })
    }

    return (
        
        <Box className="Login_container" sx={{flexGrow:1}}> 
            <Grid container spacing={1} >
                    <Grid item margin={"auto"} sx={{ width: '100%', maxWidth: 500}}>
                    <Typography variant="h2">I.C.I.R.A.</Typography></Grid>
                </Grid>
            <Grid container spacing={3}>
             <Grid item md={8}>
                
                <Grid item margin={"auto"} md={5}>
                    <Typography variant="h7">  ICIRA provides market research data based on US Government data.</Typography>
                </Grid>
                
                <Grid item margin={"auto"} md={8} >
                        <img className="Login_Img" src={loginImage}  style={{
                        height: "100%",
                        width: "100%"
                    }}/>
                    </Grid>
                    
                
                </Grid>
                
                <Box margin={"auto"} md={4}>
                    <Grid item xs={"auto"}>
                        <FormControl className="Login_form "  >
                        <FormGroup onSubmit={handleLogin}>
                        <Typography variant="h1"/>Log In{/* <label htmlFor="inputEmail" className="o-form-element c-label"> Email Address </label> */}
                        {/* <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className=" c-field c-field--label"
                            placeholder="Email address"
                            required autoFocus /> */}
                            
                            <TextField
                            label="Email Address"
                            name="email address"
                            type="email"
                            defaultValue={email}
                            helperText="example JohnDoe@email.com"
                            onChange={evt => set(evt.target.value)}
                            required
                            />
                    
                        {/* <label htmlFor="inputPassword" className="o-form-element c-label">Password</label>
                        <input type="password"
                            value={password}
                            onChange={evt=>setPass(evt.target.value)}
                            className=" c-field c-field--label"
                            placeholder="password"
                            required autoFocus></input> */}
                            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">
            Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? "text" : "password"}
            onChange={evt=>setPass(evt.target.value)}
            onKeyUp={evt=>onEnter(evt)}
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
        </FormControl>
                            
                            {/* <TextField
                            id="outlined-adornment-password"
                             label="Password"
                             sx={{ m: 1, width: '25ch' }}
                            type={showPassword ? 'text' : 'password'}
                            //defaultValue={password}
                            
                            onChange={evt => setPass(evt.target.value)}
                            inputProps={<InputAdornment position="start">kg</InputAdornment>
                                  }
                            />
                            {/*<InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment> <OutlinedInput
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
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
                              name="Pasdword"
                              onChange={evt => setPass(evt.target.value)}
                              required
                            /> */} 
                            



                            
                   
                    
                        <Button  variant="contained" onClick={(e)=>handleLogin(e)} endIcon={<LoginIcon/>}>
                            Sign in
                        </Button>
                        <div className="forgotBox"><Link className="forgot_password" to="/forgotPassword">Forgot password?</Link></div>
                        <div><Link to="/register">Not a member yet?</Link></div>
                    </FormGroup>
                   
                </FormControl>
                </Grid>
                
                </Box>
            <Grid item md={6}>
                        <p>this is description of stuff</p>
                    </Grid>
            </Grid>
                
                
            
            
        </Box>
    )
}

