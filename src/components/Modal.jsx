import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Modal = ({ isOpen, onClose, record }) => {
    if (!isOpen) return null;

    return (
        <Wrapper style={overlayStyle}>
            <div className="modal-box" style={modalStyle}>
                <button className="close-btn" onClick={onClose} style={closeButtonStyle}>
                    X
                </button>
                <h2 style={h2Style}>Medication Details</h2>
                {Object.entries(record)
                    .filter(
                        ([key]) => key.toUpperCase() !== '__V' && key.toUpperCase() !== 'CREATEDBY'
                    ) // Exclude unwanted keys
                    .map(([key, value]) => (
                        <p style={pStyle} key={key}>
                            <strong>{key}:</strong> {value}
                        </p>
                    ))}
            </div>
        </Wrapper>
    );
};

export const Wrapper = styled.div`
    .modal-box {
        border-radius: var(--border-radius);
        border: 4px solid var(--color-blue-dark);
    }
    h2 {
        color: var(--color-blue-dark);
    }
    p {
        font-size: 1.6rem;
        padding-bottom: 0.9rem;
    }
    .close-btn {
        color: var(--color-blue-dark);
    }
    strong {
        padding-right: 0.6rem;
    }
`;

const overlayStyle = {
    position: 'fixed',
    top: 300,
    left: 700,
    right: 700,
    bottom: 300,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const modalStyle = {
    backgroundColor: 'white',
    padding: '20px',
    // minWidth: '60%',
    // minHeight: '80%',
    position: 'relative',
};

const closeButtonStyle = {
    position: 'absolute',
    top: '10px',
    right: '20px',
    background: 'none',
    border: 'none',
    fontSize: '30px',
    cursor: 'pointer',
    fontWeight: 'bold',
};

const pStyle = {
    textAlign: 'left',
};

const h2Style = {
    alignItems: 'center',
    padding: '0px',
    margin: '40px',
};
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    record: PropTypes.object.isRequired,
};

export default Modal;
