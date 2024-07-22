-- CreateTable
CREATE TABLE "Moves" (
    "moves_id" INTEGER NOT NULL,
    "move" TEXT NOT NULL,
    "version_group_details" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Moves_pkey" PRIMARY KEY ("moves_id")
);

-- CreateTable
CREATE TABLE "Move" (
    "move_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Move_pkey" PRIMARY KEY ("move_id")
);

-- CreateTable
CREATE TABLE "Version_group_details" (
    "vgd_id" INTEGER NOT NULL,
    "level_learned_at" INTEGER NOT NULL,
    "move_learn_method" TEXT NOT NULL,
    "version_group" TEXT NOT NULL,

    CONSTRAINT "Version_group_details_pkey" PRIMARY KEY ("vgd_id")
);

-- CreateTable
CREATE TABLE "Move_learn_method" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Move_learn_method_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Version_group" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Version_group_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Moves_version_group_details_key" ON "Moves"("version_group_details");

-- CreateIndex
CREATE UNIQUE INDEX "Move_name_key" ON "Move"("name");
