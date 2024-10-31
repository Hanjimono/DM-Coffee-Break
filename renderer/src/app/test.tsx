import { useEffect } from "react"

export default function Test() {
  useEffect(() => {
    console.log(window?.database?.authenticate())
  }, [])
  return (
    <div>test</div>
  )
}
