import { useState,useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import SecretKeys from "../../Secrets/SecretKeys";
import { PreviewReport } from "./previewReport";

export const ReportView =()=>{
    const { reportId }=useParams()
    
    const iciraUser = localStorage.getItem("IciraUser")
    const currentUser =JSON.parse(iciraUser)
    const api ="http://localhost:8088"
    const beaAPI = "https://apps.bea.gov/api/data?" 
    const beaKey =SecretKeys.bea
    const navigate = useNavigate()

    const [report, setReport] = useState({})
    const [reportData, setReportData]=useState()
    const [naicsObj, setNaicsObj]=useState({})


    useEffect(()=>{
        fetch(`${api}/reports?id=${reportId}`)
        .then(response =>response.json())
        .then((data) => {
            setReport(data)
        })
    },[])

    useEffect(()=>{
        fetch(`${beaAPI}UserID=${beaKey}&method=GetData&DataSetName=GDPbyIndustry&frequency=${report?.[0]?.reportFreq}&Industry=${naicsObj?.[0]?.naicsCode}&TableID=6&Year=${report?.[0]?.reportYear}`)
        .then(response =>response.json())
        .then((data) => {
            setReportData(data)
        })

    },
    [naicsObj])
    useEffect(()=>{
        fetch(`${api}/naicsTable?id=${report?.[0]?.naicsTableId}`)
        .then(response =>response.json())
        .then((data) => {
            setNaicsObj(data)
        })
    },
    [report])

    // const getNaicsCode =()=>{
    //     report.
    // }

    return <>
    <h1>report viewer</h1>
    <PreviewReport PreviewData={reportData} userTitle={report?.[0]?.reportTitle} selectedYear={report?.[0]?.reportYear} industryDescript={naicsObj?.[0]} frequency={report?.[0]?.reportFreq} reportID={reportId}/>
    
    
    
    </>
}