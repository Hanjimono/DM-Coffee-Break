"use client"
// utils
import { useCIpc } from "@/components/Containers/CIpcProvider/cIpcProviderContainer.client"
// Components
import MediaCategoryCard from "@/components/Media/CategoryCard"
// ui
import Text from "@/ui/Presentation/Text"
import Room from "@/ui/Layout/Room"
import Loader from "@/ui/Presentation/Loader"

/**
 * The `Library` component is responsible for displaying a media library interface.
 * It fetches media categories via cIpc and renders them as `MediaCategoryCard`
 * components. While the data is loading a loader is shown, and if no categories
 * are returned a hint suggests adding media files.
 */
export default function Library() {
  const cIpc = useCIpc()
  const { data: categoryList = [], isLoading } =
    cIpc.database.media.getCategories()

  return (
    <Room className={"media-library flex flex-col flex-1 gap-same-level py-5"}>
      {isLoading && (
        <div className="flex-1 w-full h-full flex justify-center items-center">
          <Loader />
        </div>
      )}
      {!isLoading && categoryList.length === 0 && (
        <div
          className={
            "flex-1 w-full h-full flex justify-center items-center text-center"
          }
        >
          <Text>
            No media files found. You can add media files by clicking the
            &quot;Add Song&quot; button above.
          </Text>
        </div>
      )}
      {!isLoading &&
        categoryList.map((category) => (
          <MediaCategoryCard key={category.id ?? "unsorted"} data={category} />
        ))}
    </Room>
  )
}
