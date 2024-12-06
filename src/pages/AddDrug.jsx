import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddMedicineForm from '../components/AddMedicineForm';
import Logo from '../components/Logo';

import styled from 'styled-components';

export default function AddDrug({ addDrugs }) {
    const [modal, setModal] = useState(false);
    const [drugs, setDrugs] = useState([]);

    const toggleModal = () => {
        setModal(!modal);
    };

    if (modal) {
        document.body.classList.add('active-modal');
    } else {
        document.body.classList.remove('active-modal');
    }

    // Combine all form fields into a single object
    const [formData, setFormData] = useState({
        nameDrug: '',
        genericName: '',
        classOfDrug: '',
        quantity: '',
        minAmount: '',
        expirationDate: '',
        ndcNumber: '',
        lotNumber: '',
    });

    //const isFormComplete = Object.values(formData).every((value) => value.trim() !== '');

    useEffect(() => {}, [drugs]);

    const formatDate = (date) => {
        if (!date) return ''; // Handle empty or undefined dates
        return new Date(date).toISOString().split('T')[0];
    };

    const handleMedChange = ({ target: { id, value } }) => {
        setFormData((prev) => ({
            ...prev,
            [id]:
                id === 'quantity' || id === 'minAmount' || id === 'ndcNumber' || id === 'lotNumber'
                    ? Math.max(0, parseInt(value, 10)) || '' // Ensure non-negative numbers
                    : id === 'expirationDate'
                      ? formatDate(value) // Format the date
                      : value, // For other fields, take the value as-is
        }));
    };

    const handleAddMed = (event) => {
        event.preventDefault();

        addDrugs = {
            id: Date.now(),
            ...formData,
        };
        console.log('AddDrugs:', addDrugs);
        setDrugs((prev) => [...prev, addDrugs]);
        //AddDrug(newDrug); // pass new drug to the parent component
        setFormData({
            nameDrug: '',
            genericName: '',
            classOfDrug: '',
            quantity: '',
            minAmount: '',
            expirationDate: '',
            ndcNumber: '',
            lotNumber: '',
        });
    };

    return (
        <Wrapper>
            <div>
                <AddForm onSubmit={handleAddMed}>
                    <div>
                        <Logo />
                        <h4>ADD DRUG</h4>
                        {Object.entries(formData).map(([id, value]) => (
                            <div key={id}>
                                <StyledLabel htmlFor={id}>
                                    {id.replace(/([A-Z])/g, ' $1').toLowerCase()}{' '}
                                    {/* This will render the label text */}
                                </StyledLabel>
                                <AddMedicineForm
                                    type={id === 'expirationDate' ? 'date' : 'text'}
                                    id={id}
                                    value={value}
                                    handleMedChange={handleMedChange}
                                    placeholder={id.replace(/([A-Z])/g, ' $1').toUpperCase()}
                                >
                                    <FormSection>
                                        <Fieldwrapper>
                                            <StyledLabel htmlFor="quantity">Quantity</StyledLabel>
                                            <AddMedicineForm
                                                type="text"
                                                id="quantity"
                                                value={formData.quantity}
                                                handleMedChange={handleMedChange}
                                                placeholder="QUANTITY"
                                            />
                                        </Fieldwrapper>
                                        <Fieldwrapper>
                                            <div className="form-row">
                                                <StyledLabel htmlFor="minAmount">
                                                    Min Amount
                                                </StyledLabel>
                                                <AddMedicineForm
                                                    type="text"
                                                    id="minAmount"
                                                    value={formData.minAmount}
                                                    handleMedChange={handleMedChange}
                                                    placeholder="MIN AMOUNT"
                                                />
                                            </div>
                                        </Fieldwrapper>
                                    </FormSection>
                                </AddMedicineForm>
                            </div>
                        ))}
                    </div>

                    <AddButton type="submit" onClick={toggleModal}>
                        SAVE DRUG{' '}
                    </AddButton>
                </AddForm>

                {modal && (
                    <ButtonModal>
                        <Overlay onClick={toggleModal}></Overlay>
                        <ModalContent>
                            <p>Your medicine has been successfully added to the inventory.</p>
                            <CloseModal onClick={toggleModal}>CLOSE</CloseModal>
                        </ModalContent>
                    </ButtonModal>
                )}
            </div>
        </Wrapper>
    );
}

AddDrug.propTypes = {
    addDrugs: PropTypes.func.isRequired, // Required function prop
    drugs: PropTypes.arrayOf(PropTypes.object), // Optional array prop
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

export const ButtonModal = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
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

export const ModalContent = styled.div`
    background: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

export const CloseModal = styled.button`
    background-color: rgb(34, 63, 75);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 0.5rem 1rem;
    cursor: pointer;
    float: right;
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
