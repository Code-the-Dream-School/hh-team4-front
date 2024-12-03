import React from 'react';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AddMedicineForm = ({ id, value, handleMedChange, placeholder }) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, [value]);

    return (
        <div>
            <StyleInput
                type={
                    id === 'expirationDate'
                        ? 'date'
                        : ['quantity', 'minAmount', 'lotNumber', 'ndcNumber'].includes(id)
                          ? 'number'
                          : 'text'
                }
                key={id}
                id={id}
                value={value} // Directly use value passed as a prop
                onChange={handleMedChange}
                placeholder={placeholder}
                ref={inputRef}
            />
        </div>
    );
};

AddMedicineForm.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Accept string or number
    handleMedChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired,
};

export default AddMedicineForm;

export const FormField = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.4rem; /* Adjust spacing between label and input */
`;

export const StyleInput = styled.input`
    text-size: 1rem;
    width: 100%;
    border: 1.5px solid #000;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1em;
    margin: 0rem;
    color: #000;

    /* Placeholder text color */
    &::placeholder {
        color: black; /* Set placeholder text to black */
    }
`;
