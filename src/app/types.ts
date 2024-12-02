export interface Data {
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

export interface AppleProps {
  key: string;
  direction: string;
  prevData: Data;
  data: Data;
  nextData: Data;
  currentIndex: number;
  openInfos: boolean;
  setOpenInfos: React.Dispatch<React.SetStateAction<boolean>>;
  isMobile: boolean;
}

export interface Apple {
  name: string;
  image: string;
  taste: string;
  utilization: string;
  season: string;
  color: string;
  benefits: string;
  subtitle: string;
  nutrition: {
    calories: number; // Calories (kcal)
    carbohydrates: number; // Glucides (g)
    fiber: number; // Fibres (g)
    sugars: number; // Sucres (g)
    vitaminC: number; // Vitamine C (mg)
  };
}
