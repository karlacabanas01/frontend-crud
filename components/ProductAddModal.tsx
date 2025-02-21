import { useState } from "react";

interface ProductAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddProduct: (product: {
    name: string;
    description: string;
    price: number;
  }) => void;
}

export default function ProductAddModal({
  isOpen,
  onClose,
  onAddProduct,
}: ProductAddModalProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim() || !price.trim()) {
      alert("Todos los campos son obligatorios");
      return;
    }

    onAddProduct({
      name,
      description,
      price: parseFloat(price),
    });

    setName("");
    setDescription("");
    setPrice("");
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Agregar Producto</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Descripción"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <button type="submit">Agregar</button>
          <button onClick={onClose}>Cerrar</button>
        </form>
      </div>
    </div>
  );
}
