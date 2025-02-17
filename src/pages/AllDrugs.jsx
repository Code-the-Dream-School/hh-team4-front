import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import { FaHome, FaFilter, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { AiFillMinusCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import FilterSearch from './FilterSearch';
import { useLocation, useNavigate } from 'react-router-dom';
import LiveSearch from '../components/LiveSearch';
import Pagination from '../components/Pagination';
import { useDashboardContext } from './Dashboard';
import Modal from '../components/Modal';

const useResponsiveView = () => {
    const [view, setView] = useState('mobile');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;

            if (width < 600) {
                setView('mobile');
            } else if (width >= 600 && width < 1024) {
                setView('tablet');
            } else if (width >= 1024 && width < 1440) {
                setView('desktop');
            } else {
                setView('largeDesktop');
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return view;
};

const AllDrugs = () => {
    const { user, store } = useDashboardContext();
    const roleOfUser = user.role;
    const view = useResponsiveView();

    const formatForDatetimeLocal = (isoDate) => {
        if (!isoDate) return '';
        const date = new Date(isoDate);
        return date.toISOString().split('T')[0];
    };

    const allowedFields = () => {
        switch (view) {
            case 'mobile':
                return ['name', 'View/Edit/Delete/Dispense'];
            case 'tablet':
                return ['name', 'quantity', 'lot', 'View/Edit/Delete/Dispense'];
            case 'desktop':
                return ['name', 'quantity', 'lot', 'expirationDate', 'View/Edit/Delete/Dispense'];
            case 'largeDesktop':
                return [
                    'name',
                    'genericName',
                    'class',
                    'quantity',
                    'expirationDate',
                    'lot',
                    'ndcNumber',
                    'View/Edit/Delete/Dispense',
                ];
            default:
                return [];
        }
    };
    const fields = allowedFields();

    const labelMap = {
        name: 'Drug Name',
        genericName: 'Generic Name',
        class: 'Class',
        quantity: 'Quantity',
        expirationDate: 'Expiration Date',
        lot: 'LOT',
        ndcNumber: 'NDC',
        'View/Edit/Delete/Dispense':
            roleOfUser === 'clerk' ? 'View/Dispense' : 'View/Edit/Delete/Dispense',
    };

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [record, setRecord] = useState({
        name: '',
        genericName: '',
        class: '',
        quantity: '',
        expirationDate: '',
        lot: '',
        ndcNumber: '',
    });

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleView = (drugId) => {
        const selectedDrug = data.find((drug) => drug._id === drugId);
        setRecord(selectedDrug);
        openModal();
    };
    const editNavigate = useNavigate();
    const handleEdit = (drugId) => {
        editNavigate(`/dashboard/edit/${drugId}`);
    };
    const handleDispense = (drugId) => {
        editNavigate(`/dashboard/dispense/${drugId}`);
    };

    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [searchsection, setSearchSection] = useState(false);
    const location = useLocation();
    const { alarmFilterData: alarmFilterData, filterTitle } = location.state || {};
    const [currentPage, setCurrentPage] = useState(1);
    const [originalData, setOriginalData] = useState([]);
    const [isFilteredByAlarm, setIsFilteredByAlarm] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [drugToDelete, setDrugToDelete] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');

        fetch('https://medistock.onrender.com/api/v1/inventory', {
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
                if (alarmFilterData) {
                    setOriginalData(data.data);
                    setData(location.state ? alarmFilterData : null);
                    setFilterData(location.state ? alarmFilterData : null);
                    setIsFilteredByAlarm(true);
                } else {
                    const filteredData = data.data.filter(
                        (item) => item.location === store && item.quantity !== 0
                    );
                    setOriginalData(filteredData);
                    setData(filteredData);
                    setFilterData(filteredData);
                    setIsFilteredByAlarm(false);
                }

                setLoading(false);
            })
            .catch((error) => setError(error.message));
    }, [alarmFilterData]);

    const resetToOriginalData = () => {
        setData(originalData);
        setFilterData(originalData);
        setIsFilteredByAlarm(false);
    };

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    const handleDelete = (drugId, drugName) => {
        setDrugToDelete({ drugId, drugName });
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        const token = localStorage.getItem('token');
        fetch(`https://medistock.onrender.com/api/v1/inventory/${drugToDelete?.drugId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error('Failed to delete drug');
                return response.json();
            })
            .then(() => {
                setData((prevData) => prevData.filter((drug) => drug._id !== drugToDelete?.drugId));
                setFilterData((prevFilterData) =>
                    prevFilterData.filter((drug) => drug._id !== drugToDelete?.drugId)
                );
                setShowModal(false);
            })
            .catch((error) => {
                setError(error.message);
                setShowModal(false);
            });
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };
    const closeFilter = () => {
        toggleSearch();
    };

    return (
        <Wrapper>
            <div className="centered-container">
                <div className="filter-search-box">
                    <div className="left-filter-box">
                        <button className="filter-button" onClick={toggleSearch}>
                            <FaFilter className="filter-icon" title="advanced search" />
                        </button>
                    </div>
                    <div className="search-box">
                        <div className="search-icon">
                            <IoIosSearch />
                        </div>
                        <LiveSearch
                            data={data}
                            formName="allDrug"
                            liveSearchFilter={handleFilter}
                        />
                    </div>
                    <div>
                        {isFilteredByAlarm && (
                            <button onClick={resetToOriginalData} className="reset-button">
                                <FaHome className="filter-icon" title="Back to original data" />
                            </button>
                        )}
                    </div>
                    <div className="form-title">{filterTitle}</div>
                </div>
            </div>
            <div className="advanced-search">
                {searchsection && (
                    <div>
                        <br />
                        <FilterSearch
                            data={data}
                            formName="allDrug"
                            onFilter={handleFilter}
                            onClose={closeFilter}
                        />
                    </div>
                )}
            </div>
            <div className="grid-container">
                {fields.map((label, index) => (
                    <div key={index} className="grid-item grid-header">
                        {labelMap[label]}
                    </div>
                ))}
                {getCurrentItems().map((drug, rowIndex) =>
                    fields.map((label, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`} className="grid-item">
                            {label === 'View/Edit/Delete/Dispense' ? (
                                <div className="actions">
                                    <button
                                        className="action-button view"
                                        onClick={() => handleView(drug._id)}
                                    >
                                        <FaEye />
                                    </button>
                                    <Modal
                                        isOpen={isModalOpen}
                                        onClose={closeModal}
                                        record={record}
                                        title="Medication Details"
                                    />
                                    {(roleOfUser === 'admin' ||
                                        roleOfUser === 'inventoryManager') && (
                                        <>
                                            <button
                                                className="action-button edit"
                                                onClick={() => handleEdit(drug._id)}
                                            >
                                                <FaEdit />
                                            </button>
                                            <button
                                                className="action-button delete"
                                                onClick={() => handleDelete(drug._id, drug.name)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </>
                                    )}
                                    <button
                                        className="action-button dispense"
                                        onClick={() => handleDispense(drug._id)}
                                        disabled={drug.quantity === 'Out of Stock' ? true : false}
                                    >
                                        <AiFillMinusCircle />
                                    </button>
                                </div>
                            ) : label === 'expirationDate' ? (
                                formatForDatetimeLocal(drug[label])
                            ) : (
                                <span
                                    style={{
                                        color:
                                            label === 'quantity' && drug[label] === 'Out of Stock'
                                                ? 'red'
                                                : 'inherit',
                                    }}
                                >
                                    {drug[label] || ''}
                                </span>
                            )}
                        </div>
                    ))
                )}
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h5>Are you sure you want to delete {drugToDelete?.drugName}?</h5>
                        <button className="modal-buttons" onClick={handleConfirmDelete}>
                            Yes
                        </button>
                        <button className="modal-buttons" onClick={handleCloseModal}>
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </Wrapper>
    );
};

export default AllDrugs;

const Wrapper = styled.section`
    height: 100vh;
    overflow-x: hidden;
    overflow-y: auto;
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
        margin-right: 0.1rem;
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
        margin-right: 1rem;
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
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
        padding: 10px;
    }

    .grid-item {
        padding: 20px;
        border: 1px solid #ccc;
        text-align: left;
        font-size: 1rem;
        //text-transform: lowercase;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: var(--border-radius);
        background-color: #fff;
    }
    .advanced-search {
        align-items: center;
        justify-content: center;
        background-color: #f5f5f5;
        border-radius: 8px;
        box-shadow: 1px 4px 6px rgba(0, 0, 0, 0.1);
    }
    .actions {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .action-button {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 1.2rem;
        transition: transform 0.2s ease-in-out;
    }

    .action-button:hover {
        transform: scale(1.2);
    }

    .action-button.view {
        color: var(--color-blue-dark);
    }
    .action-button.dispense {
        color: var(--color-blue-dark);
    }

    .action-button.edit {
        color: var(--color-green-dark);
    }

    .action-button.delete {
        color: var(--color-alert);
    }

    .grid-header {
        font-weight: bold;
        background-color: var(--color-green-med);
        color: var(--color-blue-dark);
    }
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        text-align: center;
        font-size: 26px;
        width: 300px;
    }

    .modal-buttons {
        margin: 5px;
        padding: 10px 15px;
        font-size: 15px;
        cursor: pointer;
        border: 2px solid #ccc;
        border-radius: 5px;
        transition:
            background-color 0.3s,
            transform 0.2s;
    }
    .modal-buttons:nth-of-type(1) {
        background-color: var(--color-green-dark);
        color: white;
    }

    .modal-buttons:last-child {
        background-color: var(--color-alert);
        color: white;
    }
    .form-title {
        text-align: center;
        font-size: 90%;
        font-weight: bold;
        margin-left: 200px;
        color: var(--color-blue-dark);
    }
    @media (min-width: 600px) {
        .grid-container {
            grid-template-columns: repeat(4, 1fr);
        }
    }
    @media (min-width: 1024px) {
        .grid-container {
            grid-template-columns: repeat(5, 1fr);
        }
    }
    @media (min-width: 1440px) {
        .grid-container {
            grid-template-columns: repeat(8, 1fr);
        }
    }
`;
