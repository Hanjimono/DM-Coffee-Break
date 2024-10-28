"use client"
// system
import { useState } from "react"
import clsx from "clsx"
import dynamic from 'next/dynamic'
// ui
import Beam from "@/ui/Layout/Beam"
// styles and types
import styles from "./styles.module.scss"
import Button from "@/ui/Actions/Button"
import Title from "@/ui/Presentation/Title"
import Logo from "../Logo"

const MENU = [
  {
    title: "Presentation",
    items: [
      {
        title: "Text",
        link: "/text"
      }
    ]
  },
  {
    title: "Actions",
    items: [
      {
        title: "Button",
        link: "/button"
      }
    ]
  }
]

const DynamicMenu = dynamic(() => import('@/ui/Navigation/Menu'), {
  ssr: false,
})

// component with main navigation menu on the left side of every page
function NavigationMenu() {
  const [openMenu, setOpenMenu] = useState(false)
  return (
    <>
      <div
        className={clsx(styles["mobile-menu"], !openMenu && styles["active"])}
      >
        <Button
          onClick={() => setOpenMenu(true)}
          icon="menu"
          text
          iconSize={30}
        />
        <Logo className={styles["menu-logo"]} />
      </div>
      <div className={clsx(styles["main-menu"], openMenu && styles["active"])}>
        <Button
          className={styles["close-menu"]}
          onClick={() => setOpenMenu(false)}
          icon="close"
          text
          iconSize={22}
        />
        <Logo className={styles["menu-logo"]} />
        <Beam withoutWrap whole>
          <DynamicMenu items={MENU} />
        </Beam>
      </div>
    </>
  )
}
export default NavigationMenu
