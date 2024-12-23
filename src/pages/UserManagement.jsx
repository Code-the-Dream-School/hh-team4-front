import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FormRow, Logo } from '../components';

import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import { FaFilter } from 'react-icons/fa';

const UserManagement=()=>{

const [allUserData , setAllUserData] = useState([]) ;

    const columnLabels = [
        'Name',
        'Email',
        'Roll',
        'Inventory',
        'CreationDate',
        'UpdateDate',
        'view/edit/delete',
    ];


useEffect( ()=>{
    fetch('http://localhost:8000/api/v1/users', {
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
            setAllUserData(data.data);
           
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });

},[] );

    const itemsPerPage = 10;
    const totalItems = filterData.length;

    const getCurrentItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return filterData.slice(startIndex, endIndex);
    };


const handelEditUser=(userId)=>{

}

return (
<>


<div className="grid-container">
                {/* Render column headers */}
                {columnLabels.map((label, index) => (
                    <div key={index} className="grid-item grid-header">
                        {label}
                    </div>
                ))}
                {/* Render rows dynamically */}
                {allUserData.map((user, rowIndex) =>
                    columnLabels.map((label, colIndex) => (
                        <div key={`${rowIndex}-${colIndex}`} className="grid-item">
                            {label === 'view/edit/delete' ? (
                                <div className="actions">
                                    <button className="action-button view">
                                        <FaEye />
                                    </button>
                                    <button
                                        className="action-button edit"
                                        onClick={() => handelEditUser(user._id)}
                                    >
                                        <FaEdit />
                                    </button>
                                    <button className="action-button delete">
                                        <FaTrash />
                                    </button>
                                </div>
                            ) : (
                                user[label] || ''
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


</>)
};

export default UserManagement;

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