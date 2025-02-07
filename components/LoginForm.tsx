"use client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import api from "@/service/api";

interface LoginFormInputs {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
  message: string;
}

export default function LoginForm() {
  const { register, handleSubmit } = useForm<LoginFormInputs>();
  const router = useRouter();
  const [error, setError] = useState("");

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      // 👇 Tipar la respuesta de Axios
      const response = await api.post<LoginResponse>("/auth/login", data);

      localStorage.setItem("token", response.data.token);
      router.push("/");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setError("Credenciales incorrectas");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Iniciar Sesión
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Usuario
            </label>
            <input
              {...register("username")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Tu usuario"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              {...register("password")}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="••••••••"
              required
            />
          </div>

          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 rounded-lg transition-colors">
            Iniciar Sesión
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}
