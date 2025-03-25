// components/PaletteShowcase.tsx
import React from "react";
import ColorCard from "./ColorCard";

/**
 * Componente que muestra una vista general de los colores definidos en la paleta.
 */
const PaletteShowcase: React.FC = () => {
  return (
    <main className="h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-3xl font-bold text-textPrimary mb-6">
        Colores de la Paleta
      </h1>

      <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-4xl">
        <ColorCard
          bgColor="bg-primary"
          textColor="text-white"
          title="Color Primario"
        />
        <ColorCard
          bgColor="bg-secondary"
          textColor="text-white"
          title="Color Secundario"
        />
        <ColorCard
          bgColor="bg-background"
          textColor="text-gray-800"
          title="Fondo"
          border
        />
        <ColorCard
          bgColor="bg-surface"
          textColor="text-gray-800"
          title="Superficie"
        />
        <ColorCard bgColor="bg-error" textColor="text-white" title="Error" />
      </section>

      <h1 className="text-3xl font-bold text-primary mt-10 mb-6">
        Ejemplo de Texto
      </h1>
    </main>
  );
};

export default PaletteShowcase;
