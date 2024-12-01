import React from "react";
import Alarmbutton from "./AlarmButton.jsx";
import { useEffect, useState } from "react";
import { drugData } from '../../data.js'; // Update path accordingly
import styles from './AlarmButton.module.css'

export default function Alarms(){
    
    const [rowData , setRowdata] =useState([]) ;
    
    const [lowStockData, setLowStockData] = useState([]);
    const [noStockData, setnoStockData] = useState([]);
    const [expiringsoonData, setExpiringData] = useState([]);

   

   
    useEffect(() => {
        //Filter the data for a specific class
        const drugsData = drugData.filter((drug) => drug.class); 
        setRowdata(drugsData); 
      
        const lowStockFilter = drugsData.filter((drug) => {
            
            return ( parseInt(drug.quantity) !==0 && drug.quantity <= drug.threshold);
        });
      

        setLowStockData(lowStockFilter); // Data drugs matching LowStuck
       
        

        const noStockFilter = drugsData.filter(
            (drug) => parseInt(drug.quantity) ===0 
        );
        setnoStockData(noStockFilter); // Data drugs matching no Stock
     

        const expirationDateData = drugsData.filter((drug) => {
            const expirationDate = new Date(drug.expiration); 
            const today = new Date(); 
        
            return expirationDate - today < 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        });           
        
        setExpiringData(expirationDateData); //Data for Date checking
    }, []); // Dependencies

   

return (
    <>
    
    <h3></h3>
    <div className={styles.alarmcontainer}>
    <Alarmbutton message={`Low Stock on ${lowStockData.length} products`}  imagepath="../images/low-stock.png"  filterTitle ="LowStock"   filterData ={lowStockData} targetPage="Medication"/> 
    <Alarmbutton message={`No Stock on ${noStockData.length} products`}  imagepath="../images/out-of-stock.png"  filterTitle="No Stock"  filterData ={noStockData}  targetPage="Medication"/>
    <Alarmbutton message={`Expiration soon on ${expiringsoonData.length} products`}   imagepath="../images/expire-soon.png"  filterTitle="Expire"  filterData ={expiringsoonData}  targetPage="Medication"/>
    </div>
    </>
) ;
}