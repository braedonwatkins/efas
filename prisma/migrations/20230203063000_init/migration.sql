/*
  Warnings:

  - You are about to drop the `Remaining` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Used` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Remaining";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Used";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "FrameSet" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "total" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Frame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "frameId" INTEGER NOT NULL,
    "frameNum" INTEGER NOT NULL,
    CONSTRAINT "Frame_frameId_fkey" FOREIGN KEY ("frameId") REFERENCES "FrameSet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
