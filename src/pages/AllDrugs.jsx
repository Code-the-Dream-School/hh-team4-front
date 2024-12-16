import styled from 'styled-components';
import { IoIosSearch } from 'react-icons/io';
import { FaFilter } from 'react-icons/fa';
import { drugInfo } from '../../data';
import { TbBellFilled } from 'react-icons/tb';
import React from 'react';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';

const AllDrugs = () => {
    const columnLabels = [
        'name',
        'generic',
        'class',
        'quantity',
        'expiration date',
        'lot #',
        'ndc #',
        'view/edit/delete',
    ];

    return (
        <Wrapper>
            {/*  */}
            <div className="centered-container">
                <div className="bell-icon-box">
                    <button className="bell-button">
                        <TbBellFilled className="bell-icon" />
                    </button>
                </div>
                <div className="filter-search-box">
                    <div className="left-filter-box">
                        <button className="filter-button">
                            <FaFilter className="filter-icon" />
                        </button>
                    </div>
                    <div className="search-box">
                        <div className="search-icon">
                            <IoIosSearch />
                        </div>
                        <input type="text" placeholder="Search ..." className="search-input" />
                    </div>
                </div>
                <div className="blank"></div>
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
                {drugInfo.map((drug, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        {columnLabels.map((label, colIndex) => {
                            // Handle the last column for view/edit/delete icons
                            if (label === 'view/edit/delete') {
                                return (
                                    <div
                                        key={`${rowIndex}-${colIndex}`}
                                        className="grid-item actions"
                                    >
                                        <button className="action-button view">
                                            <FaEye />
                                        </button>
                                        <button className="action-button edit">
                                            <FaEdit />
                                        </button>
                                        <button className="action-button delete">
                                            <FaTrash />
                                        </button>
                                    </div>
                                );
                            }

                            // Map column labels to drug data keys
                            const valueMap = {
                                name: drug.name,
                                generic: drug.genericName,
                                class: drug.class,
                                quantity: drug.quantity,
                                'expiration date': drug.expirationDate,
                                'lot #': drug.lot,
                                'ndc #': drug.ndcNumber,
                            };

                            return (
                                <div key={`${rowIndex}-${colIndex}`} className="grid-item">
                                    {valueMap[label] || ''}
                                </div>
                            );
                        })}
                    </React.Fragment>
                ))}
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
`;
