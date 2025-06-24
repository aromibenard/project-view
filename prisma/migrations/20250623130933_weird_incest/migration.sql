/*
  Warnings:

  - Added the required column `updatedAt` to the `Milestone` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Step" DROP CONSTRAINT "Step_milestoneId_fkey";

-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "completedAt" TIMESTAMP(3),
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "order" SET DEFAULT 0;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "completed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "completedAt" TIMESTAMP(3);

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_milestoneId_fkey" FOREIGN KEY ("milestoneId") REFERENCES "Milestone"("id") ON DELETE CASCADE ON UPDATE CASCADE;
