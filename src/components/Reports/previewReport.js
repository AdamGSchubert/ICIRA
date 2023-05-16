import { useState, useEffect, useInsertionEffect } from "react"
import { Grid, tooltipClasses, Button, Box, Typography, ButtonGroup, Paper,Container,Stack} from "@mui/material"
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import {Pie} from "react-chartjs-2"
import { Route, useNavigate } from "react-router-dom"
import { BuildChart } from "./pieChart"
import SendIcon from '@mui/icons-material/Send'
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { purple } from "@mui/material/colors"
// // import CreatePdf from "../export/exportPDF"
// import MyDocument from "../export/exportPDF"
import CreatePdf from "../export/exportPDF"



export const PreviewReport =({PreviewData, userTitle, selectedYear, industryDescript, frequency, reportID, reportIdentity})=>{
 ChartJS.register(ArcElement,Tooltip,Legend)

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
                // text for the report
    const title =`${industryDescript ? industryDescript.naicsTitle : "Select an industry"} for ${selectedYear === 2023 ? "selected year" : selectedYear}`
    const industry = `N.A.I.C.S. Code:${industryTotal?.[0]?.Industry}`
    const industryCap =`Industry Total: ${industryTotal?.[0]?.DataValue ? usDollar.format(industryTotal?.[0]?.DataValue) : ""}`
    const industryProfit =`Industry Gross Surplus (profit): ${grossOp?.[0]?.DataValue ? usDollar.format(grossOp?.[0]?.DataValue) : ""}`
    const industryPay=`Industry Compensation: ${compensation?.[0]?.DataValue ? usDollar.format(compensation?.[0]?.DataValue) : ""}`
    const industryTaxes =`Industry Taxes: ${industryTax?.[0]?.DataValue ? usDollar.format(industryTax?.[0]?.DataValue) : ""}`
     const industryNote=<>{noteObj?.NoteText} </>   
     const chartPDF = ()=>{
        return <BuildChart ReportData={PreviewData} industry={industryDescript?.naicsTitle} />
     }   
     
     


    const [chartImg, setChartImg]=useState("")
    // //  const [chartInfo,setChartInfo]=useState()


    function loadChart(){
       const chart = document.getElementById("printmeee");
       const image = new Image()
        image.src=chart.toDataURL("image/jpg")
        const [ info,base64]= image.src.split(",")
        setChartImg(image.src)
        // setChartInfo(info)
        // console.log(xyz)
    
        // chart = <>{chart}</>
    }
    
    return <><Box >
        <Paper variant="outlined" >
        <Stack id="printme" sx={{minHeight: "440px"}} direction="row"className="PreviewStack" xs={12} margin={"2%"}>
        {/* <Paper variant="outlined"> */}
            {/* <Grid columns={12} margin={"2rem"} className="PreviewContainer"> */}



        
            <Grid item xs={4} >
                
                    <Grid item  >
                        <Typography variant="h3" >{userTitle}</Typography>
                    </Grid>

                    
                        <Grid item>
                            <Typography>
                                {/* {industryDescript ? industryDescript.naicsTitle : "Select an industry"} for {selectedYear === 2023 ? "selected year" : selectedYear} */}
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography>
                                N.A.I.C.S. Code:{industryTotal?.[0]?.Industry}
                                {/* {industry} */}
                            </Typography>
                        </Grid>
                    
                   
                        {/* this checks if the value from the BEA API object exist if not show blank*/}
                        <Grid item marginTop={"2rem"}>
                            <Typography variant="h7">
                                Industry Total: {industryTotal?.[0]?.DataValue ? usDollar.format(industryTotal?.[0]?.DataValue) : ""}
                                {/* {industryCap} */}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h7">
                                Industry Gross Surplus (profit): {grossOp?.[0]?.DataValue ? usDollar.format(grossOp?.[0]?.DataValue) : ""}
                                {/* {industryProfit} */}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h7">
                                Industry Compensation: {compensation?.[0]?.DataValue ? usDollar.format(compensation?.[0]?.DataValue) : ""}
                                {/* {industryPay} */}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant="h7">
                                Industry Taxes: {industryTax?.[0]?.DataValue ? usDollar.format(industryTax?.[0]?.DataValue) : ""}
                                {/* {industryTaxes} */}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography >
                                {noteObj?.NoteText}
                                {/* {industryNote} */}
                                </Typography>
                                </Grid>
                            
            </Grid>
        <Grid item xs={6} >
              <BuildChart ReportData={PreviewData} industry={industryDescript?.naicsTitle} />
            </Grid>

            <Grid item xs={2} margin={"auto"} marginLeft={"2%"}>
                {
                    reportID
                        ? <> <ButtonGroup variant="contained" color="primary"  orientation="vertical">
                            <Button onClick={() => { deleteReport(reportID) }} >delete </Button>
                            <Button onClick={() => { editSelected(reportID) }} >edit </Button>
                            
                             <Button onClick={loadChart}>
                                <PDFDownloadLink document={<CreatePdf 
                                ChartReportData={PreviewData} chartIndustry={industryDescript?.naicsTitle} 
                                myTitle={userTitle} industryTitle={title} tax={industryTaxes} 
                                total={industryCap} industry={industry} profit={industryProfit} 
                                pay={industryPay} note={industryNote} chartImage={chartImg} />} fileName={userTitle}>
                                {({loading})=> (loading ? "Prepare PDF Report ": "Export to PDF")}
                            </PDFDownloadLink> </Button>
                               {//}  
                               //chartImgData={chartInfo}chartImage={chartImg}
                            }
                                
                        </ButtonGroup>
                       
                        </>
                        : reportIdentity ? <Button variant="contained" onClick={() => { updateReport(reportIdentity) }} >Update Report </Button>

                            : <Button variant="contained" endIcon={<SendIcon />} onClick={(event) => { saveReport(event) }}>Save Report</Button>
                                    
                                    

                } 
                <div>
                
                            </div>
            </Grid>
      
        
           
    </Stack>
</Paper> </Box>
    </>
}