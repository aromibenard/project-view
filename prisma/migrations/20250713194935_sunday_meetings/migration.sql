-- AlterTable
ALTER TABLE "Step" ADD COLUMN     "projectId" TEXT;

-- AddForeignKey
ALTER TABLE "Step" ADD CONSTRAINT "Step_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
