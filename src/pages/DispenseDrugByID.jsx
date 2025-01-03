import styled from 'styled-components';
import { FormRow, Logo } from '../components';
import { useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const DispenseDrugByID = () => {
    const { id } = useParams();
    const url = `http://localhost:8000/api/v1/inventory/${id}`;

    const [drugToBeDispensed, setDrugToBeDispensed] = useState({
        name: '',
        quantity: '',
        ndcNumber: '',
        lot: '',
    });
    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch drug data');
                return response.json();
            })
            .then((data) => {
                console.log(data.data);
                setDrugToBeDispensed(data.data);
            })
            .catch((error) => console.error('Error:', error));
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDrugToBeDispensed((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDispensedDrug = (event) => {
        event.preventDefault();

        const token = localStorage.getItem('token');
        fetch(url, {
            method: 'PATCH',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(drugToBeDispensed),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });

        setDrugToBeDispensed({
            name: '',
            quantity: '',
            ndcNumber: '',
            lot: '',
        });
    };
    console.log(`name of drug dispensed ${drugToBeDispensed.name}`);
    return (
        <Wrapper>
            <form className="form" onSubmit={handleDispensedDrug}>
                <Logo />
                <h4>Dispense Drug</h4>
                <FormRow
                    type="text"
                    name="name"
                    labelText="name"
                    value={drugToBeDispensed.name || ''}
                    onChange={handleChange}
                />
                <FormRow
                    type="number"
                    name="quantity"
                    labelText="Quantity"
                    value={drugToBeDispensed.quantity || ''}
                    onChange={handleChange}
                />
                <FormRow type="text" name="lot" labelText="lot #" value={drugToBeDispensed.lot} />
                <FormRow
                    type="text"
                    name="ndcNumber"
                    labelText="ndc #"
                    placeholder="NDC Number"
                    value={drugToBeDispensed.ndcNumber || ''}
                    onChange={handleChange}
                />
                <button type="submit" className="btn btn-block">
                    Dispense Medication
                </button>
            </form>
        </Wrapper>
    );
};

export default DispenseDrugByID;

const Wrapper = styled.section`
    min-height: 100vh;
    display: grid;
    align-items: center;
    .logo {
        display: block;
        margin: 0 auto;
        margin-bottom: 1.38rem;
    }
    .form {
        max-width: 400px;
        border-top: 5px solid var(--color-blue-dark);
    }
    .form-label {
        text-transform: lowercase;
    }
    .form-input {
        background-color: var(--grey-50);
    }
    h4 {
        text-align: center;
        margin-bottom: 1.38rem;
    }
    p {
        margin-top: 1rem;
        text-align: center;
        line-height: 1.5;
    }
    .btn {
        margin-top: 1rem;
    }
    .member-btn {
        color: var(--primary-500);
        letter-spacing: var(--letter-spacing);
        margin-left: 0.25rem;
    }
    .secondary {
        background-color: var(--color-green-med);
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.6rem;
        padding-bottom: 0.6rem;
    }
    .scan-icon {
        padding-right: 10px;
        font-size: 2rem;
    }
`;
