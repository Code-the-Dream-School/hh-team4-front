//import React, { useState, useEffect } from 'react';
//import { drugData } from './data.jsx'; // Update path accordingly

export default function FilterSearch({data}) {
    //  const [data, setData] = useState([]);
    // // const [loading, setLoading] = useState(true);
    // // const [error, setError] = useState(null);

    //   const fetchData = async () => {
    //     try {
    //       const response = await fetch('http://localhost:8000/api/v1/inventory');
    //       if (!response.ok) {
    //         throw new Error('Network response was not ok');
    //       }
    //       const result = await response.json();
    //       setData(result);
    //     } catch (error) {
    //       setError(error.message);
    //     } finally {
    //       setLoading(false);
    //     }
    // }

    const HandelSearch = () => {
        //if()
        //data.filter()
    };
    const HandelCancel = () => {};

    // const [filteredDrugs, setFilteredDrugs] = useState([]);
    // useEffect(() => {
    //     // Filter the data for a specific class
    //     let DrugData = drugData.filter((drug) => drug.class === 'DrugData');
    //     if (filter) Drugdata= drugData.filter((drug)=> d)
    //     setFilteredDrugs(DrugData); // Set filtered data in the state
    // }, []);
    return (
        <>
            <div>
                <label htmlFor="drugname">Drug Name: </label>
                <input name="drugname" />
            </div>
            <div>
                <label htmlFor="batchCode">BatchCode: </label>
                <input name="batchCode" />
            </div>
            <div>
                <label htmlFor="ExpirationdateFrom">Expirationdate From: </label>
                <input name="ExpirationdateFrom" />
                <label htmlFor="Expirationdateto">Expirationdate To: </label>
                <input name="Expirationdateto" />
            </div>
            <div>
                <label htmlFor="type">Type of Drug:</label>
                <input name="type" />
            </div>
            <div>
                <button onClick={HandelSearch}>Search</button>
                <button onClick={HandelCancel}>Cancel</button>
            </div>
        </>
    );
}
