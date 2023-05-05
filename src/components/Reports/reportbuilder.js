import { useEffect,useState } from "react";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import SecretKeys from "../../Secrets/SecretKeys";
import { blue, green } from "@mui/material/colors";
import { ErrorReport, reportError } from "../ErrorHandle/errorHandles";
import { PreviewReport } from "./previewReport";
import { Box, Grid,Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send'



export const ReportGenerator =({reportIdentify, editData})=>{

    

   const beaKey =SecretKeys.bea
    const jsonApi = "http://localhost:8088"
    const beaAPI = "https://apps.bea.gov/api/data?" 
    const currentYear = ( new Date()).getFullYear()
    const [frequency, setFrequency]=useState("a,q")
    
        
    const [reportYear, setReportYr]=useState(currentYear)
    const [industryCodes,setIndusties]=useState([])

    

    const [searchIndustry, setSearchIndustry]=useState(null)
    
    const [reportTitle, setReportTitle]=useState("")
     const [buttonclick, setButton]=useState(false)
    const [reportData, setReportData]= useState({})
    const [hasError, setError]= useState(false)
    

const beaApi =()=>{
        return fetch(`${beaAPI}UserID=${beaKey}&method=GetData&DataSetName=GDPbyIndustry&frequency=${frequency}&Industry=${searchIndustry?.naicsCode}&TableID=6&Year=${reportYear} `)
            .then(response =>response.json())
            .then((data) => {
                setReportData(data)
            })
    }
    
   //use effects block 
    useEffect(// grabs all industries
        ()=>{
            fetch(`${jsonApi}/naicsTable`)
            .then(response =>response.json())
            .then((data) => {
                setIndusties(data)
            })
        },
        []
    )
    
    // useEffect(
    //     ()=>{
    //         setError(true)
    //         // beaApi()

    //     },
    //     [buttonclick]

    // )
    useEffect(
        ()=>{
            const beginningYear = 1997

        for (let i = currentYear; i >= beginningYear; i--){
            var option =document.createElement("OPTION")
            option.innerHTML = i
            option.value= i
            let ddlYears=document.getElementById("reportYear")
            const selectYear =(<option value="select a year" placeholder="select a year"></option>)
            // ddlYears.appendChild(selectYear)
            ddlYears.appendChild(option)
    }
    },
    []
    ) 
    

    //any functions block
    const clearAndReset =(e)=>{
        const clearobj={}
        setSearchIndustry(null)
        setReportData(clearobj)
        setButton(false)
        setReportTitle("")
        setFrequency("a,q")
        setReportYr(currentYear)
        // setAFrequencyChecked(false)
        

    }

    

    const errorHandle =(e)=>{
        e.preventDefault()
        setButton(true)
        beaApi()

        
    }
    

/// edit function area 
useEffect(()=>{
    if(editData){
        setSearchIndustry(industryCodes.find(naicsObj => naicsObj.id === editData?.[0]?.naicsTableId))
    }
},[industryCodes, editData])

const reportPull =()=>{
    setButton(true)
    beaApi()

}
useEffect(()=>{
    if(editData){
        setFrequency(editData?.[0]?.reportFreq)
    setReportYr(editData?.[0]?.reportYear)
    setReportTitle(editData?.[0].reportTitle)
   } 
   
    
},[editData])

useEffect(()=>{
    if(searchIndustry){
        reportPull()
    }
},[searchIndustry])
   
    //console.log(searchIndustry)
    return<Box sx={{flexGrow:1}}>
    
        <Grid columns={2} className="QuerySelect">
            <ul className="queryBuilder"> 
                <li className="industryAutoComplete">
                    <Autocomplete
                    disablePortal
                    id="industryAuto"
                    options={industryCodes}
                    getOptionLabel={(option)=>option.naicsTitle}
                    // defaultValue={""}
                     value={searchIndustry}
                    sx={{width:400, height:50}}
                     //isOptionEqualToValue={(option, value)=> option===value}
                    renderInput={(params)=><TextField {...params} label="industries" variant="outlined"/>   } 
                    onChange={(event,value)=>{setSearchIndustry(value)}}/>
                </li>

                <li className="testing">
                    <label htmlFor="reportYear">select a report year</label>
                    <select id="reportYear"  placeholder={currentYear} value={reportYear} onChange={ (e)=> {setReportYr(e.nativeEvent.target.selectedOptions[0].innerText)}}>
                        </select>       
                    </li>
                <li >
                    <label htmlFor="reportFrequency">select frequency for the report</label>
                    <ul>
                    <li><input type="radio" 
                    name="reportFrequency" 
                    value="a" 
                    checked={frequency==="a"}
                    onChange={(rep)=>setFrequency(rep.target.value)}/>Annual</li>
                    <li><input type="radio" 
                    name="reportFrequency" 
                    value="q"
                    checked={frequency === "q"}
                    onChange={(rep)=>setFrequency(rep.target.value)}/>Quarterly (data began publication in 2005)
                    </li>
                    <li><input type="radio" 
                    name="reportFrequency" 
                    value="a,q"
                    // checked={frequency === "a,q"}
                    checked
                    
                    onChange={(rep)=>setFrequency(rep.target.value)}/>Annual and Quarterly (returns Annual if no Quarterly)</li>
                    </ul>
                </li>
                <li>
                    <label htmlFor="reportName" >Enter Desired Report Title</label>
                    
                    <input type="text" id="reportName"  value={reportTitle} onChange={(text)=>{setReportTitle(text.target.value)}}/>
                    
                </li>
                <li>{
                    editData 
                    ?""//reportPull()
            

                    :<><Button variant="outlined" endIcon={<SendIcon /> }onClick={(e)=>{errorHandle(e)}}>Generate Report</Button>
                        <Button variant="outlined" onClick={()=>{clearAndReset()}}>New Report</Button></>
                    
                    }
                    
                </li>
            </ul>
            <ErrorReport dataCheck={reportData}/>
        </Grid>   
        
        <Grid container>
        <h1>Report Preview </h1>
        <PreviewReport PreviewData={reportData} userTitle={reportTitle} selectedYear={reportYear} industryDescript={searchIndustry} frequency={frequency} reportIdentity={reportIdentify}/>
        </Grid>
    
    </Box>
    
}