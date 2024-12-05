import { Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import { RouterProvider, createHashRouter } from 'react-router-dom';
import MedicationItemCard from './MedicationItemCard';

const URL = 'http://localhost:8000/api/v1/';

const router = createHashRouter([
    {
        path: '/medications',
        element: <MedicationItemCard />
    }
]);

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
        
        <RouterProvider router={router} />
    );
}

export default App;
