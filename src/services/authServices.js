// login
// register

import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000'
});

// Register API

export const regiterUser = async(data) =>{
    console.log('data',data)
    return await API.post('/api/auth/register', data)
}

export const loginUser = async(data) =>{
    
    const res =  await API.post('/api/auth/login', data)
    return res;
}

// http://localhost:5000/api/auth/register