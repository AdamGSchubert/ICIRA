import { useEffect,useState } from "react";
import SecretKeys from "../../.Secrets/SecretKeys";

const beaKey =SecretKeys.bea
const jsonApi = "http://localhost:8088"
const beaAPI = "https://apps.bea.gov/api/data?"

export const ReportGenerator =()=>{


    const [frequency, setFrequency]=useState({})
    const [reportYear, setReportYr]=useState({})
    const [industryCodes,setIndusties]=useState([])
    const [searchIndustry, setSearchIndustry]=useState({})


    
    
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
    
    const searchTool =(searchTerm)=>{

        if (searchTerm.toLowerCase() == industryCodes.naicsTitle.toLowerCase()){
            console.log(industryCodes.naicsCode)

        }

    }
    
    
    // fetch(`${beaAPI}UserID=${beaKey}&method=GetData&DataSetName=GDPbyIndustry&frequency=${frequency} `)
    // .then(response =>response.json())
    // .then((data) => {})
    
    useEffect(
        ()=>{
            let currentYear = ( new Date()).getFullYear()
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

    return<>
        <ul>
            <li>
            <input type="text" placeholder="search for industry" name="" onChange={(search)=>{searchTool(search.target.value)}}/>
            <select id="industrySelector" onChange={(event)=>setSearchIndustry(event.target.value)}>
                
                <option value="">select your industry</option> 
                
                    {
                        industryCodes.map(industry => {
                            return <><option id={industry.id} value={industry.naicsCode}> {industry.naicsTitle}</option></>
                        }
                        )
                    }
                </select>


            </li>
            <li>
                <label htmlFor="reportYear">select a report year</label>
                <select id="reportYear" onChange={ (e)=> setReportYr(e.target.value)}>
                      
                    </select>




               
                             
                </li>
            <li>
                <label htmlFor="reportFrequency">select frequency for the report</label>
                <input type="radio" className="reportFrequency" value="a" onChange={(rep)=>setFrequency(rep.target.value)}/>Annual
                <input type="radio" className="reportFrequency" value="q" onChange={(rep)=>setFrequency(rep.target.value)}/>Quarterly
            </li>
            <li>industry selector</li>




        </ul>
    
    </>
}