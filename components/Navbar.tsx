import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import Image from "next/image";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-primary text-white p-2">
      <div className="container mx-auto flex justify-between items-center">
        <Image src="/img/3.png" alt="Logo Nabi" width={60} height={60} />

        <ul className="flex space-x-4">
          {user ? (
            <>
              <li className="font-bold">Hola, {user.username}!</li>
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
