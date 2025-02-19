import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Mi App</h1>
        <ul className="flex space-x-4">
          {user ? (
            <>
              <li className="font-bold">Hola, {user.name}!</li>
              <li>
                <Link href="/products" className="hover:underline">
                  Mis Productos
                </Link>
              </li>
              <li>
                <button onClick={logout} className="hover:underline">
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/" className="hover:underline">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:underline">
                  Registro
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
