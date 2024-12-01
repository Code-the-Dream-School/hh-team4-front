import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React, { useState, useEffect } from 'react';


import {
    AddDrug,
    AddEdit,
    AdminAddUser,
    Alerts,
    Dashboard,
    DispenseDrug,
    Landing,
    Login,
    Register,
    Reports,
    Store,
    User,
    Error,
    EditDrug,
    HomeLayout,
} from './pages';


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Landing />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
            },
            {
                path: 'register',
                element: <Register />,
            },
            {
                path: 'login',
                element: <Login />,
            },
        ],
    },

    {
        path: '/alerts',
        element: <Alerts />,
    },
    {
        path: '/adddrug',
        element: <AddDrug />,
    },
    {
        path: '/editdrug',
        element: <EditDrug />
    },
    {
        path: '/AddEdit',
        element: <AddEdit />
    },
    {
        path: '/dispense',
        element: <DispenseDrug />,
    },
    {
        path: '/store',
        element: <Store />,
    },
    {
        path: '/user',
        element: <User />,
    },
    {
        path: '/adminuser',
        element: <AdminAddUser />,
    },
    {
        path: '/reports',
        element: <Reports />,
    },
]);


const App = () => {

    return (
        <>
            <RouterProvider router={router} />

        </>
    );
};

export default App;
