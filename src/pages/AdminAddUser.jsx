import styled from 'styled-components';
import { FormRow, Logo } from '../components';

const AdminAddUser = () => {
    return (
        <Wrapper>
            <form className="form">
                <Logo />
                <h4>Add Employee</h4>
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
                    type="text"
                    name="role"
                    labelText="role"
                    defaultValue="Admin"
                    placeholder="ROLE"
                />
                <FormRow
                    type="email"
                    name="email"
                    labelText="email"
                    defaultValue="defaultEmail@gmail.com"
                    placeholder="EMAIL"
                />
                <button type="submit" className="btn btn-block">
                    Send Permissions Email
                </button>
            </form>
        </Wrapper>
    );
};

export default AdminAddUser;

const Wrapper = styled.section`
    display: grid;
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
