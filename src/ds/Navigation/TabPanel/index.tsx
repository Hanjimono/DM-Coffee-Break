"use client"
// System
import { usePathname, useRouter } from "next/navigation"
// ui
import TabPanel, { Tab } from "@/ui/Navigation/TabPanel"
// Styles and types
import { DesignedTabPanelProps } from "./types"

/**
 * Renders a tab panel with navigation functionality based on the provided items.
 * Each tab corresponds to an item, and navigation occurs when a tab is selected.
 *
 * @param items - An array of tab items, each containing a `name` and `href` property.
 * @param rest - Additional props to be passed to the underlying `TabPanel` component.
 */
function DesignedTabPanel({ items, ...rest }: DesignedTabPanelProps) {
  const currentPath = usePathname()
  const { replace } = useRouter()
  const activeTabIdx = items.findIndex((item) => item.href === currentPath)
  const tabsList = items.map((item) => item.name)
  const onTabChange = (tabIdx: number) => {
    const selectedItem = items[tabIdx]
    if (selectedItem) {
      replace(selectedItem.href)
    }
  }
  return (
    <TabPanel
      isNoBorder
      gap={"same-level"}
      activeTabIdx={activeTabIdx}
      onTabChange={onTabChange}
      {...rest}
    >
      {tabsList &&
        tabsList.length > 0 &&
        tabsList.map((tabName, idx) => (
          <Tab
            idx={idx}
            key={idx}
            className="px-0"
            isTransparent
            theme="tool"
            activeTabTheme="light"
          >
            {tabName}
          </Tab>
        ))}
    </TabPanel>
  )
}
export default DesignedTabPanel
