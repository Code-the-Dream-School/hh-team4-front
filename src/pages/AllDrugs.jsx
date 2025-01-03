import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import { FaFilter } from 'react-icons/fa';
import { AiFillMinusCircle } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import FilterSearch from './FilterSearch';
import { useLocation } from 'react-router-dom';
import LiveSearch from '../components/LiveSearch';
import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { useDashboardContext } from './Dashboard';
// import { TbChevronsDownLeft } from 'react-icons/tb';

const AllDrugs = () => {
    const { user, store } = useDashboardContext();
    const roleOfUser = user.role;
    console.log(roleOfUser);
    console.log(store);
    const columnLabels = [
        'name',
        'genericName',
        'class',
        'quantity',
        'expirationDate',
        'lot',
        'ndcNumber',
        'view/edit/delete/dispense',
    ];

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
    const { alarmFilterData: alarmFilterData } = location.state || {};
    const [currentPage, setCurrentPage] = useState(1);

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
                //  const filteredData = data.data.filter((item) => item.store === store);
                if (alarmFilterData) {
                    setData(alarmFilterData);
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

    const itemsPerPage = 10;
    const totalItems = filterData.length;

    const getCurrentItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filterData.slice(startIndex, endIndex);
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <Wrapper>
            <div className="centered-container">
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
            <div className="grid-container">
                {columnLabels.map((label, index) => (
                    <div key={index} className="grid-item grid-header">
                        {label}
                    </div>
                ))}
                {getCurrentItems().map((drug, rowIndex) =>
                    columnLabels.map((label, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`} className="grid-item">
                            {label === 'view/edit/delete/dispense' ? (
                                <div className="actions">
                                    <button className="action-button view">
                                        <FaEye />
                                    </button>
                                    <button
                                        className="action-button edit"
                                        onClick={() => handleEdit(drug._id)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button className="action-button delete">
                                        <FaTrash />
                                    </button>
                                    <button
                                        className="action-button dispense"
                                        onClick={() => handleDispense(drug._id)}
                                    >
                                        <AiFillMinusCircle />
                                    </button>
                                </div>
                            ) : (
                                drug[label] || ''
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
        font-weight: bold;
        background-color: var(--color-green-med);
        color: var(--color-blue-dark);
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
`;
