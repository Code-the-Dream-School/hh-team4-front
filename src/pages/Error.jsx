import { Link, useRouteError } from 'react-router-dom';

const Error = () => {
    const error = useRouteError();
    console.log(error);
    return (
        <>
            <h1>Error Page</h1>
            <Link to="/">Back Home</Link>
        </>
    );
};

export default Error;
