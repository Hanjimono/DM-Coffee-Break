import type { Meta, StoryObj } from "@storybook/react"
import LoadingScreen from "./index"
import Foundation from "@/ui/Layout/Foundation"

const meta: Meta<typeof LoadingScreen> = {
  title: "Components/Containers/LoadingScreen",
  component: LoadingScreen,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "LoadingScreen component that displays a loading indicator while content is being loaded."
      }
    }
  },
  decorators: [
    (Story) => (
      <Foundation>
        <Story />
      </Foundation>
    )
  ]
}
export default meta
type Story = StoryObj<typeof LoadingScreen>

export const Default: Story = {
  args: {}
}
export const Simple: Story = {
  args: {
    isSimple: true
  }
}
