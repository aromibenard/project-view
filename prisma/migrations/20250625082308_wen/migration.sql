-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "progressNotified" TEXT[] DEFAULT ARRAY[]::TEXT[];
