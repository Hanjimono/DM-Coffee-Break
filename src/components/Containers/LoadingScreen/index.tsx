"use client"
// System
import clsx from "clsx"
import { motion } from "framer-motion"
// Ui
import SmartImage from "@/ui/Presentation/SmartImage"
import Title from "@/ui/Presentation/Title"
// Styles and types
import { LoadingScreenProps } from "./types"
import styles from "./styles.module.scss"

function LoadingScreen({
  children,
  className,
  loaded,
  text
}: LoadingScreenProps) {
  const calculatedClassNames = clsx(styles["loading-screen"], className)
  return (
    <div className={calculatedClassNames}>
      {!loaded && (
        <div className={styles["loading-screen-content"]}>
          <div className={styles["loading-screen-image"]}>
            <SmartImage
              src="/public/images/Logo Transparent_no_cube.png"
              alt="Loading"
              width={250}
            />
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.5, repeatDelay: 0.3 }}
              className={styles["loading-cube"]}
            >
              <SmartImage
                src="/public/images/twenty-sided-dice.svg"
                alt="Loading"
                width={80}
                height={80}
              />
            </motion.div>
          </div>
          <div className={styles["loading-screen-text"]}>
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
