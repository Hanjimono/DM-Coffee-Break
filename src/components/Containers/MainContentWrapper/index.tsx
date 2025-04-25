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
import SmartImage from "@/ui/Presentation/SmartImage"

/**
 * Wrapper for main content. It usually used in layouts to wrap the main content of the page.
 * It can hide the navigation menu if needed.
 *
 * @param {Object} props - The props object.
 * @param {React.ReactNode} props.children - The content to be wrapped.
 * @param {string} [props.className] - Additional class names to apply to the wrapper.
 * @param {boolean} props.hideMenu - Flag to determine whether to hide the navigation menu.
 * @param {string} [props.bgImageType] - Type of background image to be used.
 *
 * @returns {JSX.Element} The rendered component.
 */
function MainContentWrapper({
  children,
  className,
  hideMenu,
  bgImageType
}: MainContentWrapperProps) {
  const calculatedClassNames = clsx("main-content", className)
  if (hideMenu)
    return <Frame className={calculatedClassNames}>{children}</Frame>
  return (
    <Beam withoutWrap whole withoutGap className="relative">
      <SideMenu />
      <div className="flex flex-col w-full h-full overflow-hidden">
        <div className="flex-1 flex relative overflow-hidden">
          <Frame className="main-content relative z-10">{children}</Frame>
        </div>
        <PlayerControl />
      </div>
      <PlayerLoader />
      {bgImageType !== "none" && (
        <div className="absolute top-0 left-0 right-0 bottom-0 z-0">
          <SmartImage
            className="w-full h-full"
            alt="background"
            src="/public/images/main_bg.png"
          />
        </div>
      )}
    </Beam>
  )
}
export default MainContentWrapper
