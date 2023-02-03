-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Frame" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "frameId" INTEGER NOT NULL,
    CONSTRAINT "Frame_id_fkey" FOREIGN KEY ("id") REFERENCES "FrameSet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Frame" ("frameId", "id") SELECT "frameId", "id" FROM "Frame";
DROP TABLE "Frame";
ALTER TABLE "new_Frame" RENAME TO "Frame";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
