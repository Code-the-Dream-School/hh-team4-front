import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const EditMedicineForm = ({ id, value, handleInputChange, placeholder }) => {
    const inputRef = useRef();

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    return (
        <>
            <StyleInput
                type={
                    id === 'expirationDate'
                        ? 'date'
                        : ['quantity', 'minAmount'].includes(id)
                          ? 'number'
                          : 'text'
                }
                key={id}
                id={id}
                value={value || ''}
                onChange={handleInputChange}
                placeholder={placeholder}
                ref={inputRef}
            />
        </>
    );
};

EditMedicineForm.propTypes = {
    id: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired, // Accept string or number
    handleInputChange: PropTypes.func,
    placeholder: PropTypes.string.isRequired,
};

export default EditMedicineForm;

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
    margin-bottom: 15px;

    /* Placeholder text color */
    &::placeholder {
        color: black; /* Set placeholder text to black */
        margin-bottom: 0px;
    }
`;
