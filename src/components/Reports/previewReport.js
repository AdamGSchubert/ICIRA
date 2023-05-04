import { useState, useEffect } from "react"
import { Grid, tooltipClasses } from "@mui/material"
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import {Pie} from "react-chartjs-2"
import { Route, useNavigate } from "react-router-dom"


export const PreviewReport =({PreviewData, userTitle, selectedYear, industryDescript, frequency, reportID, reportIdentity})=>{


    const iciraUser = localStorage.getItem("IciraUser")
    const currentUser =JSON.parse(iciraUser)
    const api ="http://localhost:8088"
    const navigate =useNavigate()



    const [compensation, setCompensation]=useState({})
    const [industryTax,setIndustryTax]=useState({})
    const [grossOp,setGrossOp]=useState({})
    const [industryTotal, setIndustryTotal]=useState({})
    const [noteObj, setNoteObj]=useState({})

    const [report,setNewReport]=useState({
        userId: "",
        reportTitle:"",
        naicsTableId:"",
        reportYear:"",
        reportFreq:"",
        noteId:""
    })
    



    useEffect( //grab the data object that represents compensation
        ()=>{
            const pay = PreviewData?.BEAAPI?.Results?.[0]?.Data?.filter(obj=>{if(obj?.IndustrYDescription.includes("Compensation")){
                return obj
            }})
            setCompensation(pay)
            
            const tax = PreviewData?.BEAAPI?.Results?.[0]?.Data?.filter(obj=>{if(obj?.IndustrYDescription.includes("Tax")){
                return obj
            }})
            setIndustryTax(tax)

        },
        [PreviewData]
    )

    // useEffect(
    //     ()=>{
    //         const tax = PreviewData?.BEAAPI?.Results?.[0]?.Data?.filter(obj=>{if(obj?.IndustrYDescription.includes("Tax")){
    //             return obj
    //         }})
    //         setIndustryTax(tax)

    //     },
    //     [PreviewData]
    // )
    useEffect(
        ()=>{
            const profit = PreviewData?.BEAAPI?.Results?.[0]?.Data?.filter(obj=>{if(obj?.IndustrYDescription.includes("Gross")){
                return obj
            }})
            setGrossOp(profit)
        },
        [PreviewData]
    )
    useEffect(
        ()=>{
            const overView = PreviewData?.BEAAPI?.Results?.[0]?.Data?.filter(obj=>{if(obj?.IndustrYDescription.toLowerCase().includes(industryDescript.naicsTitle.toLowerCase())){
                return obj
            }})
            setIndustryTotal(overView)
        },
        [PreviewData]
    )
    useEffect(
        ()=>{
            const note = PreviewData?.BEAAPI?.Results?.[0]?.Notes?.[0]
            setNoteObj(note)


        },
        [PreviewData])


        

        let usDollar = Intl.NumberFormat('us-US',{style: `currency`, currency: 'USD'})

        const employeePay =  compensation?.[0]?.DataValue 

        const saveReport =(e)=>{
            e.preventDefault()

            const reportQuery={
                userId: currentUser.id,
                reportTitle:userTitle,
                naicsTableId:industryDescript.id,
                reportYear:selectedYear,
                reportFreq:frequency,
            }

            fetch(`${api}/reports`,{
                method: "POST",
                headers: {
                "Content-Type":"application/json"
                 },
                  body: JSON.stringify(reportQuery)
                    })
                       .then(res=>res.json())
                               .then(()=>{
                                navigate("/myreports")
                               }
                                       )
            
         }
         const deleteReport =(reportId)=>{
            fetch(`${api}/reports/${reportId}`,{
                method: "DELETE",
                    })
                .then(res=>res.json())
                .then(()=>{
                   navigate("/myreports")
                }
                )
            }
            

            const editSelected =(reportId)=>{
                navigate(`/editreport/${reportId}`)
            }


            const updateReport =(reportId)=>{ 
                const updateDetails={
                    userId: currentUser.id,
                    reportTitle:userTitle,
                    naicsTableId:industryDescript.id,
                    reportYear:selectedYear,
                    reportFreq:frequency,
            }
                
                


                fetch(`${api}/reports/${reportId}`,{
                    method: "PUT",
                    headers: {
                    "Content-Type":"application/json"
                     },
                      body: JSON.stringify(updateDetails)
                        })
                           .then(res=>res.json())
                                   .then(()=>{
                                    navigate("/myreports")
                                   }
                                           )
                }
     // chart data
     ChartJS.register(ArcElement,Tooltip,Legend)
    const functionName =()=>{
        const labels=["total","Gross Surplus (Profit)", "Compensation","Tax" ]
        const data= [ usDollar.format(industryTotal?.[0]?.DataValue),usDollar.format(grossOp?.[0]?.DataValue) ]

    }

           

    return<><Grid>
    

        <div className="reportText">
            <h1>{userTitle}</h1>
        <div><ul>
            <li>{industryDescript ? industryDescript.naicsTitle : "Select an industry" } for {selectedYear===2023 ? "selected year" : selectedYear }</li>
            <li>N.A.I.C.S. Code:{industryTotal?.[0]?.Industry}</li>
            </ul> </div>    
        
    <ul>{/* this checks if the value from the BEA API object exist if not show blank*/}
        <li>Industry Total: {industryTotal?.[0]?.DataValue ? usDollar.format(industryTotal?.[0]?.DataValue) : ""}</li>
        <li>Industry Gross Surplus (profit): { grossOp?.[0]?.DataValue ? usDollar.format(grossOp?.[0]?.DataValue) : ""}</li>
        <li>Industry Compensation: {compensation?.[0]?.DataValue ? usDollar.format(compensation?.[0]?.DataValue) : ""} </li>
        <li>Industry Taxes: {industryTax?.[0]?.DataValue ? usDollar.format(industryTax?.[0]?.DataValue): ""}</li>
    </ul>
    <p>{noteObj?.NoteText}</p>
    </div>
    <div className="chart">
        {}
    </div>
    
    
    {   
        reportID 
        ? <><button onClick={()=>{deleteReport(reportID)}} >delete </button>
        <button onClick={()=>{editSelected(reportID)}} >edit </button>
        <button onClick={()=>{}} >export to PDF </button>
        </>
        : reportIdentity ? <button onClick={()=>{updateReport(reportIdentity)}} >Update Report </button>

        :  <button onClick={(event)=>{saveReport(event)}}>Save Report</button>
        
    }
    </Grid>
    </>
}