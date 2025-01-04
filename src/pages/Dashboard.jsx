import { useState, createContext, useContext, redirect } from 'react';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import customFetch from '../util/customFetch';
import Alarms from './Alarms';

export const loader = async () => {
    try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');
        const response = await customFetch.get(`/users/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        // console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching user details:', error?.response?.data || error.message);
        return redirect('/');
    }
};

const DashboardContext = createContext();

const Dashboard = () => {
    const navigate = useNavigate();
    const data = useLoaderData();

    const user = data.data;
    const userName = data.data.name;
    const userId = data.data._id;
    const role = data.data.role;
    const store = data.data.store;
    // console.log(`username : ${userName}`);
    // console.log(`user id : ${userId}`);
    // console.log(`user role : ${role}`);
    // console.log(`user store : ${store}`);
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
        localStorage.clear();
        navigate('/');
    };

    return (
        <DashboardContext.Provider
            value={{
                data,
                user,
                showSidebar,
                toggleSidebar,
                logoutUser,
                toggleAlarm,
                showAlarm,
                role,
                store,
                userId,
                userName,
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
