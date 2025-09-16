import type { DatabaseHandler } from "@cross/types/handlers/database"

let _database: DatabaseHandler | null = null

export const getDatabase = (): DatabaseHandler => {
  if (!_database) {
    if (typeof window === "undefined") {
      throw new Error("Database not available on server")
    }
    _database = (window as any).database
    if (!_database) {
      throw new Error("Database not initialized")
    }
  }
  return _database
}
