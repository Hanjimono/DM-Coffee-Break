"use client"
// System
import { useCallback, useContext, useEffect, useState } from "react"
// Components
import { DatabaseContext } from "@/components/Containers/DatabaseProvider"
import MediaCategoryCard from "@/components/Media/CategoryCard"
// ui
import Text from "@/ui/Presentation/Text"
import Room from "@/ui/Layout/Room"
// Constants
import { UNSORTED_CATEGORY } from "@cross/constants/media"
// Styles and types
import { MediaCategory } from "@cross/types/media/category"

export default function Library() {
  const [categoryList, setCategoryList] = useState<MediaCategory[]>([])
  const database = useContext(DatabaseContext)
  const getCategories = useCallback(async () => {
    const categories = await database.media.getCategories()
    //TODO: get unsorted songs
    categories.push(UNSORTED_CATEGORY)
    setCategoryList(categories)
  }, [database])
  useEffect(() => {
    getCategories()
  }, [database, getCategories])

  return (
    <Room className={"media-library flex flex-col flex-1 gap-same-level py-5"}>
      {categoryList.length == 0 && (
        <div
          className={
            "flex-1 w-full h-full flex justify-center items-center text-center text-amber-800"
          }
        >
          <Text>
            No media files found. You can add media files by clicking the
            &quot;Add Song&quot; button above.
          </Text>
        </div>
      )}
      {categoryList.map((category) => (
        <MediaCategoryCard key={category.id} data={category} />
      ))}
    </Room>
  )
}
