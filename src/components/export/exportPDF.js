import React from "react"; 
import { ReactDOM, useEffect,useState} from "react";
import {Page, Text, Image, Canvas, Document,StyleSheet, View, BlobProvider, pdf, PDFDownloadLink, PDFRenderer, PDFViewer} from "@react-pdf/renderer";
import { BuildChart } from "../Reports/pieChart";
import {Chart, Pie} from "react-chartjs-2";
import {FileSaver} from "file-saver";


const styles =StyleSheet.create({
    body: {
        paddingTop: 35,
        paddingBottom: 65,
        paddingHorizontal: 35,
      },
      title: {
        fontSize: 24,
        textAlign: "center",
        fontFamily: "Times-Roman",
      },
      text: {
        margin: 12,
        fontSize: 14,
        textAlign: "justify",
        fontFamily: "Times-Roman",
    
      },
      image: {
        marginVertical: 15,
        marginHorizontal: 100,
        maxWidth: 100
      },
      header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
        fontFamily: "Times-Roman",
      },
      pageNumber: {
        position: "absolute",
        fontSize: 12,
        bottom: 30,
        left: 0,
        right: 0,
        textAlign: "center",
        color: "grey",
        fontFamily: "Times-Roman",
      },
    });
// 
const CreatePdf =({ chartImage,  industry , industryTitle, tax, pay,total, profit,myTitle,note})=>{
    // const chart = document.createElement('canvas');
    // const descriptionList=()=>{chartImgData,chartIndustry,ChartReportData
    //     return <ul>
    //         <li>{total}</li>,
    //         <li>{profit}</li>
    //         <li>{pay}</li>
    //         <li>{tax}</li>
    //         <li>{note}</li>
    //     </ul>
    // }

    // const [chartImg, setChartImg]=useState()


    // useEffect(()=>{
    //    const chart = document.getElementById("printmeee");
    //    let img = ""
    // // new Image()
    //     img=chart.toDataURL("image/jpg")
    //     setChartImg(img)
    
    //     // chart = <>{chart}</>
    // },[])
    // const generatePdfDocument = async (ChartReportData, chartIndustry, fileName="Chart") => {
    //     return await pdf(
    //             <BuildChart ReportData={ChartReportData} industry={chartIndustry}/>
    //         ).toBlob();
    //     //FileSaver.saveAs(blob, fileName);
    // };
    // let xyz =`${chartImgData},${chartImage}`
    

return (<Document>
           <Page size="A4" style={styles.page}>
             <View style={styles.title}>
               <Text>{myTitle}</Text>
               <Text>{industryTitle}</Text>
               <Text>{industry}</Text>
             </View>
             <View style={styles.text}>
               <Text>{total}</Text>
               <Text>{profit}</Text>
               <Text>{pay}</Text>
               <Text>{tax}</Text>
               <Text>{note}</Text>
                <Image  src={chartImage}/>
             </View>
             <View>
               
                </View>
             
           </Page>
         </Document>)
}
export default CreatePdf

// const styles = StyleSheet.create({ style={styles.image}
//     page: {
//       flexDirection: 'row',
//       backgroundColor: '#E4E4E4'
//     },
//     section: {
//       margin: 10,
//       padding: 10,
//       flexGrow: 1
//     }
//   });
  
//   // Create Document Component
//   const MyDocument = () => (
//     <Document>
//       <Page size="A4" style={styles.page}>
//         <View style={styles.section}>
//           <Text>Section #1</Text>
//         </View>
//         <View style={styles.section}>
//           <Text>Section #2</Text>
//         </View>
//       </Page>
//     </Document>
//   );
// export default MyDocument




