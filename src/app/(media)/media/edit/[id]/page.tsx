import EditMediaPageContent from "./editMediaPage"

export default async function EditMediaPage({
  params
}: {
  params: Promise<{ id: number }>
}) {
  const id = (await params).id
  return <EditMediaPageContent id={id} />
}
