import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div>
            <h1>Register</h1>
            <Link to="/login">Already Registered? Login here.</Link>
        </div>
    );
};

export default Register;
