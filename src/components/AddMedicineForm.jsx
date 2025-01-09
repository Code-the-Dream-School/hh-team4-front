import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AddMedicineForm = ({ id, value, handleMedChange, placeholder }) => {
    const inputRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, [value]);

    console.log("add", value)
    return (
        <StyleInput
            type={
                id === 'expirationDate'
                    ? 'date'
                    : ['quantity', 'minAmount'].includes(id)
                        ? 'number'
                        : 'text'
            }
            id={id}
            value={value}
            onChange={handleMedChange}
            placeholder={placeholder}
            ref={inputRef}
        />
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
`;

export const StyleInput = styled.input`
    width: 100%;
    padding: 0.375rem 0.75rem;
    border-radius: var(--border-radius);
    border: 1px solid var(--grey-300);
    color: black;
    height: 35px;

    &::placeholder {
        color: black; /* Set placeholder text to black */
    }
`;
