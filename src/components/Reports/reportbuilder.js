import { useEffect,useState } from "react";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete';
import SecretKeys from "../../Secrets/SecretKeys";
import { blue, green } from "@mui/material/colors";
import { ErrorReport, reportError } from "../ErrorHandle/errorHandles";
import { PreviewReport } from "./previewReport";

const beaKey =SecretKeys.bea
const jsonApi = "http://localhost:8088"
const beaAPI = "https://apps.bea.gov/api/data?"

export const ReportGenerator =()=>{

    const currentYear = ( new Date()).getFullYear()
    const [frequency, setFrequency]=useState("a")
    const [aFrequencyChecked, setAFrequencyChecked]=useState(false)
        
    const [reportYear, setReportYr]=useState(currentYear)
    const [industryCodes,setIndusties]=useState([])
    const [searchIndustry, setSearchIndustry]=useState(null)
    
    const [reportTitle, setReportTitle]=useState(null)
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
        setFrequency("a")
        setReportYr(currentYear)
        // setAFrequencyChecked(false)
        

    }

    

    const errorHandle =(e)=>{
        e.preventDefault()
        setButton(true)
        beaApi()

        // reportError(reportData)
    }
    // const getFrequency=()=>{
    //     if(aFrequencyChecked.value){
    //         setFrequency(aFrequencyChecked.value)
    //     }
    //     else{
    //         setFrequency(qFrequencyChecked.value)
    //     }
    // }






   
    //console.log(searchIndustry)
    return<><div className="example">
        <div className="QuerySelect">
            <ul className="queryBuilder"> 
                <li className="industryAutoComplete">
                    <Autocomplete
                    disablePortal
                    id="industryAuto"
                    options={industryCodes}
                    getOptionLabel={(option)=>option.naicsTitle}
                    value={searchIndustry}
                    sx={{width:400, height:50}}
                    isOptionEqualToValue={(option, value)=> option===value}
                    renderInput={(params)=><TextField {...params} label="industries" variant="outlined"/>   } 
                    onChange={(event, value)=>{setSearchIndustry(value)}}/>
                </li>

                <li className="testing">
                    <label htmlFor="reportYear">select a report year</label>
                    <select id="reportYear" placeholder={currentYear} value={reportYear} onChange={ (e)=> {setReportYr(e.nativeEvent.target.selectedOptions[0].innerText)}}>
                        </select>       
                    </li>
                <li onChange={(rep)=>setFrequency(rep.target.value)}>
                    <label htmlFor="reportFrequency">select frequency for the report</label>
                    <ul>
                    <li><input type="radio" 
                    name="reportFrequency" 
                    value="a" 
                    //checked={frequency==="a"}
                    />Annual</li>
                    <li><input type="radio" 
                    name="reportFrequency" 
                    value="q"
                    //checked={frequency === "q"}
                    />Quarterly (data began publication in 2005)
                    </li>
                    <li><input type="radio" 
                    name="reportFrequency" 
                    value="a,q"
                    //checked={frequency === "q"}
                    />Annual and Quarterly (returns Annual if no Quarterly)</li>
                    </ul>
                </li>
                <li>
                    <label htmlFor="reportName" >Enter Desired Report Title</label>
                    
                    <input type="text" id="reportName" required value={reportTitle} onChange={(text)=>{setReportTitle(text.target.value)}}/>
                    
                </li>
                <li>
                    <button onClick={(e)=>{errorHandle(e)}}>Generate Report</button>
                    <button onClick={()=>{clearAndReset()}}>New Report</button>
                </li>
            </ul>
        </div>   
        <ErrorReport dataCheck={reportData}/>
    
        <PreviewReport PreviewData={reportData} userTitle={reportTitle} selectedYear={reportYear} industryDescipt={searchIndustry?.naicsTitle} />
        
    </div>
    </>
}