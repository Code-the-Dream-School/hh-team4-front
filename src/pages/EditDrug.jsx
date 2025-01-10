import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditMedicineForm from '../components/EditMedicineForm';
import styled from 'styled-components';
import Logo from '../components/Logo';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function EditDrug() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [editData, setEditData] = useState({
        name: '',
        genericName: '',
        class: '',
        quantity: '',
        threshold: '',
        expirationDate: '',
        ndcNumber: '',
        lot: '',
    });

    const [errorsForm, setErrorsForm] = useState({
        name: '',
        genericName: '',
        class: '',
        quantity: '',
        threshold: '',
        expirationDate: '',
        ndcNumber: '',
        lot: '',
    });

    const drugClasses = [
        'Antibiotic',
        'Analgesic',
        'Antihistamine',
        'Antidepressant',
        'Antiviral',
        'Antifungal',
        'Other',
    ];

    useEffect(() => {
        const token = localStorage.getItem('token');
        fetch(`http://localhost:8000/api/v1/inventory/${id}`, {
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
                delete data.data.createdBy;
                delete data.data._id;
                delete data.data.createdAt;
                delete data.data.__v;
                delete data.data.updatedAt;
                delete data.data.store;
                setEditData(data.data);
            })
            .catch((error) => console.error('Error:', error));
    }, [id]);

    const handleInputChange = (event) => {
        const { id, value } = event.target;

        if (id === 'name') {
            if (value.length <= 0) {
                setErrorsForm((prevErrors) => ({
                    ...prevErrors,
                    name: 'Please provide Medication Name',
                }));
            } else {
                setErrorsForm({});
            }
        }

        if (id === 'genericName') {
            if (value.length <= 0) {
                setErrorsForm((prevErrors) => ({
                    ...prevErrors,
                    genericName: 'Please provide Generic Medication Name',
                }));
            } else {
                setErrorsForm({});
            }
        }

        if (id === 'quantity') {
            if (parseInt(value) < 0) {
                setErrorsForm((prevErrors) => ({
                    ...prevErrors,
                    quantity: 'Please provide Quantity must be a non-negative number',
                }));
            } else {
                setErrorsForm({});
            }
        }

        if (id === 'threshold') {
            if (parseInt(value) < 10) {
                setErrorsForm((prevErrors) => ({
                    ...prevErrors,
                    threshold: 'Please provide threshold quantity greater than 10',
                }));
            } else {
                setErrorsForm({});
            }
        }

        if (id === 'expirationDate') {
            if (value.length <= 0) {
                setErrorsForm((prevErrors) => ({
                    ...prevErrors,
                    expirationDate: 'Please provide Expiration Date',
                }));
            } else {
                setErrorsForm({});
            }
        }

        if (id === 'ndcNumber') {
            if (value.length <= 0) {
                setErrorsForm((prevErrors) => ({
                    ...prevErrors,
                    ndcNumber: 'Please provide NDC Number',
                }));
            } else {
                setErrorsForm({});
            }
        }

        if (id === 'lot') {
            if (value.length <= 0) {
                setErrorsForm((prevErrors) => ({
                    ...prevErrors,
                    lot: 'Please provide LOT Number',
                }));
            } else {
                setErrorsForm({});
            }
        }

        setEditData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = 'Please provide Medication Name';
        }
        if (!values.genericName) {
            errors.genericName = 'Please provide Generic Medication Name';
        }
        if (!values.quantity) {
            errors.quantity = 'Please provide Quantity must be a non-negative number';
        }
        if (!values.threshold) {
            errors.threshold = 'Please provide threshold quantity';
        } else if (values.threshold < 10) {
            errors.threshold = 'Threshold must be higher than 10';
        }
        if (!values.expirationDate) {
            errors.expirationDate = 'Please provide Expiration Date';
        }
        if (!values.ndcNumber) {
            errors.ndcNumber = 'Please provide NDC Number';
        }
        if (!values.lot) {
            errors.lot = 'Please provide Lot Code';
        }
        return errors;
    };
    const isEmpty = (obj) => Object.keys(obj).length === 0;

    const handleSaveChanges = (event) => {
        event.preventDefault();
        const errors = validate(editData);
        setErrorsForm(errors);
        if (isEmpty(errors)) {
            const token = localStorage.getItem('token');
            fetch(`http://localhost:8000/api/v1/inventory/${id}`, {
                method: 'PATCH',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...editData,
                }),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then((data) => {
                    if (data.success) {
                        toast.success('Changes saved successfully');
                        navigate('/dashboard');
                    } else {
                        toast.error(data.error || 'Failed to save changes');
                    }
                })
                .catch((error) => console.error('Error:', error));
        }
    };

    const renderFormRow = (id, value) => (
        <div className="form-row" key={id}>
            <StyledLabel htmlFor={id}>{id.replace(/([A-Z])/g, ' $1').toLowerCase()}</StyledLabel>
            {id === 'class' ? (
                <select className="form-input" id={id} value={value} onChange={handleInputChange}>
                    <option value="" disabled>
                        Select a class
                    </option>
                    {drugClasses.map((drugClass) => (
                        <option key={drugClass} value={drugClass}>
                            {drugClass}
                        </option>
                    ))}
                </select>
            ) : (
                <EditMedicineForm
                    type={id === 'expirationDate' ? 'date' : 'text'}
                    id={id}
                    value={value}
                    handleInputChange={handleInputChange}
                    placeholder={id.replace(/([A-Z])/g, ' $1')}
                />
            )}
            {errorsForm[id] && (
                <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                    {errorsForm[id]}
                </p>
            )}
        </div>
    );

    return (
        <Wrapper>
            <AddForm onSubmit={handleSaveChanges}>
                <div>
                    <Logo />
                    <h4>EDIT DRUG</h4>
                    {Object.entries(editData).map(([id, value]) => renderFormRow(id, value))}
                </div>
                <SaveButton type="submit">Save Changes</SaveButton>
            </AddForm>
        </Wrapper>
    );
}

export const Wrapper = styled.section`
    min-height: 100vh;
    display: grid;
    align-items: center;
    h4 {
        text-align: center;
        margin-bottom: 1.38rem;
    }
    .logo {
        display: block;
        margin: 0 auto;
        margin-bottom: 1.38rem;
    }
`;

export const FormField = styled.div``;

export const AddForm = styled.form`
    width: 90vw;
    max-width: 400px;
    border-top: 5px solid var(--color-blue-dark);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    padding: 2rem 2.5rem;
    margin: 3rem auto;
`;

export const StyledLabel = styled.label`
    text-transform: lowercase;
    display: block;
    font-size: var(--small-text);
    margin-bottom: 0.75rem;
    text-transform: capitalize;
    letter-spacing: var(--letter-spacing);
    line-height: 1.5;
`;

export const FormSection = styled.div`
    width: 90vw;
    max-width: var(--fixed-width);
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-2);
    padding: 2rem 2.5rem;
    margin: 3rem auto;
`;

export const Fieldwrapper = styled.div`
    .form-row {
        margin-bottom: 0.5rem;
    }
    input {
        width: 100%;
        padding: 0.375rem 0.75rem;
        border-radius: var(--border-radius);
        border: 1px solid var(--grey-300);
        color: var(--text-color);
        height: 35px;
        background-color: white;
    }
    label {
        font-size: 0.9rem;
        text-transform: lowercase;
    }
`;

export const SaveButton = styled.button`
    margin-top: 1rem;
    background-color: var(--color-blue-dark);
    width: 100%;
    cursor: pointer;
    color: var(--white);
    border: transparent;
    border-radius: var(--border-radius);
    letter-spacing: var(--letter-spacing);
    padding: 1rem 4rem;
    box-shadow: var(--shadow-1);
    transition: var(--transition);
    text-transform: capitalize;
    display: inline-block;
`;

export const Overlay = styled.div`
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
`;

export const DeleteButton = styled.button`
    background-color: rgb(34, 63, 75);
    color: white;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    padding: 0.2em 3em; /* Smaller padding */
    font-size: 0.8em; /* Smaller font size */
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
`;
