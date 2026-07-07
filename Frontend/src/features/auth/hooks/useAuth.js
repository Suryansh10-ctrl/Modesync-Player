import { login,register,getMe,logout } from "../services/auth.api";
import { useContext } from "react";
import { AuthContext } from "../auth.context";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const {user,setUser,loading,setloading} = context;

    async function handleRegister({email,password,username}){
        setloading(true)
        const data = await register({email,password,username})
        setUser(data.user)
        setloading(false)
        return data
    }

    async function handleLogin({email,password,username}){
        setloading(true)
        const data = await login({email,password,username})
        setUser(data.user)
        setloading(false)
        return data
    }

    async function handlegetMe(){
        setloading(true)
        const data = await getMe()
        setUser(data.user)
        setloading(false)
        return data
    }

    async function handleLogout(){
        setloading(true)
        const data = await logout()
        setUser(null)
        setloading(false)
        return data
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