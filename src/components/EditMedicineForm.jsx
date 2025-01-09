import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const EditMedicineForm = ({ id, value, handleInputChange, placeholder }) => {
    const inputRef = useRef();
    useEffect(() => {
        if (id === 'name' && inputRef.current) {
            inputRef.current.focus();
        }
    }, [id]);

    const formatDateForInput = (date) => {
        if (!date) return '';
        const parsedDate = new Date(date);
        // Format the date to 'yyyy-MM-dd' without timezone effects
        return parsedDate.toISOString().split('T')[0];
    };

    const formattedValue = id === 'expirationDate' ? formatDateForInput(value) : value;
    return (
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
            value={formattedValue} // Format date correctly for the date input
            onChange={handleInputChange}
            placeholder={placeholder}
            ref={inputRef}
        />
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

    /* Placeholder text color */
    &::placeholder {
        color: black; /* Set placeholder text to black */
    }
`;
