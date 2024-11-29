"use client"
import { useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
// Components
import { DatabaseContext } from "@/components/Containers/DatabaseProvider"
import LoadingScreen from "../LoadingScreen"

//TODO: move to constants or env
export const CURRENT_DATABASE_VERSION = "0.0.2"

/**
 * A component that ensures the database is authenticated and the version is valid before rendering its children.
 * If the database connection fails, an error is thrown.
 * If the database version is invalid, the user is redirected to the global settings page.
 *
 * @param {React.ReactNode} props.children - The child components to render once the database is authenticated and the version is validated.
 */
export default function DatabaseProtectedComponent({
  children
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const { authenticate, checkVersion } = useContext(DatabaseContext)
  const router = useRouter()
  useEffect(() => {
    if (!authenticate) return
    const checkDatabase = async () => {
      const result = await authenticate()
      if (!result) {
        throw new Error("Database connection failed")
      }
      const isValidVersion = await checkVersion(CURRENT_DATABASE_VERSION)
      if (!isValidVersion) {
        router.push("/settings/database")
      } else {
        router.push("/home")
      }
      setLoading(false)
      return result
    }
    checkDatabase()
  }, [authenticate, checkVersion, router])
  return <LoadingScreen loaded={!loading}>{children}</LoadingScreen>
}
