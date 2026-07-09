import { createBrowserRouter, Outlet } from 'react-router'
import Register from './features/auth/pages/Register'
import Login from './features/auth/pages/Login'
import Protected from './features/auth/components/Protected'
import Home from './features/home/pages/Home'
import Navbar from './features/shared/components/Navbar'

const RootLayout = () => (
    <div className="app-shell">
        <Navbar />
        <Outlet />
    </div>
)

export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            {
                path: '/',
                element: <Protected><Home /></Protected>,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/login',
                element: <Login />,
            },
        ],
    },
])