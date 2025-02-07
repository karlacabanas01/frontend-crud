/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useEffect, useState } from "react";
import { Product } from "../types/Product"; // Importa la interfaz
import api from "@/service/api";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  const fetchProducts = async () => {
    try {
      const token = localStorage.getItem("token");

      // Tipado explícito de la respuesta
      const response = await api.get<Product[]>("/products", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setProducts(response.data); // Ahora TypeScript sabe que es un array de productos
    } catch (error: unknown) {
      setError("Error al obtener productos");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mt-4">
      <h2 className="text-xl font-bold text-gray-700">Lista de Productos</h2>
      {error && <p className="text-red-500">{error}</p>}
      <ul className="mt-2 space-y-2">
        {products.map((product) => (
          <li key={product.id} className="p-4 bg-white shadow rounded-md">
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p>{product.description}</p>
            <p className="font-bold text-indigo-600">${product.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
