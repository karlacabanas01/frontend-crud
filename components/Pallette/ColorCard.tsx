import React from "react";

type ColorCardProps = {
  bgColor: string,
  textColor: string,
  title: string,
  children?: React.ReactNode,
  border?: boolean,
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
