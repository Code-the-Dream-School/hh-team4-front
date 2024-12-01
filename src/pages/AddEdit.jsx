import React, { useState, useEffect } from 'react';
import AddDrug from './AddDrug';



//import EditDrug from '..pages/EditDrug'

export default function AddEdit() {
    const [drugs, setDrugs] = useState([]);

    const addDrugs = (newDrug) => {
        console.log('addDrugs called with:', newDrug); // Debug
        setDrugs((prev) => [...prev, newDrug]);
        console.log('addDrugs passed to AddDrug:', addDrugs);
    };

    const updatedDrug = (updatedDrug) => {
        setDrugs((prev) =>
            prev.map((drug) =>
                (drug.id === updatedDrug.id ? updatedDrug : drug))
        )
    }

    return (

        <div>

            <h1>Drug Management</h1>
            <AddDrug addDrugs={newDrug} drugs={drugs} />
            <EditDrug drug={drugs} updateDrug={updatedDrug} />
            <ul>
                {drugs.map((drug) => (
                    <li key={drug.id}>{drug.nameDrug}</li>
                ))}
            </ul>
        </div>
    );
}
