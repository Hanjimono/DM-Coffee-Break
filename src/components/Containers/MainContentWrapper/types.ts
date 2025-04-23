export interface MainContentWrapperProps {
  /** React children */
  children?: React.ReactNode
  /** Classes */
  className?: string
  /** Hides the control menu for protected pages without opportunity to change the page */
  hideMenu?: boolean
  /** Type of background image */
  bgImageType?: "gradient" | "none"
}
