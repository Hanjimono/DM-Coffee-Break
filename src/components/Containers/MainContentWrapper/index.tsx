// System
import clsx from "clsx"
// Components
import PlayerControl from "@/components/Media/PlayerControl"
import SideMenu from "@/components/Navigation/SideMenu"
import PlayerLoader from "@/components/Media/PlayerLoader"
// Ui
import Frame from "@/ui/Layout/Frame"
import Beam from "@/ui/Layout/Beam"
// Styles and types
import { MainContentWrapperProps } from "./types"

/**
 * Wrapper for main content. It usually used in layouts to wrap the main content of the page.
 * It can hide the navigation menu if needed.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The content to be wrapped.
 * @param {string} [props.className] - Additional class names to apply to the wrapper.
 * @param {boolean} props.hideMenu - Flag to determine whether to hide the navigation menu.
 *
 * @returns {JSX.Element} The rendered component.
 */
function MainContentWrapper({
  children,
  className,
  hideMenu
}: MainContentWrapperProps) {
  const calculatedClassNames = clsx("main-content", className)
  if (hideMenu)
    return <Frame className={calculatedClassNames}>{children}</Frame>
  return (
    <Beam withoutWrap whole withoutGap>
      <SideMenu />
      <Frame className="main-content relative">
        {children}
        <PlayerControl />
      </Frame>
      <PlayerLoader />
    </Beam>
  )
}
export default MainContentWrapper
