import { TabPanelProps } from "@/ui/Navigation/TabPanel/types"

interface MenuItem {
  name: string
  href: string
}

export interface DesignedTabPanelProps extends TabPanelProps {
  items: MenuItem[]
}
