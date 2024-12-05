import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// import './global.css';
// import { ChakraProvider } from '@chakra-ui/react';
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { ThemeProvider } from 'next-themes';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <ChakraProvider value={defaultSystem}>
            <ThemeProvider attribute="class" disableTransitionOnChange>
                <App />
            </ThemeProvider>
        </ChakraProvider>
    </React.StrictMode>
);
