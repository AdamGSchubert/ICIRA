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
        
      },
      header: {
        fontSize: 12,
        marginBottom: 20,
        textAlign: "center",
        color: "grey",
        fontFamily: "Times-Roman",
      },
      footer:{
        fontSize: 10,
        marginTop:20,
        textAlign: "center",
        color: "black",
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
                <Image style={styles.image} src={chartImage}/>
             </View>
             <Text style={styles.footer}>Data Provided by United States Bureau of Economic Analysis, A branch of the US Department of Commerce </Text>
             
           </Page>
         </Document>)
}
export default CreatePdf




