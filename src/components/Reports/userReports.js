
import { useEffect,useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ButtonGroup, Grid,Button, Typography, Card, CardContent,Box, CardActions, Paper} from "@mui/material"



export const UserReportList =()=>{
    // const {reportID}=useParams()

    const [userReports, setUserReports]=useState([])
    const [naicsObj, setNaicsObj]=useState([])

const iciraUser = localStorage.getItem("IciraUser")
const currentUser =JSON.parse(iciraUser)
const api ="http://localhost:8088"
const navigate =useNavigate()

    useEffect(()=>{
        fetch(`${api}/reports?userId=${currentUser.id}`)
        .then(response =>response.json())
        .then((data) => {
            setUserReports(data)
        })
    },[])


    useEffect(()=>{
        fetch(`${api}/naicsTable`)
        .then(response =>response.json())
        .then((data) => {
            setNaicsObj(data)
        })

    
    
    },[userReports])

    

    const reportDisplay =(report)=>{
         
        const xyz = naicsObj.find(obj => obj.id === report?.naicsTableId)
         return xyz?.naicsTitle ? xyz.naicsTitle : ""
        }
    
     const updateReports =()=>{
        return fetch(`${api}/reports?userId=${currentUser.id}`)
        .then(response =>response.json())
        .then((data) => {
            setUserReports(data)
    })
    }


     const deleteReport =(reportId)=>{
        fetch(`${api}/reports/${reportId}`,{
            method: "DELETE",
                })
            .then(res=>res.json())
            .then(()=>{
               updateReports()
            }
            )
        }
        const editSelected =(reportId)=>{
            navigate(`/editreport/${reportId}`)
        }
        let reversedReports = [...userReports].reverse()

    return <><Box>
        <Grid container align="center">
        <Grid item xs={12} align="center">
        <Typography variant="h3" >User Reports</Typography>
        
        <Typography marginTop={2} variant="body1">Report ordered Latest to Oldest</Typography>
    </Grid>
    </Grid>
        <Box margin={5} >
            <Grid container >
                    <Paper>
                        </Paper>
                    
                </Grid>
            <Grid container className="reportCards"   rowGap={2} columnGap={1} sx={{flexGrow:1}}>
                {/* xs={12} sx={{flexGrow:1}} paddingLeft={5}*/}
                {
                    
                    reversedReports.map((report)=>{
                        return <Grid container item margin="auto" xs={8}  alignItems={"center"}  >
                            <Grid item xs align="center" margin={"auto"} >
                        <Card variant="outlined" key={report.id}  >
                         
                            <Grid container padding={"1%"} sx={{flexGrow:1}}>
                                <Grid item xs={8} align="center">
                                    {/* <CardContent > */}
                                    <Grid item>
                                        <Typography gutterBottom>{report.reportTitle}</Typography>
                                        </Grid>
                           
                          {/* </CardContent>
                          <CardContent > */}
                          <Grid item >
                            <Typography gutterBottom>{reportDisplay(report)} industry report for {report.reportYear}</Typography>
                             </Grid>{/* <br/> */}
                        {/* </CardContent> */}
                        </Grid> 
                         <Grid item xs={2} margin={"auto"} align="center">
                            
                            <ButtonGroup orientation="horizontal" variant="contained" color="primary" >
                                <Button  onClick={()=>{navigate(`/myreports/${report.id}`)}}>view</Button>
                                <Button onClick={()=>{editSelected(report.id)}}>edit</Button>
                                <Button onClick={()=>{deleteReport(report.id)}}>delete</Button>
                            </ButtonGroup>
                           
                       </Grid>
                       </Grid>
                       
                       </Card>
                       </Grid>
                       </Grid>
                       }
                        )
                }
                

            </Grid>
        </Box>
    
        </Box>
    
    
    
    
    
    </>
}