import {useLocation, useNavigate, Link, Route, Routes, Outlet} from "react-router-dom"
import { Authorized } from "./authorized"
import {useEffect,useState} from "react"
import { UserProfile } from "../userpages/profile"
import { Typography,Grid,Paper,Box,Stack } from "@mui/material"
import { ReportGenerator } from "../Reports/reportbuilder"
import { UserReportList } from "../Reports/userReports"
import { ReportView } from "../Reports/reportview"
import { EditReport} from "../Reports/editReport"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';






export const AppView =()=>{
const api= "http://localhost:8088"
    
   
const iciraUser = localStorage.getItem("IciraUser")
 const currentUser =JSON.parse(iciraUser)
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
 
 
    return (
    <Routes>
        <Route path="home" element={<>
        <Box>
        <Grid container>
                <Grid item margin={"auto"} align="center">
                    <Typography variant="h1">Welcome to ICIRA </Typography>
                </Grid>
        </Grid>
        <Grid container margin={"auto"}>
        <Grid item md={10} margin={"auto"} paddingBottom={2}>
                    <Paper>
                    <Typography variant="body1" padding={1} >Below is an example of the step by step process for Using ICIRA </Typography>
                    <Typography variant="body1" padding={1}>ICIRA can provide a large amount of informational data back and be usefull for a multituted of projects </Typography>
                    </Paper>
                </Grid>
            
        <Grid item md={10} margin={"auto"} >
            
            
            <Stack direction="row">
                <Grid item margin={"auto"} minHeight={117}>
                    <Paper>
                        <Stack padding={2}>
                            <Grid item>
                    <Typography align="center">Step 1</Typography>
                    </Grid>
                    <Grid item margin={3}>
                    <Typography variant="body2">Sign Up for an ICIRA Account</Typography>
                    
                    </Grid>
                    </Stack>
                    </Paper>
                </Grid>
                <Grid item margin={"auto"} >
                <ArrowForwardIosIcon/>
                </Grid>
                <Grid item margin={"auto"} >
                    <Paper>
                    <Stack padding={2} minHeight={117}>
                            <Grid item>
                    <Typography align="center">Step 2</Typography>
                    </Grid>
                    <Grid item  align="center" margin={2}>
                    <Typography variant="body2">Determine what industry or </Typography>
                    <Typography variant="body2">field you want finacial information about.</Typography>
                    </Grid>
                    </Stack>
                    </Paper>
                </Grid>
                <Grid item margin={"auto"} >
                <ArrowForwardIosIcon/>
                </Grid>
                <Grid item margin={"auto"} minHeight={117}>
                    <Paper>
                    <Stack padding={2}>
                <Grid item>
                    <Typography align="center">Step 3</Typography>
                </Grid>
                <Grid item margin={2}>
                <Typography variant="body2">Head over to the Report Builder</Typography>
                
                <Typography variant="body2">Build and generate your Report.</Typography>
                </Grid>
                </Stack>
                </Paper>
                </Grid>
                <Grid item margin={"auto"} >
                <ArrowForwardIosIcon/>
                </Grid>
                <Grid item margin={"auto"} minHeight={117}>
                    <Paper>
                    <Stack padding={2}>
                <Grid item>
                    <Typography align="center">Step 4</Typography>
                </Grid>
                <Grid item margin={3}>
                <Typography variant="body2" align="center">Save your report!</Typography>
                </Grid>
                </Stack>
                </Paper>
                </Grid>
                <Grid item margin={"auto"} >
                <ArrowForwardIosIcon/>
                </Grid>
                <Grid item margin={"auto"} minHeight={117}>
                    <Paper>
                    <Stack padding={2}>
                <Grid item>
                    <Typography align="center">Step 5</Typography>
                </Grid>
                <Grid item>
                <Typography variant="body2" align="center">View, Delete, or Export </Typography>
                <Typography variant="body2" align="center">Use your report anywhere you need it</Typography>
                <br/>
                </Grid>
                </Stack>
                </Paper>
                </Grid>
                

            </Stack>
            </Grid>
            {/* </Paper> */}
            
            
            </Grid> 

        
        </Box>
            <Outlet/>
        </>
    }>

    </Route>
    
        <Route path="/myprofile" element={<UserProfile/>}/>
        <Route path="/builder" element={<ReportGenerator/>}/>
        <Route path="/myreports" element={<UserReportList/>}/>
        <Route path="myreports/:reportId" element={<ReportView/>}/>
        <Route path="editreport/:reportId" element={<EditReport/>}/>

    </Routes>)
}