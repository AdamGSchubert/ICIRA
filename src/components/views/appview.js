import {useLocation, useNavigate, Link, Route, Routes, Outlet} from "react-router-dom"
import { Authorized } from "./authorized"
import {useEffect,useState} from "react"
import { UserProfile } from "../userpages/profile"
import { Typography,Grid,Paper } from "@mui/material"
import { ReportGenerator } from "../Reports/reportbuilder"
import { UserReportList } from "../Reports/userReports"
import { ReportView } from "../Reports/reportview"
import { EditReport} from "../Reports/editReport"






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
        <Grid container>

            <Typography>Welcome to Icira xyz</Typography>




        </Grid>
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