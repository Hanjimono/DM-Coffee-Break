import type { Meta, StoryObj } from "@storybook/react"
import ErrorScreen from "./index"
import Foundation from "@/ui/Layout/Foundation"

const meta: Meta<typeof ErrorScreen> = {
  title: "Components/Containers/ErrorScreen",
  component: ErrorScreen,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "ErrorScreen component that displays an error message and options to reload or return home."
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
type Story = StoryObj<typeof ErrorScreen>

export const Default: Story = {
  args: {
    reset: () => {}
  }
}
