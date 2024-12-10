import { useState, createContext, useContext } from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import { BigSidebar, Navbar, SmallSidebar } from '../components';
import Alarms from './Alarms';
const DashboardContext = createContext();

const Dashboard = () => {
    const user = { name: 'john' };
    const [showSidebar, setShowSidebar] = useState(false);

    const toggleSidebar = () => {
        setShowSidebar(!showSidebar);
    };

    const logoutUser = async () => {
        console.log('logout user');
    };
    const toggleAlarm=()=>{
            setAlarmSection((preState) => !preState) ;
    }

    return (
        <DashboardContext.Provider
            value={{
                user,
                showSidebar,
                toggleSidebar,
                logoutUser,
            }}
        >
           
            <Wrapper>
                <main className="dashboard">
                    <SmallSidebar />
                    <BigSidebar />
                    <div>
                        <Navbar />
                        <div className="dashboard-page">
                            <Outlet />
                        </div>
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
