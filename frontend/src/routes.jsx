import { createBrowserRouter, Navigate } from 'react-router-dom';
import Home from './pages/home';
import Root from './pages/root';
import ErrorPage from './components/layout/misc/ErrorPage';
import Login from './pages/login';
import store from './redux/store';

const PrivateRoute = ({ element: Component, isAuthenticated, ...rest }) => {
    return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" replace />;
};

const checkAuthStatus = () => {
    const {
        user: { session },
    } = store.getState();
    const token = session?.access_token;
    return token ? true : false;
};

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'login',
                element: <Login />,
            },
            // {
            //     path: 'dashboard',
            //     element: <PrivateRoute element={Dashboard} isAuthenticated={checkAuthStatus()} />,
            // },
            // {
            //     path: 'profile',
            //     element: <PrivateRoute element={Profile} isAuthenticated={checkAuthStatus()} />,
            // },
        ],
    },
]);

export default router;
