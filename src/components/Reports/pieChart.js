import { useState, useEffect, useInsertionEffect } from "react"
import { Container, Grid, tooltipClasses } from "@mui/material"
import { Chart as ChartJS, ArcElement, Tooltip, Legend} from "chart.js"
import {Chart, Pie} from "react-chartjs-2"
import { Route, useNavigate } from "react-router-dom"


export const BuildChart =({ReportData,industry})=>{


    const [dataObjects, setDataObjects]=useState([])
    const [chartData, setChartData]=useState([])
    const [chartLabel, setChartLabel]=useState([])




    useEffect(()=>{
        setDataObjects(ReportData?.BEAAPI?.Results?.[0]?.Data)

    },
    [ReportData])

    useEffect(()=>{
         
            const labels =[]
          if(dataObjects){
            dataObjects.forEach((dataObj)=>{
                 if(dataObj.IndustrYDescription.toLowerCase() !== industry.toLowerCase()){
                    labels.push(dataObj.IndustrYDescription)
                 }
            })}
        setChartLabel(labels)
        

    },
    [dataObjects])
    
    useEffect(()=>{
        const dataNums =[]
          if(dataObjects){
            dataObjects.forEach((dataObj)=>{
                 if(dataObj.IndustrYDescription.toLowerCase() !== industry.toLowerCase()){
                    dataNums.push(dataObj.DataValue)
                 }
            })}
        setChartData(dataNums)
        
    },[chartLabel])
    
    
       
     const data = {
        labels: chartLabel,
        datasets: [
          {
            data: chartData,
            backgroundColor: [
              'rgba(3, 173, 252)',
              'rgba(240, 81, 29)',
              'rgba(63, 242, 117)',
              
            ],
            borderColor:"black",
            borderWidth:2
          },
        ],
      };
      
      
        return <>
        <Container  sx={{ maxHeight: '500px' }}>
          <Pie data={data}  id="printmeee"/>

        </Container>
        
        </>;

      
}