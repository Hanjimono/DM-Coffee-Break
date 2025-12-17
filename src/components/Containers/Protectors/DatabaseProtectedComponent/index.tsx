"use client"
import { usePathname, useRouter } from "next/navigation"
// Components
import LoadingScreen from "@/components/Containers/LoadingScreen"
import { useCIpc } from "../../CIpcProvider/cIpcProviderContainer.client"
import { useEffect } from "react"
import { DatabaseVersion } from "@cross/types/database/settings/version"

//TODO: move to constants or env
export const CURRENT_DATABASE_VERSION = "0.0.4"

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
  const cIpc = useCIpc()
  const pathname = usePathname()
  const router = useRouter()
  const authenticate = cIpc.database.authenticate()
  const checkVersion = cIpc.database.checkVersion()
  const isPending = authenticate.isPending || checkVersion.isPending
  useEffect(() => {
    if (!checkVersion.data && !checkVersion.isPending) {
      checkVersion.mutate({
        lastVersion: CURRENT_DATABASE_VERSION
      })
    }
  }, [checkVersion])
  if (!isPending && !authenticate.data) {
    throw new Error("Database connection failed")
  }
  if (!isPending && !checkVersion.data) {
    console.log("Database version invalid")
    // router.push("/settings/database")
  }
  if (!isPending && pathname === "/") {
    console.log("Redirecting to home")
    // router.push("/home")
  }
  return <LoadingScreen loaded={!isPending}>{children}</LoadingScreen>
}
