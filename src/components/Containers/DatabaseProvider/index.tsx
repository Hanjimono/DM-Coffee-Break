"use client"
// System
import { DatabaseHandler } from "@cross/types/handlers/database"
import { createContext, useEffect, useState } from "react"

export const DatabaseContext = createContext({} as DatabaseHandler)

/**
 * Provides a context for accessing the database throughout the application.
 *
 * @param {React.ReactNode} props.children - The child components that will have access to the database context.
 */
function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const [database, setDatabase] = useState({})
  useEffect(() => {
    setDatabase((window as any).database as DatabaseHandler)
    return () => {
      setDatabase({} as DatabaseHandler)
    }
  }, [])

  return (
    <DatabaseContext.Provider value={database as DatabaseHandler}>
      {children}
    </DatabaseContext.Provider>
  )
}
export default DatabaseProvider
