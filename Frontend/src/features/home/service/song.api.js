import axios from "axios";



const api = axios.create({
    baseURL: "https://modesync-player.onrender.com",
    withCredentials: true
})

export async function getSong({mood}){
    const res = await api.get("/api/songs?mood=" + mood)
    return res.data
}