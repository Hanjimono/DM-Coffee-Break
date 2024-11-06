"use client"
// System
import clsx from "clsx"
import { motion } from "framer-motion"
import Link from "next/link"
// Ui
import Brick from "@/ui/Layout/Brick"
import SmartImage from "@/ui/Presentation/SmartImage"
import Title from "@/ui/Presentation/Title"
import Text from "@/ui/Presentation/Text"
// Styles and types
import { LinkBlockProps } from "./types"
import styles from "./styles.module.scss"

function LinkBlock({
  className,
  title,
  image,
  description,
  href,
  big
}: LinkBlockProps) {
  const calculatedClassNames = clsx(
    styles["link-block"],
    className,
    !!big && styles["big"]
  )
  return (
    <Link href={href}>
      <motion.div
        layout
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
      >
        <Brick className={calculatedClassNames} noPadding>
          <div className={styles["images-block"]}>
            {image && <SmartImage src={image} alt={title || ""} />}
          </div>
          <div className={styles["content"]}>
            <Title size={big ? 4 : 6} bottomGap="almost-same">
              {title}
            </Title>
            <Text type="fit-line" size={big ? "default" : "small"}>
              {description}
            </Text>
          </div>
        </Brick>
      </motion.div>
    </Link>
  )
}
export default LinkBlock
