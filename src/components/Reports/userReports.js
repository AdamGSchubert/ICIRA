
import { useEffect,useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ButtonGroup, Grid,Button, Typography, Card, CardContent,Box, CardActions } from "@mui/material"



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

    return <><Typography variant="h3">user reports</Typography>
        <Box>
            <Grid container className="reportCards" columns={4}>
                {
                    userReports.map((report)=>{
                        return <Card  variant="outlined" key={report.id} sx={{maxWidth: 350}}>
                            
                        <CardContent >
                           <Typography>{report.reportTitle}</Typography>
                            <Typography>{reportDisplay(report)} industry report for {report.reportYear}</Typography>
                            
                        </CardContent>

                       <CardActions>
                        <ButtonGroup orientation="vertical" variant="contained">
                            <Button onClick={()=>{navigate(`/myreports/${report.id}`)}}>view</Button>
                            <Button onClick={()=>{editSelected(report.id)}}>edit</Button>
                            <Button onClick={()=>{deleteReport(report.id)}}>delete</Button>
                        </ButtonGroup>
                       </CardActions>
                       </Card>
                       
                       }
                        )
                }

            </Grid>
        </Box>
    
    
    
    
    
    
    
    </>
}