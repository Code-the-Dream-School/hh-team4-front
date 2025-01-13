import styled from 'styled-components';
import Logo from './Logo';
import { FaAlignLeft } from 'react-icons/fa';
import { useDashboardContext } from '../pages/Dashboard';
import { LogoutContainer } from '.';
import { TbBellFilled } from 'react-icons/tb';

const Navbar = () => {
    const { toggleSidebar, toggleAlarm } = useDashboardContext();
    return (
        <Wrapper>
            <div className="nav-center">
                <button type="button" className="toggle-btn" onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                <div className="logo-container">
                    <Logo />
                    <h4 className="logo-text">MediStock</h4>
                </div>
                <div className="btn-container">
                    <button className="bell-button" onClick={toggleAlarm}>
                        <TbBellFilled className="bell-icon" />
                    </button>
                    <LogoutContainer />
                </div>
            </div>
        </Wrapper>
    );
};

export default Navbar;

const Wrapper = styled.nav`
    height: var(--nav-height);
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
    background: #fff;
    .nav-center {
        display: flex;
        width: 90vw;
        align-items: center;
        justify-content: space-between;
    }
    .toggle-btn {
        background: transparent;
        border-color: transparent;
        font-size: 1.75rem;
        color: var(--color-blue-dark);
        cursor: pointer;
        display: flex;
        align-items: center;
    }
    .logo-text {
        display: none;
    }
    .logo {
        display: flex;
        align-items: center;
        width: 100px;
    }
    .btn-container {
        display: flex;
        align-items: center;
    }
    .bell-button {
        border: 15px solid var(--color-alert);
        border-radius: 50%;
        margin-right: 1rem;
    }
    .bell-icon {
        font-size: 1.5rem;
        background-color: var(--color-alert);
        color: white;
    }
    @media (max-width: 600px) {
        .logo-container {
            display: none; /* Hide on screens 600px and below */
        }
    }
    @media (min-width: 992px) {
        position: sticky;
        top: 0;
        .nav-center {
            width: 90%;
        }
        .logo {
            display: none;
        }
        .logo-text {
            display: block;
            color: var(--color-blue-dark);
        }
    }
`;
