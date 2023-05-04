import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SecretKeys from "../../Secrets/SecretKeys";
import { PreviewReport } from "./previewReport";
import { ReportGenerator } from "./reportbuilder"; 


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
return <>
    <h1>edit this report</h1>
   <ReportGenerator editData={editReport} reportIdentify={reportId}/> 
    


</>

}