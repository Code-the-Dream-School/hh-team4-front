import React from 'react';

const Medication = ({ name, generic, drugClass, quantity, expiration, lot, ndc, onAddToCart }) => {
    return (
        <div
            style={{
                border: '1px solid #ccc',
                borderRadius: '8px',
                padding: '16px',
                maxWidth: '300px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <h2>{name}</h2>

            {/* Generic */}
            <p>
                <strong>Generic:</strong> {generic}
            </p>

            {/* Class */}
            <p>
                <strong>Class:</strong> {drugClass}
            </p>

            {/* Quantity */}
            <p>
                <strong>Quantity:</strong> {quantity}
            </p>

            {/* Expiration */}
            <p>
                <strong>Expiration Date:</strong> {expiration}
            </p>

            {/*Lot */}
            <p>
                <strong>Lot:</strong> {lot}
            </p>

            {/*NDC */}
            <p>
                <strong>NDC:</strong> {ndc}
            </p>
        </div>
    );
};

export default Medication;
