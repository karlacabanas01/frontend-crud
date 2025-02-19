"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { useRouter } from "next/navigation";
import { AuthContextType, User } from "@/types/User";
import { login as apiLogin, logout as apiLogout } from "@/service/api";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Cargar usuario desde localStorage en el primer render
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("✅ Usuario cargado desde localStorage:", parsedUser);
      } catch (error) {
        console.error("❌ Error al cargar el usuario:", error);
        localStorage.removeItem("user");
      }
    }
    setLoading(false);
  }, []);

  // Función de login
  const login = async (email: string, password: string) => {
    try {
      console.log("📌 Enviando credenciales al backend:", { email, password });

      const { user, token } = await apiLogin(email, password);

      console.log("✅ Usuario autenticado:", user);

      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);

      router.push("/products");
    } catch (error) {
      console.error("❌ Error en login:", error);
    }
  };

  // Función de logout
  const logout = () => {
    console.log("🚪 Cerrando sesión...");
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    apiLogout(); // Asegurar que la API de logout se ejecuta
    router.push("/"); // Redirigir a la página principal
  };

  const userName = user?.name || null;

  const contextValue = useMemo(
    () => ({ user, userName, login, logout }),
    [user]
  );

  if (loading) {
    return <div>Cargando...</div>;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
}
