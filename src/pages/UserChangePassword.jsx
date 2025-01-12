import React from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { Logo } from '../components';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const UserChangePassowrd = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);

    const location = useLocation();
    const id = location.state?.userId;

    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('userId');

    let userId = '';
    if (id !== '') {
        userId = id;
    } else {
        userId = currentUser;
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const updatePassword = () => {
        if (password === '' || confirmPassword === '') {
            setError('Passwords not Entered.');
            return;
        } else if (confirmPassword !== password) {
            setError("Passwords don't match.");
            return;
        } else {
            setError('');
        }

        if (error !== '') {
            //setError("Password does'nt match!");

            return;
        }

        fetch(`http://localhost:8000/api/v1/users/${userId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                if (data.success) {
                    setPassword(password);
                    toast.success('Password updated successfully!');
                    navigate(`/dashboard/User/${userId}`);
                } else {
                    throw new Error(data.message || 'Password update failed.');
                }
            })
            .catch((error) => {
                console.error('Error updating password:', error.message);
            });
    };

    const cancelPassword = () => {
        setError('');
        navigate(`/dashboard/User/${userId}`);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        if (value.length < 8) {
            setError('Password must be at least 8 characters long.');
        } else {
            setError('');
        }

        if (name === 'password') {
            setPassword(value);
        }

        if (name === 'confirmpassword') {
            setconfirmPassword(value);
        }
    };

    return (
        <>
            <Wrapper>
                <div className="form">
                    <Logo />
                    <h4>User Update Password</h4>
                    <div className="form-row">
                        <label className="form-label" htmlFor="password">
                            New Password{' '}
                        </label>
                        <div className="button-row">
                            <input
                                className="form-input"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                onChange={handleInputChange}
                            />
                            <button
                                type="button"
                                className="button-row"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>

                    <div className="form-row">
                        <label className="form-label" htmlFor="confirmpassword">
                            Confirm Password{' '}
                        </label>
                        <div className="button-row">
                            <input
                                className="form-input"
                                type={showPassword ? 'text' : 'password'}
                                name="confirmpassword"
                                onChange={handleInputChange}
                            />
                            <button type="button" onClick={togglePasswordVisibility}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                    </div>
                    <div>{error && <p style={{ color: 'red' }}>{error}</p>} </div>
                    <div className="buttons">
                        <button className="btn btn-block" onClick={updatePassword}>
                            Update Password
                        </button>

                        <button className="btn btn-block" onClick={cancelPassword}>
                            Cancel
                        </button>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};

export default UserChangePassowrd;

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
        background-color: var(--grey-50);
        width: 95%;
        padding: 0.375rem 0.75rem;
        border-radius: var(--border-radius);
        border: 1px solid var(--grey-300);
        color: var(--text-color);
        height: 35px;
        background-color: white;
    }
    .button-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    h4 {
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
    .custom-select {
    }
`;
