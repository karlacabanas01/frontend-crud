/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoginResponse } from "@/types/User";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: "http://localhost:3000/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export const login = async (email: string, password: string) => {
  if (!email?.trim() || !password?.trim()) {
    throw new Error("❌ Error: Las credenciales no pueden estar vacías.");
  }

  try {
    console.log("📌 Enviando credenciales:", { email, password });

    const { data } = await api.post<LoginResponse>("/auth/login", {
      email,
      password,
    });

    if (!data.token || !data.user)
      throw new Error("No se recibió un token o usuario en la respuesta.");

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    return { user: data.user, token: data.token };
  } catch (error: any) {
    console.error("❌ Error en login:", error.response?.data || error.message);
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

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export default api;
