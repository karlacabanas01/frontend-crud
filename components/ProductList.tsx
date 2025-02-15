"use client";
import { useEffect, useState } from "react";
import { Product } from "../types/Product"; // Importa la interfaz
import api from "@/service/api";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");

  const fetchProducts = async () => {
    try {
      const response = await api.get<Product[]>("/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts(); // ✅ Recarga productos después de eliminar
    } catch (error) {
      console.error("Error al eliminar producto:", error);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setUpdatedName(product.name);
    setUpdatedDescription(product.description);
    setUpdatedPrice(product.price.toString());
  };

  const handleUpdate = async () => {
    if (!editingProduct) return;

    try {
      const updatedProduct = {
        ...editingProduct,
        name: updatedName,
        description: updatedDescription,
        price: parseFloat(updatedPrice),
      };

      await api.put(`/products/${editingProduct.id}`, updatedProduct);
      fetchProducts(); // ✅ Recarga productos después de actualizar
      setEditingProduct(null);
    } catch (error) {
      console.error("Error al actualizar producto:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md mt-4">
      <h2 className="text-xl font-bold mb-4">Productos Disponibles</h2>
      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div>
              <strong>{product.name}</strong> - {product.description} - $
              {product.price}
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                style={{ pointerEvents: "auto" }}
              >
                Actualizar
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                style={{ pointerEvents: "auto" }}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      {editingProduct && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h3 className="text-lg font-bold">Editar Producto</h3>
          <input
            type="text"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            placeholder="Nombre"
          />
          <input
            type="text"
            value={updatedDescription}
            onChange={(e) => setUpdatedDescription(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            placeholder="Descripción"
          />
          <input
            type="number"
            value={updatedPrice}
            onChange={(e) => setUpdatedPrice(e.target.value)}
            className="w-full p-2 border rounded mt-2"
            placeholder="Precio"
          />
          <div className="flex space-x-2 mt-4">
            <button
              onClick={handleUpdate}
              className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
            >
              Guardar Cambios
            </button>
            <button
              onClick={() => setEditingProduct(null)}
              className="bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
