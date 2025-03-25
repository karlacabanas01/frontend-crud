import React from "react";
/**
 * Componente de tarjeta de color.
 *
 * @param bgColor - Clase de fondo (Tailwind CSS).
 * @param textColor - Clase para el color del texto.
 * @param title - Título que describe el color.
 * @param border - (opcional) Si se debe mostrar un borde.
 * @param children - Elementos hijos para mostrar dentro de la tarjeta.
 */

type ColorCardProps = {
  bgColor: string;
  textColor: string;
  title: string;
  children?: React.ReactNode;
  border?: boolean;
};

const ColorCard = ({
  bgColor,
  textColor,
  title,
  children,
  border,
}: ColorCardProps) => (
  <div
    className={`p-4 rounded-lg shadow-md ${bgColor} ${
      border ? "border border-gray-200" : ""
    }`}
  >
    <h2 className={`${textColor} font-bold text-xl`}>{title}</h2>
    {children}
  </div>
);

export default ColorCard;
