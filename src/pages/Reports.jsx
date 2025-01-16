import styled from 'styled-components';
import { Bar, Doughnut } from 'react-chartjs-2';
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
    const [showBarChart, setShowBarChart] = useState(false);
    const [showDoughnutChart, setShowDoughnutChart] = useState(false);
    const [showOutOfStockList, setShowOutOfStockList] = useState(false);

    const fetchTopEmployees = () => {
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
    };
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
                        size: 20,
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
        alignItems: 'center',
        gap: '10px',
        margin: '1%',
        padding: '5%',
        width: '600',
        height: '600px',
    };

    const fetchInventoryData = () => {
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
    };

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
                    size: 28,
                },
            },
            legend: {
                labels: {
                    font: {
                        size: 24,
                    },
                },
                position: 'top',
            },
        },
        aspectRatio: 2,
    };
    const doughnutContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        margin: '1%',
        padding: '5%',
        width: '600',
        height: '600px',
    };

    const fetchOutOfStockData = () => {
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
                const groupedQuantities = data.medications.reduce((acc, item) => {
                    acc[item.name] = acc[item.name] || 0;
                    return acc;
                }, {});
                setOutOfStockCounts(Object.values(groupedQuantities));
            })
            .catch((error) => setError(error.message));
    };

    const handleShowBarChart = () => {
        setShowBarChart(true);
        setShowDoughnutChart(false);
        setShowOutOfStockList(false);
        fetchTopEmployees();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleShowDoughnutChart = () => {
        setShowBarChart(false);
        setShowDoughnutChart(true);
        setShowOutOfStockList(false);
        fetchInventoryData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleShowOutOfStockList = () => {
        setShowBarChart(false);
        setShowDoughnutChart(false);
        setShowOutOfStockList(true);
        fetchOutOfStockData();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div>
            <h1
                style={{
                    textAlign: 'center',
                    marginLeft: '2.5%',
                    padding: '5% ',
                    fontSize: '200%',
                }}
            >
                Reports
            </h1>

            {showBarChart && (
                <div style={chartContainerStyle}>
                    <Bar data={chartData} options={chartOptions} />
                </div>
            )}
            {showDoughnutChart && (
                <div style={doughnutContainerStyle}>
                    <Doughnut data={doughnutData} options={doughnutOptions} />
                </div>
            )}
            {showOutOfStockList && (
                <div style={{ textAlign: 'center' }}>
                    <h2
                        style={{
                            textAlign: 'center',
                            fontSize: '200%',
                            paddingLeft: '1.5%',
                            paddingBottom: '2%',
                            paddingTop: '4%',
                            font: 'bold',
                        }}
                    >
                        Out of Stock Medicines
                    </h2>
                    <ul
                        style={{
                            margin: '2%',
                            fontSize: '160%',
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
            )}
            <Wrapper>
                <div>
                    {error && <p style={{ color: 'red' }}>{error}</p>}

                    <button onClick={handleShowBarChart} className="button-bar">
                        Top Employee for the Month
                    </button>
                    <button onClick={handleShowDoughnutChart} className="button-doughnut">
                        Classes with the most Medicine
                    </button>
                    <button onClick={handleShowOutOfStockList} className="button-outofstock">
                        Out of Stock Medicines
                    </button>
                </div>
            </Wrapper>
        </div>
    );
};

export default Reports;

const Wrapper = styled.section`
    .parent {
        display: flex;
        height: 100%;
    }
    .button-bar,
    .button-doughnut,
    .button-outofstock {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 30%;
        height: 30%;
        padding: 1.4% 0.5%;
        margin: 5% 38%;
        color: #fff;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 125%;
    }
    .button-bar {
        background-color: #084c61;
    }
    .button-doughnut {
        background-color: #523a28;
    }
    .button-outofstock {
        background-color: #c45b59;
    }
`;
