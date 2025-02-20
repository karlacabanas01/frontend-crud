"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { login } from "@/service/api";

export default function LoginPage() {
  const { login: authLogin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const user = await login(email, password);
      console.log("Usuario autenticado:", user);
      authLogin(email, password);
    } catch (err: unknown) {
      setError((err as Error).message || "Error en la autenticación");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo electrónico"
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded hover:bg-secondary hover:text-textSecondary transition"
          >
            Iniciar Sesión
          </button>
        </form>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </div>
  );
}
