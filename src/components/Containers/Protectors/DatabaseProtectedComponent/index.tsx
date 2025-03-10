"use client"
import { useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
// Components
import LoadingScreen from "@/components/Containers/LoadingScreen"
import { useDatabase, useUpdateSettings } from "@/components/Helpers/Hooks"

//TODO: move to constants or env
export const CURRENT_DATABASE_VERSION = "0.0.3"

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
  const { authenticate, checkVersion } = useDatabase()
  const updateSettings = useUpdateSettings()
  const pathname = usePathname()
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
        updateSettings()
        if (pathname === "/") {
          router.push("/home")
        }
      }
      setLoading(false)
      return result
    }
    checkDatabase()
  }, [authenticate, checkVersion, updateSettings, router, pathname])
  return <LoadingScreen loaded={!loading}>{children}</LoadingScreen>
}
