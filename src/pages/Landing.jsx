import { styled } from 'styled-components';
import main from '../assets/LandingPage.svg';
import { Link } from 'react-router-dom';
import { Logo } from '../components';

const Landing = () => {
    return (
        <Wrapper>
            <nav>
                <Logo />
            </nav>
            <div className="container page">
                <div className="info">
                    <h1>
                        Medication <span>Inventory</span> App
                    </h1>
                    <p>
                        Welcome to MediStock, the smart solution for small clinics and businesses to
                        streamline prescription inventory management. Our app provides a powerful
                        desktop dashboard that gives you an at-a-glance view of your current stock,
                        low inventory alerts, and soon-to-expire items, ensuring your clinic runs
                        smoothly and efficiently. For day-to-day operations, the mobile interface
                        simplifies checking in new inventory and handling sales, tailored for staff
                        in different roles. Say goodbye to stock surprises and hello to better
                        inventory control with MediStock!
                    </p>
                    <Link to="/register" className="btn register-link">
                        Register
                    </Link>
                    <Link to="/register" className="btn register-link">
                        Login
                    </Link>
                </div>
                <img src={main} alt="hero image" className="img main-img"></img>
            </div>
        </Wrapper>
    );
};

export default Landing;

const Wrapper = styled.section`
    nav {
        width: var(--fluid-width);
        max-width: var(--max-width);
        margin: 0 auto;
        height: 8rem;
        display: flex;
        align-items: center;
    }
    .mylogo {
        object-fit: cover;
        height: 7rem;
    }
    .page {
        min-height: calc(100vh - 8rem);
        display: grid;
        align-items: center;
        margin-top: -3rem;
    }
    h1 {
        font-weight: 700;
        span {
            color: var(--color-green-med);
        }
        margin-bottom: 1.5rem;
        font-size: 4rem;
    }
    p {
        line-height: 2;
        color: var(--text-secondary-color);
        margin-bottom: 1.5rem;
        max-width: 35em;
    }
    .register-link {
        margin-right: 1rem;
        padding: 0.375rem 3rem;
    }
    .main-img {
        display: none;
    }
    .btn {
        padding: 1rem 4rem;
    }
    @media (min-width: 992px) {
        .page {
            grid-template-columns: 1fr 600px;
            column-gap: 3rem;
        }
        .main-img {
            display: block;
        }
    }
`;
