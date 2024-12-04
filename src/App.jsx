import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
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
    AllDrugs,
    PastOrders,
    AddDrug,
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
                path: 'register',
                element: <Register />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
                children: [
                    {
                        index: 'true',
                        element: <AllDrugs />,
                    },
                    {
                        path: 'adduser',
                        element: <AdminAddUser />,
                    },
                    {
                        path: 'dispense',
                        element: <DispenseDrug />,
                    },
                    {
                        path: 'alerts',
                        element: <Alerts />,
                    },
                    {
                        path: 'reports',
                        element: <Reports />,
                    },
                    {
                        path: 'store',
                        element: <Store />,
                    },
                    {
                        path: 'user',
                        element: <User />,
                    },
                    {
                        path: 'edit',
                        element: <EditDrug updateDrug={EditDrug} />,
                    },
                    {
                        path: 'add',
                        element: <AddDrug addDrugs={AddDrug} />,
                    },
                    {
                        path: 'past-orders',
                        element: <PastOrders />,
                    },
                ],
            },
        ],
    },
]);

const App = () => {
    return <RouterProvider router={router} />;
};
export default App;
