/*
  Warnings:

  - You are about to drop the column `frameNum` on the `Frame` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `FrameSet` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Frame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "frameId" INTEGER NOT NULL,
    CONSTRAINT "Frame_frameId_fkey" FOREIGN KEY ("frameId") REFERENCES "FrameSet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Frame" ("frameId", "id") SELECT "frameId", "id" FROM "Frame";
DROP TABLE "Frame";
ALTER TABLE "new_Frame" RENAME TO "Frame";
CREATE TABLE "new_FrameSet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "remaining" INTEGER
);
INSERT INTO "new_FrameSet" ("id") SELECT "id" FROM "FrameSet";
DROP TABLE "FrameSet";
ALTER TABLE "new_FrameSet" RENAME TO "FrameSet";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
