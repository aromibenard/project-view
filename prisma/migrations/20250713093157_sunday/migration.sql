-- DropForeignKey
ALTER TABLE "Milestone" DROP CONSTRAINT "Milestone_projectId_fkey";

-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
