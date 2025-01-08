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

    const formatForDatetimeLocal = (isoDate) => {
        const date = new Date(isoDate);
        const offsetDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
        return offsetDate.toISOString().slice(0, 10);
    };

    const formatDate = (date) => {
        if (!date) return '';
        return formatForDatetimeLocal(date);
    };

    const drugClasses = [
        'Analgesic',
        'Antiinflammatory',
        'Antibiotic',
        'Antihypertensive',
        'Antidiabetic',
        'Other',
    ];

    const handleMedChange = ({ target: { id, value } }) => {
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
        setFormData((prev) => ({
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

    const handleAddMed = (event) => {
        event.preventDefault();
        const errors = validate(formData);
        setErrorsForm(errors);

        addDrugs = {
            ...formData,
        };

        const token = localStorage.getItem('token');

        fetch('http://localhost:8000/api/v1/inventory', {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(addDrugs),
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    toast.success('Registration Successful');
                } else {
                    toast.error(data.error);
                }
            })
            .catch((error) => {
                console.error(error);
            });

        if (isEmpty(errors)) {

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
                            <div className="form-row" key={id}>
                                <StyledLabel htmlFor={id}>
                                    {id.replace(/([A-Z])/g, ' $1').toLowerCase()}{' '}
                                </StyledLabel>
                                {id === 'class' ? (
                                    <div className="form-row">
                                        <select
                                            className="form-input"
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
                                    </div>
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
                                                    placeholder="Quantity"
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
                                                        placeholder="Minimum Amount"
                                                    />
                                                    <p>{errorsForm.threshold}</p>
                                                </div>
                                            </Fieldwrapper>
                                        </FormSection>
                                    </AddMedicineForm>
                                )}
                                {errorsForm[id] && (
                                    <p
                                        style={{
                                            color: 'red',
                                            fontSize: '0.9rem',
                                            marginTop: '0.2rem',
                                        }}
                                    >
                                        {errorsForm[id]}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                    <AddButton type="submit">SAVE DRUG </AddButton>
                </AddForm>
            </div>
        </Wrapper>
    );
}

AddDrug.propTypes = {
    addDrugs: PropTypes.func.isRequired,
};

export const Wrapper = styled.section`
              min-height: 100vh;
              display: grid;
              align-items: center;
              h4 {
                  text - align: center;
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
                  margin - bottom: 0.5rem;
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
                  font - size: 0.9rem;
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
