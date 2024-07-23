/*
  Warnings:

  - You are about to drop the column `group_id` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `method_id` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the `Move_Learn_Method` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Version_Group` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Move" DROP CONSTRAINT "Move_group_id_fkey";

-- DropForeignKey
ALTER TABLE "Move" DROP CONSTRAINT "Move_method_id_fkey";

-- AlterTable
ALTER TABLE "Move" DROP COLUMN "group_id",
DROP COLUMN "method_id";

-- DropTable
DROP TABLE "Move_Learn_Method";

-- DropTable
DROP TABLE "Version_Group";

-- CreateTable
CREATE TABLE "MoveLearnMethod" (
    "method_id" SERIAL NOT NULL,
    "method_name" TEXT NOT NULL,
    "method_url" TEXT NOT NULL,

    CONSTRAINT "MoveLearnMethod_pkey" PRIMARY KEY ("method_id")
);

-- CreateTable
CREATE TABLE "VersionGroup" (
    "group_id" SERIAL NOT NULL,
    "group_name" TEXT NOT NULL,
    "group_url" TEXT NOT NULL,

    CONSTRAINT "VersionGroup_pkey" PRIMARY KEY ("group_id")
);

-- CreateTable
CREATE TABLE "VersionGroupDetails" (
    "vgd_id" SERIAL NOT NULL,
    "level_learned_at" INTEGER NOT NULL,
    "move_id" INTEGER NOT NULL,
    "method_id" INTEGER NOT NULL,
    "group_id" INTEGER NOT NULL,

    CONSTRAINT "VersionGroupDetails_pkey" PRIMARY KEY ("vgd_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MoveLearnMethod_method_name_key" ON "MoveLearnMethod"("method_name");

-- AddForeignKey
ALTER TABLE "VersionGroupDetails" ADD CONSTRAINT "VersionGroupDetails_move_id_fkey" FOREIGN KEY ("move_id") REFERENCES "Move"("move_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionGroupDetails" ADD CONSTRAINT "VersionGroupDetails_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "MoveLearnMethod"("method_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionGroupDetails" ADD CONSTRAINT "VersionGroupDetails_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "VersionGroup"("group_id") ON DELETE RESTRICT ON UPDATE CASCADE;
