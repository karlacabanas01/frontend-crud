import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api", // Asegúrate de que el backend esté corriendo aquí
});

export default api;
