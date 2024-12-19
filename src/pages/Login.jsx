import { Link, Form, redirect, useNavigation, useActionData } from 'react-router-dom';
import styled from 'styled-components';
import { FormRow, Logo } from '../components';
import { toast } from 'react-toastify';
import customFetch from '../util/customFetch';

// export const action = async ({ request }) => {
//     const formData = await request.formData();
//     const data = Object.fromEntries(formData);
//     const errors = { msg: '' };
//     if (data.password.length < 3) {
//         errors.msg = 'Password too short';
//         return errors;
//     }
//     try {
//         await customFetch.post('/auth/login', data);
//         toast.success('Login Successful');
//         return redirect('/dashboard');
//     } catch (error) {
//         toast.error(error?.response?.data?.msg);
//     }
//     return null;
// };

export const action = async ({ request }) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);

    const errors = { msg: '' };

    if (data.password.length < 3) {
        errors.msg = 'Password too short';
        return errors;
    }

    try {
        const response = await customFetch.post('/auth/login', data);
        const { token, user } = response.data;
        //SET THEM IN LOCAL STORAGE
        localStorage.setItem('token', token);
        localStorage.setItem('userId', user.id);
        toast.success('Login Successful');
        return redirect('/dashboard');
    } catch (error) {
        // Handle errors
        console.log(error) ;
        toast.error(error?.response?.data?.msg || 'Something went wrong');
    }

    return null;
};

const Login = () => {
    const errors = useActionData();
    const navigation = useNavigation();
    const isSubmitting = navigation.state === 'submitting';

    return (
        <Wrapper>
            <Form method="post" className="form">
                <Logo />
                <h4>Login</h4>
                {errors?.msg && <p style={{ color: 'red' }}>{errors.msg}</p>}

                <FormRow type="email" name="email" labelText="email" placeholder="EMAIL" />
                <FormRow
                    type="password"
                    name="password"
                    labelText="password"
                    placeholder="password"
                />
                <button type="submit" className="btn btn-block" disabled={isSubmitting}>
                    {isSubmitting ? 'submitting...' : 'submit'}
                </button>
                <p>
                    Not Registered Yet?
                    <Link to="/register" className="member-btn">
                        Register!
                    </Link>
                </p>
            </Form>
        </Wrapper>
    );
};

export default Login;

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
`;
