import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import AddDrug from './AddDrug';


export default function EditDrug({ drug, updateDrug }) {
    const [formData, setFormData] = useState(drug);

    useEffect(() => {
        if (drug) {
            console.log("EditDrug received props:", drug);
            setFormData({
                ...drug,
                expirationDate: drug.expirationDate ? new Date(drug.expirationDate).toISOString().split('T')[0] : '', // Convert to Date object
            });
        }
    }, [drug]);

    const handleChange = ({ target: { id, value } }) => {
        setFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Updated drug submitted:", formData)
        updateDrug(formData); // Update the drug in the parent component
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Edit Drug</h2>
            {Object.entries(formData).map(([id, value]) => (
                <div key={id}>
                    <label htmlFor={id}>
                        {id.replace(/([A-Z])/g, ' $1').toUpperCase()}:
                    </label>
                    <input
                        type={id === 'expirationDate' ? 'date' : 'text'}
                        id={id}
                        value={value}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <button type="submit" >Update Drug</button>

        </form>
    );
}
/*
EditDrug.propTypes = {
    drug: PropTypes.shape({
        id: PropTypes.number.isRequired,
        drugName: PropTypes.string.isRequired,
        genName: PropTypes.string.isRequired,
        drugClass: PropTypes.string.isRequired,
        drugQuantity: PropTypes.isRequired,
        minAmount: PropTypes.isRequired,
        expirationDate: PropTypes.string,
        ndcNumber: PropTypes.string.isRequired,
        lotNumber: PropTypes.string.isRequired,
    }).isRequired,
    updateDrug: PropTypes.func.isRequired,
};
*/