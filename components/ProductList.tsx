"use client";
import { useEffect, useState } from "react";
import { Product } from "../types/Product"; // Importa la interfaz
import api from "@/service/api";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get<Product[]>("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div className="p-4 bg-white shadow-md rounded-md mt-4">
      <h2 className="text-xl font-bold mb-4">Productos Disponibles</h2>
      <ul>
        {products.map((product) => (
          <li key={product.id} className="border-b py-2">
            <strong>{product.name}</strong> - {product.description} - $
            {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
}
