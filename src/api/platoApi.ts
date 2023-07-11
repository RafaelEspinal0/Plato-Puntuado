import axios from "axios";



const platoApi = axios.create({
    baseURL: '/api'
});

export default platoApi;