/*
  Warnings:

  - You are about to drop the column `move_url` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the column `mlm_url` on the `MoveLearnMethod` table. All the data in the column will be lost.
  - You are about to drop the column `vg_url` on the `VersionGroup` table. All the data in the column will be lost.
  - You are about to drop the column `levelLearnedAt` on the `VersionGroupDetail` table. All the data in the column will be lost.
  - You are about to drop the column `move_id` on the `VersionGroupDetail` table. All the data in the column will be lost.
  - Added the required column `url` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `MoveLearnMethod` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `VersionGroup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `level_learned_at` to the `VersionGroupDetail` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "VersionGroupDetail" DROP CONSTRAINT "VersionGroupDetail_move_id_fkey";

-- AlterTable
ALTER TABLE "Move" DROP COLUMN "move_url",
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MoveLearnMethod" DROP COLUMN "mlm_url",
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VersionGroup" DROP COLUMN "vg_url",
ADD COLUMN     "url" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "VersionGroupDetail" DROP COLUMN "levelLearnedAt",
DROP COLUMN "move_id",
ADD COLUMN     "level_learned_at" INTEGER NOT NULL;
