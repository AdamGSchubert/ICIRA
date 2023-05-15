import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SecretKeys from "../../Secrets/SecretKeys";
import { PreviewReport } from "./previewReport";
import { ReportGenerator } from "./reportbuilder"; 
import { Grid, Typography } from "@mui/material";


export const EditReport =()=>{
    const { reportId }=useParams()
    const iciraUser = localStorage.getItem("IciraUser")
    const currentUser =JSON.parse(iciraUser)
    const api ="http://localhost:8088"
    const beaAPI = "https://apps.bea.gov/api/data?" 
    const beaKey =SecretKeys.bea
    const navigate = useNavigate()

    const [editReport, setEditReport]=useState(null)

    useEffect(()=>{
        fetch(`${api}/reports?id=${reportId}`)
        .then(response =>response.json())
        .then((data) => {
            setEditReport(data)
        })
    },[reportId])
//{editReport ? <ReportGenerator editData={editReport} reportIdentify={reportId}/> :""}
return <><Grid margin="auto">
    <Grid item align="center">
    <Typography variant="h2">Edit Selected Report</Typography>
    </Grid>
    <Grid item  >
        <ReportGenerator editData={editReport} reportIdentify={reportId}/>
        </Grid>
    
    </Grid>


</>

}