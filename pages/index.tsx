import Navbar from "@/components/Navbar";
import PaletteShowcase from "@/components/Pallette/PaletteShowcase";
/**
 * Página principal del sitio. Muestra la barra de navegación.
 * Este componente es renderizado como la raíz (`/`) en la app Next.js.
 */
export default function Home() {
  return (
    <div>
      <Navbar />

      <PaletteShowcase />
    </div>
  );
}
