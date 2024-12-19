import React, { useState } from 'react';
import PropTypes from 'prop-types';
import AddMedicineForm from '../components/AddMedicineForm';
import Logo from '../components/Logo';
import styled from 'styled-components';
import { toast } from 'react-toastify';
export default function AddDrug({ addDrugs }) {
    const [formData, setFormData] = useState({
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

    const formatDate = (date) => {
        if (!date) return '';
        return new Date(date).toISOString().split('T')[0];
    };

    const drugClasses = [
        "Analgesic",
        "Antiinflammatory",
        "Antibiotic",
        "Antihypertensive",
        "Antidiabetic",
        "Other",
    ];

    const handleMedChange = ({ target: { id, value } }) => {
        setFormData((prev) => ({
            ...prev,
            [id]:
                id === 'quantity' || id === 'threshold'
                    ? Math.max(0, parseInt(value, 10)) || ''
                    : id === 'expirationDate'
                        ? formatDate(value)
                        : value,
        }));
    };
    const validate = (values) => {
        const errors = {};

        if (!values.name) {
            errors.name = "Please provide Medication Name"
        }
        if (!values.genericName) {
            errors.genericName = "Please provide Generic Medication Name"
        }
        if (!values.quantity) {
            errors.quantity = "Please provide Quantity must be a non-negative number"
        }
        if (!values.threshold) {
            errors.threshold = "Please provide threshold quantity"
        } else if (values.threshold < 10) {
            errors.threshold = "Threshold must be higher than 10"
        }
        if (!values.expirationDate) {
            errors.expirationDate = "Please provide Expiration Date"
        }
        if (!values.ndcNumber) {
            errors.ndcNumber = "Please provide NDC Number"
        }
        if (!values.lot) {
            errors.lot = "Please provide Lot Code"
        }
        return errors;
    }
    const isEmpty = (obj) => Object.keys(obj).length === 0
    const handleAddMed = (event) => {
        event.preventDefault();

        const errors = validate(formData);

        setErrorsForm(errors);

        addDrugs = {
            ...formData,
        };

        const token = localStorage.getItem('token');
        if (formData.threshold > 10) {
            fetch('http://localhost:8000/api/v1/inventory', {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(addDrugs),
            })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to add drug, please try again.');
                    }
                    return response.json();
                })
                .then(() => {
                    toast.success('Registration Successful');
                })
                .catch((error) => {
                    console.error(error)
                });
        }

        if (isEmpty(errors)) {
            console.log("this are errors", errors)

            setFormData({
                name: '',
                genericName: '',
                class: '',
                quantity: '',
                threshold: '',
                expirationDate: '',
                ndcNumber: '',
                lot: '',
            });
        }
    };


    return (
        <Wrapper>
            <div>
                <AddForm onSubmit={handleAddMed}>
                    <div>
                        <Logo />
                        <h4>ADD DRUG</h4>
                        {Object.entries(formData).map(([id, value]) => (
                            <div key={id} >
                                <StyledLabel htmlFor={id}>
                                    {id.replace(/([A-Z])/g, ' $1').toLowerCase()}{' '}
                                </StyledLabel>
                                {id === 'class' ? (
                                    <select
                                        id={id}
                                        value={value}
                                        onChange={handleMedChange}
                                    >
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
                                    <AddMedicineForm
                                        type={id === 'expirationDate' ? 'date' : 'text'}
                                        id={id}
                                        value={value}
                                        handleMedChange={handleMedChange}
                                        placeholder={id.replace(/([A-Z])/g, ' $1')}
                                    >
                                        <p>{errorsForm}</p>
                                        <FormSection>
                                            <Fieldwrapper>
                                                <StyledLabel htmlFor="quantity">
                                                    Quantity
                                                </StyledLabel>
                                                <AddMedicineForm
                                                    type="number"
                                                    id="quantity"
                                                    value={formData.quantity}
                                                    handleMedChange={handleMedChange}
                                                    placeholder="QUANTITY"
                                                />
                                                <p>{errorsForm.quantity}</p>
                                            </Fieldwrapper>
                                            <Fieldwrapper>
                                                <div className="form-row">
                                                    <StyledLabel htmlFor="threshold">
                                                        Min Amount
                                                    </StyledLabel>
                                                    <AddMedicineForm
                                                        type="number"
                                                        id="threshold"
                                                        value={formData.threshold}
                                                        handleMedChange={handleMedChange}
                                                        placeholder="MIN AMOUNT"
                                                    />
                                                    <p>{errorsForm.threshold}</p>
                                                </div>
                                            </Fieldwrapper>
                                        </FormSection>
                                    </AddMedicineForm>
                                )}
                                {errorsForm[id] && (
                                    <p style={{ color: 'red', fontSize: '0.9rem', marginTop: '0.2rem' }}>
                                        {errorsForm[id]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>

                    <AddButton type="submit" >
                        SAVE DRUG{' '}
                    </AddButton>
                </AddForm>
            </div>
        </Wrapper>
    );
}

AddDrug.propTypes = {
    addDrugs: PropTypes.func.isRequired,
    drugs: PropTypes.arrayOf(PropTypes.object),
};

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
        text-transform: uppercase;
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

export const AddButton = styled.button`
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
