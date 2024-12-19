import React from 'react';
import { Store , Clerck } from '../constants/Enum.js'
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';


const User = () => {

const  [userData , setUserData]= useState({
    name:'' ,
    email:'' ,
    store:'' ,
    role:'', 
});
const [loading , setLoading] = useState(true) ;

const token = localStorage.getItem('token');
const userId=localStorage.getItem('userId');

useEffect(() => {
    //const token = localStorage.getItem('token');

    
    fetch(`http://localhost:8000/api/v1/users/${userId}` , {
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
            console.log(data.data) ;
            setLoading(false);
        })
        .catch((error) => {
            console.error('Error fetching user data:', error.message);
            setLoading(false);
        });
}, []);


if (loading) {
    return <div>Loading...</div>;
};

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
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setUserData(data.data);
                toast.success('User data updated successfully!');
            })
            .catch((error) => {
                console.error('Error updating user data:', error.message);
            });
    };
    


    return (
        <>
        
        <div>
            <label htmlFor="name">Name:</label> 
            <input name="name" value={userData.name} onChange={handleInputChange}/>
        </div>
        <div>
        <label>Email:</label>
        <input name="email" value={userData.email} onChange={handleInputChange} />
    </div>
    <div>
        <label>Roll: </label>
        <input  name="role" value={userData.role} onChange={handleInputChange} disabled/>
    </div>
    <div>
        <label>Store:</label>
        <input  name="store" value={userData.store} onChange={handleInputChange} disabled/>  
    </div>
    <div className='buttons'>
        <button onClick={updateUserInfo}> Save Changes </button>
        <button>Change Password</button>
       
    </div>
    </>
    );
};


export default User;
