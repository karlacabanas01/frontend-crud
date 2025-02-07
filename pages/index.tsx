import { useEffect } from "react";
import { useRouter } from "next/router";
import ProductForm from "../components/ProductForm";
import ProductList from "../components/ProductList";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-4">
        CRUD de Productos
      </h1>
      <ProductForm />
      <ProductList />
    </div>
  );
}
