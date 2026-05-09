// get pending state owners list
// update status of user
import axios from "axios";

const API = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true
});


// interceptors configuration for headers

// API.interceptors.request.use((config)=>{
//     const jwt_token = sessionStorage.getItem("token");
//     if(jwt_token){
//         config.headers.Authorization = `Bearer ${jwt_token}`
//     }
//     return config;
// })


export const createMenu = async(data) =>{
    const response =  await API.post(`/api/menus`, data);
    return response.data;
}

export const getMenu = async(resturantId) =>{
    const response =  await API.get(`/api/menus/${resturantId}`);
    return response.data;
}

// delete
export const deleteMenu = async(id) =>{
    const response =  await API.delete(`/api/menus/${id}`);
    return response.data;
}

// update
export const updateMenu = async({id, data}) =>{
    console.log("id", id);
    console.log("data", data)
    const response =  await API.put(`/api/menus/${id}`, data);
    return response.data;
}