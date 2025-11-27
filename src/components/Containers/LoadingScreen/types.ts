export interface LoadingScreenProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Render just a small dice spinner. Usable for minimalistic loading indicators */
  isSimple?: boolean
  loaded: boolean
  text?: string
}
