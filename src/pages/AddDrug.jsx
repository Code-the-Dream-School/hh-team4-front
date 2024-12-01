import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddMedicineForm from '../components/AddMedicineForm'
import EditDrug from './EditDrug'
import styled from 'styled-components'


export default function AddDrug({ addDrugs }) {
    const [modal, setModal] = useState(false)
    const [drugs, setDrugs] = useState([]);
    const [drugToEdit, setDrugToEdit] = useState(null);

    const toggleModal = () => {
        setModal(!modal);
    }

    if (modal) {
        document.body.classList.add('active-modal')
    } else {
        document.body.classList.remove('active-modal')
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

    useEffect(() => {
        console.log('Current Drugs:', drugs);
    }, [drugs]);

    const formatDate = (date) => {
        if (!date) return ''; // Handle empty or undefined dates
        return new Date(date).toISOString().split('T')[0];
    };

    const handleMedChange = ({ target: { id, value } }) => {
        console.log(`Changing ${id} to: ${value}`)
        setFormData((prev) => ({
            ...prev,
            [id]: id === 'expirationDate' ? formatDate(value) : value, // Dynamically update the field based on its ID 
        }));
    };

    const handleAddMed = (event) => {
        event.preventDefault();

        const newDrug = {
            id: Date.now(), ...formData,
        };
        setDrugs((prev) => [...prev, newDrug]);
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
        console.log('Form reset:', formData);
    };

    const deleteDrug = (id) => {
        setDrugs((prev) => prev.filter((drug) => drug.id !== id));
    };

    const handleEditClick = (drug) => {
        console.log("Drug to Edit:", drug)
        setDrugToEdit(drug); // Set the selected drug for editing
    };

    const closeEditForm = () => {
        setDrugToEdit(null);

    }

    const updateDrug = (updatedDrug) => {
        setDrugs((prev) =>
            prev.map((drug) => (drug.id === updatedDrug.id ? updatedDrug : drug))
        );
        setDrugToEdit(null); // Clear the drug to edit after updating
    };

    return (

        <Wrapper>

            <div>
                <AddForm onSubmit={handleAddMed} >
                    <div>

                        <h1>ADD DRUG</h1>
                        {Object.entries(formData).map(([id, value]) => (
                            <div key={id}>
                                <StyledLabel htmlFor={id}>
                                    {id.replace(/([A-Z])/g, ' $1').toLowerCase()} {/* This will render the label text */}
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
                                            <StyledLabel htmlFor="minAmount">Min Amount</StyledLabel>
                                            <AddMedicineForm
                                                type="text"
                                                id="minAmount"
                                                value={formData.minAmount}
                                                handleMedChange={handleMedChange}
                                                placeholder="MIN AMOUNT"
                                            />
                                        </Fieldwrapper>
                                    </FormSection>

                                </AddMedicineForm>
                            </div>
                        ))}

                    </div>

                    < AddButton type="submit" onClick={toggleModal} >SAVE DRUG </AddButton>
                </AddForm>

                {modal && (
                    <ButtonModal>
                        <Overlay onClick={toggleModal}></Overlay>
                        <ModalContent>
                            <p>Your medicine has been successfully added to the inventory.</p>
                            <CloseModal
                                onClick={toggleModal}>CLOSE
                            </CloseModal>
                        </ModalContent>
                    </ButtonModal>
                )}

                <ul>
                    {drugs.map((drug) => (
                        <li key={drug.id}>
                            {Object.entries(drug).map(([id, value]) => (
                                <p key={id}>
                                    <strong>{id.replace(/([A-Z])/g, ' $1')}: </strong> {value}
                                </p>
                            ))}
                            <DeleteButton onClick={() => deleteDrug(drug.id)}>Delete</DeleteButton>
                            <button onClick={() => handleEditClick(drug)}>Edit</button>
                        </li>
                    ))}
                </ul>

                {
                    drugToEdit && (
                        <EditDrug drug={drugToEdit} updateDrug={(updatedDrug) => {
                            updateDrug(updatedDrug);
                            closeEditForm();
                        }} />
                    )
                }
            </div >
        </Wrapper>
    );

}
/*
AddDrug.propTypes = {
    addDrugs: PropTypes.func.isRequired, // Required function prop
    updatedDrug: PropTypes.func,         // Optional function prop
    drugs: PropTypes.arrayOf(PropTypes.object), // Optional array prop
};
*/

export const Wrapper = styled.div`
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    gap: 10px;
    width: 100%;
    padding: 4rem 0em 2rem 3rem;
    margin: 3rem;
    margin: 0;
    align-items: center;
    text-align: left;
    font-size: 2rem;
  
`;


export const FormField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem; /* Adjust spacing between label and input */
`;


export const AddForm = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    background-color: #f9f9f9;
    border-radius: 8px;
    width: 100%;
`;

export const StyledLabel = styled.label`
    text-align: left;;
    font-size: 1rem; /* Smaller font size for the label */
    color: #; 
`;

export const FormSection = styled.div`
    display: flex;
    justify-content: space-between; /* Adjust space between fields */
    gap: 1rem; /* Add space between the two fields */
`;

export const Fieldwrapper = styled.div`
    display: flex;
    flex-direction: column; /* Labels and inputs stack vertically */
    gap: 0.4rem; /* Spacing between the label and input */
    flex: 1;
    input {
        padding: 0.5rem;
        font-size: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
    }

    label {
        font-size: 0.9rem;
        color: #333;
    }
`;


export const AddButton = styled.button` 
    background-color: rgb(34, 63, 75);
    color: white;
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.2em 3em; /* Smaller padding */
    margin: 1em 0 4em 0;
    font-size: 0.8em;    /* Smaller font size */
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
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
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    
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
    font-size: 0.8em;    /* Smaller font size */
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
    `;


