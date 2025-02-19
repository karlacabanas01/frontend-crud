"use client";
import api from "@/service/api";
import { ProductFormInputs } from "@/types/Product";
import { useForm } from "react-hook-form";

export default function ProductForm({
  refreshProducts,
}: {
  refreshProducts: () => void;
}) {
  const { register, handleSubmit, reset } = useForm<ProductFormInputs>();

  const onSubmit = async (data: ProductFormInputs) => {
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/products",
        { ...data, price: Number(data.price) }, // ✅ Convierte el precio a número
        { headers: { Authorization: `Bearer ${token}` } }
      );
      reset();
      alert("Producto creado con éxito");
      refreshProducts(); // ✅ Recargar la lista de productos
    } catch (error) {
      if (error instanceof Error) {
        alert("Error al crear el producto " + error.message);
      } else {
        alert("Error al crear el producto");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-4 rounded "
    >
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Nombre del Producto
        </label>
        <input
          id="name"
          type="text"
          {...register("name")}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Producto A"
          required
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700"
        >
          Descripción
        </label>
        <textarea
          id="description"
          {...register("description")}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Descripción del producto"
        />
      </div>
      <div>
        <label
          htmlFor="price"
          className="block text-sm font-medium text-gray-700"
        >
          Precio
        </label>
        <input
          id="price"
          type="number"
          {...register("price")}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="1000"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
      >
        Crear Producto
      </button>
    </form>
  );
}
