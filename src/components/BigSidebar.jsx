import styled from 'styled-components';
import Logo from './Logo';
import NavLinks from './NavLinks';
import { useDashboardContext } from '../pages/Dashboard';

const BigSidebar = () => {
    const { showSidebar } = useDashboardContext();
    return (
        <Wrapper>
            <div className={showSidebar ? 'sidebar-container' : 'sidebar-container show-sidebar'}>
                <div className="content">
                    <header>
                        <Logo className="logo" />
                    </header>
                    <NavLinks isBigSidebar />
                </div>
            </div>
        </Wrapper>
    );
};

export default BigSidebar;

const Wrapper = styled.aside`
    display: none;
    @media (min-width: 992px) {
        display: block;
        box-shadow: 1px 0px 0px 0px rgba(0, 0, 0, 0.1);
        .sidebar-container {
            background: white;
            min-height: 100vh;
            height: 100%;
            width: 250px;
            margin-left: -250px;
            transition: margin-left 0.3s ease-in-out;
        }
        .content {
            position: sticky;
            top: 0;
        }
        .show-sidebar {
            margin-left: 0;
        }
        header {
            height: 6rem;
            display: flex;
            align-items: center;
            justify-content: center;
            padding-left: 2rem;
            padding-right: 2rem;
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
            padding-left: 2rem;
            text-transform: capitalize;
            transition: padding-left 0.3s ease-in-out;
        }
        .nav-link:hover {
            padding-left: 3rem;
            color: var(--color-green-light);
            transition: var(--transition);
        }
        .icon {
            font-size: 1.5rem;
            margin-right: 1rem;
            display: grid;
            place-items: center;
        }
        .active {
            color: var(--color-green-light);
        }
        .pending {
            background: var(--background-color);
        }
    }
`;
