import React, { useState } from 'react';
import styled from 'styled-components';
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
            console.log('drugname is', formValues.drugName);
            filteredData = filteredData.filter((item) =>
                item.name.toLowerCase().includes(formValues.drugName.toLowerCase())
            );
        }
        if (formValues.genericName) {
            console.log('drugname is', formValues.genericName);
            filteredData = filteredData.filter((item) =>
                item.genericName.toLowerCase().includes(formValues.genericName.toLowerCase())
            );
        }
        if (formValues.class) {
            console.log('class is', formValues.class);
            filteredData = filteredData.filter((item) =>
                item.class.toLowerCase().includes(formValues.class.toLowerCase())
            );
        }

        if (formValues.lot) {
            console.log('lot is', formValues.lot);
            filteredData = filteredData.filter((item) => item.lot === formValues.lot);
        }
        if (formValues.ndcNumber) {
            console.log('ndcNumber is', formValues.ndcNumber);
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
                <div className="grid-container">
                    <div>
                        <label htmlFor="drugName" className="label">
                            Drug Name:{' '}
                        </label>
                        <input
                            name="drugName"
                            className="input"
                            value={formValues.drugName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="genericName" className="label">
                            GenericName:{' '}
                        </label>
                        <input
                            name="genericName"
                            className="input"
                            value={formValues.genericName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="class" className="label">
                            class:{' '}
                        </label>
                        <input
                            name="class"
                            className="input"
                            value={formValues.class}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="lot" className="label">
                            Lot number:{' '}
                        </label>
                        <input
                            name="lot"
                            className="input"
                            value={formValues.lot}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="ndcNumber" className="label">
                            NDC number:{' '}
                        </label>
                        <input
                            name="ndcNumber"
                            className="input"
                            value={formValues.ndcNumber}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="ExpirationdateFrom" className="label">
                            Expirationdate From:{' '}
                        </label>
                        <input
                            name="ExpirationdateFrom"
                            className="input"
                            value={formValues.ExpirationdateFrom}
                            onChange={handleInputChange}
                            type="date"
                        />
                        <label htmlFor="Expirationdateto" className="label">
                            Expirationdate To:{' '}
                        </label>
                        <input
                            name="Expirationdateto"
                            className="input"
                            value={formValues.Expirationdateto}
                            onChange={handleInputChange}
                            type="date"
                        />
                    </div>
                    <div>
                        <button onClick={HandelSearch} className="button">
                            Search
                        </button>
                        <button onClick={HandelCancel} className="button">
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </Wrapper>
    );
}

const Wrapper = styled.section`

 .form-container {
        
        align-items: center;
        background-color: #f5f5f5;
        border-radius: 8px;
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        
    }
.input {
        text-transform: uppercase;
        width: 100%;
        padding: 0.375rem 0.75rem;
        border-radius: var(--border-radius);
        border: 2px solid var(--red-300);
        color: var(--text-color);
        height: 35px;
        background-color: white;
    }
    .label {
       text-transform: lowercase;
        display: block;
        font-size: var(--small-text);
        margin-bottom: 0.75rem;
        text-transform: capitalize;
        letter-spacing: var(--letter-spacing);
        line-height: 1.5;
    }
     .grid-container {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows:repeat(2, 1fr);
        gap: 50px;
        padding: 50px;
    }
        .button{
        border: 15px solid ;
        border-radius: 50%;
        }
}
`;
