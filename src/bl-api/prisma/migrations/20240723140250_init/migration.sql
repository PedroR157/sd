/*
  Warnings:

  - A unique constraint covering the columns `[group_name]` on the table `VersionGroup` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[move_id,method_id,group_id]` on the table `VersionGroupDetails` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "VersionGroup_group_name_key" ON "VersionGroup"("group_name");

-- CreateIndex
CREATE UNIQUE INDEX "VersionGroupDetails_move_id_method_id_group_id_key" ON "VersionGroupDetails"("move_id", "method_id", "group_id");
