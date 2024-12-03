import { MutableRefObject, useState } from "react"

/**
 * Hook for handling card hover actions. Save position and hovered state.
 *
 * @param ref - The ref of the card element.
 */
export const useCardHoverActions = (
  ref?: MutableRefObject<null>
): [
  boolean,
  DOMRect | undefined,
  (e: React.MouseEvent<HTMLDivElement>) => void,
  () => void
] => {
  const [hovered, setHovered] = useState(false)
  const [cardPosition, setCardPosition] = useState<DOMRect | undefined>(
    undefined
  )
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    setHovered(true)
    if (ref) {
      setCardPosition(e.currentTarget?.getBoundingClientRect())
    }
  }
  const handleMouseLeave = () => {
    setHovered(false)
  }
  return [hovered, cardPosition, handleMouseEnter, handleMouseLeave] as const
}
