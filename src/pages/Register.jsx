import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormRow, Logo } from '../components';

const Register = () => {
    return (
        <Wrapper>
            <form className="form">
                <Logo />
                <h4>Register</h4>
                <FormRow
                    type="text"
                    name="name"
                    labelText="name"
                    defaultValue="DefaultName"
                    placeholder="NAME"
                />
                <FormRow
                    type="text"
                    name="lastName"
                    labelText="lastname"
                    defaultValue="DefaultLastName"
                    placeholder="LAST NAME"
                />
                <FormRow
                    type="text"
                    name="store"
                    labelText="store"
                    defaultValue="DefaultStore"
                    placeholder="STORE"
                />
                <FormRow
                    type="email"
                    name="email"
                    labelText="email"
                    defaultValue="defaultEmail@gmail.com"
                    placeholder="EMAIL"
                />
                <FormRow
                    type="password"
                    name="password"
                    labelText="password"
                    defaultValue="CodeTheDreamPassword"
                    placeholder="PASSWORD"
                />
                <button type="submit" className="btn btn-block">
                    Submit
                </button>
                <p>
                    Already Registered?
                    <Link to="/login" className="member-btn">
                        Login
                    </Link>
                </p>
            </form>
        </Wrapper>
    );
};

export default Register;

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
        text-transform: uppercase;
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
`;
