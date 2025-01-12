import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ isOpen, onClose, record, title }) => {
    if (!isOpen) return null;

    return (
        <div style={overlayStyle}>
            <div style={modalStyle}>
                <button onClick={onClose} style={closeButtonStyle}>
                    X
                </button>
                <h2 style={h2Style}>{title}</h2>
                {Object.entries(record)
                    .filter(
                        ([key]) => key.toUpperCase() !== '__V' && key.toUpperCase() !== 'CREATEDBY' && key.toUpperCase() !== 'VIEW'
                    ) // Exclude unwanted keys
                    .map(([key, value]) => (
                        <p style={pStyle} key={key}>
                            <strong>{key}:</strong> {value}
                        </p>
                    ))}
            </div>
        </div>
    );
};

const overlayStyle = {
    position: 'fixed',
    top: 300,
    left: 700,
    right: 700,
    bottom: 300,
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'solid',
};

const modalStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    minWidth: '60%',
    minHeight: '80%',
    border: 'solid',
};

const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
};

const pStyle = {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 1,
    padding: '8px',
    margin: '20px',
    textTransform: 'uppercase',
};

const h2Style = {
    alignItems: 'center',
    padding: '0px',
    margin: '40px',
    color: 'blue',
};
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    record: PropTypes.object.isRequired,
};

export default Modal;
