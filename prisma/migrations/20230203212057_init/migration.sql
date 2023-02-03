/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Frame` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Frame_id_key" ON "Frame"("id");
