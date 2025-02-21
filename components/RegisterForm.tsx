import { useState } from "react";
import { register } from "@/service/api";

interface RegisterFormProps {
  toggleForm: () => void;
}
export default function RegisterForm({ toggleForm }: RegisterFormProps) {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(""); // 🔹 Limpiar errores previos

    try {
      const response = await register(username, email, password);
      console.log("✅ Usuario registrado:", response);
      setMessage("Registro exitoso. Ahora puedes iniciar sesión.");
    } catch (err) {
      console.error("❌ Error en el registro:", err);
      setMessage(
        err instanceof Error ? err.message : "Error desconocido en el registro."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="max-w-sm w-full bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Registrarse</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
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
            className="w-full bg-primary text-white py-2 rounded hover:bg-secondary hover:text-textSecondary transition"
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
