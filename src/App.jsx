import { Heading,Text, Box, Flex } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { getAllData } from './util/index';
import MedicationItemCard from './MedicationItemCard';

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
        <Flex>
            {/* <h1>{message}</h1> */}
            <MedicationItemCard />
        </Flex>   
        </>
    );
}

export default App;
