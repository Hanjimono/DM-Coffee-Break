"use client"
// Components
import {
  DatabaseContext,
  useCreateDatabaseContext
} from "@/components/Helpers/Hooks"
// System
import { DatabaseHandler } from "@cross/types/handlers/database"

/**
 * Provides a context for accessing the database throughout the application.
 *
 * @param {React.ReactNode} props.children - The child components that will have access to the database context.
 */
function DatabaseProvider({ children }: { children: React.ReactNode }) {
  const database = useCreateDatabaseContext()

  return (
    <DatabaseContext.Provider value={database as DatabaseHandler}>
      {children}
    </DatabaseContext.Provider>
  )
}
export default DatabaseProvider
