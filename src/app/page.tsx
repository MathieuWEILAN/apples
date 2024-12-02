"use client";

import React from "react";
import { apples } from "./data";
import Apple from "./components/Apple";
import { AnimatePresence, motion } from "framer-motion";
import Select from "./components/Select";
import ArrowLeft from "./icons/ArrowLeft";
import ArrowRight from "./icons/ArrowRight";

export default function Home() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [direction, setDirection] = React.useState<"up" | "down">("up");
  const [openInfos, setOpenInfos] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);
  const swipeStartX = React.useRef<number | null>(null); // Autorise null au départ
  const swipeEndX = React.useRef<number | null>(null); // Autorise null au départ

  const nextRef = React.useRef<HTMLButtonElement>(null);
  const prevRef = React.useRef<HTMLButtonElement>(null);
  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    setIsMobile(window.innerWidth < 768);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleNext = () => {
    setDirection("up"); // Définir la direction
    setCurrentIndex((prevIndex) => (prevIndex + 1) % apples.length);
    setOpenInfos(false);
  };

  const handlePrev = () => {
    setDirection("down"); // Définir la direction
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? apples.length - 1 : prevIndex - 1
    );
    setOpenInfos(false);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    swipeStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    swipeEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const threshold = 50; // Minimum distance for a swipe to be detected
    if (
      swipeStartX.current !== null &&
      swipeEndX.current !== null &&
      Math.abs(swipeStartX.current - swipeEndX.current) > threshold
    ) {
      if (swipeStartX.current > swipeEndX.current) {
        // Swipe left
        setCurrentIndex((prevIndex) =>
          prevIndex < apples.length - 1 ? prevIndex + 1 : prevIndex
        );
      } else {
        // Swipe right
        setCurrentIndex((prevIndex) =>
          prevIndex > 0 ? prevIndex - 1 : prevIndex
        );
      }
    }
    // Reset swipe values
    swipeStartX.current = null;
    swipeEndX.current = null;
  };

  const handleChange = (selectedApple: number) => {
    setCurrentIndex(selectedApple);
  };

  return (
    <main className="h-screen w-screen overflow-hidden relative">
      <Select
        handleChange={handleChange}
        selected={apples[currentIndex]}
        setOpenInfos={setOpenInfos}
      />
      {/* Navigation */}
      <div className="absolute inset-0 flex justify-between items-center z-20 pointer-events-none">
        <motion.button
          ref={prevRef}
          onClick={handlePrev}
          className="p-2.5 lg:p-5 text-white rounded-full pointer-events-auto"
          whileHover={{
            scale: [1, 1.1, 1], // Keyframes pour agrandir et revenir à la taille normale
            transition: {
              duration: 0.6, // Durée totale d'un cycle
              repeat: Infinity, // Répétition continue
              ease: "easeInOut", // Animation fluide
            },
          }}
          whileTap={{
            scale: 0.9, // Effet au clic
          }}
        >
          <ArrowLeft />
        </motion.button>
        <motion.button
          ref={nextRef}
          onClick={handleNext}
          className="p-2.5 lg:p-5 text-white rounded-full pointer-events-auto"
          whileHover={{
            scale: [1, 1.1, 1], // Keyframes pour agrandir et revenir à la taille normale
            transition: {
              duration: 0.6, // Durée totale d'un cycle
              repeat: Infinity, // Répétition continue
              ease: "easeInOut", // Animation fluide
            },
          }}
          whileTap={{
            scale: 0.9, // Effet au clic
          }}
        >
          <ArrowRight />
        </motion.button>
      </div>
      <div
        className="flex overflow-hidden w-screen"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <AnimatePresence mode="wait">
          <Apple
            key={`${apples[currentIndex].name}-${direction}`} // Clé unique pour chaque slide
            data={apples[currentIndex]}
            currentIndex={currentIndex}
            prevData={
              apples[(currentIndex - 1 + apples.length) % apples.length]
            }
            nextData={apples[(currentIndex + 1) % apples.length]}
            direction={direction}
            openInfos={openInfos}
            setOpenInfos={setOpenInfos}
            isMobile={isMobile}
          />
        </AnimatePresence>
      </div>
    </main>
  );
}
