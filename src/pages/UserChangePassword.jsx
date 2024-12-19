
import React from 'react';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styled from 'styled-components';
import { FormRow, Logo } from '../components';
import { useNavigate } from 'react-router-dom';

const UserChangePassowrd=()=>{

const [password , setPassword] = useState("") ;
const [confirmPassword , setconfirmPassword] = useState("") ;
const [error, setError] = useState('');
const navigate = useNavigate();


const updatePassword= ()=>{

    if (confirmPassword !== password) {
        setError("Passwords don't match.");
        return ;
    } else {
        setError('');
    } 
    console.log(`eror is${error}`);

    if (error !== ''){
        //setError("Password does'nt match!");
       
        return ;
    }
    
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    

    fetch(`http://localhost:8000/api/v1/users/${userId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({password}),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then((data) => {
            setPassword(password);
            toast.success('Password updated successfully!');
            navigate("/dashboard/user");
        })
        .catch((error) => {
            console.error('Error updating password:', error.message);
        });
};

const cancelPassword =()=>{
    setError('') ;
    navigate("/dashboard/user");
}



const handleInputChange=(e)=>{
    const { name, value } = e.target; 
   
    if (value.length < 8) {
        setError('Password must be at least 8 characters long.');
    } else {
        setError('');
    }

    if (name === "password") {
        setPassword(value); 
    }

    if (name === "confirmpassword") {
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
                    <label className='form-label' htmlFor='password'>New Password </label>
                    <input className="form-input" name="password" onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <label className="form-label" htmlFor="confirmpassword">Confirm Password </label>
                    <input className="form-input" name="confirmpassword"  onChange={handleInputChange} />
                </div>
                <div>{error && <p style={{ color: 'red' }}>{error}</p>} </div>
                <div className="btn btn-block">
                    <button onClick={updatePassword}>Update Password</button>
                 </div>
               
                <div className="btn btn-block">
                    <button onClick={cancelPassword}>Cancel</button>
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