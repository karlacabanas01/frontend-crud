import ProductList from "@/components/ProductList";
import Navbar from "@/components/Navbar"; // Opcional

export default function ProductPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold text-center mb-4">Tus Productos</h1>
        <ProductList />
      </div>
    </div>
  );
}
