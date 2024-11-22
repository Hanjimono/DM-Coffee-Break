"use client"
// System
import { cx } from "class-variance-authority"
import { motion } from "framer-motion"
import { twMerge } from "tailwind-merge"
// Ui
import SmartImage from "@/ui/Presentation/SmartImage"
import Title from "@/ui/Presentation/Title"
// Styles and types
import { LoadingScreenProps } from "./types"

function LoadingScreen({
  children,
  className,
  loaded,
  text
}: LoadingScreenProps) {
  const calculatedClassNames = twMerge(
    cx(
      "loading-screen flex w-full h-full items-center justify-center",
      className
    )
  )
  return (
    <div className={calculatedClassNames}>
      {!loaded && (
        <div className={"flex flex-col items-center justify-center"}>
          <div className={"relative"}>
            <SmartImage
              src="/public/images/Logo Transparent_no_cube.png"
              alt="Loading"
              width={250}
            />
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 0.3 }}
              className={
                "absolute max-w-24 max-h-24 flex top-[85px] left-[85px]"
              }
            >
              <SmartImage
                src="/public/images/twenty-sided-dice.svg"
                alt="Loading"
                width={80}
                height={80}
              />
            </motion.div>
          </div>
          <div className={"w-full flex justify-center mt-2"}>
            <Title size={4} align="center">
              {text || "Loading... Please wait"}
            </Title>
          </div>
        </div>
      )}
      {!!loaded && children}
    </div>
  )
}
export default LoadingScreen
