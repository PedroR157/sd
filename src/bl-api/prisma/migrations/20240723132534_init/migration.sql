/*
  Warnings:

  - You are about to drop the column `name` on the `Move` table. All the data in the column will be lost.
  - You are about to drop the `Move_learn_method` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Moves` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Version_group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Version_group_details` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[move_name]` on the table `Move` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `group_id` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `method_id` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `move_name` to the `Move` table without a default value. This is not possible if the table is not empty.
  - Added the required column `move_url` to the `Move` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Move_name_key";

-- AlterTable
CREATE SEQUENCE move_move_id_seq;
ALTER TABLE "Move" DROP COLUMN "name",
ADD COLUMN     "group_id" INTEGER NOT NULL,
ADD COLUMN     "method_id" INTEGER NOT NULL,
ADD COLUMN     "move_name" TEXT NOT NULL,
ADD COLUMN     "move_url" TEXT NOT NULL,
ALTER COLUMN "move_id" SET DEFAULT nextval('move_move_id_seq');
ALTER SEQUENCE move_move_id_seq OWNED BY "Move"."move_id";

-- DropTable
DROP TABLE "Move_learn_method";

-- DropTable
DROP TABLE "Moves";

-- DropTable
DROP TABLE "Version_group";

-- DropTable
DROP TABLE "Version_group_details";

-- CreateTable
CREATE TABLE "Move_Learn_Method" (
    "method_id" SERIAL NOT NULL,
    "method_name" TEXT NOT NULL,
    "method_url" TEXT NOT NULL,

    CONSTRAINT "Move_Learn_Method_pkey" PRIMARY KEY ("method_id")
);

-- CreateTable
CREATE TABLE "Version_Group" (
    "group_id" SERIAL NOT NULL,
    "group_name" TEXT NOT NULL,
    "group_url" TEXT NOT NULL,

    CONSTRAINT "Version_Group_pkey" PRIMARY KEY ("group_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Move_Learn_Method_method_name_key" ON "Move_Learn_Method"("method_name");

-- CreateIndex
CREATE UNIQUE INDEX "Move_move_name_key" ON "Move"("move_name");

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_method_id_fkey" FOREIGN KEY ("method_id") REFERENCES "Move_Learn_Method"("method_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Move" ADD CONSTRAINT "Move_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "Version_Group"("group_id") ON DELETE RESTRICT ON UPDATE CASCADE;
