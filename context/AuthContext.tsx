"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter } from "next/navigation";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

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

  console.log("AuthContext cargado"); // 🚀 Este mensaje debería aparecer

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      setUser(JSON.parse(storedUser));
      console.log("Usuario cargado desde localStorage:", storedUser);
    }
  }, []);

  const login = (userData: User) => {
    console.log("Guardando usuario en el contexto:", userData);
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));

    console.log("Usuario autenticado, redirigiendo a /products...");
    router.push("/products");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    console.log("Usuario deslogueado, redirigiendo a /login...");
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
