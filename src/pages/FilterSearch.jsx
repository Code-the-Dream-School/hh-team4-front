import React, { useState } from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
//import { drugData } from './data.jsx'; // Update path accordingly

export default function FilterSearch({ formName, data, onFilter, onClose }) {
    const [formValues, setFormValues] = useState({
        drugName: '',
        genericName: '',
        class: '',
        quantity: '',
        lot: '',
        ndcNumber: '',
        ExpirationdateFrom: '',
        Expirationdateto: '',
    });

    const [sortField, setSortField] = useState('');

    const handleSortChange = (e) => {
        setSortField(e.target.value);
        if (e.target.value) {
            const sortedData = [...data].sort((a, b) => {
                if (a[e.target.value] < b[e.target.value]) return -1;
                if (a[e.target.value] > b[e.target.value]) return 1;
                return 0;
            });
            onFilter(sortedData);
        } else {
            onFilter(data);
        }
    };

    const HandelSearch = (e) => {
        e.preventDefault();

        let filteredData = data;

        if (formValues.drugName) {
            if (formName === 'allDrug')
                filteredData = filteredData = filteredData.filter((item) =>
                    item.name.toLowerCase().includes(formValues.drugName.toLowerCase())
                );
            if (formName === 'pastOrders')
                filteredData = filteredData = filteredData.filter((item) =>
                    item.drugName.toLowerCase().includes(formValues.drugName.toLowerCase())
                );
        }
        if (formValues.genericName) {
            filteredData = filteredData.filter((item) =>
                item.genericName.toLowerCase().includes(formValues.genericName.toLowerCase())
            );
        }
        if (formValues.class) {
            filteredData = filteredData.filter((item) =>
                item.class.toLowerCase().includes(formValues.class.toLowerCase())
            );
        }

        if (formValues.lot) {
            filteredData = filteredData.filter((item) => item.lot === formValues.lot);
        }
        if (formValues.ndcNumber) {
            if (formName === 'allDrug')
                filteredData = filteredData.filter(
                    (item) => item.ndcNumber === formValues.ndcNumber
                );
            if (formName === 'pastOrders')
                filteredData = filteredData.filter(
                    (item) => item.dispensedQuantity === formValues.ndcNumber
                );
        }

        if (formName === 'allDrug') {
            if (formValues.ExpirationdateFrom && formValues.Expirationdateto) {
                filteredData = filteredData.filter(
                    (item) =>
                        new Date(item.expirationDate) >= new Date(formValues.ExpirationdateFrom) &&
                        new Date(item.expirationDate) <= new Date(formValues.Expirationdateto)
                );
            }
        } else if (formName === 'pastOrders') {
            if (formValues.ExpirationdateFrom && formValues.Expirationdateto) {
                filteredData = filteredData.filter(
                    (item) =>
                        new Date(item.dispensedDate) >= new Date(formValues.ExpirationdateFrom) &&
                        new Date(item.dispensedDate) <= new Date(formValues.Expirationdateto)
                );
            }
        }
        if (formValues.type) {
            filteredData = filteredData.filter((item) =>
                item.type.toLowerCase().includes(formValues.type.toLowerCase())
            );
        }
        onFilter(filteredData);
    };
    const HandelCancel = () => {
        setFormValues({
            drugName: '',
            genericName: '',
            class: '',
            quantity: '',
            lot: '',
            ndcNumber: '',
            ExpirationdateFrom: '',
            Expirationdateto: '',
        });
        //onFilter(data);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const sortOptions =
        formName === 'allDrug'
            ? ['name', 'genericName', 'class', 'expirationDate']
            : ['drugName', 'dispensedQuantity', 'dispensedDate'];

    return (
        <Wrapper>
            <form className="form-container">
                <IoClose className="close-btn" onClick={onClose} />
                <h4 className="heading">Search Options:</h4>
                <div className="grid-container">
                    <div>
                        <label htmlFor="drugName" className="form-label">
                            drug name:{' '}
                        </label>
                        <input
                            name="drugName"
                            className="form-input"
                            value={formValues.drugName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="genericName" className="form-label">
                            generic name:{' '}
                        </label>
                        <input
                            name="genericName"
                            className="form-input"
                            value={formValues.genericName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="class" className="form-label">
                            class:{' '}
                        </label>
                        <input
                            name="class"
                            className="form-input"
                            value={formValues.class}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="lot" className="form-label">
                            lot #:{' '}
                        </label>
                        <input
                            name="lot"
                            className="form-input"
                            value={formValues.lot}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="ndcNumber" className="form-label">
                            {formName === 'allDrug' ? 'NDC#:' : 'dispenseQuantity:'}
                        </label>
                        <input
                            name="ndcNumber"
                            className="form-input"
                            value={formValues.ndcNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="ExpirationdateFrom" className="form-label">
                            {formName === 'allDrug'
                                ? 'Expiration date from:'
                                : 'Dispense date from:'}
                        </label>
                        <input
                            name="ExpirationdateFrom"
                            className="form-input"
                            value={formValues.ExpirationdateFrom}
                            onChange={handleInputChange}
                            type="date"
                        />
                    </div>
                    <div>
                        <label htmlFor="Expirationdateto" className="form-label date">
                            {formName === 'allDrug' ? 'expiration date to:' : 'Dispense date to:'}
                        </label>
                        <input
                            name="Expirationdateto"
                            className="form-input"
                            value={formValues.Expirationdateto}
                            onChange={handleInputChange}
                            type="date"
                        />
                    </div>
                    <div className="buttons-box">
                        <button onClick={HandelSearch} className="btn btn-block">
                            <div className="inside-button">
                                <MdSearch className="search" />
                                Search
                            </div>
                        </button>
                        <button onClick={HandelCancel} className="btn2 btn btn-block">
                            Cancel
                        </button>
                    </div>
                </div>
                <hr />
                <div className="sort-container">
                    <label htmlFor="sortField" className="form-label">
                        Sort By:{' '}
                    </label>
                    <select
                        name="sortField"
                        className="form-input"
                        value={sortField}
                        onChange={handleSortChange}
                    >
                        <option value="">Select</option>
                        {sortOptions.map((option) => (
                            <option key={option} value={option}>
                                {option.charAt(0).toUpperCase() + option.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    // .close-btn {
    //     position: relative;
    //     float: right;
    //     color: var(--color-blue-dark);
    //     top: 0px;
    //     right: 0px;
    //     font-size: 2.5rem;
    // }
    // .heading {
    //     font-weight: bold;
    //     color: var(--color-blue-dark);
    //     padding-top: 1rem;
    //     padding-left: 1rem;
    // }
    // .form-input {
    //     padding: 0rem 0.25rem;
    // }
    //     .form-label {
    //     text-transform: lowercase;
    // }
    // .form-container {
    //     align-items: center;
    //     background-color: #f5f5f5;
    //     border-radius: 8px;
    //     background-color: #fff;
    //     box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    //     border: 'solid';
    // }
    // .grid-container {
    //     display: grid;
    //     grid-template-columns: 1fr 1fr; // repeat(2, 1fr);
    //     grid-template-rows: repeat(2, 1fr);

    // }
    // .date {
    // }
    // .buttons-box {
    //     display: flex;
    //     margin-top: 2rem;
    // }
    // .btn2 {
    //     margin-left: 0.5rem;
    //     background-color: var(--color-alert);
    // }
    // .inside-button {
    //     display: flex;
    //     justify-content: center;
    //     align-items: center;
    // }
    // .search {
    //     padding-left: 0.25rem;
    //     font-size: 1.5rem;
    // }
    //     .sort-container{
    //         display:flex ;
    //         align-items: center;
    //         justify-items:center ;
    //     }
    //     .sort-container .form-input {
    //     width: auto;
    //     padding: 0.25rem 0.5rem;
    // }
    .inside-button {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    close-btn {
        position: relative;
        float: right;
        color: var(--color-blue-dark);
        font-size: 2.5rem;
    }
    .heading {
        font-weight: bold;
        color: var(--color-blue-dark);
        padding: 1rem;
    }
    .form-container {
        margin: auto;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        padding: 1rem;
    }
    .grid-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 1rem;
    }
    .form-input {
        padding: 0.5rem;
        width: 100%;
        border: 1px solid #ccc;
        border-radius: 4px;
    }
    .form-label {
        display: block;
        font-weight: bold;
        margin-bottom: 0.5rem;
        color: #333;
    }
    .buttons-box {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
        justify-content: center;
    }
    .btn {
        padding: 0.5rem 1rem;
        border: none;
        background-color: var(--color-blue-dark);
        color: #fff;
        cursor: pointer;
        border-radius: 4px;
    }
    .btn2 {
        background-color: var(--color-alert);
    }
    .sort-container {
        display: flex;
        align-items: center;
        margin-top: 1rem;
        gap: 1rem;
        justify-content: flex-start;
    }
    .sort-container .form-input {
        width: auto;
        padding: 0.25rem 0.5rem;
    }
`;
