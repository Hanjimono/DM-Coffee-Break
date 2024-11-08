"use client"
// System
import { SongParserHandler } from "@cross/types/handlers/songParser"
import { createContext, useEffect, useState } from "react"

export const SongParserContext = createContext({} as SongParserHandler)

/**
 * Provides a context for accessing the SongParser throughout the application.
 *
 * @param {React.ReactNode} props.children - The child components that will have access to the SongParser context.
 */
function SongParserProvider({ children }: { children: React.ReactNode }) {
  const [songParser, setSongParser] = useState({})
  useEffect(() => {
    setSongParser((window as any).songParser as SongParserHandler)
    return () => {
      setSongParser({} as SongParserHandler)
    }
  }, [])

  return (
    <SongParserContext.Provider value={songParser as SongParserHandler}>
      {children}
    </SongParserContext.Provider>
  )
}
export default SongParserProvider
