import { Bar, Doughnut } from "react-chartjs-2";
import { useEffect } from "react";
import {
    Chart,
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useState } from "react";

Chart.register(
    ArcElement,
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
    const [classNames, setClassNames] = useState([])
    const [classCount, setClassCount] = useState([])

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
                        size: 26,
                    },
                },
            },

        },
        responsive: true,
    };

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
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const filterByClass = data.data.map(item => item.class)

                const uniqueClassNames = [...new Set(filterByClass)];
                setClassNames(uniqueClassNames)

                const classCounts = {};

                data.data.forEach(medication => {
                    const medicationClass = medication.class;
                    if (classCounts[medicationClass]) {
                        classCounts[medicationClass]++;
                    } else {
                        classCounts[medicationClass] = 1;
                    }
                });

                const countsArray = Object.values(classCounts);
                setClassCount(countsArray)

            })
            .catch((error) => setError(error.message));

    }, [])
    const doughnutData = {
        labels: classNames,
        datasets: [{
            data: classCount,
            backgroundColor: [
                '#6D878A',
                '#7D5E47',
                '#C45B59',
                '#D4A34A',
                '#2D7685',
                '#5C5C5C',
            ],
            borderColor: [
                '#5B7477',
                '#6A4B38',
                '#A14A48',
                '#B28F41',
                '#275963',
                '#4B4B4B',
            ],
            borderWidth: 1

        }]
    }
    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 26,
                    },
                },
                position: 'top',
            },
        },
        layout: {
            padding: {
                top: 80,
                bottom: 20,
                left: 80,
                right: 10,
            },
        },
        aspectRatio: 1,
    };

    return (
        <div>
            <h1>Reports</h1>
            <Bar
                data={chartData}
                options={chartOptions}
            />

            <div style={{ width: '800px', height: '800px' }}>

                <Doughnut
                    data={doughnutData}
                    options={doughnutOptions}
                />
            </div>
        </div>
    );
};

export default Reports;
