import React from "react";

interface NutritionProps {
  nutrition: {
    calories: number;
    carbohydrates: number;
    fiber: number;
    sugars: number;
    vitaminC: number;
  };
}

const NutritionTable: React.FC<NutritionProps> = ({ nutrition }) => {
  return (
    <div className="overflow-x-auto w-auto">
      <table className="min-w-full table-auto border-collapse border border-black rounded-lg">
        <thead>
          <tr className="bg-white/90">
            <th className="border border-black px-4 py-2 max-lg:text-sm">
              Calories (kcal)
            </th>
            <th className="border border-black px-4 py-2 max-lg:text-sm">
              Glucides (g)
            </th>
            <th className="border border-black px-4 py-2 max-lg:text-sm">
              Fibres (g)
            </th>
            <th className="border border-black px-4 py-2 max-lg:text-sm">
              Sucres (g)
            </th>
            <th className="border border-black px-4 py-2 max-lg:text-sm">
              Vitamine C (mg)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-black px-4 py-2 bg-white/20 text-center">
              {nutrition.calories}
            </td>
            <td className="border border-black px-4 py-2 bg-white/20 text-center">
              {nutrition.carbohydrates}
            </td>
            <td className="border border-black px-4 py-2 bg-white/20 text-center">
              {nutrition.fiber}
            </td>
            <td className="border border-black px-4 py-2 bg-white/20 text-center">
              {nutrition.sugars}
            </td>
            <td className="border border-black px-4 py-2 bg-white/20 text-center">
              {nutrition.vitaminC}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default NutritionTable;
