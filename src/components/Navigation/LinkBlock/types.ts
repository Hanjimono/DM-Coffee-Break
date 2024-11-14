/** A block with image representing a link or a button to navigate to a different page. */
export interface LinkBlockProps {
  /** Classes */
  className?: string
  /** The title text to display in the link block. */
  title: string
  /** The URL of the image to display in the link block. */
  href?: string
  /** The URL of the image to display in the link block. */
  image?: string
  /** The description text to display in the link block. */
  description?: string
  /** A flag to determine if the link block should be rendered in a larger size. */
  big?: boolean
  /** The function to call when the link block is clicked. */
  onClick?: () => void
}
