import axios from 'axios';

const customFetch = axios.create({
    baseURL: 'https://medistock.onrender.com/api/v1',
});

export default customFetch;
