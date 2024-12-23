import { Form, redirect, useNavigation, Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormRow, Logo } from '../components';
import customFetch from '../util/customFetch';
import { toast } from 'react-toastify';

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post('/auth/signup', data);
        toast.success('Registration Successful');
        return redirect('/login');
    } catch (error) {
        toast.error(error?.response?.data?.message);
        return error;
    }
};

const Register = () => {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';
    return (
        <Wrapper>
            <Form method="post" className="form">
                <Logo />
                <h4>Register</h4>
                <FormRow type="text" name="name" labelText="name" placeholder="name" />
                <FormRow type="email" name="email" labelText="email" placeholder="email" />
                <FormRow
                    type="password"
                    name="password"
                    labelText="password"
                    placeholder="password"
                />
                <div className="form-row">
                    <label className="form-label" htmlFor="store">
                        select a store:
                    </label>
                    <select className="form-input" id="store" name="store" required>
                        <option value="" disabled>
                            -- Choose a store --
                        </option>
                        <option value="Store 1">Store 1</option>
                        <option value="Store 2">Store 2</option>
                    </select>
                </div>
                <div className="form-row">
                    <label className="form-label" htmlFor="role">
                        select a role:
                    </label>
                    <select className="form-input" id="role" name="role" required>
                        <option value="" disabled>
                            -- Choose a role --
                        </option>
                        <option value="admin">admin</option>
                        <option value="inventoryManager">inventoryManager</option>
                        <option value="clerk">clerk</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'submitting...' : 'submit'}
                </button>
                <p>
                    Already Registered?
                    <Link to="/login" className="member-btn">
                        Login
                    </Link>
                </p>
            </Form>
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
    .custom-select {
    }
`;
