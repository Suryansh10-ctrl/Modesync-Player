import axios from "axios";



const api = axios.create({
    baseURL: "https://modesync-player.onrender.com",
    withCredentials: true,
 })


export async function register({email,password,username}){
    const res = await api.post('/api/auth/register',{
        email,
        password,
        username
    })
    return res.data
}

export async function login({email,password}){
    const res = await api.post('/api/auth/login',{
        email,
        password
    })
    return res.data
}


export async function getMe(){
    const res = await api.get('/api/auth/get-me')
    return res.data
}


export async function logout(){
    const res = await api.post('/api/auth/logout')
    return res.data
}