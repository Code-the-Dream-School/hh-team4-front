import styled from 'styled-components';
import { useDashboardContext } from '../pages/Dashboard';
import { CgClose } from 'react-icons/cg';
import logo from '../assets/logo.svg';
import NavLinks from './NavLinks';

const SmallSidebar = () => {
    const { showSidebar, toggleSidebar } = useDashboardContext();
    return (
        <Wrapper>
            <div className={showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'}>
                <div className="content">
                    <button type="button" className="close-btn" onClick={toggleSidebar}>
                        <CgClose />
                    </button>

                    <img className="logo" src={logo} alt="logo"></img>
                    <NavLinks />
                </div>
            </div>
        </Wrapper>
    );
};

export default SmallSidebar;

const Wrapper = styled.aside`
    /* larger screens doesn't display */
    @media (min-width: 992px) {
        display: none;
    }
    .sidebar-container {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.7);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: -1;
        opacity: 0;
        transition: var(--transition);
        visibility: hidden;
    }
    .show-sidebar {
        z-index: 99;
        opacity: 1;
        visibility: visible;
    }
    .content {
        background: white;
        width: var(--fluid-width);
        height: 95vh;
        border-radius: var(--border-radius);
        padding: 4rem 2rem;
        position: relative;
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .close-btn {
        position: absolute;
        top: 10px;
        left: 10px;
        background: transparent;
        border-color: transparent;
        font-size: 3rem;
        color: black;
        cursor: pointer;
    }
    .logo {
        width: 40%;
    }
    .nav-links {
        padding-top: 2rem;
        display: flex;
        flex-direction: column;
    }
    .nav-link {
        display: flex;
        align-items: center;
        color: var(--color-blue-dark);
        padding: 1rem 0;
        text-transform: lowercase;
        transition: var(--transition);
    }
    .nav-link:hover {
        color: var(--color-green-light);
    }
    .icon {
        font-size: 2.5rem;
        margin-right: 1rem;
        display: grid;
        place-items: center;
    }
    .active {
        color: var(--color-green-light);
    }
`;
