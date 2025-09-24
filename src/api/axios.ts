import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080", // Endereço do seu backend
});

export default api;