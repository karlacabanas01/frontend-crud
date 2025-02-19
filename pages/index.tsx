import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-gray-900">
          Bienvenido a la Página Principal 🚀
        </h1>
      </div>
    </div>
  );
}
