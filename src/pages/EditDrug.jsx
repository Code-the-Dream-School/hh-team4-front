import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import EditMedicineForm from '../components/EditMedicineForm';
import styled from 'styled-components';

export default function EditDrug({ }) {
    const [modal, setModal] = useState(false);
    const { id } = useParams(); // Get drug ID from URL
    const [editData, setEditData] = useState({
        name: '',
        genericName: '',
        class: '',
        quantity: '',
        threshold: '',
        expirationDate: '',
        ndcNumber: '',
        lot: '',
        store: ''
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

    const toggleModal = () => {
        setModal(!modal);
    };

    useEffect(() => {
        // Fetch existing drug data to populate form
        const token = localStorage.getItem("token")
        fetch(`http://localhost:8000/api/v1/inventory/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        })
            .then((response) => {
                if (!response.ok) throw new Error('Failed to fetch drug data');
                return response.json();
            })
            .then((data) => {
                console.log("This is data", data)
                delete data.data.createdBy
                delete data.data._id
                delete data.data.createdAt
                delete data.data.__v
                delete data.data.updatedAt

                setEditData(data.data)
            })
            .catch((error) => console.error('Error:', error));
    }, [id]);


    const handleInputChange = (event) => {
        const { id, value } = event.target;

        setEditData((prev) => ({
            ...prev,
            [id]: id === 'quantity' || id === 'threshold' ? parseInt(value, 10) || '' : value,
        }));
    };

    const handleSaveChanges = (event) => {
        event.preventDefault();

        const token = localStorage.getItem("token")
        fetch(`http://localhost:8000/api/v1/inventory/${id}`, {
            method: 'PATCH', // Or other HTTP methods like POST, PUT, DELETE, etc.
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editData)
        })
            .then(response => {
                // Handle the response
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json(); // Assuming the response is JSON
            })
            .then(data => {
                // Do something with the data
                console.log(data);
            })
            .catch(error => {
                // Handle errors
                console.error('Error:', error);
            });

        setEditData({
            name: '',
            genericName: '',
            class: '',
            quantity: '',
            threshold: '',
            expirationDate: '',
            ndcNumber: '',
            lot: '',
            store: '',
        });
    };

    console.log("data", editData)

    return (
        <Wrapper>
            <div>
                < form onSubmit={handleSaveChanges} >
                    {
                        Object.entries(editData).map(([id, value]) => (
                            <div key={id}>
                                <StyledLabel htmlFor={id}>
                                    {id.replace(/([A-Z])/g, ' $1').toLowerCase()}{' '}
                                    {/* This will render the label text */}
                                </StyledLabel>
                                {id === 'class' ? (
                                    <select
                                        id={id}
                                        value={value}
                                        onChange={handleInputChange}
                                    >
                                        <option value="" disabled>Select a class</option>
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
                                    >
                                        <FormSection>
                                            <Fieldwrapper>
                                                <StyledLabel htmlFor="quantity">Quantity</StyledLabel>
                                                <EditMedicineForm
                                                    type="text"
                                                    id="quantity"
                                                    value={editData.quantity}
                                                    handleSaveChanges={handleSaveChanges}
                                                    placeholder="QUANTITY"
                                                />
                                            </Fieldwrapper>
                                            <Fieldwrapper>
                                                <div className="form-row">
                                                    <StyledLabel htmlFor="threshold">
                                                        Min Amount
                                                    </StyledLabel>
                                                    <EditMedicineForm
                                                        type="text"
                                                        id="threshold"
                                                        value={editData.threshold}
                                                        handleInputChange={handleInputChange}
                                                        placeholder="MIN AMOUNT"
                                                    />
                                                </div>
                                            </Fieldwrapper>
                                        </FormSection>
                                    </EditMedicineForm>
                                )}
                            </div>
                        ))
                    }

                    {/* Add other form fields as needed */}
                    <button type="submit" onClick={toggleModal}>Save Changes</button>
                </form >
                {modal && (
                    <ButtonModal>
                        <Overlay onClick={toggleModal}></Overlay>
                        <ModalContent>
                            <p>Your medicine has been successfully updated to the inventory.</p>
                            <CloseModal onClick={() => setModal(false)}>CLOSE</CloseModal>
                        </ModalContent>
                    </ButtonModal>
                )}
            </div>
        </Wrapper>
    );
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
