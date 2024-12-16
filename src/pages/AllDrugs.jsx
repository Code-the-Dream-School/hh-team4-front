import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import { FaFilter } from 'react-icons/fa';
//import { drugData } from '../../data';
//import { TbBellFilled } from 'react-icons/tb';
import { useEffect, useState } from 'react';
import FilterSearch from './FilterSearch';

import { useLocation } from 'react-router-dom';
import LiveSearch from '../components/LiveSearch';
import { useNavigate } from 'react-router-dom';

const AllDrugs = () => {
    const columnLabels = [
        'name',
        'genericName',
        'class',
        'quantity',
        'expirationDate',
        'lot',
        'ndcNumber',
        'view/edit/delete',
    ];

    const editNavigate = useNavigate();

    const handleEdit = (drugId) => {
        console.log('Navigate to edit', drugId);
        editNavigate(`/dashboard/edit/${drugId}`); // Navigate to the Edit Page with the drug ID
    };

    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchsection, setSearchSection] = useState(false);

    //const [liveSearch, SetLiveSearch]= useState([]);

    const location = useLocation();
    const { alarmFilterData: alarmFilterData } = location.state || {};

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('http://localhost:8000/api/v1/inventory', {
            method: 'GET', // Or other HTTP methods like POST, PUT, DELETE, etc.
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response) {
                    throw new error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (alarmFilterData) {
                    // Use the passed alarm filter if available
                    setFilterData(alarmFilterData);
                } else {
                    setData(data.data);
                    setFilterData(data.data);
                }

                setLoading(false);
            })
            .catch((error) => setError(error.message));
    }, [alarmFilterData]);

    const toggleSearch = () => {
        setSearchSection((prevState) => !prevState);
    };

    const handleFilter = (filteredData) => {
        setFilterData(filteredData);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Wrapper>
            {/*  */}

            <div className="centered-container">
                {/* <div className="bell-icon-box">
                    <button className="bell-button" onClick={toggleAlarm}>
                        <TbBellFilled className="bell-icon" />
                    </button>
                </div> */}
                <div className="filter-search-box">
                    <div className="left-filter-box">
                        <button className="filter-button" onClick={toggleSearch}>
                            <FaFilter className="filter-icon" />
                        </button>
                    </div>
                    <div></div>
                    <div className="search-box">
                        <div className="search-icon">
                            <IoIosSearch />
                        </div>
                        <LiveSearch data={data} liveSearchFilter={handleFilter} />
                    </div>
                </div>
            </div>
            <div className="advanced-search">
                {searchsection && (
                    <div>
                        <br />
                        <FilterSearch data={data} onFilter={handleFilter} />
                    </div>
                )}
            </div>
            {/*  */}
            <div className="grid-container">
                {/* Render column headers */}
                {columnLabels.map((label, index) => (
                    <div key={index} className="grid-item grid-header">
                        {label}
                    </div>
                ))}
                {/* Render rows dynamically */}
                {filterData.map((drug, rowIndex) =>
                    columnLabels.map((label, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`} className="grid-item">
                            {label === 'view/edit/delete' ? (
                                <button onClick={() => handleEdit(drug._id)}>Edit</button>
                            ) : (
                                drug[label] || ''
                            )}
                        </div>
                    ))
                )}
            </div>
        </Wrapper>
    );
};

export default AllDrugs;

const Wrapper = styled.section`
        .centered-container {
            display: flex;
        justify-content: space-between;
        align-items: center;
        height: 10vh;
        background-color: #f5f5f5;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }
        .left-filter-box {
            margin - right: 3rem;
    }
        .bell-icon-box {
            align - self: self-start;
        padding-top: 2px;
    }
        .filter-search-box {
            display: flex;
        align-items: center;
        justify-content: center;
    }
        .filter-button {
            border: 15px solid var(--color-green-light);
        border-radius: 50%;
    }
        .filter-icon {
            background: var(--color-green-light);
        color: white;
        font-size: 1.5rem;
    }

        .bell-button {
            border: 15px solid var(--color-alert);
        border-radius: 50%;
    }
        .bell-icon {
            font - size: 1.5rem;
        background-color: var(--color-alert);
        color: white;
    }
        .search-icon {
            font - size: 2rem;
        padding-right: 1rem;
        font-weight: bold;
        color: var(--color-blue-dark);
    }
        .search-box {
            display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px;
    }

        .search-input {
            width: 400px;
        padding: 10px;
        border: 1px solid #ddd;
        border-radius: 4px;
        font-size: 16px;
    }

        .search-input:focus {
            outline: none;
        border-color: var(--color-blue-dark);
        box-shadow: 0 0 4px rgba(0, 123, 255, 0.5);
    }
        .grid-container {
            display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 10px;
        padding: 10px;
    }

        .grid-item {
            padding: 20px;
        border: 1px solid #ccc;
        text-align: left;
        font-size: 1rem;
        text-transform: lowercase;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: var(--border-radius);
        background-color: #fff;
    }

        .grid-header {
            font - weight: bold;
        background-color: var(--color-green-med);
        color: var(--color-blue-dark);
    }
        .advanced-search {
            align - items: center;
        justify-content: center;
        background-color: #f5f5f5;
        border-radius: 8px;
        box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.1);
    }
        `;
