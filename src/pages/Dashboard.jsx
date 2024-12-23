import { useState, createContext, useContext } from 'react';
import { Outlet, useLoaderData } from 'react-router-dom';
import styled from 'styled-components';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import customFetch from '../util/customFetch';
import Alarms from './Alarms';

export const loader = async () => {
    try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        // Make a GET request to the endpoint
        const response = await customFetch.get(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, // Add the token to the Authorization header
            },
        });

        // Handle the response
        console.log('User Details:', response.data);
        return response.data; // Return the user details
    } catch (error) {
        // Handle errors
        console.error('Error fetching user details:', error?.response?.data || error.message);
        throw error; // Re-throw the error for further handling if necessary
    }
};

const DashboardContext = createContext();

const Dashboard = () => {
    const data = useLoaderData();
    console.log(data.data.name);

    const user = { name: data.data.name };
    const [showSidebar, setShowSidebar] = useState(false);
    const [showAlarm, setShowAlarm] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const toggleAlarm = () => {
        setShowAlarm(!showAlarm);
    };

    const logoutUser = async () => {
        console.log('logout user');
    };

    return (
        <DashboardContext.Provider
            value={{
                user,
                showSidebar,
                toggleSidebar,
                logoutUser,
                toggleAlarm,
                showAlarm,
            }}
        >
            <Wrapper>
                <main className="dashboard">
                    <SmallSidebar />
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className="dashboard-page">{showAlarm ? <Alarms /> : <Outlet />}</div>
                    </div>
                </main>
            </Wrapper>
        </DashboardContext.Provider>
    );
};

export const useDashboardContext = () => useContext(DashboardContext);
export default Dashboard;

const Wrapper = styled.section`
    .dashboard {
        display: grid;
        grid-template-columns: 1fr;
    }
    .dashboard-page {
        width: 90vw;
        margin: 0 auto;
        padding: 2rem 0;
    }
    @media (min-width: 992px) {
        .dashboard {
            grid-template-columns: auto 1fr;
        }
        .dashboard-page {
            width: 90%;
        }
    }
`;
