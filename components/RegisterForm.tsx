import { useState } from "react";
import api from "@/service/api";

interface RegisterFormProps {
  onRegisterSuccess: (token: string) => void;
  toggleForm: () => void;
}
interface CustomAxiosError {
  response?: {
    data?: {
      error?: string;
    };
  };
}
export default function RegisterForm({
  onRegisterSuccess,
  toggleForm,
}: RegisterFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !password) {
      setMessage("Todos los campos son obligatorios para registrarse.");
      return;
    }

    try {
      const response = await api.post<{ token: string }>("/auth/register", {
        name,
        email,
        password,
      });

      setMessage("Registro exitoso 🎉");
      localStorage.setItem("message", "Registro exitoso 🎉"); // ✅ Guardar mensaje en localStorage

      setTimeout(() => {
        onRegisterSuccess(response.data.token);
      }, 2000); // Espera 2 segundos antes de cambiar la vista
    } catch (error: unknown) {
      const axiosError = error as CustomAxiosError;
      if (axiosError.response?.data?.error) {
        console.error("Error de Axios:", axiosError.response.data.error);
        setMessage(axiosError.response.data.error);
      } else {
        console.error("Error desconocido:", error);
        setMessage("Error inesperado.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Nombre completo"
            className="w-full p-2 border rounded"
            required
          />

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
            Registrarse
          </button>
        </form>

        {message && (
          <p
            className={`mt-2 text-center ${
              message.includes("exitoso") ? "text-green-600" : "text-red-800"
            }`}
          >
            {message}
          </p>
        )}

        <button onClick={toggleForm} className="w-full text-blue-500 mt-4">
          ¿Ya tienes cuenta? Inicia sesión
        </button>
      </div>
    </div>
  );
}
