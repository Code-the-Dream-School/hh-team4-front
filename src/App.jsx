import React, { useState, useEffect   } from 'react';
import { getAllData } from './util/index';
import { Route , Routes } from 'react-router-dom'; 
import  Alarm  from './Pages/Alarms.jsx';
import Medication from './Pages/Medication.jsx';

const URL = 'http://localhost:8000/api/v1/';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        (async () => {
            const myData = await getAllData(URL);
            setMessage(myData.data);

        })();

        return () => {
            console.log('unmounting');
        };
    }, []);

    return (
        <>
            
            <div>
               <h1>{message}</h1>
                <Routes>
                   
                    <Route path="/Alarm" element={<Alarm />} />
                    <Route path="/Medication" element={<Medication />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
