import { login,register,getMe,logout } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user,setUser,loading,setloading} = context;

    async function handleRegister({email,password,username}){
        setloading(true)
        try {
            const data = await register({email,password,username})
            setUser(data.user)
            return data
        } finally {
            setloading(false)
        }
    }

    async function handleLogin({email,password}){
        setloading(true)
        try {
            const data = await login({email,password})
            setUser(data.user)
            return data
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
        try {
            const data = await logout()
            setUser(null)
            return data
        } finally {
            setloading(false)
        }
    }


    return ({
        user,
        loading,
        handleRegister,
        handleLogin,
        handlegetMe,
        handleLogout
    })
    
}