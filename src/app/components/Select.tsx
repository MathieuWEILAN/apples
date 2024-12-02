"use client";

import React from "react";
import { apples } from "../data";
interface Data {
  name: string;
  image: string;
  taste: string;
  utilization: string;
  season: string;
  color: string;
  benefits: string;
  subtitle: string;
  nutrition: {
    calories: number;
    carbohydrates: number;
    fiber: number;
    sugars: number;
    vitaminC: number;
  };
}
interface SelectProps {
  handleChange: (index: number) => void;
  selected: Data;
  setOpenInfos: React.Dispatch<React.SetStateAction<boolean>>;
}

const Select: React.FC<SelectProps> = ({
  handleChange,
  selected,
  setOpenInfos,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null); // État pour savoir quel élément est survolé

  // Gestion des clics en dehors du sélecteur
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleClick = (index: number) => {
    handleChange(index);
    setIsOpen(false);
    setOpenInfos(false);
  };

  return (
    <div className="absolute z-20 w-72 p-5" ref={dropdownRef}>
      {/* Bouton principal */}
      <button
        className="w-72 p-2.5 rounded-xl bg-white shadow-lg text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected.name}
      </button>

      {/* Liste déroulante */}
      {isOpen && (
        <ul className="absolute w-full mt-2 bg-white rounded-xl shadow-lg max-h-40 overflow-y-auto no-scrollbar border-2 border-white">
          {apples.map((apple, index) => {
            return (
              <li
                key={apple.name}
                className="p-2.5 cursor-pointer"
                onClick={() => handleClick(index)}
                onMouseEnter={() => setHoveredIndex(index)} // Activer le survol
                onMouseLeave={() => setHoveredIndex(null)} // Désactiver le survol
                style={{
                  backgroundColor:
                    selected.name === apple.name
                      ? selected.color // Couleur de sélection
                      : hoveredIndex === index
                      ? "#f3f3f3" // Couleur au survol
                      : "white", // Couleur par défaut
                }}
              >
                {apple.name}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};
export default Select;
