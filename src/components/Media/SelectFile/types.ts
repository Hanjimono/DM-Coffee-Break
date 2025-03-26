export interface SelectFileProps {
  /** Classes */
  className?: string
  /** Name for file variable */
  name: string
  /** Label for file input */
  label?: string
  /** Is input disabled */
  disabled?: boolean
  /** Is input loading */
  loading?: boolean
  /** Callback for file change */
  onFileChange: (file?: string) => void
  /** Path to currently selected file */
  file?: string
}
