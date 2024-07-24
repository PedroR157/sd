/*
  Warnings:

  - The primary key for the `Move` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Move` table. All the data in the column will be lost.
  - The primary key for the `MoveLearnMethod` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `MoveLearnMethod` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `MoveLearnMethod` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `MoveLearnMethod` table. All the data in the column will be lost.
  - The primary key for the `VersionGroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `VersionGroup` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `VersionGroup` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `VersionGroup` table. All the data in the column will be lost.
  - The primary key for the `VersionGroupDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `VersionGroupDetail` table. All the data in the column will be lost.
  - You are about to drop the column `moveId` on the `VersionGroupDetail` table. All the data in the column will be lost.
  - You are about to drop the column `moveLearnMethodId` on the `VersionGroupDetail` table. All the data in the column will be lost.
  - You are about to drop the column `versionGroupId` on the `VersionGroupDetail` table. All the data in the column will be lost.
  - Added the required column `move_name` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `move_url` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mlm_name` to the `MoveLearnMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mlm_url` to the `MoveLearnMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vg_name` to the `VersionGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vg_url` to the `VersionGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mlm_id` to the `VersionGroupDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `move_id` to the `VersionGroupDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `vg_id` to the `VersionGroupDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VersionGroupDetail" DROP CONSTRAINT "VersionGroupDetail_moveId_fkey";

-- DropForeignKey
ALTER TABLE "VersionGroupDetail" DROP CONSTRAINT "VersionGroupDetail_moveLearnMethodId_fkey";

-- DropForeignKey
ALTER TABLE "VersionGroupDetail" DROP CONSTRAINT "VersionGroupDetail_versionGroupId_fkey";

-- AlterTable
ALTER TABLE "Move" DROP CONSTRAINT "Move_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "url",
ADD COLUMN     "move_id" SERIAL NOT NULL,
ADD COLUMN     "move_name" TEXT NOT NULL,
ADD COLUMN     "move_url" TEXT NOT NULL,
ADD CONSTRAINT "Move_pkey" PRIMARY KEY ("move_id");

-- AlterTable
ALTER TABLE "MoveLearnMethod" DROP CONSTRAINT "MoveLearnMethod_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "url",
ADD COLUMN     "mlm_id" SERIAL NOT NULL,
ADD COLUMN     "mlm_name" TEXT NOT NULL,
ADD COLUMN     "mlm_url" TEXT NOT NULL,
ADD CONSTRAINT "MoveLearnMethod_pkey" PRIMARY KEY ("mlm_id");

-- AlterTable
ALTER TABLE "VersionGroup" DROP CONSTRAINT "VersionGroup_pkey",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "url",
ADD COLUMN     "vg_id" SERIAL NOT NULL,
ADD COLUMN     "vg_name" TEXT NOT NULL,
ADD COLUMN     "vg_url" TEXT NOT NULL,
ADD CONSTRAINT "VersionGroup_pkey" PRIMARY KEY ("vg_id");

-- AlterTable
ALTER TABLE "VersionGroupDetail" DROP CONSTRAINT "VersionGroupDetail_pkey",
DROP COLUMN "id",
DROP COLUMN "moveId",
DROP COLUMN "moveLearnMethodId",
DROP COLUMN "versionGroupId",
ADD COLUMN     "mlm_id" INTEGER NOT NULL,
ADD COLUMN     "move_id" INTEGER NOT NULL,
ADD COLUMN     "vg_id" INTEGER NOT NULL,
ADD COLUMN     "vgd_id" SERIAL NOT NULL,
ADD CONSTRAINT "VersionGroupDetail_pkey" PRIMARY KEY ("vgd_id");

-- AddForeignKey
ALTER TABLE "VersionGroupDetail" ADD CONSTRAINT "VersionGroupDetail_move_id_fkey" FOREIGN KEY ("move_id") REFERENCES "Move"("move_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionGroupDetail" ADD CONSTRAINT "VersionGroupDetail_vg_id_fkey" FOREIGN KEY ("vg_id") REFERENCES "VersionGroup"("vg_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionGroupDetail" ADD CONSTRAINT "VersionGroupDetail_mlm_id_fkey" FOREIGN KEY ("mlm_id") REFERENCES "MoveLearnMethod"("mlm_id") ON DELETE RESTRICT ON UPDATE CASCADE;
