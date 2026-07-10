import { createContext, useEffect, useState } from "react";
import { getMe } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setloading] = useState(true);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertType, setAlertType] = useState('success');

    const showAlert = (message, type = 'success') => {
        setAlertMessage(message);
        setAlertType(type);
    };

    const clearAlertMessage = () => {
        setAlertMessage('');
        setAlertType('success');
    };

    useEffect(() => {
        let isActive = true;

        async function restoreSession() {
            try {
                const data = await getMe();
                if (isActive) {
                    setUser(data?.user ?? null);
                }
            } catch (error) {
                if (isActive) {
                    setUser(null);
                }
            } finally {
                if (isActive) {
                    setloading(false);
                }
            }
        }

        restoreSession();

        return () => {
            isActive = false;
        };
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, loading, setloading, alertMessage, alertType, showAlert, clearAlertMessage }}>
            {children}
        </AuthContext.Provider>
    );
};