/*
  Warnings:

  - You are about to drop the `VersionGroupDetails` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VersionGroupDetails" DROP CONSTRAINT "VersionGroupDetails_group_id_fkey";

-- DropForeignKey
ALTER TABLE "VersionGroupDetails" DROP CONSTRAINT "VersionGroupDetails_method_id_fkey";

-- DropForeignKey
ALTER TABLE "VersionGroupDetails" DROP CONSTRAINT "VersionGroupDetails_move_id_fkey";

-- DropIndex
DROP INDEX "Move_move_name_key";

-- DropIndex
DROP INDEX "MoveLearnMethod_method_name_key";

-- DropIndex
DROP INDEX "VersionGroup_group_name_key";

-- DropTable
DROP TABLE "VersionGroupDetails";

-- CreateTable
CREATE TABLE "VersionGroupDetail" (
    "detail_id" SERIAL NOT NULL,
    "move_id" INTEGER NOT NULL,
    "version_group_id" INTEGER NOT NULL,
    "move_learn_method_id" INTEGER NOT NULL,
    "level_learned_at" INTEGER NOT NULL,

    CONSTRAINT "VersionGroupDetail_pkey" PRIMARY KEY ("detail_id")
);

-- AddForeignKey
ALTER TABLE "VersionGroupDetail" ADD CONSTRAINT "VersionGroupDetail_move_id_fkey" FOREIGN KEY ("move_id") REFERENCES "Move"("move_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionGroupDetail" ADD CONSTRAINT "VersionGroupDetail_version_group_id_fkey" FOREIGN KEY ("version_group_id") REFERENCES "VersionGroup"("group_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VersionGroupDetail" ADD CONSTRAINT "VersionGroupDetail_move_learn_method_id_fkey" FOREIGN KEY ("move_learn_method_id") REFERENCES "MoveLearnMethod"("method_id") ON DELETE RESTRICT ON UPDATE CASCADE;
