import { LoginResponse, RegisterResponse } from "@/types/User";
import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.API_URL_BACK}/api/auth`,
});
interface AxiosError {
  message: string;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  response: any;
}
export const login = async (
  email: string,
  password: string
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>("/login", {
      email,
      password,
    });

    console.log("📌 Respuesta del backend:", response.data); // ✅ Verifica qué devuelve el backend

    if (!response.data || !response.data.user || !response.data.token) {
      console.error("❌ Datos faltantes en la respuesta:", response.data);
      throw new Error("Respuesta inválida del servidor.");
    }

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error(
      "❌ Error en login:",
      axiosError.response?.data || axiosError.message
    );

    throw new Error(
      (axiosError.response?.data as { error?: string })?.error ||
        "Error en la autenticación."
    );
  }
};

export const register = async (
  username: string,
  email: string,
  password: string
): Promise<RegisterResponse> => {
  try {
    const { data } = await api.post<RegisterResponse>("/register", {
      username,
      email,
      password,
    });

    console.log("✅ Registro exitoso:", data);
    return data;
  } catch (error) {
    const axiosError = error as AxiosError;
    console.error(
      "❌ Error en el registro:",
      axiosError.response?.data || axiosError.message
    );
    throw new Error(
      axiosError.response?.data?.error || "No se pudo completar el registro."
    );
  }
};

export const logout = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

// Interceptor para agregar el token a cada petición
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      // Asegurar que headers está definido
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
