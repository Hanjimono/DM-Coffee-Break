"use client"
import { redirect, usePathname, useRouter } from "next/navigation"
// Components
import LoadingScreen from "@/components/Containers/LoadingScreen"
import { useCIpc } from "../../CIpcProvider/cIpcProviderContainer.client"

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
  const authenticate = cIpc.database.authenticate()
  const checkVersion = cIpc.database.checkVersion({
    lastVersion: CURRENT_DATABASE_VERSION
  })
  const isPending = authenticate.isPending || checkVersion.isPending
  if (!isPending && !authenticate.data) {
    throw new Error("Database connection failed")
  }
  if (!isPending && !checkVersion.data && pathname !== "/settings/database") {
    redirect("/settings/database")
  }
  if (!isPending && pathname === "/") {
    redirect("/home")
  }
  return <LoadingScreen loaded={!isPending}>{children}</LoadingScreen>
}
