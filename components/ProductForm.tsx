"use client";
import api from "@/service/api";
import { useForm } from "react-hook-form";

interface ProductFormInputs {
  name: string;
  description: string;
  price: number;
}

export default function ProductForm() {
  const { register, handleSubmit, reset } = useForm<ProductFormInputs>();

  const onSubmit = async (data: ProductFormInputs) => {
    try {
      const token = localStorage.getItem("token");
      await api.post("/products", data, {
        headers: { Authorization: `Bearer ${token}` },
      });
      reset();
      alert("Producto creado con éxito");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error: unknown) {
      alert("Error al crear el producto");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4 bg-white p-4 rounded shadow"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nombre del Producto
        </label>
        <input
          {...register("name")}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Producto A"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Descripción
        </label>
        <textarea
          {...register("description")}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder="Descripción del producto"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Precio
        </label>
        <input
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
