import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
        <h1 className="text-3xl font-bold text-textPrimary mb-6">
          Colores de la Paleta
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
          <div className="bg-primary p-4 rounded-lg shadow-md">
            <h2 className="text-white font-bold text-xl">Color Primario</h2>
          </div>

          <div className="bg-secondary p-4 rounded-lg shadow-md">
            <h2 className="text-white font-bold text-xl">Color Secundario</h2>
          </div>

          <div className="bg-background p-4 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-gray-800 font-bold text-xl">Fondo</h2>
          </div>

          <div className="bg-surface p-4 rounded-lg shadow-md">
            <h2 className="text-gray-800 font-bold text-xl">Superficie</h2>
          </div>

          <div className="bg-error p-4 rounded-lg shadow-md">
            <h2 className="text-white font-bold text-xl">Error</h2>
          </div>

          <h1 className="text-3xl font-bold text-primary mb-6">
            Ejemplo de Texto
          </h1>

          <div className="bg-primary p-4 rounded-lg shadow-md">
            <h2 className="text-textPrimary font-bold text-xl">
              Texto Primario
            </h2>
            <p className="text-textPrimary">Descripción del texto primario.</p>
          </div>

          <div className="bg-secondary p-4 rounded-lg shadow-md mt-4">
            <h2 className="text-textSecondary font-bold text-xl">
              Texto Secundario
            </h2>
            <p className="text-textSecondary">
              Descripción del texto secundario.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
