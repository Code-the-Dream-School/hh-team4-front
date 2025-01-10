import { Bar, Doughnut } from 'react-chartjs-2';
import { useEffect } from 'react';
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
import { useState } from 'react';

Chart.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Reports = () => {
    const [employeesNames, setEmployeesNames] = useState([]);
    const [employeeTotalDispense, setEmployeeTotalDispense] = useState([]);
    const [topEmployee, setTopEmployee] = useState(null);
    const [classNames, setClassNames] = useState([]);
    const [classCount, setClassCount] = useState([]);
    const [medOutOfStock, setMedOutOfStock] = useState([]);
    const [outOfStockCounts, setOutOfStockCounts] = useState([]);
    const [error, setError] = useState(null);

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
                const filterEmployeesNames = data.topEmployees.map((item) => item.user.name);
                const uniqueNames = [...new Set(filterEmployeesNames)];
                setEmployeesNames(uniqueNames);

                const groupedQuantities = data.topEmployees.reduce((acc, item) => {
                    const userName = item.user.name;
                    acc[userName] = (acc[userName] || 0) + item.dispenseCount;
                    return acc;
                }, {});
                const result = Object.values(groupedQuantities);
                setEmployeeTotalDispense(result);

                const maxIndex = result.indexOf(Math.max(...result));
                setTopEmployee(uniqueNames[maxIndex]);
            })
            .catch((error) => console.error('Error:', error));
    }, []);
    const chartData = {
        labels: employeesNames,
        datasets: [
            {
                label: topEmployee ? `Top Employee: ${topEmployee}` : 'Top Employee',
                data: employeeTotalDispense,
                backgroundColor: ['#3B6064', '#523A28', '#084C61', '#3A3A3A'],
                borderColor: ['#324F54', '#432D21', '#063D4E', '#2A2A2A'],
                borderWidth: 1,
            },
        ],
    };

    const chartOptions = {
        plugins: {
            legend: {
                labels: {
                    font: {
                        size: 32,
                    },
                },
            },
        },
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineWidth: 2,
                },
                ticks: {
                    font: {
                        size: 22,
                    },
                },
            },
            y: {
                grid: {
                    color: 'rgba(0, 0, 0, 0.5)',
                    lineWidth: 2,
                },
                ticks: {
                    font: {
                        size: 22,
                    },
                },
            },
        },
    };

    const chartContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center', // Aligns charts vertically in the center
        gap: '10px',
        margin: 'auto', // This will center the chart horizontally
        width: '800px',
        height: '800px',
        padding: '4rem',
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
                const filterByClass = data.data.map((item) => item.class);

                const uniqueClassNames = [...new Set(filterByClass)];
                setClassNames(uniqueClassNames);

                const classCounts = {};

                data.data.forEach((medication) => {
                    const medicationClass = medication.class;
                    if (classCounts[medicationClass]) {
                        classCounts[medicationClass]++;
                    } else {
                        classCounts[medicationClass] = 1;
                    }
                });

                const countsArray = Object.values(classCounts);
                setClassCount(countsArray);
            })
            .catch((error) => setError(error.message));
    }, []);

    const doughnutData = {
        labels: classNames,
        datasets: [
            {
                label: 'Medication Classes in Stock',
                data: classCount,
                backgroundColor: ['#6D878A', '#7D5E47', '#C45B59', '#D4A34A', '#2D7685', '#5C5C5C'],
                borderColor: ['#5B7477', '#6A4B38', '#A14A48', '#B28F41', '#275963', '#4B4B4B'],
                borderWidth: 1,
            },
        ],
    };
    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Medication Classes in Stock',
                font: {
                    size: 32,
                },
                padding: {
                    top: 20,
                    bottom: 20,
                },
                align: 'center',
            },
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
                top: 40,
                bottom: 40,
                left: 100,
                right: 10,
            },
        },
        aspectRatio: 2,
    };
    const doughnutContainerStyle = {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems: 'center', // Aligns charts vertically in the center
        gap: '10px',
        margin: 'auto',
        width: '800px',
        height: '800px',
        flexDirection: 'column',
        flexWrap: 'nowrap',
    };

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:8000/api/v1/outOfStock', {
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
                const medicationNames = data.medications.map((item) => item.name);
                setMedOutOfStock(medicationNames);

                // Group quantities using reduce
                const groupedQuantities = data.medications.reduce((acc, item) => {
                    acc[item.name] = acc[item.name] || 0;
                    return acc;
                }, {});

                // Update state with counts
                setOutOfStockCounts(Object.values(groupedQuantities));
            })
            .catch((error) => setError(error.message));
    }, []);

    return (
        <div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <h1 style={{ textAlign: 'center' }}>Reports</h1>
            <div style={chartContainerStyle}>
                {' '}
                <Bar data={chartData} options={chartOptions} />
            </div>
            <div style={doughnutContainerStyle}>
                <Doughnut data={doughnutData} options={doughnutOptions} />
            </div>
            <div style={{ textAlign: 'center' }}>
                <h2
                    style={{
                        textAlign: 'center',
                        fontSize: '2rem',
                        paddingLeft: '6rem',
                        paddingBottom: '2rem',
                        paddingTop: '4rem',
                    }}
                >
                    Out of Stock Medicines
                </h2>
                <ul
                    style={{
                        listStyleType: 'none',
                        paddingLeft: '6rem',
                        textAlign: 'center',
                        fontSize: '1.5rem',
                    }}
                >
                    {medOutOfStock.length > 0 ? (
                        medOutOfStock.map((med, index) => (
                            <li key={index}>
                                {med} - Quantity: {outOfStockCounts[index]}
                            </li>
                        ))
                    ) : (
                        <p>No medicines are out of stock currently.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Reports;
