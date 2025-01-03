import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import Pagination from '../components/Pagination';
import { useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

const UserManagement = () => {
    const [allUserData, setAllUserData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const navigate = useNavigate();

    const columnLabels = [
        'name',
        'email',
        'role',
        'store',
        //'creationAt',
        //'updatedAt',
        'view/edit/delete',
    ];

    const token = localStorage.getItem('token');
    const currentUserId = localStorage.getItem('userId');

    useEffect(() => {
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
    }, []);

    const itemsPerPage = 10;
    const totalItems = allUserData.length;

    const getCurrentItems = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return allUserData.slice(startIndex, endIndex);
    };

    const handelEditUser = (userId) => {
        navigate(`/dashboard/User/${userId}`);
    };
    const handelDeleteUser = (userDelId) => {
        fetch(`http://localhost:8000/api/v1/users/${userDelId}`, {
            method: 'DELETE',
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
            .then(() => {
                setAllUserData((prevData) => prevData.filter((user) => user._id !== userDelId));
                toast.success('Data Deleted successfully!');
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };
    const handelCreateUser = () => {
        navigate('/register');
    };

    return (
        <>
            <Wrapper>
                <div className="top-container">
                    <button className="action-button" name="createUser" onClick={handelCreateUser}>
                        <FaUserPlus />
                        <span className="description">Register New User</span>
                    </button>
                </div>

                <div className="grid-container">
                    {/* Render column headers */}
                    {columnLabels.map((label, index) => (
                        <div key={index} className="grid-item grid-header">
                            {label}
                        </div>
                    ))}
                    {/* Render rows dynamically */}
                    {getCurrentItems().map((user, rowIndex) =>
                        columnLabels.map((label, colIndex) => (
                            <div key={`${rowIndex}-${colIndex}`} className="grid-item">
                                {label === 'view/edit/delete' ? (
                                    <div className="actions">
                                        <button
                                            className="action-button edit"
                                            onClick={() => handelEditUser(user._id)}
                                        >
                                            <FaEdit />
                                        </button>
                                        <button
                                            className={
                                                user._id !== currentUserId
                                                    ? 'action-button delete'
                                                    : 'action-button.delete.disabeld'
                                            }
                                            onClick={() => handelDeleteUser(user._id)}
                                            disabled={user._id === currentUserId ? true : false}
                                        >
                                            <FaTrash />
                                        </button>
                                    </div>
                                ) : (
                                    user[label]
                                )}
                            </div>
                        ))
                    )}
                </div>
            </Wrapper>
            <Pagination
                totalItems={totalItems}
                itemsPerPage={itemsPerPage}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
            />
        </>
    );
};

export default UserManagement;

const Wrapper = styled.section`
    .top-container {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .grid-container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
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

    .actions {
        display: flex;
        justify-content: space-around;
        align-items: center;
    }

    .action-button {
        display: flex;
        justify-content: flex-start;
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
    .action-button.delete.disabeld {
        color: var(--color-gray);
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

    .description {
        margin: 0;
    }
`;
