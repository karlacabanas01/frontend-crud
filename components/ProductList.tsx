"use client";
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import api from "@/service/api";
import { MdDelete, MdEdit } from "react-icons/md";
import ProductAddModal from "./ProductAddModal";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedPrice, setUpdatedPrice] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const fetchProducts = async () => {
    try {
      const response = await api.get<Product[]>("/products");
      setProducts(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(
        "❌ Error al obtener productos:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/products/${id}`);
      fetchProducts(); // ✅ Recarga de productos después de eliminar
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

  const handleAddProduct = async (newProduct: {
    name: string;
    description: string;
    price: number;
  }) => {
    try {
      const token = localStorage.getItem("token"); // Asegúrate de que hay token
      if (!token) throw new Error("No hay token disponible");

      const response = await api.post(
        "/products",
        { ...newProduct },
        { headers: { Authorization: `Bearer ${token}` } } // ✅ Envía el token en la cabecera
      );

      console.log("✅ Producto agregado:", response.data);
      fetchProducts(); // Recargar la lista de productos
      setIsOpen(false); // Cerrar modal
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: Error | any) {
      console.error(
        "❌ Error al agregar producto:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="p-4 mb-2 bg-white shadow-md rounded-md mt-4">
      <div className="flex justify-between">
        <h2 className="text-xl font-bold mb-4">Productos Disponibles</h2>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Agregar Producto
        </button>
      </div>

      <ul>
        {products.map((product) => (
          <li
            key={product.id}
            className="border-b py-2 flex justify-between items-center"
          >
            <div className="p-2 ¡">
              <li>
                <strong>{product.name}</strong>
              </li>
              <li>{product.description}</li>
              <li>
                {new Intl.NumberFormat("es-CL", {
                  style: "currency",
                  currency: "CLP",
                }).format(product.price)}
              </li>
            </div>

            <div className="space-x-2">
              <button
                onClick={() => handleEdit(product)}
                className="bg-yellow-500 text-white p-2 rounded-full hover:bg-yellow-600"
                style={{ pointerEvents: "auto" }}
              >
                <MdEdit />
              </button>
              <button
                onClick={() => handleDelete(product.id)}
                className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                style={{ pointerEvents: "auto" }}
              >
                <MdDelete />
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

      <ProductAddModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onAddProduct={handleAddProduct}
      />
    </div>
  );
}
