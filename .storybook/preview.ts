import type { Preview } from "@storybook/nextjs-vite"
import "../src/app/global.css"
import "./storybook.css"

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  }
}

export default preview
