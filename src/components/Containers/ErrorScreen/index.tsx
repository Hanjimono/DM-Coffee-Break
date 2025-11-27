// Styles and types
import { ErrorScreenProps } from "./types"
// ui
import Button from "@/ui/Actions/Button"
import Room from "@/ui/Layout/Room"
import Text from "@/ui/Presentation/Text"
import Title from "@/ui/Presentation/Title"
import Inline from "@/ui/Layout/Inline"
import Stack from "@/ui/Layout/Stack"

function ErrorScreen({ reset }: ErrorScreenProps) {
  return (
    <Room className="h-full justify-center items-center">
      <Stack gap="distant">
        <Stack gap="same-level-close">
          <Title align="center">An critical error occurred.</Title>
          <Stack gap="close">
            <Text className="text-center">
              You can try to reload the page, or return to the home page.
            </Text>
            <Text className="text-center" size="small">
              If the problem persists, please contact the support team.
            </Text>
          </Stack>
        </Stack>
        <Inline className="w-full justify-center">
          <Button transparent onClick={reset}>
            Reload
          </Button>
          <Button link="/">Home</Button>
        </Inline>
      </Stack>
    </Room>
  )
}
export default ErrorScreen
