import { useState, useEffect } from "react"


export const PreviewReport =({PreviewData, userTitle, selectedYear, industryDescipt})=>{

    const [compensation, setCompensation]=useState({})
    const [industryTax,setIndustryTax]=useState({})
    const [grossOp,setGrossOp]=useState({})
    const [industryTotal, setIndustryTotal]=useState({})

    useEffect( //grab the data object that represents compensation
        ()=>{
            const pay = PreviewData?.BEAAPI?.Results?.[0]?.Data?.filter(obj=>{if(obj?.IndustrYDescription.includes("Compensation")){
                return obj
            }})
            setCompensation(pay)

        },
        [PreviewData]
    )

    useEffect(
        ()=>{
            const tax = PreviewData?.BEAAPI?.Results?.[0]?.Data?.filter(obj=>{if(obj?.IndustrYDescription.includes("Tax")){
                return obj
            }})
            setIndustryTax(tax)

        },
        [PreviewData]
    )
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
            const overView = PreviewData?.BEAAPI?.Results?.[0]?.Data?.filter(obj=>{if(obj?.IndustrYDescription.includes(industryDescipt)){
                return obj
            }})
            setIndustryTotal(overView)
        },
        [PreviewData]
    )


    return<>
    <h1>Preview Report {selectedYear} for the {industryDescipt} industry</h1>

    
    </>

}