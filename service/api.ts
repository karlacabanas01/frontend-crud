/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://3.23.94.254:3000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Definimos el tipo esperado en el payload del token
interface TokenPayload {
  id: number;
  name: string;
  email: string;
}

export const login = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/login", { email, password });

    console.log("Respuesta completa del login:", response.data);

    if (!response.data.token) {
      throw new Error("No se recibió un token en la respuesta.");
    }

    // ⚠️ Decodificamos el token para obtener los datos del usuario
    const decoded: TokenPayload = jwtDecode(response.data.token);

    console.log("Usuario decodificado del token:", decoded);

    return decoded; // Devolvemos el usuario decodificado
  } catch (error: any) {
    console.error("Error en login:", error.response?.data || error.message);
    throw new Error(
      error.response?.data?.message || "Error en la autenticación"
    );
  }
};

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  try {
    const response = await api.post("/auth/register", {
      name,
      email,
      password,
    });
    console.log("Registro exitoso:", response.data);
    return response.data;
  } catch (error: any) {
    console.error(
      "Error en el registro:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default api;
