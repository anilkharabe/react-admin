// get pending state owners list
// update status of user
import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000'
});


// interceptors configuration for headers

API.interceptors.request.use((config)=>{
    const jwt_token = sessionStorage.getItem("token");
    if(jwt_token){
        config.headers.Authorization = `Bearer ${jwt_token}`
    }
    return config;
})

export const getPendingUsers = async() =>{
    const data =  await API.get('/api/admin/pending-owners');
    return data.data;
}

export const approveUser = async(id) =>{
    const data =  await API.put(`/api/admin/approve-owner/${id}`);
    return data.data;
}