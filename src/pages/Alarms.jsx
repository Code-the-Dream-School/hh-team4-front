import React from 'react';
import Alarmbutton from './AlarmButton.jsx';
import { useEffect, useState } from 'react';
import { useDashboardContext } from './Dashboard';
import lowStockIcon from '../assets/low-stock.svg';
import outOfStockIcon from '../assets/out-of-stock.svg';
import expiredIcon from '../assets/expired.svg';
import expiresoonIcon from '../assets/expire-soon.svg';

import styles from './AlarmButton.module.css';

export default function Alarms() {
    const [lowStockData, setLowStockData] = useState([]);
    const [noStockData, setnoStockData] = useState([]);
    const [expiringsoonData, setExpiringData] = useState([]);
    const [expiredData, setExpiredData] = useState([]);
    const { store } = useDashboardContext();

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
                const StoreData = data.data.filter((item) => item.location === store);
                FilterData(StoreData);
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

        const noStockFilter = drugsData
            .filter((drug) => parseInt(drug.quantity) === 0)
            .map((drug) => ({
                ...drug,
                quantity:
                    parseInt(drug.quantity, 10) === 0
                        ? 'Out of Stock'
                        : `Quantity: ${drug.quantity}`,
            }));

        setnoStockData(noStockFilter); // Data drugs matching no Stock

        const expirationDateData = drugsData.filter((drug) => {
            const expirationDate = new Date(drug.expirationDate);
            if (isNaN(expirationDate)) return false;
            const today = new Date();
            //return expirationDate - today < 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

            const next30Days = new Date(); // Clone current date
            next30Days.setDate(today.getDate() + 30); // Add 30 days

            return expirationDate >= today && expirationDate <= next30Days && drug.quantity !== 0;
        });
        setExpiringData(expirationDateData); //Data for Date checking

        const expireddata = drugsData.filter((drug) => {
            const today = new Date();
            const expirationDate = new Date(drug.expirationDate);
            return expirationDate <= today && drug.quantity !== 0;
        });
        setExpiredData(expireddata); //Data for Date checking
    };

    return (
        <>
            <h3></h3>
            <div className={styles.alarmcontainer}>
                <Alarmbutton
                    message={`Low Stock on ${lowStockData.length} products`}
                    imagepath={lowStockIcon}
                    filterTitle="Low Stock Drugs"
                    alarmFilterData={lowStockData}
                    targetPage="dashboard"
                />
                <Alarmbutton
                    message={`No Stock on ${noStockData.length} products`}
                    imagepath={outOfStockIcon}
                    filterTitle="Out of Stock Drugs"
                    alarmFilterData={noStockData}
                    targetPage="dashboard"
                />
                <Alarmbutton
                    message={`Expired ${expiredData.length} products`}
                    imagepath={expiredIcon}
                    filterTitle="Expired Drugs"
                    alarmFilterData={expiredData}
                    targetPage="dashboard"
                />
                <Alarmbutton
                    message={`Expiration soon ${expiringsoonData.length} products`}
                    imagepath={expiresoonIcon}
                    filterTitle="Expiring Soon Drugs"
                    alarmFilterData={expiringsoonData}
                    targetPage="dashboard"
                />
            </div>
        </>
    );
}
