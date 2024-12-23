import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FormRow, Logo } from '../components';
import { useNavigate, useParams } from 'react-router-dom';

const User = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        store: '',
        role: '',
    });

    const role = ['Admin', 'inventoryManager', 'clerk'];
    const store = ['Store 1', 'Store 2'];
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('token');
    const currentUser = localStorage.getItem('userId');
    const navigate = useNavigate();
    const { id } = useParams();

    const userId = id ? id : currentUser;

    useEffect(() => {
        fetch(`http://localhost:8000/api/v1/users/${userId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const updateUserInfo = () => {
        fetch(`http://localhost:8000/api/v1/users/${userId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((response) => {
                if (!response.ok) {
                    console.log(response);
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data.data);

                toast.success('User profile updated successfully!');
                if (id) {
                    navigate(`/dashboard/UserManagement`);
                }
            })
            .catch((error) => {
                console.error('Error updating user profile:', error.message);
            });
    };

    const handelPasswordChange = () => {
        navigate(`/dashboard/UserChangePassword`);
    };

    return (
        <>
            <Wrapper>
                <div className="form">
                    <Logo />
                    <h4>User Profile</h4>
                    <div className="form-row">
                        <label className="form-label" htmlFor="name">
                            Name:
                        </label>
                        <input
                            className="form-input"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Email:</label>
                        <input
                            className="form-input"
                            name="email"
                            value={userData.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="form-row">
                        <label className="form-label">Roll: </label>
                        <select
                            className="form-input"
                            id="role"
                            name="role"
                            value={userData.role}
                            onChange={handleInputChange}
                            disabled={!id}
                        >
                            <option value="" disabled>
                                Select a role
                            </option>
                            {role.map((r) => (
                                <option key={r} value={r}>
                                    {r}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-row">
                        <label className="form-label">Store:</label>
                        <select
                            name="store"
                            className="form-input"
                            value={userData.store}
                            onChange={handleInputChange}
                            disabled={!id}
                        >
                            <option value="" disabled>
                                Select a Store
                            </option>
                            {store.map((s) => (
                                <option key={s} value={s}>
                                    {s}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="buttons">
                        <button className="btn btn-block" onClick={updateUserInfo}>
                            {' '}
                            Save Changes{' '}
                        </button>
                        <button className="btn btn-block" onClick={handelPasswordChange}>
                            Change Password
                        </button>
                    </div>
                </div>
            </Wrapper>
        </>
    );
};

export default User;

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
        width: 100%;
        padding: 0.375rem 0.75rem;
        border-radius: var(--border-radius);
        border: 1px solid var(--grey-300);
        color: var(--text-color);
        height: 35px;
        background-color: white;
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

// export const FormField = styled.div``;

// export const AddForm = styled.form`
//     width: 90vw;
//     max-width: 400px;
//     border-top: 5px solid var(--color-blue-dark);
//     border-radius: var(--border-radius);
//     box-shadow: var(--shadow-2);
//     padding: 2rem 2.5rem;
//     margin: 3rem auto;
// `;

// export const StyledLabel = styled.label`
//     text-transform: lowercase;
//     display: block;
//     font-size: var(--small-text);
//     margin-bottom: 0.75rem;
//     text-transform: capitalize;
//     letter-spacing: var(--letter-spacing);
//     line-height: 1.5;
// `;

// export const FormSection = styled.div`
//     width: 90vw;
//     max-width: var(--fixed-width);
//     border-radius: var(--border-radius);
//     box-shadow: var(--shadow-2);
//     padding: 2rem 2.5rem;
//     margin: 3rem auto;
// `;

export const Fieldwrapper = styled.div`
    .form-row {
        margin-bottom: 0.5rem;
    }
    input {
        width: 100%;
        padding: 0.375rem 0.75rem;
        border-radius: var(--border-radius);
        border: 1px solid var(--grey-300);
        color: var(--text-color);
        height: 35px;
        background-color: white;
    }
    label {
        font-size: 0.9rem;
        text-transform: lowercase;
    }
`;

// export const AddButton = styled.button`
//     margin-top: 1rem;
//     background-color: var(--color-blue-dark);
//     width: 100%;
//     cursor: pointer;
//     color: var(--white);
//     border: transparent;
//     border-radius: var(--border-radius);
//     letter-spacing: var(--letter-spacing);
//     padding: 1rem 4rem;
//     box-shadow: var(--shadow-1);
//     transition: var(--transition);
//     text-transform: capitalize;
//     display: inline-block;
// `;

// export const Overlay = styled.div`
//     width: 100vw;
//     height: 100vh;
//     position: fixed;
//     top: 0;
//     left: 0;
//     right: 0;
//     bottom: 0;
// `;

// export const DeleteButton = styled.button`
//     background-color: rgb(34, 63, 75);
//     color: white;
//     border-radius: 8px;
//     border: 1px solid transparent;
//     padding: 0.6em 1.2em;
//     padding: 0.2em 3em; /* Smaller padding */
//     font-size: 0.8em; /* Smaller font size */
//     font-family: inherit;
//     cursor: pointer;
//     transition: border-color 0.25s;
// `;
