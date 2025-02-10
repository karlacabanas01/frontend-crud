import axios from "axios";

const api = axios.create({
  baseURL: "http://3.23.94.254:3000/api", // Asegúrate de que el backend esté corriendo aquí
});

export default api;
