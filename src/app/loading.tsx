// Components
import LoadingScreen from "@/components/Containers/LoadingScreen"
// Ui
import Foundation from "@/ui/Layout/Foundation"

export default function MainLoading() {
  return (
    <Foundation>
      <LoadingScreen loaded={false} />
    </Foundation>
  )
}
