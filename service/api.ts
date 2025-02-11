/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const api = axios.create({
  baseURL: "http://3.23.94.254:3000/api",
});

export const login = async (email: any, password: any) => {
  try {
    const response = await api.post("/auth/login", { email, password });
    console.log("Login exitoso:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error en el login:", error.response?.data || error.message);
    throw error;
  }
};

export default api;
