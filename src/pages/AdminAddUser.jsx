import { Form, redirect, useNavigation } from 'react-router-dom';
import styled from 'styled-components';
import { FormRow, Logo } from '../components';
import customFetch from '../util/customFetch';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

//formData - is an api, gives back an array of arrays, must have name same as database
export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
        await customFetch.post('/auth/signup', data);
        toast.success('Adding Employee Successful');

        return redirect('/dashboard/UserManagement');
    } catch (error) {
        toast.error(error?.response?.data?.msg);
        return error;
    }
};

const AdminAddUser = () => {
    useEffect(() => {
        document.querySelector('form').reset();
    }, []);

    const navigation = useNavigation();

    const isSubmitting = navigation.state === 'submitting';
    return (
        <Wrapper>
            <Form method="post" className="form" autoComplete="off" key={Date.now()}>
                <Logo />
                <h4>Add Employee </h4>
                <FormRow
                    type="text"
                    name="name"
                    labelText="name"
                    placeholder="name"
                    defaultValue=""
                />
                <div className="form-row">
                    <label className="form-label" htmlFor="role">
                        store:
                    </label>
                    <select className="form-input" id="store" name="store" defaultValue="" required>
                        <option value="" disabled>
                            -- Choose a store --
                        </option>
                        <option value="Store 1">Store 1</option>
                        <option value="Store 2">Store 2</option>
                    </select>
                </div>
                <div className="form-row">
                    <label className="form-label" htmlFor="role">
                        role:
                    </label>
                    <select className="form-input" id="role" name="role" defaultValue="" required>
                        <option value="" disabled>
                            -- Choose a role --
                        </option>
                        <option value="admin">admin</option>
                        <option value="inventoryManager">inventoryManager</option>
                        <option value="clerk">clerk</option>
                    </select>
                </div>
                <FormRow
                    type="email"
                    name="email"
                    labelText="email"
                    placeholder="email"
                    defaultValue=""
                    autoComplete="off"
                />
                <FormRow
                    type="password"
                    name="password"
                    labelText="password"
                    placeholder="password"
                    defaultValue=""
                    autoComplete="new-password"
                />
                <button type="submit" className="btn btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'submitting...' : 'submit'}
                </button>
            </Form>
        </Wrapper>
    );
};

export default AdminAddUser;

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
