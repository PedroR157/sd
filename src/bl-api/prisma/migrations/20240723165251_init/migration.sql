/*
  Warnings:

  - The primary key for the `Move` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `move_id` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `move_name` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `move_url` on the `Move` table. All the data in the column will be lost.
  - The primary key for the `MoveLearnMethod` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `method_id` on the `MoveLearnMethod` table. All the data in the column will be lost.
  - You are about to drop the column `method_name` on the `MoveLearnMethod` table. All the data in the column will be lost.
  - You are about to drop the column `method_url` on the `MoveLearnMethod` table. All the data in the column will be lost.
  - The primary key for the `VersionGroup` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `group_id` on the `VersionGroup` table. All the data in the column will be lost.
  - You are about to drop the column `group_name` on the `VersionGroup` table. All the data in the column will be lost.
  - You are about to drop the column `group_url` on the `VersionGroup` table. All the data in the column will be lost.
  - The primary key for the `VersionGroupDetail` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `detail_id` on the `VersionGroupDetail` table. All the data in the column will be lost.
  - You are about to drop the column `level_learned_at` on the `VersionGroupDetail` table. All the data in the column will be lost.
  - You are about to drop the column `move_id` on the `VersionGroupDetail` table. All the data in the column will be lost.
  - You are about to drop the column `move_learn_method_id` on the `VersionGroupDetail` table. All the data in the column will be lost.
  - You are about to drop the column `version_group_id` on the `VersionGroupDetail` table. All the data in the column will be lost.
  - Added the required column `name` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `MoveLearnMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `MoveLearnMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `VersionGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `VersionGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `levelLearnedAt` to the `VersionGroupDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moveId` to the `VersionGroupDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `moveLearnMethodId` to the `VersionGroupDetail` table without a default value. This is not possible if the table is not empty.
  - Added the required column `versionGroupId` to the `VersionGroupDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VersionGroupDetail" DROP CONSTRAINT "VersionGroupDetail_move_id_fkey";

-- DropForeignKey
ALTER TABLE "VersionGroupDetail" DROP CONSTRAINT "VersionGroupDetail_move_learn_method_id_fkey";

-- DropForeignKey
ALTER TABLE "VersionGroupDetail" DROP CONSTRAINT "VersionGroupDetail_version_group_id_fkey";

-- AlterTable
ALTER TABLE "Move" DROP CONSTRAINT "Move_pkey",
DROP COLUMN "move_id",
DROP COLUMN "move_name",
DROP COLUMN "move_url",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD CONSTRAINT "Move_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "MoveLearnMethod" DROP CONSTRAINT "MoveLearnMethod_pkey",
DROP COLUMN "method_id",
DROP COLUMN "method_name",
DROP COLUMN "method_url",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD CONSTRAINT "MoveLearnMethod_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "VersionGroup" DROP CONSTRAINT "VersionGroup_pkey",
DROP COLUMN "group_id",
DROP COLUMN "group_name",
DROP COLUMN "group_url",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL,
ADD CONSTRAINT "VersionGroup_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "VersionGroupDetail" DROP CONSTRAINT "VersionGroupDetail_pkey",
DROP COLUMN "detail_id",
DROP COLUMN "level_learned_at",
DROP COLUMN "move_id",
DROP COLUMN "move_learn_method_id",
DROP COLUMN "version_group_id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "levelLearnedAt" INTEGER NOT NULL,
ADD COLUMN     "moveId" INTEGER NOT NULL,
ADD COLUMN     "moveLearnMethodId" INTEGER NOT NULL,
ADD COLUMN     "versionGroupId" INTEGER NOT NULL,
ADD CONSTRAINT "VersionGroupDetail_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "VersionGroupDetail" ADD CONSTRAINT "VersionGroupDetail_moveId_fkey" FOREIGN KEY ("moveId") REFERENCES "Move"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionGroupDetail" ADD CONSTRAINT "VersionGroupDetail_versionGroupId_fkey" FOREIGN KEY ("versionGroupId") REFERENCES "VersionGroup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionGroupDetail" ADD CONSTRAINT "VersionGroupDetail_moveLearnMethodId_fkey" FOREIGN KEY ("moveLearnMethodId") REFERENCES "MoveLearnMethod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
