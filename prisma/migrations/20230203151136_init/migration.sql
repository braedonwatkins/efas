/*
  Warnings:

  - You are about to drop the column `frameId` on the `Frame` table. All the data in the column will be lost.
  - Added the required column `frameCount` to the `Frame` table without a default value. This is not possible if the table is not empty.
  - Added the required column `setId` to the `Frame` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Frame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "frameCount" INTEGER NOT NULL,
    "setId" INTEGER NOT NULL,
    CONSTRAINT "Frame_setId_fkey" FOREIGN KEY ("setId") REFERENCES "FrameSet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Frame" ("id") SELECT "id" FROM "Frame";
DROP TABLE "Frame";
ALTER TABLE "new_Frame" RENAME TO "Frame";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
