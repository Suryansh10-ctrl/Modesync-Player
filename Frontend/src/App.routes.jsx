import { useEffect } from 'react'
import { createBrowserRouter, Outlet } from 'react-router'
import Register from './features/auth/pages/Register'
import Login from './features/auth/pages/Login'
import Protected from './features/auth/components/Protected'
import Home from './features/home/pages/Home'
import Navbar from './features/shared/components/Navbar'
import { useAuth } from './features/auth/hooks/useAuth'

const RootLayout = () => {
    const { alertMessage, alertType, clearAlertMessage } = useAuth()

    useEffect(() => {
        if (!alertMessage) return

        const timer = window.setTimeout(() => {
            clearAlertMessage()
        }, 3000)

        return () => window.clearTimeout(timer)
    }, [alertMessage, clearAlertMessage])

    return (
        <div className="app-shell">
            <Navbar />
            {alertMessage ? (
                <div className={`auth-alert auth-alert--${alertType}`} role="alert">
                    <span>{alertMessage}</span>
                    <button type="button" onClick={clearAlertMessage} aria-label="Close alert">
                        ×
                    </button>
                </div>
            ) : null}
            <Outlet />
        </div>
    )
}

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