import React from 'react';
import Alarmbutton from './AlarmButton.jsx';
import { useEffect, useState } from 'react';

import styles from './AlarmButton.module.css';

export default function Alarms() {
    const [lowStockData, setLowStockData] = useState([]);
    const [noStockData, setnoStockData] = useState([]);
    const [expiringsoonData, setExpiringData] = useState([]);
    const [drugsData, setDrugsData] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:8000/api/v1/inventory', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setDrugsData(data.data);
                FilterData(data.data);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const FilterData = (drugsData) => {
        const lowStockFilter = drugsData.filter((drug) => {
            return parseInt(drug.quantity) !== 0 && drug.quantity <= drug.threshold;
        });
        setLowStockData(lowStockFilter); // Data drugs matching LowStuck

        const noStockFilter = drugsData.filter((drug) => parseInt(drug.quantity) === 0);
        setnoStockData(noStockFilter); // Data drugs matching no Stock

        const expirationDateData = drugsData.filter((drug) => {
            const expirationDate = new Date(drug.expirationDate);
            if (isNaN(expirationDate)) return false;
            const today = new Date();
            return expirationDate - today < 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds
        });
        setExpiringData(expirationDateData); //Data for Date checking
    };

    return (
        <>
            <h3></h3>
            <div className={styles.alarmcontainer}>
                <Alarmbutton
                    message={`Low Stock on ${lowStockData.length} products`}
                    imagepath="../images/low-stock.png"
                    filterTitle="LowStock"
                    alarmFilterData={lowStockData}
                    targetPage="dashboard"
                />
                <Alarmbutton
                    message={`No Stock on ${noStockData.length} products`}
                    imagepath="../images/out-of-stock.png"
                    filterTitle="No Stock"
                    alarmFilterData={noStockData}
                    targetPage="dashboard"
                />
                <Alarmbutton
                    message={`Expiration soon on ${expiringsoonData.length} products`}
                    imagepath="../images/expire-soon.png"
                    filterTitle="Expire"
                    alarmFilterData={expiringsoonData}
                    targetPage="dashboard"
                />
            </div>
        </>
    );
}
