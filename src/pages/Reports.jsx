import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
import {
    Chart,
    CategoryScale, // Import the "category" scale
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState } from "react";

Chart.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Reports = () => {
    const [employeesNames, setEmployeesNames] = useState([])
    const [employeeTotalDispense, setEmployeeTotalDispense] = useState([])
    const [topEmployee, setTopEmployee] = useState(null);


    useEffect(() => {

        const token = localStorage.getItem('token');
        fetch(`http://localhost:8000/api/v1/topEmployee`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch drug data');
                return response.json();
            })
            .then((data) => {
                const filterEmployeesNames = data.logs.map(item => item.userId.name)
                const uniqueNames = [...new Set(filterEmployeesNames)];
                setEmployeesNames(uniqueNames)
                const groupedQuantities = data.logs.reduce((acc, item) => {
                    const userName = item.userId.name;
                    acc[userName] = (acc[userName] || 0) + item.quantity; return acc;
                }, {});
                const result = Object.values(groupedQuantities);
                setEmployeeTotalDispense(result)

                console.log(result)

                const maxIndex = result.indexOf(Math.max(...result));
                setTopEmployee(uniqueNames[maxIndex]);

            })
            .catch((error) => console.error('Error:', error));

    }, [])
    const chartData = {
        labels: employeesNames,
        datasets: [{
            label: topEmployee ? `Top Employee: ${topEmployee}` : 'Top Employee',
            data: employeeTotalDispense,
            backgroundColor: [
                '#3B6064',
                '#523A28',
                '#084C61',
                '#3A3A3A',
            ],
            borderColor: [
                '#324F54',
                '#432D21',
                '#063D4E',
                '#2A2A2A',
            ],
            borderWidth: 1
        }]
    }

    const chartOptions = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 26, // Set the font size for the legend
                    },
                },
            },

        },
        responsive: true,
    };

    return (
        <div>
            <h1>Reports</h1>
            <Bar
                data={chartData}
                options={chartOptions}
            />

        </div>
    );
};

export default Reports;
