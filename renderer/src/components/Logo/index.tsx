// System
import Image from "next/image"
import clsx from "clsx"
// Ui
import Title from "@/ui/Presentation/Title"
import Beam from "@/ui/Layout/Beam"
// Types and styles
import styles from "./styles.module.scss"
import Link from "next/link"

export default function Logo({ className }: { className?: string }) {
  const formattedClassname = clsx(styles["logo-container"], className)
  return (
    <Link href={"/"}>
      <Beam className={formattedClassname}>
        <Image
          alt="logo"
          src={"/images/logo_small.png"}
          width={25}
          height={25}
        />
        <Title size={5}>Ui-kit</Title>
      </Beam>
    </Link>
  )
}
