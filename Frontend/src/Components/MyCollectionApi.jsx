import axios from "axios";

const api = axios.create({
    baseURL:'http://localhost:3000/user'
})

export const getConstellationData= (()=>{
    return api.get('/constellations');
})