import React from 'react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider value={defaultSystem}>
            <App />
            <ToastContainer position="top-center" />
        </ChakraProvider>
    </React.StrictMode>
);
