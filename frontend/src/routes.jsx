import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/home';
import Root from './pages/root';
import ErrorPage from './components/layout/misc/ErrorPage';
import Login from './pages/login';
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
            //     element: <PrivateRoute element={Dashboard} } />,
            // },
        ],
    },
]);

export default router;
