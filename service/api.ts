import axios from "axios";

const api = axios.create({
  baseURL: "http://3.142.76.216:3000/api", // Asegúrate de que el backend esté corriendo aquí
});

export default api;
