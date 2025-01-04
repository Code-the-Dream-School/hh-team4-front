import React, { useState } from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import { IoClose } from 'react-icons/io5';
//import { drugData } from './data.jsx'; // Update path accordingly

export default function FilterSearch({ data, onFilter }) {
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

    const HandelSearch = (e) => {
        e.preventDefault();

        let filteredData = data;

        // Apply filters

        if (formValues.drugName) {
            filteredData = filteredData.filter((item) =>
                item.name.toLowerCase().includes(formValues.drugName.toLowerCase())
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
            filteredData = filteredData.filter((item) => item.ndcNumber === formValues.ndcNumber);
        }

        if (formValues.ExpirationdateFrom && formValues.Expirationdateto) {
            filteredData = filteredData.filter(
                (item) =>
                    new Date(item.expirationDate) >= new Date(formValues.ExpirationdateFrom) &&
                    new Date(item.expirationDate) <= new Date(formValues.Expirationdateto)
            );
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

    return (
        <Wrapper>
            <form className="form-container">
                <IoClose className="close-btn" onClick={HandelCancel} />
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
                            NDC #:{' '}
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
                            expiration date from:{' '}
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
                            expiration date to:{' '}
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
                                Search
                                <MdSearch className="search" />
                            </div>
                        </button>
                        <button onClick={HandelCancel} className="btn2 btn btn-block">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.section`
    .close-btn {
        position: relative;
        float: right;
        color: var(--color-blue-dark);
        top: 0px;
        right: 0px;
        font-size: 2.5rem;
    }
    .heading {
        font-weight: bold;
        color: var(--color-blue-dark);
        padding-top: 1rem;
        padding-left: 1rem;
    }
    .form-input {
         padding: 0rem 0.25rem;
    }
    .form-container {
        align-items: center;
        background-color: #f5f5f5;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border:'solid';
    }
   .grid-container {
        display: grid;
        grid-template-columns:1fr 1fr; // repeat(2, 1fr);
        grid-template-rows: repeat(2, 1fr);
        padding: 1rem;
        
    }
    .date {
    }
    .buttons-box {
        display: flex;
        margin-top: 2rem;
    }
    .btn2 {
        margin-left: 0.5rem;
        background-color: var(--color-alert);
    }
    .inside-button {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .search {
        padding-left: 0.25rem;
        font-size: 1.5rem;
    }
`;
