import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Table from "./Table";
import { Apple as Data } from "../types";

interface AppleProps {
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
const Apple: React.FC<AppleProps> = ({
  data,
  prevData,
  nextData,
  direction,
  currentIndex,
  openInfos,
  setOpenInfos,
  isMobile,
}) => {
  const backgroundVariantsNext = {
    initial: { y: "100%" },
    animate: { y: 0 },
  };
  const backgroundVariantsPrev = {
    initial: { y: 0 },
    animate: { y: "100%" },
  };

  return (
    <motion.section
      className={`relative h-screen w-screen flex flex-col items-center justify-center p-4 md:p-32`}
    >
      {/* Ancien fond (fixe en arrière-plan) */}
      <div
        className="absolute inset-0 w-full h-full z-0"
        style={{
          backgroundColor: direction === "up" ? prevData.color : data.color,
        }}
      />
      {/* Nouveau fond (animé pour recouvrir l'ancien) */}
      <motion.div
        key={`${data.name}-background`} // Clé unique pour chaque background
        className="absolute inset-0"
        style={{
          backgroundColor: direction === "up" ? data.color : nextData.color,
        }}
        variants={
          direction === "up" ? backgroundVariantsNext : backgroundVariantsPrev
        }
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />

      <div className="z-10 w-full">
        <motion.h1
          key={currentIndex}
          className="text-[60px] font-bold text-white"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.2, ease: "easeInOut" }}
        >
          {data.name}
        </motion.h1>
        <motion.h2
          className="w-full w-full text-center text-white"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.2, delay: 0.5, ease: "easeInOut" }}
        >
          {data.subtitle}
        </motion.h2>
      </div>

      <motion.div className="flex flex-col lg:flex-row items-center justify-center overflow-hidden h-auto w-full border-4">
        <motion.div className="z-10 relative flex flex-col items-center lg:w-fit">
          <div className="relative w-[150px] h-[150px] lg:w-[420px] lg:h-[420px] my-10">
            <motion.div
              onClick={() => {
                setOpenInfos(!openInfos);
              }}
              className="inset-0 w-full h-full absolute"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{ delay: 0.3, duration: 0.5, ease: "easeInOut" }}
            >
              <Image
                src={direction === "up" ? prevData.image : nextData.image}
                alt={data.name}
                width={350}
                height={350}
                className="object-contain h-full w-full object-center"
              />
            </motion.div>
            <motion.div
              onClick={() => {
                setOpenInfos(!openInfos);
              }}
              className="inset-0 w-full h-full absolute hover:drop-shadow-white transition duration-300 cursor-pointer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4, ease: "easeInOut" }}
            >
              <Image
                src={data.image}
                alt={data.name}
                width={350}
                height={350}
                className="object-contain h-full w-full object-center"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className={`z-20 flex flex-col gap-5 !overflow-y-hidden h-0 lg:max-h-[400px] justify-center ${
            openInfos ? "lg:pl-10" : "pl-0"
          }`}
          initial={
            !isMobile
              ? {
                  width: 0,
                  x: 1000,
                  y: 0,
                }
              : {
                  width: 0,
                  x: 0,
                  y: 1000,
                }
          }
          animate={
            !isMobile
              ? {
                  width: openInfos ? "100%" : 0,
                  x: openInfos ? 0 : 1000,
                  y: 0,
                  height: openInfos ? "auto" : 0,
                }
              : {
                  width: openInfos ? "100%" : 0,
                  x: 0,
                  y: openInfos ? 0 : 1000,
                  height: openInfos ? "auto" : 0,
                }
          }
          exit={
            !isMobile
              ? {
                  width: 0,
                  x: 1000,
                  y: 0,
                }
              : { width: 0, x: 0, y: 1000 }
          }
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Table nutrition={data.nutrition} />
          <div className="bg-white/20 rounded-xl p-5 space-y-5">
            <motion.p className="text-left max-lg:text-lg">
              💪 : {data.benefits}
            </motion.p>
            <p className="text-left max-lg:text-lg">👨‍🍳 : {data.utilization}</p>
            <p className="text-left max-lg:text-lg">🌞 : {data.season}</p>
            <p className="text-left max-lg:text-lg">👅 : {data.taste}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Apple;
