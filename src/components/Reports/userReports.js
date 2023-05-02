
import { useEffect,useState } from "react"
import { useNavigate, useParams } from "react-router-dom"



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
    
    // {let repo = naicsObj.find(item => item.id=== report?.naicsTableId)} let reportCode = naicsObj.find(item=>item.id=== report?.naicsTableId)

    // reportCode ? reportCode.naicsTitle : "" 
   
    // const functionName =(report)=>{
    //     navigate(`/myreports/${report.id}`)
    // }

    return <>
    <h1>user reports</h1>
        <section>
            <div className="reportCards">
                {
                    userReports.map((report)=>{
                        return <div key={report.id}>
                           <h2>{report.reportTitle}</h2>
                            <h3>{report.reportYear} for the {reportDisplay(report)} Industry</h3>
                       
                       <button onClick={()=>{navigate(`/myreports/${report.id}`)}}>view</button>
                       <button>edit</button>
                       <button>delete</button>
                       </div>
                       }
                        )
                }

            </div>
        </section>
    
    
    
    
    
    
    
    </>
}