-- AlterTable
ALTER TABLE "Server" ALTER COLUMN "version" DROP NOT NULL,
ALTER COLUMN "version" SET DATA TYPE TEXT;
