import EditMediaPageContent from "./editMediaPage"

export default async function EditMediaPage({
  params
}: {
  params: Promise<{ id: number }>
}) {
  console.log("🚀 -----------🚀")
  console.log("🚀 ~ id:", await params)
  console.log("🚀 -----------🚀")
  const id = (await params).id
  console.log("🚀 -----------🚀")
  console.log("🚀 ~ id:", id)
  console.log("🚀 -----------🚀")
  return <EditMediaPageContent id={id} />
}
