-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "developerEmail" TEXT;

-- CreateTable
CREATE TABLE "Developer" (
    "id" TEXT NOT NULL,
    "clerkId" TEXT NOT NULL,
    "name" TEXT,
    "xp" INTEGER NOT NULL DEFAULT 0,
    "level" INTEGER NOT NULL DEFAULT 1,
    "badges" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DeveloperProjects" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_DeveloperProjects_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Developer_clerkId_key" ON "Developer"("clerkId");

-- CreateIndex
CREATE INDEX "_DeveloperProjects_B_index" ON "_DeveloperProjects"("B");

-- AddForeignKey
ALTER TABLE "_DeveloperProjects" ADD CONSTRAINT "_DeveloperProjects_A_fkey" FOREIGN KEY ("A") REFERENCES "Developer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeveloperProjects" ADD CONSTRAINT "_DeveloperProjects_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
