import { login,register,getMe,logout } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user,setUser,loading,setloading,showAlert,alertMessage,alertType,clearAlertMessage} = context;

    function getErrorMessage(error, fallbackMessage) {
        return error?.response?.data?.message || error?.message || fallbackMessage
    }

    async function handleRegister({email,password,username}){
        setloading(true)
        try {
            const data = await register({email,password,username})
            setUser(data.user)
            showAlert('Account created successfully', 'success')
            return data
        } catch (error) {
            showAlert(getErrorMessage(error, 'Registration failed'), 'error')
            throw error
        } finally {
            setloading(false)
        }
    }

    async function handleLogin({email,password}){
        setloading(true)
        try {
            const data = await login({email,password})
            setUser(data.user)
            showAlert('Login successful', 'success')
            return data
        } catch (error) {
            showAlert(getErrorMessage(error, 'Invalid email or password'), 'error')
            throw error
        } finally {
            setloading(false)
        }
    }

    async function handlegetMe(){
        setloading(true)
        try {
            const data = await getMe()
            setUser(data.user)
            return data
        } finally {
            setloading(false)
        }
    }

    async function handleLogout(){
        setloading(true)
        setUser(null)
        showAlert('Logged out successfully', 'success')

        try {
            const data = await logout()
            return data
        } catch (error) {
            showAlert(getErrorMessage(error, 'Logout failed'), 'error')
            throw error
        } finally {
            setloading(false)
        }
    }


    return ({
        user,
        loading,
        alertMessage,
        alertType,
        clearAlertMessage,
        handleRegister,
        handleLogin,
        handlegetMe,
        handleLogout
    })
    
}