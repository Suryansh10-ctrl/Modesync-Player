import axios from "axios";

const api = axios.create({
    baseURL: "https://modesync-player.onrender.com",
    withCredentials: true,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export async function register({email,password,username}){
    const res = await api.post('/api/auth/register',{
        email,
        password,
        username
    })
    if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
    }
    return res.data
}

export async function login({email,password}){
    const res = await api.post('/api/auth/login',{
        email,
        password
    })
    if (res.data?.token) {
        localStorage.setItem('token', res.data.token);
    }
    return res.data
}

export async function getMe(){
    const res = await api.get('/api/auth/get-me')
    return res.data
}

export async function logout(){
    localStorage.removeItem('token');
    const res = await api.post('/api/auth/logout')
    return res.data
}