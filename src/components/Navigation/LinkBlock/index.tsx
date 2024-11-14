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

/**
 * A block with image representing a link or a button to navigate to a different page.
 *
 * @param {string} className - Additional class names to apply to the link block.
 * @param {string} title - The title text to display in the link block.
 * @param {string} image - The URL of the image to display in the link block.
 * @param {string} description - The description text to display in the link block.
 * @param {string} href - The URL to navigate to when the link block is clicked.
 * @param {function} onClick - The function to call when the link block is clicked.
 * @param {boolean} big - A flag to determine if the link block should be rendered in a larger size.
 *
 * @returns {JSX.Element} The rendered link block component.
 */
function LinkBlock({
  className,
  title,
  image,
  description,
  href,
  onClick,
  big
}: LinkBlockProps) {
  const calculatedClassNames = clsx(
    styles["link-block"],
    className,
    !!big && styles["big"]
  )
  return (
    <Link href={href || ""} onClick={onClick}>
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
