import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import { FaFilter, FaEye } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useDashboardContext } from './Dashboard';
import Modal from '../components/Modal';
import FilterSearch from './FilterSearch';
//import { useLocation } from 'react-router-dom';
import LiveSearch from '../components/LiveSearch';
import Pagination from '../components/Pagination';

const PastOrders = () => {
    const columnLabels = [
        'drugName',
        'genericName',
        'lot',
        'className',
        'dispensedQuantity',
        'dispensedDate',
        'view',
    ];

    const [record, setRecord] = useState({
        drugName: '',
        genericName: '',
        lot: '',
        className: '',
        dispensedQuantity: '',
        dispensedDate: '',
    });
    //const [logs, setLogs] = useState([]);
    const [filteredlogs, setFilteredLogs] = useState([]);
    const { store } = useDashboardContext();
    const [loading, setLoading] = useState(true);
    const [searchsection, setSearchSection] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterData, setFilterData] = useState([]);
    const [error, setError] = useState(false);
    //const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleView = (dispensedDrugId) => {
        const selectedDrug = filteredlogs.find((drug) => drug.dispensedId === dispensedDrugId);

        setRecord(selectedDrug);
        openModal();
    };

    const token = localStorage.getItem('token');

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/dispense-logs`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Contetnt-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                // setLogs(data.logs);
                const extractLogs = data.logs
                    .filter((log) => log.medicationId?.location === store)
                    .map((log) => ({
                        drugName: log.medicationId?.name || 'N/A',
                        genericName: log.medicationId?.genericName || 'N/A',

                        className: log.medicationId?.class || 'N/A',
                        lot: log.medicationId?.lot || 'N/A',
                        dispensedQuantity: log.quantity || 0,
                        dispensedDate: log.dispenseDate || 'N/A',
                        dispensedId: log._id,
                        view: '', // Keep this for the action column
                    }));

                setFilteredLogs(extractLogs);
                setFilterData(extractLogs);
                setLoading(false);
            })
            .catch((error) => setError(error.message));
    }, []);

    const toggleSearch = () => {
        setSearchSection((prevState) => !prevState);
    };

    const handleFilter = (filteredData) => {
        setFilterData(filteredData);
    };

    const itemsPerPage = 10;
    const totalItems = filterData.length;

    const getCurrentItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filterData.slice(startIndex, endIndex);
    };
    const closeFilter=()=>{
    
        toggleSearch();
    
    }
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Wrapper>
            {/*  */}
            <div className="centered-container">
                <div className="filter-search-box">
                    <div className="left-filter-box">
                        <button className="filter-button" onClick={toggleSearch}>
                            <FaFilter className="filter-icon" />
                        </button>
                    </div>
                    <div className="search-box">
                        <div className="search-icon">
                            <IoIosSearch />
                        </div>
                        <LiveSearch
                            data={filteredlogs}
                            liveSearchFilter={handleFilter}
                            formName="pastOrders"
                        />
                    </div>
                </div>
            </div>
            <div className="advanced-search">
                {searchsection && (
                    <div>
                        <br />
                        <FilterSearch
                            data={filteredlogs}
                            onFilter={handleFilter}
                            formName="pastOrders"
                            onClose={closeFilter}
                        />
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

                {getCurrentItems().map((drug, rowIndex) =>
                    columnLabels.map((label, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`} className="grid-item">
                            {label === 'view' ? (
                                <div className="actions">
                                    <button
                                        className="action-button view"
                                        onClick={() => handleView(drug.dispensedId)}
                                    >
                                        <FaEye />
                                    </button>
                                    <Modal
                                        isOpen={isModalOpen}
                                        onClose={closeModal}
                                        record={record}
                                        title="Dispensed Medication Details"
                                    />
                                </div>
                            ) : (
                                drug[label] || 'N/A' // Use a fallback for missing values
                            )}
                        </div>
                    ))
                )}
            </div>
            <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </Wrapper>
    );
};

export default PastOrders;

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
        margin-right: 3rem;
    }
    .bell-icon-box {
        align-self: self-start;
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
        font-size: 1.5rem;
        background-color: var(--color-alert);
        color: white;
    }
    .search-icon {
        font-size: 2rem;
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
        grid-template-columns: repeat(7, 1fr);
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
        font-weight: bold;
        background-color: var(--color-green-med);
        color: var(--color-blue-dark);
    }
`;
