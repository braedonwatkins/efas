/*
  Warnings:

  - A unique constraint covering the columns `[total]` on the table `FrameSet` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FrameSet_total_key" ON "FrameSet"("total");
