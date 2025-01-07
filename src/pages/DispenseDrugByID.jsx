import styled from 'styled-components';
import { Logo } from '../components';
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DispenseDrugByID = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const [drugToBeDispensed, setDrugToBeDispensed] = useState({
        medicationId: id,
        quantity: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/v1/inventory/${id}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                const data = await response.json();

                if (typeof data === 'object' && data !== null) {
                    setDrugToBeDispensed((prevState) => ({
                        ...prevState,
                        ...data.data,
                    }));
                } else {
                    throw new Error('Invalid data format received');
                }
            } catch (error) {
                console.error('Fetch error:', error);
            }
        };
        fetchData();
    }, [id, token]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setDrugToBeDispensed((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDispensedDrug = (event) => {
        event.preventDefault();
        fetch(`http://localhost:8000/api/v1/dispense`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(drugToBeDispensed),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(() => {
                toast.success('Drug dispensed successfully!', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });

                setTimeout(() => {
                    navigate('/dashboard/past-orders');
                }, 3500);
            })
            .catch((error) => {
                toast.error('Failed to dispense drug. Please try again.', {
                    position: toast.POSITION.TOP_CENTER,
                    autoClose: 3000,
                });
                console.error('Error:', error);
            });
    };

    return (
        <Wrapper>
            <form className="form" onSubmit={handleDispensedDrug}>
                <Logo />
                <h4>Dispense</h4>
                <h5>{`- ${drugToBeDispensed.name} -`}</h5>
                <h6>{`${drugToBeDispensed.location}`}</h6>
                <div className="form-row">
                    <label htmlFor="quantity" className="form-label">
                        quantity to be dispensed
                    </label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        className="form-input"
                        value={drugToBeDispensed.quantity || ''}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-block">
                    Dispense Medication
                </button>
            </form>
            <ToastContainer />
        </Wrapper>
    );
};

export default DispenseDrugByID;

// Styled Components
const Wrapper = styled.section`
    min-height: 100vh;
    display: grid;
    align-items: center;
    .logo {
        display: block;
        margin: 0 auto;
        margin-bottom: 1.38rem;
    }
    .form {
        max-width: 400px;
        border-top: 5px solid var(--color-blue-dark);
    }
    .form-label {
        text-transform: lowercase;
    }
    .form-input {
        background-color: var(--grey-50);
    }
    h4 {
        text-align: center;
        margin-bottom: 0.5rem;
    }
    h5 {
        text-align: center;
        margin-bottom: 0.5rem;
    }
    h6 {
        text-align: center;
        margin-bottom: 1.38rem;
    }
    p {
        margin-top: 1rem;
        text-align: center;
        line-height: 1.5;
    }
    .btn {
        margin-top: 1rem;
    }
    .member-btn {
        color: var(--primary-500);
        letter-spacing: var(--letter-spacing);
        margin-left: 0.25rem;
    }
    .secondary {
        background-color: var(--color-green-med);
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 0.6rem;
        padding-bottom: 0.6rem;
    }
    .scan-icon {
        padding-right: 10px;
        font-size: 2rem;
    }
`;
