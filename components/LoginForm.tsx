import { useState, useEffect } from "react";
import api from "@/service/api";
import ProductForm from "./ProductForm";
import ProductList from "./ProductList";

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export default function UserList() {
  const [, setUsers] = useState<User[]>([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (token) {
      const fetchUsers = async () => {
        try {
          const response = await api.get<User[]>("/auth/users", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUsers(response.data);
        } catch (error) {
          console.error("Error al obtener usuarios:", error);
        }
      };
      fetchUsers();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, ingresa el correo y la contraseña.");
      return;
    }

    try {
      const response = await api.post<{ token: string }>("/auth/login", {
        email,
        password,
      });

      const authToken = response.data.token;
      setToken(authToken);
      localStorage.setItem("token", authToken);
      setError("");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Error al iniciar sesión:", err.response?.data);
      setError(
        err.response?.data?.error || "Credenciales inválidas o problema de red"
      );
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
        <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            Iniciar Sesión
          </h2>
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
              className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Iniciar Sesión
            </button>
          </form>
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <ProductForm />
      <ProductList />
    </div>
  );
}
