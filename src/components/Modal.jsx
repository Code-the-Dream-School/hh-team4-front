import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Modal = ({ isOpen, onClose, record, title }) => {
    if (!isOpen) return null;

    return (
        <Wrapper style={overlayStyle}>
            <div style={modalStyle}>
                <button onClick={onClose} style={closeButtonStyle}>
                    X
                </button>
                <h2 className="heading" style={h2Style}>
                    {title}
                </h2>
                {Object.entries(record)
                    .filter(
                        ([key]) =>
                            key.toUpperCase() !== '__V' &&
                            key.toUpperCase() !== 'CREATEDBY' &&
                            key.toUpperCase() !== 'VIEW'
                    ) // Exclude unwanted keys
                    .map(([key, value]) => (
                        <p className="paragraph" style={pStyle} key={key}>
                            <strong className="key">{key}:</strong> {value}
                        </p>
                    ))}
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    .paragraph {
        color: var(--grey-700);
    }
    .key {
        color: var(--color-blue-dark);
        padding-right: 0.25rem;
    }
`;

const overlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'solid',
    zIndex: 1000,
};

const modalStyle = {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    height: 'auto',
    maxHeight: '90vh',
    overflowY: 'auto',
    position: 'relative',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
    fontSize: '14px',
    fontWeight: 'bold',
    textAlign: 'left',
    lineHeight: 1.5,
    padding: '8px',
    margin: '10px 0',
    textTransform: 'uppercase',
};

const h2Style = {
    textAlign: 'center',
    margin: '20px 0',
    color: '#28535c',
};
Modal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    record: PropTypes.object.isRequired,
};

export default Modal;
