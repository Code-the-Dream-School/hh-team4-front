import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import {
    AdminAddUser,
    Dashboard,
    DispenseDrug,
    Landing,
    Login,
    Register,
    Reports,
    Store,
    User,
    UserChangePassword,
    UserManagement,
    Error,
    EditDrug,
    HomeLayout,
    AllDrugs,
    PastOrders,
    AddDrug,
    Medication,
    Alarms,
    DispenseDrugByID,
} from './pages';

import { action as AdminAddUserAction } from './pages/AdminAddUser';
import { action as registerAction } from './pages/Register';
import { action as loginAction } from './pages/Login';
import { loader as dashboardLoader } from './pages/Dashboard';

const AllDrugsWithState = () => {
    window.history.replaceState({}, '');
    return <AllDrugs />;
};

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
                action: registerAction,
            },
            {
                path: 'login',
                element: <Login />,
                action: loginAction,
            },
            {
                path: 'dashboard',
                element: <Dashboard />,
                loader: dashboardLoader,
                children: [
                    {
                        index: 'true',
                        element: <AllDrugsWithState />,
                    },
                    {
                        path: 'adduser',
                        element: <AdminAddUser />,
                        action: AdminAddUserAction,
                    },
                    {
                        path: 'dispense',
                        element: <DispenseDrug />,
                    },
                    {
                        path: 'dispense/:id',
                        element: <DispenseDrugByID />,
                    },
                    {
                        path: 'alerts',
                        element: <Alarms />,
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
                        path: 'user/:id',
                        element: <User />,
                    },
                    {
                        path: 'UserChangePassword',
                        element: <UserChangePassword />,
                    },
                    {
                        path: 'UserManagement',
                        element: <UserManagement />,
                    },
                    {
                        path: 'edit/:id', // Dynamic parameter for drug ID
                        element: <EditDrug />,
                    },
                    {
                        path: 'add',
                        element: <AddDrug addDrugs={AddDrug} />,
                    },
                    {
                        path: 'past-orders',
                        element: <PastOrders />,
                    },
                    {
                        path: 'medication',
                        element: <Medication />,
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
