import React from "react";
import ProductForm from "./ProductForm";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProductAddModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <header className="flex justify-end">
          <button
            className="bg-red-600 text-white p-2 rounded-full  hover:bg-gray-700 transition"
            onClick={onClose}
          >
            <IoClose size={22} />
          </button>
        </header>
        <ProductForm refreshProducts={() => {}} />
        <div className="mt-4 flex justify-end"></div>
      </div>
    </div>
  );
};

export default ProductAddModal;
