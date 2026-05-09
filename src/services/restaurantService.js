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


export const createRestaurant = async(data) =>{
    const response =  await API.post(`/api/restaurants`, data);
    return response.data;
}

export const getRestaurants = async(data) =>{
    const response =  await API.get(`/api/restaurants`);
    return response.data;
}