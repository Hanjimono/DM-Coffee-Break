// components
import Initializer from "@/components/Helpers/Initializer"
import DatabaseProvider from "@/components/Containers/DatabaseProvider"
import DatabaseProtectedComponent from "@/components/Containers/Protectors/DatabaseProtectedComponent"
// constants
import { openSans } from "@/constants/fonts"
// ui
import Foundation from "@/ui/Layout/Foundation"
import Beam from "@/ui/Layout/Beam"
import Frame from "@/ui/Layout/Frame"
// types and styles
import "./global.scss"

export const metadata = {
  title: "DM Coffee Break",
  description: "A Discord bot that plays music in voice channels."
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/fontawesome.min.css"
          integrity="sha512-B46MVOJpI6RBsdcU307elYeStF2JKT87SsHZfRSkjVi4/iZ3912zXi45X5/CBr/GbCyLx6M1GQtTKYRd52Jxgw=="
        />
      </head>
      <body className={openSans.className}>
        <Foundation>
          <DatabaseProvider>
            <DatabaseProtectedComponent>{children}</DatabaseProtectedComponent>
            <Initializer />
          </DatabaseProvider>
        </Foundation>
      </body>
    </html>
  )
}
