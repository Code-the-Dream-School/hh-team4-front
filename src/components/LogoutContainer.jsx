import { useDashboardContext } from '../pages/Dashboard';
import { useState } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { TiArrowSortedDown } from 'react-icons/ti';

import styled from 'styled-components';

const LogoutContainer = () => {
    const [showLogout, setShowLogout] = useState(false);
    const { user, logoutUser } = useDashboardContext();
    return (
        <Wrapper>
            <button
                type="button"
                className="btn logout-btn"
                onClick={() => {
                    setShowLogout(!showLogout);
                }}
            >
                <FaUserCircle />
                {user?.name}
                <TiArrowSortedDown />
            </button>
            <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                <button type="button" className="dropdown-btn" onClick={logoutUser}>
                    logout
                </button>
            </div>
        </Wrapper>
    );
};
const Wrapper = styled.div`
    position: relative;
    .logout-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0 0.5rem;
        background: var(--color-blue-dark);
    }
    .img {
        width: 25px;
        height: 25px;
        border-radius: 50%;
    }
    .dropdown {
        position: absolute;
        top: 45px;
        left: 0;
        width: 100%;
        box-shadow: var(--shadow-2);
        text-align: center;
        visibility: hidden;
        border-radius: var(--border-radius);
        background: var(--color-blue-dark);
    }
    .show-dropdown {
        visibility: visible;
    }
    .dropdown-btn {
        border-bottom-right-radius: var(--border-radius);
        border-bottom-left-radius: var(--border-radius);
        padding: 0.5rem;
        background: transparent;
        border-color: transparent;
        color: var(--white);
        letter-spacing: var(--letter-spacing);
        text-transform: capitalize;
        cursor: pointer;
        width: 100%;
        height: 100%;
        padding-top: 1rem;
    }
`;
export default LogoutContainer;
