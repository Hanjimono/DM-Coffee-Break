/*
  Warnings:

  - You are about to drop the `tagToSong` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "tagToSong";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "_songTotag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_songTotag_A_fkey" FOREIGN KEY ("A") REFERENCES "song" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_songTotag_B_fkey" FOREIGN KEY ("B") REFERENCES "tag" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_songTotag_AB_unique" ON "_songTotag"("A", "B");

-- CreateIndex
CREATE INDEX "_songTotag_B_index" ON "_songTotag"("B");
