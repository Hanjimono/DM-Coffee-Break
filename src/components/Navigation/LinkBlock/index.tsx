"use client"
// System
import { cx } from "class-variance-authority"
import { twMerge } from "tailwind-merge"
import { motion } from "framer-motion"
import Link from "next/link"
// Ui
import Brick from "@/ui/Layout/Brick"
import SmartImage from "@/ui/Presentation/SmartImage"
import Title from "@/ui/Presentation/Title"
import Text from "@/ui/Presentation/Text"
// Styles and types
import { LinkBlockProps } from "./types"

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
  const calculatedClassNames = twMerge(
    cx(
      "relative link-block flex flex-col rounded-4xl overflow-hidden min-w-48 max-w-48",
      !!big && "min-w-72 max-w-72",
      className
    )
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
          <div className={"w-full"}>
            {image && (
              <div className="relative max-w-full">
                <SmartImage
                  className="max-w-full"
                  src={image}
                  alt={title || ""}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gradient-from-link/80 to-gradient-to-link/0"></div>
              </div>
            )}
          </div>
          <div className={"absolute bottom-10 left-10"}>
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
