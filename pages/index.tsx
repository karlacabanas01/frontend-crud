import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";

export default function Home() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null); // Mejor manejo de estado

  useEffect(() => {
    if (typeof window !== "undefined") {
      // ✅ Evita errores en SSR
      const token = localStorage.getItem("token");

      if (!token) {
        router.replace("/login"); // ✅ Usa router.replace() para evitar el botón de "Atrás"
      } else {
        setIsAuthenticated(true);
      }
    }
  }, [router]);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Verificando autenticación...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenido a la Página Principal 🚀
        </h1>
      </div>
    </div>
  );
}
